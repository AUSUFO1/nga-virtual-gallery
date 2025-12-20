import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { signedUrlLimiter, adminLimiter, getClientIp } from '@/lib/rate-limit';

// Initialize Supabase client with SERVICE KEY for admin operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

/*
 * GET /api/artworks/featured
 
 * Public endpoint - Returns 12 most recent featured artworks
 * Includes metadata but NOT image URLs (fetched separately for security)
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

    const { data, error } = await supabase
      .from('artworks')
      .select('*')
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(12);

    if (error) {
      console.error('Supabase GET error:', error);
      throw error;
    }

    const artworks = data?.map(artwork => ({
      id: artwork.id,
      title: artwork.title,
      artist: artwork.artist,
      year: artwork.year,
      medium: artwork.medium,
      dimensions: artwork.dimensions,
      description: artwork.description,
      category: artwork.category,
      imageId: artwork.image_id,
      createdAt: artwork.created_at,
    })) || [];

    return Response.json(artworks, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'X-RateLimit-Limit': rateLimitResult.limit.toString(),
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
      },
    });
  } catch (error) {
    console.error('Error fetching featured artworks:', error);
    return Response.json(
      { error: 'Failed to fetch featured artworks' },
      { status: 500 }
    );
  }
}

/*
 * POST /api/artworks/featured
 * 
 * Admin-only maintenance endpoint - Keeps only 12 most recent featured artworks
 * Un-features artworks beyond the 12 limit
 * 
 * RATE LIMITED: 50 requests/hour per IP
 */
export async function POST(request: NextRequest) {
  try {
    // SECURITY CHECK - Must be authenticated admin
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return Response.json(
        { error: 'Unauthorized - Authentication required' },
        { status: 401 }
      );
    }

    // Check admin role
    if ((session.user as any).role !== 'ADMIN') {
      return Response.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    // RATE LIMIT CHECK (even for admins - prevent mistakes/abuse)
    const ip = getClientIp(request);
    const rateLimitResult = await adminLimiter.check(50, ip);

    if (!rateLimitResult.success) {
      return Response.json(
        { 
          error: 'Rate limit exceeded. Too many maintenance operations.',
          retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000)
        },
        { status: 429 }
      );
    }

    console.log('Admin authenticated:', session.user.email);
    console.log('Checking featured artworks limit...');

    // Get all featured artworks
    const { data: allFeatured, error: fetchError } = await supabase
      .from('artworks')
      .select('id, created_at, title')
      .eq('is_featured', true)
      .order('created_at', { ascending: false });

    if (fetchError) throw fetchError;

    const currentCount = allFeatured?.length || 0;

    if (allFeatured && currentCount > 12) {
      const toUnfeature = allFeatured.slice(12);
      const idsToUnfeature = toUnfeature.map(art => art.id);

      console.log(
        `Un-featuring ${idsToUnfeature.length} old artworks:`,
        toUnfeature.map(a => a.title)
      );

      const { error: updateError } = await supabase
        .from('artworks')
        .update({ is_featured: false })
        .in('id', idsToUnfeature);

      if (updateError) throw updateError;

      console.log(' Successfully maintained 12-featured limit');

      return Response.json({
        success: true,
        message: `Un-featured ${idsToUnfeature.length} old artworks`,
        unfeatured: toUnfeature.map(a => ({ id: a.id, title: a.title })),
      });
    }

    console.log('Featured count within limit (12 or less)');

    return Response.json({
      success: true,
      message: 'Featured artworks within limit',
      currentCount,
    });
  } catch (error: any) {
    console.error(' Error maintaining featured limit:', error);
    return Response.json(
      {
        success: false,
        error: 'Failed to maintain featured limit',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}