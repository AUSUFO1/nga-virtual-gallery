// app/api/artworks/route.ts

import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { signedUrlLimiter, getClientIp } from '@/lib/rate-limit'; 

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

//  Maximum allowed limit 
const MAX_LIMIT = 100;
const DEFAULT_LIMIT = 50;

/*
 * GET /api/artworks
 * 
 * Returns all artworks (for collections page and 3D gallery)
 * Supports filtering and pagination
 * 
 * Query params:
 * - category: filter by category (painting, sculpture, etc.)
 * - limit: number of results (default: 50, max: 100)
 * - offset: pagination offset (default: 0)
 * 
 * Example: /api/artworks?category=painting&limit=20
 * 
 * RATE LIMITED: 200 requests/hour per IP
 */
export async function GET(request: NextRequest) {
  try {
    // RATE LIMIT CHECK
    const ip = getClientIp(request);
    const rateLimitResult = await signedUrlLimiter.check(200, ip);

    if (!rateLimitResult.success) {
      return Response.json(
        { 
          error: 'Rate limit exceeded',
          retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000)
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
            'Retry-After': Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    
    // Parse and VALIDATE query parameters
    const category = searchParams.get('category');
    const requestedLimit = parseInt(searchParams.get('limit') || String(DEFAULT_LIMIT));
    const offset = Math.max(0, parseInt(searchParams.get('offset') || '0')); // Prevent negative offset

    // Enforce maximum limit
    const limit = Math.min(requestedLimit, MAX_LIMIT);

    // Warn if limit was capped
    if (requestedLimit > MAX_LIMIT) {
      console.warn(`Limit capped from ${requestedLimit} to ${MAX_LIMIT} for IP: ${ip}`);
    }

    // Build query with count
    let query = supabase
      .from('artworks')
      .select('*', { count: 'exact' }) // Request count
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply category filter if provided
    if (category) { 
      query = query.eq('category', category);
    }

    // Execute query
    const { data, error, count } = await query;

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    // Format response
    const artworks = data?.map(artwork => ({
      id: artwork.id,
      title: artwork.title,
      artist: artwork.artist,
      year: artwork.year,
      medium: artwork.medium,
      dimensions: artwork.dimensions,
      description: artwork.description,
      category: artwork.category,
      isFeatured: artwork.is_featured,
      imageId: artwork.image_id,
      createdAt: artwork.created_at,
    })) || [];

    return Response.json({
      artworks,
      total: count || 0, 
      limit,
      offset,
      hasMore: count ? offset + limit < count : false,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        'X-RateLimit-Limit': rateLimitResult.limit.toString(),
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
      }
    });

  } catch (error) {
    console.error('Error fetching artworks:', error);
    return Response.json(
      { error: 'Failed to fetch artworks' },
      { status: 500 }
    );
  }
}