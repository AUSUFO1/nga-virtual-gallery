// app/api/artwork/route.ts

import { NextRequest } from 'next/server';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Initialize Cloudflare R2 client
const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

/**
 * GET /api/artwork?id=artwork-001
 * 
 * Returns a temporary signed URL for protected artwork image
 * URL expires in 1 hour for security
 * 
 * Example response:
 * {
 *   "url": "https://r2.cloudflare.com/...",
 *   "expiresIn": 3600,
 *   "artworkId": "artwork-001"
 * }
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const artworkId = searchParams.get('id');

    // Validate artwork ID
    if (!artworkId) {
      return Response.json(
        { error: 'Artwork ID is required' },
        { status: 400 }
      );
    }

    // Create command to get object from R2
    const command = new GetObjectCommand({
      Bucket: 'nga-artworks',
      Key: `artworks/${artworkId}.jpg`,
    });

    // Generate signed URL (expires in 1 hour = 3600 seconds)
    const signedUrl = await getSignedUrl(r2, command, { 
      expiresIn: 3600 
    });

    // Return signed URL with CORS headers
    return Response.json({ 
      url: signedUrl,
      expiresIn: 3600,
      artworkId 
    }, {
      headers: {
        'Cache-Control': 'private, max-age=3000',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });

  } catch (error: any) {
    console.error(' Error generating signed URL:', error);
    
    // Handle specific errors
    if (error.name === 'NoSuchKey') {
      return Response.json(
        { error: 'Artwork not found' },
        { status: 404 }
      );
    }

    return Response.json(
      { error: 'Failed to load artwork' },
      { status: 500 }
    );
  }
}