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
  artworksPerRoom?: number;
}

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

  useEffect(() => {
    async function loadGallery() {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch(`/api/artworks?category=${category}&limit=100`);
        if (!res.ok) throw new Error('Failed to load artworks');

        const data = await res.json();
        const fetchedArtworks: Artwork[] = data.artworks || [];

        const maxArtworks = device === 'mobile' ? 30 : device === 'tablet' ? 50 : 100;
        const limitedArtworks = fetchedArtworks.slice(0, maxArtworks);

        setArtworks(limitedArtworks);

        // Generate proxy URLs immediately
        const urls: Record<string, string> = {};
        limitedArtworks.forEach(art => {
          urls[art.imageId] = `/api/artwork/image?id=${art.imageId}`;
        });
        setArtworkUrls(urls);

        // Fetch signed URLs in parallel
        const signedUrlPromises = limitedArtworks.map(async (art) => {
          try {
            const signedRes = await fetch(`/api/artwork?id=${art.imageId}`);
            if (signedRes.ok) {
              const signedData = await signedRes.json();
              return { imageId: art.imageId, url: signedData.url };
            }
          } catch (err) {
            console.warn(`Failed to fetch signed URL for ${art.imageId}`, err);
          }
          return null;
        });

        const signedResults = await Promise.all(signedUrlPromises);
        
        const signedUrls: Record<string, string> = {};
        signedResults.forEach(result => {
          if (result) {
            signedUrls[result.imageId] = result.url;
          }
        });

        setArtworkSignedUrls(signedUrls);
        
        // Ensure state propagates before showing canvas
        await new Promise(resolve => setTimeout(resolve, 50));
        
        setIsLoading(false);
        setCurrentRoom(1);
      } catch (err: any) {
        console.error('Error loading gallery:', err);
        setError(err.message);
        setIsLoading(false);
      }
    }

    loadGallery();
  }, [category, device]);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-[#20a25b] to-[#1a4d2e] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-[#a8cf45] animate-spin mx-auto mb-4" />
          <p className="text-white text-xl">Loading {categoryLabel}...</p>
          <p className="text-[#a8cf45] text-sm mt-2">Preparing artworks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-b from-[#20a25b] to-[#1a4d2e] flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Failed to Load Gallery</h2>
          <p className="text-[#f9faf8]/70 mb-8">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-[#a8cf45] text-[#1a4d2e] rounded-lg font-semibold hover:bg-[#c5e86c] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (artworks.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-b from-[#20a25b] to-[#1a4d2e] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🎨</div>
          <h2 className="text-3xl font-bold text-white mb-4">No Artworks Yet</h2>
          <p className="text-[#f9faf8]/70 mb-8">
            This gallery room is currently empty. Check back soon!
          </p>
          <a href="/gallery" className="px-6 py-3 bg-[#a8cf45] text-[#1a4d2e] rounded-lg font-semibold hover:bg-[#c5e86c] transition-colors inline-block">
            ← Back to Lobby
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-linear-to-b from-[#20a25b] to-[#1a4d2e] flex flex-col">
      <div className="px-6 mt-10 py-6 sm:px-6 sm:py-5 md:px-8 md:py-6 lg:py-8 text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold text-center">
        Room {currentRoom} of {totalRooms}
      </div>

      <GalleryCanvas
        key={`room-${currentRoom}`}
        artworks={currentArtworks}
        artworkUrls={artworkUrls}
        device={device}
        onArtworkClick={setSelectedArtwork}
      />

      <GalleryUI
        categoryLabel={categoryLabel}
        artworkCount={currentArtworks.length}
        selectedArtwork={selectedArtwork}
        onCloseArtwork={() => setSelectedArtwork(null)}
        artworkUrl={selectedArtwork ? artworkSignedUrls[selectedArtwork.imageId] : undefined}
      />

      <div className="w-full px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-10 lg:py-8">
        <div className="flex flex-col mb-40 md:mb-50 lg:mb-2 sm:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-6 text-white">
          <button
            onClick={handlePrevious}
            disabled={currentRoom === 1}
            className="w-full sm:w-auto min-w-[120px] 
                     px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-3 
                     text-sm sm:text-base md:text-lg font-semibold
                     bg-[#1a4d2e] rounded-lg hover:bg-[#20a25b] 
                     disabled:opacity-40 disabled:cursor-not-allowed 
                     transition-all duration-200 shadow-lg hover:shadow-xl
                     active:scale-95"
          >
            &larr; Previous
          </button>

          <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold whitespace-nowrap px-2">
            Room {currentRoom} of {totalRooms}
          </span>

          <button
            onClick={handleNext}
            disabled={currentRoom === totalRooms}
            className="w-full sm:w-auto min-w-[120px] 
                     px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-3 
                     text-sm sm:text-base md:text-lg font-semibold
                     bg-[#1a4d2e] rounded-lg hover:bg-[#20a25b] 
                     disabled:opacity-40 disabled:cursor-not-allowed 
                     transition-all duration-200 shadow-lg hover:shadow-xl
                     active:scale-95"
          >
            Next &rarr;
          </button>
        </div>

        <div className="hidden sm:flex justify-center mt-3 md:mt-4">
          <p className="text-white/60 text-xs sm:text-sm md:text-base">
            Viewing {currentArtworks.length} of {artworks.length} artworks
          </p>
        </div>
      </div>
    </div>
  );
}