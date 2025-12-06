'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Palette, Ruler } from 'lucide-react';
import ProtectedImage from './ProtectedImage';
import { useEffect } from 'react';

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

interface ArtworkModalProps {
  artwork: Artwork | null;
  onClose: () => void;
}

/**
 * ArtworkModal Component
 * 
 * Full-screen modal displaying artwork details
 * Shows large protected image + complete metadata
 */
export default function ArtworkModal({ artwork, onClose }: ArtworkModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal open
  useEffect(() => {
    if (artwork) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [artwork]);

  if (!artwork) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="bg-[#1a4d2e] rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-nga-navy hover:bg-nga-light-green transition-colors flex items-center justify-center"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            
            {/* Left: Image */}
            <div className="flex items-center justify-center">
              <ProtectedImage
                artworkId={artwork.imageId}
                alt={`${artwork.title} by ${artwork.artist}`}
                width={600}
                height={800}
                className="rounded-lg shadow-2xl max-w-full h-auto"
                priority
              />
            </div>

            {/* Right: Details */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold text-white mb-2">
                  {artwork.title}
                </h2>
                <p className="text-nga-navy text-2xl font-semibold">
                  {artwork.artist}
                </p>
              </div>

              {/* Metadata */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-nga-cream">
                  <div className="w-10 h-10 rounded-full bg-nga-navy flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-nga-green" />
                  </div>
                  <div>
                    <p className="text-sm text-[#f9faf8]/70">Year</p>
                    <p className="text-lg font-semibold">{artwork.year}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-nga-cream">
                  <div className="w-10 h-10 rounded-full bg-nga-navy flex items-center justify-center shrink-0">
                    <Palette className="w-5 h-5 text-nga-green" />
                  </div>
                  <div>
                    <p className="text-sm text-[#f9faf8]/70">Medium</p>
                    <p className="text-lg font-semibold">{artwork.medium}</p>
                  </div>
                </div>

                {artwork.dimensions && (
                  <div className="flex items-center gap-3 text-nga-cream">
                    <div className="w-10 h-10 rounded-full bg-nga-navy flex items-center justify-center shrink-0">
                      <Ruler className="w-5 h-5 text-nga-green" />
                    </div>
                    <div>
                      <p className="text-sm text-nga-cream">Dimensions</p>
                      <p className="text-lg font-semibold">{artwork.dimensions}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="border-t border-[#a8cf45]/20 pt-6">
                <h3 className="text-xl font-bold text-nga-light-green: mb-3">
                  About this artwork
                </h3>
                <p className="text-nga-cream leading-relaxed">
                  {artwork.description}
                </p>
              </div>

              {/* Close Button (bottom) */}
              <button
                onClick={onClose}
                className="btn-primary w-full py-4 text-lg font-bold"
              >
                Close
              </button>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}