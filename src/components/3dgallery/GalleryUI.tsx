'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Home, Info, X, ZoomIn, Calendar, User, Palette } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: number;
  medium: string;
  description: string;
}

interface GalleryUIProps {
  categoryLabel: string;
  artworkCount: number;
  selectedArtwork: Artwork | null;
  onCloseArtwork: () => void;
  artworkUrl?: string;
}

/**
 * Gallery UI Overlay
 * 
 * Controls, info panels, and artwork details
 */
export default function GalleryUI({
  categoryLabel,
  artworkCount,
  selectedArtwork,
  onCloseArtwork,
  artworkUrl,
}: GalleryUIProps) {
  const router = useRouter();

  return (
    <>
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-linear-to-b from-black/50 to-transparent">
        <div className="container-custom flex items-center justify-between">
          
          {/* Room Title */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
              {categoryLabel}
            </h1>
            <p className="text-[#f9faf8]/80 text-sm">
              {artworkCount} {artworkCount === 1 ? 'artwork' : 'artworks'}
            </p>
          </div>

          {/* Back Button */}
          <button
            onClick={() => router.push('/gallery')}
            className="
              flex items-center gap-2
              bg-[#1a4d2e]/80 backdrop-blur-md
              hover:bg-[#a8cf45]
              text-white hover:text-[#1a1a1a]
              px-4 py-2 rounded-lg
              transition-all duration-300
              border border-[#a8cf45]/30
            "
          >
            <Home className="w-5 h-5" />
            <span className="hidden md:inline">Back to Lobby</span>
          </button>
        </div>
      </div>

      {/* Controls Info (Bottom) */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="
          bg-[#1a4d2e]/80 backdrop-blur-md
          px-4 py-3 rounded-lg
          border border-[#a8cf45]/30
          text-sm text-[#f9faf8]
        ">
          <div className="flex items-center gap-2 mb-1">
            <Info className="w-4 h-4 text-[#a8cf45]" />
            <span className="font-semibold">Controls:</span>
          </div>
          <p className="hidden md:block">Click & drag to look around • Scroll to zoom</p>
          <p className="md:hidden">Touch & drag to explore • Tap artwork to view</p>
        </div>
      </div>

      {/* Artwork Detail Modal */}
      <AnimatePresence>
        {selectedArtwork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={onCloseArtwork}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="
                bg-linear-to-br from-[#1a4d2e] to-[#143d26]
                rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto
                border-2 border-[#a8cf45]/30
              "
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onCloseArtwork}
                className="
                  absolute top-4 right-4 z-10
                  w-10 h-10 rounded-full
                  bg-[#a8cf45] hover:bg-[#d1e28c]
                  transition-colors
                  flex items-center justify-center
                "
              >
                <X className="w-6 h-6 text-[#1a1a1a]" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
                
                {/* Left: Image */}
                <div className="flex items-center justify-center">
                  {artworkUrl ? (
                    <div className="relative">
                      <img
                        src={artworkUrl}
                        alt={selectedArtwork.title}
                        className="rounded-lg shadow-2xl max-w-full h-auto"
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                      />
                      {/* Watermark */}
                      <div className="
                        absolute inset-0 flex items-center justify-center
                        pointer-events-none
                      ">
                        <div className="
                          text-white text-4xl opacity-10 font-bold
                          transform rotate-[-30deg]
                        ">
                          © NGA
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full aspect-3/4 bg-[#20a25b]/20 rounded-lg flex items-center justify-center">
                      <ZoomIn className="w-16 h-16 text-[#a8cf45]/50" />
                    </div>
                  )}
                </div>

                {/* Right: Details */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {selectedArtwork.title}
                    </h2>
                    <p className="text-[#a8cf45] text-xl font-semibold">
                      {selectedArtwork.artist}
                    </p>
                  </div>

                  {/* Metadata */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#20a25b] flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-[#a8cf45]" />
                      </div>
                      <div>
                        <p className="text-sm text-[#f9faf8]/70">Year</p>
                        <p className="text-lg font-semibold text-white">
                          {selectedArtwork.year}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#20a25b] flex items-center justify-center">
                        <Palette className="w-5 h-5 text-[#a8cf45]" />
                      </div>
                      <div>
                        <p className="text-sm text-[#f9faf8]/70">Medium</p>
                        <p className="text-lg font-semibold text-white">
                          {selectedArtwork.medium}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="border-t border-[#a8cf45]/20 pt-6">
                    <h3 className="text-xl font-bold text-[#a8cf45] mb-3">
                      About this artwork
                    </h3>
                    <p className="text-[#f9faf8]/90 leading-relaxed">
                      {selectedArtwork.description}
                    </p>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={onCloseArtwork}
                    className="btn-primary w-full py-3"
                  >
                    Close
                  </button>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}