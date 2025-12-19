'use client';

import { useState, useEffect } from 'react';
import CollectionsHeader from '@/src/components/collections/CollectionsHeader';
import CategoryFilters, { CATEGORIES } from '@/src/components/collections/CategoryFilter';
import ArtworkModal from '@/src/components/ArtworkModal';
import ArtworksGrid from '@/src/components/collections/ArtworksGrid';

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

/*
 Collections Page
 Main page for browsing all artworks with category filtering
 */
export default function CollectionsPage() {
  const [allArtworks, setAllArtworks] = useState<Artwork[]>([]);
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load artworks on mount
  useEffect(() => {
    loadArtworks();
  }, []);

  // Filter artworks when category changes
  useEffect(() => {
    filterArtworks();
  }, [selectedCategory, allArtworks]);

  /** Fetch artworks from API */
  async function loadArtworks() {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/artworks?limit=100');

      if (!response.ok) {
        throw new Error('Failed to load artworks');
      }

      const data = await response.json();
      setAllArtworks(data.artworks || []);
      setFilteredArtworks(data.artworks || []);
      setIsLoading(false);
    } catch (err: any) {
      console.error('Error loading artworks:', err);
      setError(err.message);
      setIsLoading(false);
    }
  }

  /** Filter artworks based on selected category */
  function filterArtworks() {
    if (selectedCategory === 'all') {
      setFilteredArtworks(allArtworks);
    } else {
      setFilteredArtworks(allArtworks.filter((art) => art.category === selectedCategory));
    }
  }

  /** Get count for each category */
  function getCategoryCounts(): Record<string, number> {
    const counts: Record<string, number> = { all: allArtworks.length };
    CATEGORIES.forEach((category) => {
      if (category.id !== 'all') {
        counts[category.id] = allArtworks.filter((art) => art.category === category.id).length;
      }
    });
    return counts;
  }

  /** Get label for current category */
  function getCategoryLabel(): string {
    if (selectedCategory === 'all') return 'All Artworks';
    return CATEGORIES.find((c) => c.id === selectedCategory)?.label || '';
  }

  return (
    <div className="min-h-screen bg-nga-cream pt-24 pb-16">
      <div className="container-custom">
        {/* Page Header */}
        <CollectionsHeader />

        {/* Category Filters */}
        <CategoryFilters
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categoryCounts={getCategoryCounts()}
        />

        {/* Artworks Grid */}
        <ArtworksGrid
          artworks={filteredArtworks}
          isLoading={isLoading}
          error={error}
          selectedCategory={selectedCategory}
          categoryLabel={getCategoryLabel()}
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
