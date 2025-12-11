// app/api/artworks/route.ts

import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/*
 GET /api/artworks
 
 Returns all artworks (for collections page and 3D gallery)
 Supports filtering and pagination
 Query params:
 - category: filter by category (painting, sculpture, etc.)
 - limit: number of results (default: 50)
 - offset: pagination offset (default: 0)
 Example: /api/artworks?category=painting&limit=20
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Parse query parameters
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build query
    let query = supabase
      .from('artworks')
      .select('*')
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
      total: count,
      limit,
      offset,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
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