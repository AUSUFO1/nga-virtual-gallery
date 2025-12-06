// src/app/gallery/page.tsx
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { demoArtworks } from '@/src/data/artworks';
import { Artwork } from '@/src/types/artwork';

// Dynamic import with proper typing
const GalleryScene = dynamic(
  () => import('@/src/components/3d/GalleryScene').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Loading Virtual Gallery...</p>
        </div>
      </div>
    ),
  }
) as React.ComponentType<{
  artworks: Artwork[];
  onArtworkClick: (artwork: Artwork) => void;
}>;

export default function GalleryPage() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  const handleArtworkClick = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
  };

  const closeModal = () => {
    setSelectedArtwork(null);
  };

  return (
    <div className="relative">
      {/* 3D Gallery Scene */}
      <GalleryScene 
        artworks={demoArtworks} 
        onArtworkClick={handleArtworkClick}
      />

      {/* Controls Overlay */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs">
        <h3 className="font-bold text-lg mb-2">🎮 Controls</h3>
        <ul className="text-sm space-y-1">
          <li>🖱️ <strong>Left Click + Drag:</strong> Look around</li>
          <li>🖱️ <strong>Right Click + Drag:</strong> Move</li>
          <li>🔍 <strong>Scroll:</strong> Zoom in/out</li>
          <li>🖼️ <strong>Click Artwork:</strong> View details</li>
        </ul>
      </div>

      {/* Title Overlay */}
      <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm p-4 rounded-lg shadow-lg">
        <h1 className="text-white text-2xl font-bold">National Gallery of Art</h1>
        <p className="text-white/80 text-sm">Virtual 3D Exhibition</p>
      </div>

      {/* Artwork Detail Modal */}
      {selectedArtwork && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-3xl font-bold">{selectedArtwork.title}</h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold px-3 hover:bg-gray-100 rounded"
                >
                  ×
                </button>
              </div>
              
              <img 
                src={selectedArtwork.imageUrl} 
                alt={selectedArtwork.title}
                className="w-full h-96 object-contain mb-6 bg-gray-100 rounded"
              />
              
              <div className="space-y-3">
                <p><strong>Artist:</strong> {selectedArtwork.artist}</p>
                <p><strong>Year:</strong> {selectedArtwork.year}</p>
                <p><strong>Medium:</strong> {selectedArtwork.medium}</p>
                <p><strong>Dimensions:</strong> {selectedArtwork.dimensions}</p>
                <p className="text-gray-700 leading-relaxed mt-4">{selectedArtwork.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}