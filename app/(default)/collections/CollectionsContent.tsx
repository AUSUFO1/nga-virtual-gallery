'use client';

import { useState, useEffect, useMemo } from 'react';
import CollectionsHeader from '@/src/components/collections/CollectionsHeader';
import CategoryFilters, { CATEGORIES } from '@/src/components/collections/CategoryFilter';
import ArtworkModal from '@/src/components/ArtworkModal';
import ArtworksGrid from '@/src/components/collections/ArtworksGrid';
import type { Artwork } from './types';

export default function CollectionsContent() {
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

  async function loadArtworks(signal?: AbortSignal) {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/artworks?limit=100', { signal });
      if (!response.ok) throw new Error('Failed to load artworks');

      const data = await response.json();
      setAllArtworks(data.artworks || []);
      setIsLoading(false);
    } catch (err: any) {
      if (err.name === 'AbortError') return;
      console.error('Error loading artworks:', err);
      setError(err.message);
      setIsLoading(false);
    }
  }

  const filteredArtworks = useMemo(() => {
    if (selectedCategory === 'all') return allArtworks;
    return allArtworks.filter((art) => art.category === selectedCategory);
  }, [selectedCategory, allArtworks]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allArtworks.length };
    CATEGORIES.forEach((category) => {
      if (category.id !== 'all') {
        counts[category.id] = allArtworks.filter((art) => art.category === category.id).length;
      }
    });
    return counts;
  }, [allArtworks]);

  const categoryLabel = useMemo(() => {
    if (selectedCategory === 'all') return 'All Artworks';
    return CATEGORIES.find((c) => c.id === selectedCategory)?.label || '';
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-nga-cream pt-24 pb-16">
      <div className="container-custom">
        <CollectionsHeader />

        <CategoryFilters
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categoryCounts={categoryCounts}
        />

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

      <ArtworkModal artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />
    </div>
  );
}
