'use client';

import { useState, useEffect } from 'react';
import GalleryUI from './GalleryUI';
import GalleryCanvas from './3droom/GalleryCanvas';
import { useDeviceType } from './3droom/hooks/useDeviceType';
import { Loader2 } from 'lucide-react';

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

interface GalleryRoom3DProps {
  category: string;
  categoryLabel: string;
}

/**
 * Main 3D Gallery Room Component
 */
export default function GalleryRoom3D({ category, categoryLabel }: GalleryRoom3DProps) {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [artworkUrls, setArtworkUrls] = useState<Record<string, string>>({});
  const [artworkSignedUrls, setArtworkSignedUrls] = useState<Record<string, string>>({});
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const device = useDeviceType();

  // Fetch artworks for this category
  useEffect(() => {
    async function loadGallery() {
      try {
        setIsLoading(true);
        setError(null);

        // 1. Fetch artwork metadata from Supabase (via API)
        const res = await fetch(`/api/artworks?category=${category}&limit=50`);
        
        if (!res.ok) {
          throw new Error('Failed to load artworks');
        }

        const data = await res.json();
        const fetchedArtworks = data.artworks || [];

        // Limit artworks based on device
        const maxArtworks = device === 'mobile' ? 8 : device === 'tablet' ? 12 : 30;
        const limitedArtworks = fetchedArtworks.slice(0, maxArtworks);
        
        setArtworks(limitedArtworks);

        // 2. Use proxy URLs for 3D textures (avoid CORS issues)
        const urls: Record<string, string> = {};
        const signedUrls: Record<string, string> = {};
        
        for (const artwork of limitedArtworks) {
          // Proxy URL for 3D textures
          urls[artwork.imageId] = `/api/artwork/image?id=${artwork.imageId}`;
          
          // Fetch signed URL for modal display (higher quality)
          try {
            const urlRes = await fetch(`/api/artwork?id=${artwork.imageId}`);
            if (urlRes.ok) {
              const urlData = await urlRes.json();
              signedUrls[artwork.imageId] = urlData.url;
            }
          } catch (err) {
            console.error(`Failed to fetch signed URL for ${artwork.imageId}:`, err);
          }
        }

        setArtworkUrls(urls);
        setArtworkSignedUrls(signedUrls);
        setIsLoading(false);
      } catch (err: any) {
        console.error('Error loading gallery:', err);
        setError(err.message);
        setIsLoading(false);
      }
    }

    loadGallery();
  }, [category, device]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-[#20a25b] to-[#1a4d2e] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-[#a8cf45] animate-spin mx-auto mb-4" />
          <p className="text-white text-xl">Loading {categoryLabel}...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-b from-[#20a25b] to-[#1a4d2e] flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Failed to Load Gallery</h2>
          <p className="text-[#f9faf8]/70 mb-8">{error}</p>
          <button onClick={() => window.location.reload()} className="btn-primary">
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (artworks.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-b from-[#20a25b] to-[#1a4d2e] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🎨</div>
          <h2 className="text-3xl font-bold text-white mb-4">No Artworks Yet</h2>
          <p className="text-[#f9faf8]/70 mb-8">
            This gallery room is currently empty. Check back soon!
          </p>
          <a href="/gallery" className="btn-primary">
            ← Back to Lobby
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-linear-to-b from-[#20a25b] to-[#1a4d2e]">
      {/* 3D Canvas */}
      <GalleryCanvas
        artworks={artworks}
        artworkUrls={artworkUrls}
        device={device}
        onArtworkClick={setSelectedArtwork}
      />

      {/* UI Overlay */}
      <GalleryUI
        categoryLabel={categoryLabel}
        artworkCount={artworks.length}
        selectedArtwork={selectedArtwork}
        onCloseArtwork={() => setSelectedArtwork(null)}
        artworkUrl={selectedArtwork ? artworkSignedUrls[selectedArtwork.imageId] : undefined}
      />
    </div>
  );
}