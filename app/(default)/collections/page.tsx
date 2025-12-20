'use client';

import { useState, useEffect, useMemo } from 'react';
import CollectionsHeader from '@/src/components/collections/CollectionsHeader';
import CategoryFilters, { CATEGORIES } from '@/src/components/collections/CategoryFilter';
import ArtworkModal from '@/src/components/ArtworkModal';
import ArtworksGrid from '@/src/components/collections/ArtworksGrid';
import type { Metadata } from 'next';

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: number;
  medium: string;
  dimensions?: string;
  description: string;
  category: string;
  imageId: string;
}

export const metadata: Metadata = {
  title: {
    default: 'Collections | National Gallery of Art',
    template: '%s | National Gallery of Art',
  },
  description:
    'Browse the National Gallery of Art’s extensive collection of artworks. Filter by category, view artist details, and explore masterpieces.',
  keywords: [
    'art gallery',
    'art collection',
    'paintings',
    'sculptures',
    'national gallery',
    'artworks',
    'museum',
    'art categories',
    'art exhibition',
  ],
  authors: [{ name: 'National Gallery of Art', url: 'https://virtualgallery.nga.gov.ng/collections' }],
  openGraph: {
    title: 'Collections | National Gallery of Art',
    description:
      'Explore the National Gallery of Art’s curated collection of paintings, sculptures, and other masterpieces. Filter artworks by category and artist.',
    url: 'https://virtualgallery.nga.gov.ng/collections',
    siteName: 'National Gallery of Art',
    type: 'website',
    images: [
      {
        url: 'https://www.nga.gov/assets/collections/social-share.jpg',
        width: 1200,
        height: 630,
        alt: 'National Gallery of Art Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Collections | National Gallery of Art',
    description:
      'Explore the National Gallery of Art’s curated collection of paintings, sculptures, and other masterpieces.',
    creator: '@NationalGallery',
  },
};

export default function CollectionsPage() {
  const [allArtworks, setAllArtworks] = useState<Artwork[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load artworks on mount
  useEffect(() => {
    const controller = new AbortController();
    loadArtworks(controller.signal);
    return () => controller.abort();
  }, []);

  /** Fetch artworks from API */
  async function loadArtworks(signal?: AbortSignal) {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/artworks?limit=100', { signal });

      if (!response.ok) {
        throw new Error('Failed to load artworks');
      }

      const data = await response.json();
      setAllArtworks(data.artworks || []);
      setIsLoading(false);
    } catch (err: any) {
      if (err.name === 'AbortError') return; // Fetch was cancelled
      console.error('Error loading artworks:', err);
      setError(err.message);
      setIsLoading(false);
    }
  }

  // Filter artworks based on selected category
  const filteredArtworks = useMemo(() => {
    if (selectedCategory === 'all') return allArtworks;
    return allArtworks.filter((art) => art.category === selectedCategory);
  }, [selectedCategory, allArtworks]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allArtworks.length };
    CATEGORIES.forEach((category) => {
      if (category.id !== 'all') {
        counts[category.id] = allArtworks.filter((art) => art.category === category.id).length;
      }
    });
    return counts;
  }, [allArtworks]);

  // Current category label
  const categoryLabel = useMemo(() => {
    if (selectedCategory === 'all') return 'All Artworks';
    return CATEGORIES.find((c) => c.id === selectedCategory)?.label || '';
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-nga-cream pt-24 pb-16">
      <div className="container-custom">
        {/* Page Header */}
        <CollectionsHeader />

        {/* Category Filters */}
        <CategoryFilters
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categoryCounts={categoryCounts}
        />

        {/* Artworks Grid */}
        <ArtworksGrid
          artworks={filteredArtworks}
          isLoading={isLoading}
          error={error}
          selectedCategory={selectedCategory}
          categoryLabel={categoryLabel}
          onArtworkClick={setSelectedArtwork}
          onRetry={loadArtworks}
          onViewAll={() => setSelectedCategory('all')}
        />
      </div>

      {/* Artwork Detail Modal */}
      <ArtworkModal artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />
    </div>
  );
}
