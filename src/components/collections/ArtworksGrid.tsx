'use client';

import { motion } from 'framer-motion';
import { Grid3x3, Loader2 } from 'lucide-react';
import ArtworkCard from '../ArtworkCard';

interface Artwork {
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

interface ArtworksGridProps {
  artworks: Artwork[];
  isLoading: boolean;
  error: string | null;
  selectedCategory: string;
  categoryLabel: string;
  onArtworkClick: (artwork: Artwork) => void;
  onRetry?: () => void;
  onViewAll?: () => void;
}

/*
 ArtworksGrid Component
 Displays grid of artworks with loading/error/empty states
 */
export default function ArtworksGrid({
  artworks,
  isLoading,
  error,
  selectedCategory,
  categoryLabel,
  onArtworkClick,
  onRetry,
  onViewAll,
}: ArtworksGridProps) {
  return (
    <>
      {/* Results Header */}
      <ResultsHeader
        categoryLabel={categoryLabel}
        count={artworks.length}
        isLoading={isLoading}
      />

      {/* Loading State */}
      {isLoading && <LoadingState />}

      {/* Error State */}
      {error && <ErrorState onRetry={onRetry} />}

      {/* Artworks Grid */}
      {!isLoading && !error && artworks.length > 0 && (
        <ArtworksGridContent artworks={artworks} onArtworkClick={onArtworkClick} />
      )}

      {/* Empty State */}
      {!isLoading && !error && artworks.length === 0 && (
        <EmptyState onViewAll={onViewAll} />
      )}
    </>
  );
}

/*
 Results Header
 */
function ResultsHeader({
  categoryLabel,
  count,
  isLoading,
}: {
  categoryLabel: string;
  count: number;
  isLoading: boolean;
}) {
  if (isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="flex items-center justify-between mb-8 pb-4 border-b border-[#a8cf45]/20"
    >
      <div className="flex items-center gap-3">
        <Grid3x3 className="w-5 h-5 text-nga-navy" />
        <h3 className="text-xl font-bold text-nga-navy">{categoryLabel}</h3>
        <span className="text-nga-navy font-bold">
          ({count} {count === 1 ? 'artwork' : 'artworks'})
        </span>
      </div>
    </motion.div>
  );
}

/**
 * Loading State
 */
function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="w-12 h-12 text-nga-navy animate-spin mb-4" />
      <p className="text-[#f9faf8]/70 text-lg">Loading artworks...</p>
    </div>
  );
}

/**
 * Error State
 */
function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="text-center py-20">
      <p className="text-red-400 text-lg mb-4">Failed to load artworks</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          Retry
        </button>
      )}
    </div>
  );
}

/**
 * Artworks Grid Content
 */
function ArtworksGridContent({
  artworks,
  onArtworkClick,
}: {
  artworks: Artwork[];
  onArtworkClick: (artwork: Artwork) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0"
    >
      {artworks.map((artwork, index) => (
        <ArtworkCard
          key={artwork.id}
          artwork={artwork}
          index={index}
          onView={() => onArtworkClick(artwork)}
        />
      ))}
    </motion.div>
  );
}

/**
 * Empty State
 */
function EmptyState({ onViewAll }: { onViewAll?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-20"
    >
      <h3 className="text-2xl font-bold text-nga-navy  mb-2">
        No artworks in this category yet
      </h3>
      <p className="text-nga-navy mb-6">
        Check back soon for new additions to our collection
      </p>
      {onViewAll && (
        <button onClick={onViewAll} className="btn-secondary">
          View All Artworks
        </button>
      )}
    </motion.div>
  );
}