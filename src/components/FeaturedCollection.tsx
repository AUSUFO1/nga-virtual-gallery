'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ArtworkCard from './ArtworkCard';
import ArtworkModal from './ArtworkModal';

interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: number;
  medium: string;
  dimensions?: string;
  description: string;
  imageId: string;
}

export default function FeaturedCollection() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadArtworks() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/artworks/featured');

        if (!response.ok) {
          throw new Error('Failed to load artworks');
        }

        const data = await response.json();
        setArtworks(data);
      } catch (err: any) {
        console.error('Error loading featured artworks:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadArtworks();
  }, []);

  return (
    <section
      id="collections"
      className="section-padding bg-nga-cream text-nga-navy"
    >
      <div className="container-custom">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Featured <span className="text-nga-green">Collection</span>
          </h2>

          <p className="text-nga-navy/70 text-sm md:text-2xl font-bold max-w-2xl mx-auto leading-relaxed">
            Explore an exclusive selection of artworks representing
            Nigeria's cultural identity, innovations, and artistic legacy.
          </p>
        </motion.div>

        {/* LOADING STATE */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-nga-navy/5 animate-pulse rounded-xl p-5"
              >
                <div className="aspect-3/4 bg-nga-navy/10 rounded-xl mb-4" />
                <div className="h-5 w-2/3 bg-nga-navy/20 rounded mb-2" />
                <div className="h-4 w-1/2 bg-nga-navy/20 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* ERROR STATE */}
        {error && (
          <p className="text-center text-red-600 text-lg py-12">
            Failed to load artworks. Please try again later.
          </p>
        )}

        {/* ARTWORK GRID */}
        {!isLoading && !error && artworks.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {artworks.map((artwork, index) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                index={index}
                onView={() => setSelectedArtwork(artwork)}
              />
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!isLoading && artworks.length === 0 && !error && (
          <p className="text-center text-nga-navy/60 text-lg py-12">
            No featured artworks available at the moment.
          </p>
        )}

        {/* VIEW ALL BUTTON */}
        {!isLoading && artworks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-14"
          >
            <a
              href="/collections"
              className="bg-nga-navy text-nga-cream font-semibold px-8 py-4 rounded-xl hover:bg-nga-green hover:text-nga-cream transition duration-300 shadow-md inline-block"
            >
              View All Collections
            </a>
          </motion.div>
        )}
      </div>

      {/* MODAL */}
      <ArtworkModal
        artwork={selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
      />
    </section>
  );
}