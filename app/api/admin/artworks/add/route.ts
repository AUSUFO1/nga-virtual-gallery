import { NextRequest } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { createClient } from '@supabase/supabase-js';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { adminLimiter, getClientIp } from '@/lib/rate-limit';
import sharp from 'sharp';

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_TITLE_LENGTH = 200;
const MAX_ARTIST_LENGTH = 100;
const MAX_MEDIUM_LENGTH = 100;
const MAX_DIMENSIONS_LENGTH = 50;
const MAX_DESCRIPTION_LENGTH = 2000;
const MAX_CATEGORY_LENGTH = 50;
const MIN_YEAR = 1000;
const MAX_YEAR = new Date().getFullYear() + 10;

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const VALID_CATEGORIES = ['painting', 'sculpture', 'photography', 'mixed-media', 'textile', 'other'];

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return Response.json(
        { error: 'Unauthorized - Authentication required' },
        { status: 401 }
      );
    }

    if ((session.user as any).role !== 'ADMIN') {
      return Response.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    const ip = getClientIp(request);
    const rateLimitResult = await adminLimiter.check(50, ip);

    if (!rateLimitResult.success) {
      return Response.json(
        { 
          error: 'Rate limit exceeded. Too many uploads in a short time.',
          retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000)
        },
        { status: 429 }
      );
    }

    const formData = await request.formData();

    const imageFile = formData.get('image') as File;
    const rawTitle = formData.get('title') as string;
    const rawArtist = formData.get('artist') as string;
    const rawYear = formData.get('year') as string;
    const rawMedium = formData.get('medium') as string;
    const rawDimensions = formData.get('dimensions') as string;
    const rawDescription = formData.get('description') as string;
    const rawCategory = formData.get('category') as string;
    const isFeatured = formData.get('isFeatured') === 'true';

    if (!imageFile || !rawTitle || !rawArtist || !rawYear || !rawMedium || !rawDescription || !rawCategory) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const title = rawTitle.trim().slice(0, MAX_TITLE_LENGTH);
    const artist = rawArtist.trim().slice(0, MAX_ARTIST_LENGTH);
    const medium = rawMedium.trim().slice(0, MAX_MEDIUM_LENGTH);
    const dimensions = rawDimensions ? rawDimensions.trim().slice(0, MAX_DIMENSIONS_LENGTH) : '';
    const description = rawDescription.trim().slice(0, MAX_DESCRIPTION_LENGTH);
    const category = rawCategory.trim().toLowerCase().slice(0, MAX_CATEGORY_LENGTH);

    if (title.length < 3) {
      return Response.json(
        { error: 'Title must be at least 3 characters' },
        { status: 400 }
      );
    }

    if (artist.length < 2) {
      return Response.json(
        { error: 'Artist name must be at least 2 characters' },
        { status: 400 }
      );
    }

    const year = parseInt(rawYear);
    if (isNaN(year) || year < MIN_YEAR || year > MAX_YEAR) {
      return Response.json(
        { error: `Year must be between ${MIN_YEAR} and ${MAX_YEAR}` },
        { status: 400 }
      );
    }

    if (!VALID_CATEGORIES.includes(category)) {
      return Response.json(
        { 
          error: `Invalid category. Must be one of: ${VALID_CATEGORIES.join(', ')}`,
          validCategories: VALID_CATEGORIES
        },
        { status: 400 }
      );
    }

    if (imageFile.size > MAX_FILE_SIZE) {
      return Response.json(
        { 
          error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB`,
          fileSize: `${(imageFile.size / 1024 / 1024).toFixed(2)}MB`,
          maxSize: `${MAX_FILE_SIZE / 1024 / 1024}MB`
        },
        { status: 400 }
      );
    }

    if (!ALLOWED_IMAGE_TYPES.includes(imageFile.type)) {
      return Response.json(
        { 
          error: 'Invalid file type. Only JPEG, PNG, and WebP images are allowed',
          receivedType: imageFile.type,
          allowedTypes: ALLOWED_IMAGE_TYPES
        },
        { status: 400 }
      );
    }

    const artworkId = `artwork-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 9)}`;

    const buffer = Buffer.from(await imageFile.arrayBuffer());

    let processedImage: Buffer;
    try {
      processedImage = await sharp(buffer)
        .resize(2000, 2000, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .jpeg({
          quality: 85,
          progressive: true,
        })
        .toBuffer();
    } catch (sharpError: any) {
      return Response.json(
        { 
          error: 'Invalid or corrupted image file',
          details: 'The file could not be processed as an image'
        },
        { status: 400 }
      );
    }

    const metadata = await sharp(processedImage).metadata();
    if (!metadata.width || !metadata.height) {
      return Response.json(
        { error: 'Invalid image: could not determine dimensions' },
        { status: 400 }
      );
    }

    if (metadata.width < 100 || metadata.height < 100) {
      return Response.json(
        { 
          error: 'Image too small. Minimum dimensions are 100x100 pixels',
          actualDimensions: `${metadata.width}x${metadata.height}`
        },
        { status: 400 }
      );
    }

    const { width, height } = metadata;

    const watermarkSvg = Buffer.from(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <text 
          x="50%" 
          y="50%" 
          font-family="Arial, sans-serif"
          font-size="${Math.floor(width / 20)}"
          font-weight="700"
          fill="white"
          opacity="0.12"
          text-anchor="middle"
          dominant-baseline="middle"
          transform="rotate(-30 ${width / 2} ${height / 2})"
        >
          © NATIONAL GALLERY OF ART
        </text>
      </svg>
    `);

    const watermarkedImage = await sharp(processedImage)
      .composite([{ input: watermarkSvg }])
      .toBuffer();

    const finalSize = (watermarkedImage.length / 1024).toFixed(2);
    const compressionRatio = ((1 - watermarkedImage.length / buffer.length) * 100).toFixed(1);

    try {
      await r2.send(
        new PutObjectCommand({
          Bucket: 'nga-artworks',
          Key: `artworks/${artworkId}.jpg`,
          Body: watermarkedImage,
          ContentType: 'image/jpeg',
          Metadata: {
            title: title.substring(0, 100),
            artist: artist.substring(0, 100),
            year: year.toString(),
            uploadedBy: session.user.email || 'unknown',
          },
        })
      );
    } catch (r2Error: any) {
      return Response.json(
        { error: 'Failed to upload image to storage' },
        { status: 500 }
      );
    }

    const { data: artwork, error: dbError } = await supabase
      .from('artworks')
      .insert({
        id: artworkId,
        title,
        artist,
        year,
        medium,
        dimensions,
        description,
        category,
        is_featured: isFeatured,
        image_id: artworkId,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (dbError) {
      throw dbError;
    }

    return Response.json({
      success: true,
      artwork: {
        id: artwork.id,
        title: artwork.title,
        artist: artwork.artist,
        year: artwork.year,
        imageId: artwork.image_id,
        category: artwork.category,
        isFeatured: artwork.is_featured,
      },
      message: `Artwork "${title}" successfully added to gallery`,
      stats: {
        originalSize: `${(buffer.length / 1024 / 1024).toFixed(2)}MB`,
        finalSize: `${finalSize}KB`,
        compression: `${compressionRatio}%`,
        dimensions: `${width}x${height}px`,
      }
    }, {
      headers: {
        'X-RateLimit-Limit': rateLimitResult.limit.toString(),
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
      }
    });

  } catch (error: any) {
    return Response.json(
      {
        error: 'Failed to add artwork',
        ...(process.env.NODE_ENV === 'development' && { details: error.message })
      },
      { status: 500 }
    );
  }
}