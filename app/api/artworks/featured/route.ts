// app/api/artworks/featured/route.ts

import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with SERVICE KEY for admin operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY! // Changed from ANON_KEY for POST operations
);

/**
 * GET /api/artworks/featured
 * 
 * Returns EXACTLY 10 most recent featured artworks for homepage
 * Includes metadata but NOT image URLs (fetched separately for security)
 * 
 * Example response:
 * [
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
    // Fetch featured artworks from database (max 10)
    const { data, error } = await supabase
      .from('artworks')
      .select('*')
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(10); // Changed from 9 to 10

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
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
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

/**
 * POST /api/artworks/featured
 * 
 * Maintenance endpoint - Keeps only 10 most recent featured artworks
 * Automatically un-features artworks beyond the 10 limit
 * Called after adding new featured artwork
 */
export async function POST(request: NextRequest) {
  try {
    console.log('Checking featured artworks limit...');

    // Get all featured artworks, newest first
    const { data: allFeatured, error: fetchError } = await supabase
      .from('artworks')
      .select('id, created_at, title')
      .eq('is_featured', true)
      .order('created_at', { ascending: false });

    if (fetchError) throw fetchError;

    const currentCount = allFeatured?.length || 0;
    console.log(`Current featured count: ${currentCount}`);

    // If more than 10, un-feature the oldest ones
    if (allFeatured && currentCount > 10) {
      const toUnfeature = allFeatured.slice(10); // Get everything after first 10
      const idsToUnfeature = toUnfeature.map(art => art.id);

      console.log(`Un-featuring ${idsToUnfeature.length} old artworks:`, 
        toUnfeature.map(a => a.title)
      );

      // Un-feature old artworks
      const { error: updateError } = await supabase
        .from('artworks')
        .update({ is_featured: false })
        .in('id', idsToUnfeature);

      if (updateError) throw updateError;

      console.log(`Successfully maintained 10-featured limit`);

      return Response.json({ 
        success: true, 
        message: `Un-featured ${idsToUnfeature.length} old artworks to maintain 10 limit`,
        unfeatured: toUnfeature.map(a => ({ id: a.id, title: a.title }))
      });
    }

    console.log('Featured count within limit (10 or less)');

    return Response.json({ 
      success: true, 
      message: 'Featured artworks within limit',
      currentCount 
    });

  } catch (error: any) {
    console.error('Error maintaining featured limit:', error);
    return Response.json(
      { 
        success: false,
        error: 'Failed to maintain featured limit',
        details: error.message 
      },
      { status: 500 }
    );
  }
}