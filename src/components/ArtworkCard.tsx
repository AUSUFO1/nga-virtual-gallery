'use client';

import { motion } from 'framer-motion';
import { Eye, Calendar, User, Palette } from 'lucide-react';
import ProtectedImage from './ProtectedImage';

interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: number;
  medium: string;
  dimensions?: string;
  description?: string;
  imageId: string;
}

interface ArtworkCardProps {
  artwork: Artwork;
  index?: number;
  onView?: () => void;
}

/**
 * ArtworkCard Component
 * 
 * Displays individual artwork in grid format
 * Features: smooth hover effects, protected images, metadata display
 */
export default function ArtworkCard({ artwork, index = 0, onView }: ArtworkCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      whileHover={{
        y: -12,
        transition: { duration: 0.3 }
      }}
      className="
        cursor-pointer
        bg-nga-cream
        rounded-2xl
        p-4
        overflow-hidden
        transition-all duration-300
        border-2 border-nga-green/20
        hover:border-nga-green/60
        hover:shadow-[0_20px_50px_rgba(168,207,69,0.25)]
        group
        h-full
        flex flex-col
      "
      onClick={onView}
    >
      {/* Image Section */}
      <div className="relative aspect-3/4 mb-4 overflow-hidden rounded-xl shadow-lg">
        <ProtectedImage
          artworkId={artwork.imageId}
          alt={`${artwork.title} by ${artwork.artist}`}
          width={400}
          height={533}
          className="
            w-full h-full object-cover
            transition-transform duration-700 ease-out
            group-hover:scale-110
          "
        />

        {/* Elegant Hover Overlay */}
        <div
          className="
            absolute inset-0
            bg-linear-to-t from-nga-navy via-nga-navy/60 to-transparent
            opacity-0 
            group-hover:opacity-100
            transition-all duration-400
            flex items-center justify-center
          "
        >
          <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-nga-cream/20 backdrop-blur-sm flex items-center justify-center">
              <Eye className="w-8 h-8 text-nga-cream" />
            </div>
            <p className="text-nga-cream font-bold text-lg tracking-wide">View Details</p>
          </div>
        </div>

        {/* Corner Accent */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-linear-to-br from-nga-green/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info Section */}
      <div className="space-y-3 grow">
        {/* Title */}
        <h3
          className="
            text-xl font-bold 
            text-nga-navy
            group-hover:text-nga-green
            transition-colors duration-300
            line-clamp-2
            leading-snug
          "
        >
          {artwork.title}
        </h3>

        {/* Artist */}
        <div className="flex items-center gap-2.5 text-sm text-nga-navy group-hover:text-nga-green transition-colors">
          <div className="w-8 h-8 rounded-full bg-nga-green/30 flex items-center justify-center shrink-0">
            <User className="w-4 h-4" />
          </div>
          <span className="line-clamp-1 font-medium">{artwork.artist}</span>
        </div>

        {/* Year */}
        <div className="flex items-center gap-2.5 text-sm text-nga-navy group-hover:text-nga-green transition-colors">
          <div className="w-8 h-8 rounded-full bg-nga-green/30 flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <span className="font-medium">{artwork.year}</span>
        </div>

        {/* Medium */}
        <div className="flex items-center gap-2.5 text-sm text-nga-navy group-hover:text-nga-green transition-colors">
          <div className="w-8 h-8 rounded-full bg-nga-green/30 flex items-center justify-center shrink-0">
            <Palette className="w-4 h-4" />
          </div>
          <span className="line-clamp-1 font-medium">{artwork.medium}</span>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="mt-4 h-1 bg-nga-cream" />
    </motion.div>
  );
}