'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, Calendar, Palette, Ruler, Building2 } from 'lucide-react';
import ProtectedImage from './ProtectedImage';

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

/*
 ArtworkModal Component
 Full-screen modal displaying artwork details
 IMPROVED: Mobile-optimized layout, zoom functionality, icons restored
 */
export default function ArtworkModal({ artwork, onClose }: ArtworkModalProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isZoomed) {
          setIsZoomed(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose, isZoomed]);

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
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm overflow-y-auto"
        onClick={() => isZoomed ? setIsZoomed(false) : onClose()}
      >
        {/* Fixed Header - Mobile & Desktop */}
        <div className="sticky top-0 z-20 bg-nga-navy/95 backdrop-blur-md border-b border-nga-green/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
            <div className="flex-1 min-w-0 pr-4">
              <h2 className="text-base sm:text-lg font-bold text-nga-cream truncate">
                {artwork.title}
              </h2>
              <p className="text-sm text-nga-green truncate">
                {artwork.artist}
              </p>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-nga-green hover:bg-nga-cream transition-colors flex items-center justify-center"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-nga-navy" />
            </button>
          </div>
        </div>

        {/* Content Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="max-w-7xl mx-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile: Vertical Stack | Desktop: Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 lg:gap-8 lg:p-8">
            
            {/* Image Section - Mobile Full Width, Desktop 3/5 */}
            <div className="lg:col-span-3 bg-nga-navy/50 lg:bg-transparent">
              <div className="sticky top-[73px] sm:top-[81px] lg:static">
                <div 
                  className="relative min-h-[50vh] sm:min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center p-4 sm:p-6 lg:p-8 cursor-zoom-in group"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsZoomed(!isZoomed);
                  }}
                >
                  {/* Zoom Indicator - Hidden on small mobile */}
                  <div className="hidden sm:block absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full text-white text-xs font-medium flex items-center gap-1.5">
                      {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
                      <span className="hidden sm:inline">{isZoomed ? 'Zoom out' : 'Zoom in'}</span>
                    </div>
                  </div>

                  {/* Centered Image with Zoom */}
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: isZoomed ? 1.5 : 1 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="max-w-full max-h-full flex items-center justify-center"
                  >
                    <ProtectedImage
                      artworkId={artwork.imageId}
                      alt={`${artwork.title} by ${artwork.artist}`}
                      width={800}
                      height={1000}
                      className="rounded-lg shadow-2xl max-w-full max-h-[50vh] sm:max-h-[60vh] lg:max-h-[70vh] w-auto h-auto object-contain"
                      priority
                    />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Details Section - Mobile Full Width, Desktop 2/5 */}
            <div className="lg:col-span-2 bg-[#1a4d2e] lg:bg-transparent lg:my-0">
              <div className="p-6 sm:p-8 space-y-6 sm:space-y-8">
                
                {/* Title Section */}
                <div className="space-y-2">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-nga-cream leading-tight">
                    {artwork.title}
                  </h1>
                  <p className="text-xl sm:text-2xl text-nga-green font-semibold">
                    {artwork.artist}
                  </p>
                </div>

                {/* Metadata Grid - Icons Restored */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 border-t border-nga-green/20 pt-6">
                  
                  {/* Year */}
                  <div className="flex items-center gap-3 text-nga-cream">
                    <div className="w-10 h-10 rounded-full bg-nga-green/30 flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5 text-nga-green" />
                    </div>
                    <div>
                      <p className="text-xs text-nga-cream/60 uppercase tracking-wider">Year</p>
                      <p className="text-base sm:text-lg font-semibold">{artwork.year}</p>
                    </div>
                  </div>

                  {/* Medium */}
                  <div className="flex items-center gap-3 text-nga-cream">
                    <div className="w-10 h-10 rounded-full bg-nga-green/30 flex items-center justify-center shrink-0">
                      <Palette className="w-5 h-5 text-nga-green" />
                    </div>
                    <div>
                      <p className="text-xs text-nga-cream/60 uppercase tracking-wider">Medium</p>
                      <p className="text-base sm:text-lg font-semibold">{artwork.medium}</p>
                    </div>
                  </div>

                  {/* Dimensions */}
                  {artwork.dimensions && (
                    <div className="flex items-center gap-3 text-nga-cream">
                      <div className="w-10 h-10 rounded-full bg-nga-green/30 flex items-center justify-center shrink-0">
                        <Ruler className="w-5 h-5 text-nga-green" />
                      </div>
                      <div>
                        <p className="text-xs text-nga-cream/60 uppercase tracking-wider">Dimensions</p>
                        <p className="text-base sm:text-lg font-semibold">{artwork.dimensions}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="border-t border-nga-green/20 pt-6">
                  <h3 className="text-sm font-semibold text-nga-green uppercase tracking-wider mb-3 flex items-center gap-2">
                    About this artwork
                  </h3>
                  <p className="text-nga-cream/90 leading-relaxed text-sm sm:text-base">
                    {artwork.description}
                  </p>
                </div>

                {/* Provenance Section */}
                <div className="border-t border-nga-green/20 pt-6">
                  <h3 className="text-sm font-semibold text-nga-green uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Provenance
                  </h3>
                  <p className="text-nga-cream/90 text-sm sm:text-base">
                    National Gallery of Art Collection
                  </p>
                </div>

                {/* Close Button - Sticky on Mobile */}
                <div className="sticky bottom-0 left-0 right-0 pt-6 pb-2 bg-linear-to-t from-[#1a4d2e] via-[#1a4d2e] to-transparent lg:static lg:bg-none lg:pt-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose();
                    }}
                    className="w-full py-4 text-base sm:text-lg font-bold bg-nga-green text-nga-navy rounded-lg hover:bg-nga-cream transition-colors shadow-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Bottom Padding for Mobile Scroll */}
        <div className="h-20 lg:hidden" />
      </motion.div>
    </AnimatePresence>
  );
}