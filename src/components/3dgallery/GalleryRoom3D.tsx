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
  artworksPerRoom?: number; // optional, default 15
}

/*
 * Main 3D Gallery Room Component with Pagination
 */
export default function GalleryRoom3D({
  category,
  categoryLabel,
  artworksPerRoom = 15,
}: GalleryRoom3DProps) {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [artworkUrls, setArtworkUrls] = useState<Record<string, string>>({});
  const [artworkSignedUrls, setArtworkSignedUrls] = useState<Record<string, string>>({});
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [currentRoom, setCurrentRoom] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const device = useDeviceType();

  // Fetch artworks for this category
  useEffect(() => {
    async function loadGallery() {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch(`/api/artworks?category=${category}&limit=100`);
        if (!res.ok) throw new Error('Failed to load artworks');

        const data = await res.json();
        const fetchedArtworks: Artwork[] = data.artworks || [];

        // Limit artworks per device (optional)
        const maxArtworks = device === 'mobile' ? 30 : device === 'tablet' ? 50 : 100;
        const limitedArtworks = fetchedArtworks.slice(0, maxArtworks);

        setArtworks(limitedArtworks);

        // Proxy URLs for 3D textures and signed URLs
        const urls: Record<string, string> = {};
        const signedUrls: Record<string, string> = {};

        for (const art of limitedArtworks) {
          urls[art.imageId] = `/api/artwork/image?id=${art.imageId}`;
          try {
            const signedRes = await fetch(`/api/artwork?id=${art.imageId}`);
            if (signedRes.ok) {
              const signedData = await signedRes.json();
              signedUrls[art.imageId] = signedData.url;
            }
          } catch (err) {
            console.error(`Failed to fetch signed URL for ${art.imageId}`, err);
          }
        }

        setArtworkUrls(urls);
        setArtworkSignedUrls(signedUrls);
        setIsLoading(false);
        setCurrentRoom(1); // reset to room 1 on category change
      } catch (err: any) {
        console.error('Error loading gallery:', err);
        setError(err.message);
        setIsLoading(false);
      }
    }

    loadGallery();
  }, [category, device]);

  // Pagination logic
  const totalRooms = Math.ceil(artworks.length / artworksPerRoom);
  const currentArtworks = artworks.slice(
    (currentRoom - 1) * artworksPerRoom,
    currentRoom * artworksPerRoom
  );

  const handleNext = () => {
    if (currentRoom < totalRooms) setCurrentRoom(currentRoom + 1);
  };

  const handlePrevious = () => {
    if (currentRoom > 1) setCurrentRoom(currentRoom - 1);
  };

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

  // Main 3D room render
  return (
    <div className="relative w-full h-screen bg-linear-to-b from-[#20a25b] to-[#1a4d2e] flex flex-col">
      {/* Room Header with Pagination */}
      <div className="p-8 text-white text-lg md:text-xl font-bold text-center">
        {categoryLabel} - Room {currentRoom} of {totalRooms}
      </div>

      {/* 3D Canvas */}
      <GalleryCanvas
        artworks={currentArtworks}
        artworkUrls={artworkUrls}
        device={device}
        onArtworkClick={setSelectedArtwork}
      />

      {/* UI Overlay */}
      <GalleryUI
        categoryLabel={categoryLabel}
        artworkCount={currentArtworks.length}
        selectedArtwork={selectedArtwork}
        onCloseArtwork={() => setSelectedArtwork(null)}
        artworkUrl={selectedArtwork ? artworkSignedUrls[selectedArtwork.imageId] : undefined}
      />

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 py-4 text-white font-semibold">
        <button
          onClick={handlePrevious}
          disabled={currentRoom === 1}
          className="px-4 py-2 bg-[#1a4d2e] rounded hover:bg-[#20a25b] disabled:opacity-50 transition-colors"
        >
          &lt; Previous
        </button>
        <span>
          Room {currentRoom} of {totalRooms}
        </span>
        <button
          onClick={handleNext}
          disabled={currentRoom === totalRooms}
          className="px-4 py-2 bg-[#1a4d2e] rounded hover:bg-[#20a25b] disabled:opacity-50 transition-colors"
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
}
