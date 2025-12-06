// app/api/admin/artworks/add/route.ts
import { NextRequest } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';

// Initialize Cloudflare R2 client
const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY! // Service key for admin operations
);

export async function POST(request: NextRequest) {
  try {
    // Parse form data
    const formData = await request.formData();
    
    const imageFile = formData.get('image') as File;
    const title = formData.get('title') as string;
    const artist = formData.get('artist') as string;
    const year = parseInt(formData.get('year') as string);
    const medium = formData.get('medium') as string;
    const dimensions = formData.get('dimensions') as string || '';
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const isFeatured = formData.get('isFeatured') === 'true';

    // Validate required fields
    if (!imageFile || !title || !artist || !year || !medium || !description || !category) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate image file
    if (!imageFile.type.startsWith('image/')) {
      return Response.json({ error: 'File must be an image' }, { status: 400 });
    }

    console.log('Starting artwork upload:', title);

    // Generate unique artwork ID
    const artworkId = `artwork-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Convert File to Buffer
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log('Processing image...');

    // Step 1: Compress and resize image
    const processedImage = await sharp(buffer)
      .resize(2000, 2000, { 
        fit: 'inside', 
        withoutEnlargement: true 
      })
      .jpeg({ 
        quality: 85,
        progressive: true
      })
      .toBuffer();

    // Get processed image dimensions for dynamic watermark
    const { width, height } = await sharp(processedImage).metadata();

    console.log('Adding dynamic watermark...');

    // Step 2: Add watermark dynamically sized
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
          transform="rotate(-30 ${width/2} ${height/2})"
        >
          © NATIONAL GALLERY OF ART
        </text>
      </svg>
    `);

    const watermarkedImage = await sharp(processedImage)
      .composite([{ input: watermarkSvg, blend: 'over' }])
      .toBuffer();

    const finalSize = (watermarkedImage.length / 1024).toFixed(2);
    console.log(`Image processed: ${finalSize}KB`);

    console.log('Uploading to Cloudflare R2...');

    // Step 3: Upload to Cloudflare R2
    await r2.send(
      new PutObjectCommand({
        Bucket: 'nga-artworks',
        Key: `artworks/${artworkId}.jpg`,
        Body: watermarkedImage,
        ContentType: 'image/jpeg',
        Metadata: { title, artist, year: year.toString() }
      })
    );

    console.log('Uploaded to R2');

    console.log('Saving metadata to database...');

    // Step 4: Save metadata to Supabase
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
      console.error('Database error:', dbError);
      throw dbError;
    }

    console.log('Artwork added successfully!');

    // Return success response
    return Response.json({
      success: true,
      artwork: {
        id: artwork.id,
        title: artwork.title,
        artist: artwork.artist,
        year: artwork.year,
        imageId: artwork.image_id,
      },
      message: `Artwork "${title}" successfully added to gallery!`,
      stats: {
        originalSize: (buffer.length / 1024 / 1024).toFixed(2) + 'MB',
        finalSize: finalSize + 'KB',
        compression: ((1 - watermarkedImage.length / buffer.length) * 100).toFixed(1) + '%'
      }
    });

  } catch (error: any) {
    console.error('Error adding artwork:', error);
    return Response.json(
      { error: 'Failed to add artwork', details: error.message },
      { status: 500 }
    );
  }
}
