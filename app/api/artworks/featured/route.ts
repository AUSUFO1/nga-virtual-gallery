// app/api/artworks/featured/route.ts

import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/*
 GET /api/artworks/featured
 Returns all featured artworks for homepage display
 Includes metadata but NOT image URLs (those are fetched separately for security)
  Example response:
 [
 *   {
 *     "id": "artwork-001",
 *     "title": "Tutu",
 *     "artist": "Ben Enwonwu",
 *     "year": 1974,
 *     "medium": "Oil on canvas",
 *     "description": "...",
 *     "imageId": "artwork-001"
 *   },
 *   ...
 * ]
 */
export async function GET(request: NextRequest) {
  try {
    // Fetch featured artworks from database
    const { data, error } = await supabase
      .from('artworks')
      .select('*')
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(9); // Show max 9 featured artworks on homepage

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
      imageId: artwork.image_id,
      createdAt: artwork.created_at,
    })) || [];

    return Response.json(artworks, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600', // Cache 5 minutes
      }
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
 Optional: GET with filters
 api/artworks/featured?limit=6
 */
export async function GET_WITH_PARAMS(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = parseInt(searchParams.get('limit') || '9');

  const { data, error } = await supabase
    .from('artworks')
    .select('*')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return Response.json(data);
}