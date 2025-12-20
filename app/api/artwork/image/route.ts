import { NextRequest } from 'next/server';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { imageLimiter, getClientIp } from '@/lib/rate-limit';

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

/*
 * GET /api/artwork/image?id=artwork-001
 * 
 * Proxies image from Cloudflare R2 to avoid CORS issues
 * Returns actual image bytes with proper headers
 * 
 * RATE LIMITED: 100 requests/hour per IP
 */
export async function GET(request: NextRequest) {
  // RATE LIMIT CHECK
  const ip = getClientIp(request);
  const rateLimitResult = await imageLimiter.check(100, ip);

  if (!rateLimitResult.success) {
    return new Response('Rate limit exceeded. Please try again later.', {
      status: 429,
      headers: {
        'X-RateLimit-Limit': rateLimitResult.limit.toString(),
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
        'Retry-After': Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString(),
      },
    });
  }

  const searchParams = request.nextUrl.searchParams;
  const artworkId = searchParams.get('id');

  if (!artworkId) {
    return new Response('Missing artwork ID', { status: 400 });
  }

  try {
    // Fetch image from R2
    const command = new GetObjectCommand({
      Bucket: 'nga-artworks',
      Key: `artworks/${artworkId}.jpg`,
    });

    const response = await r2.send(command);
    
    if (!response.Body) {
      return new Response('Image not found', { status: 404 });
    }

    // Convert stream to buffer
    const chunks: Uint8Array[] = [];
    const reader = response.Body.transformToWebStream().getReader();
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }

    // Combine chunks into single buffer
    const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
    const imageBuffer = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      imageBuffer.set(chunk, offset);
      offset += chunk.length;
    }

    // Return image with proper headers including rate limit info
    return new Response(imageBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=3600, immutable',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD',
        'Access-Control-Allow-Headers': '*',
        'X-RateLimit-Limit': rateLimitResult.limit.toString(),
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
      },
    });

  } catch (error: any) {
    console.error('Error fetching image from R2:', error);
    
    if (error.name === 'NoSuchKey') {
      return new Response('Image not found', { status: 404 });
    }

    return new Response('Failed to load image', { status: 500 });
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    },
  });
}