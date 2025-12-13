'use client';

import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import ArtworkFrame3D from './ArtworkFrame3D';
import GalleryUI from './GalleryUI';
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
 * Detect device type for responsive rendering
 */
function useDeviceType() {
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) setDevice('mobile');
      else if (width < 1024) setDevice('tablet');
      else setDevice('desktop');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return device;
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

  // Calculate artwork positions on walls
  function getArtworkPosition(index: number): [number, number, number] {
    const spacing = device === 'mobile' ? 2.5 : 3;
    const wallDepth = device === 'mobile' ? 5 : 7.5;
    const artworksPerWall = device === 'mobile' ? 2 : device === 'tablet' ? 3 : 5;

    // Determine which wall (back, left, right, front)
    const wallIndex = Math.floor(index / artworksPerWall);
    const positionOnWall = index % artworksPerWall;
    const offset = (positionOnWall - (artworksPerWall - 1) / 2) * spacing;

    switch (wallIndex) {
      case 0: // Back wall
        return [offset, 1.6, -wallDepth];
      case 1: // Left wall
        return [-wallDepth, 1.6, offset];
      case 2: // Right wall
        return [wallDepth, 1.6, offset];
      case 3: // Front wall (opposite side)
        return [offset, 1.6, wallDepth];
      default:
        return [0, 1.6, -wallDepth];
    }
  }

  // Get rotation for wall placement
  function getArtworkRotation(index: number): [number, number, number] {
    const artworksPerWall = device === 'mobile' ? 2 : device === 'tablet' ? 3 : 5;
    const wallIndex = Math.floor(index / artworksPerWall);

    switch (wallIndex) {
      case 0: return [0, 0, 0];           // Back wall
      case 1: return [0, Math.PI / 2, 0]; // Left wall
      case 2: return [0, -Math.PI / 2, 0]; // Right wall
      case 3: return [0, Math.PI, 0];     // Front wall
      default: return [0, 0, 0];
    }
  }

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
      <Canvas
        shadows={device === 'desktop'}
        gl={{
          antialias: device !== 'mobile',
          powerPreference: device === 'mobile' ? 'low-power' : 'high-performance',
        }}
        camera={{
          position: [0, 1.6, 5],
          fov: device === 'mobile' ? 60 : 75,
        }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <pointLight position={[-10, 10, -10]} intensity={0.3} />

          {/* Environment (realistic lighting) */}
          <Environment preset="warehouse" />

          {/* Gallery Room */}
          <Room device={device} />

          {/* Artworks */}
          {artworks.map((artwork, index) => (
            <ArtworkFrame3D
              key={artwork.id}
              artwork={artwork}
              imageUrl={artworkUrls[artwork.imageId]}
              position={getArtworkPosition(index)}
              rotation={getArtworkRotation(index)}
              onClick={() => setSelectedArtwork(artwork)}
              device={device}
            />
          ))}

          {/* Camera Controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={device === 'mobile' ? 8 : 15}
            maxPolarAngle={Math.PI / 2}
            target={[0, 1.6, 0]}
          />
        </Suspense>
      </Canvas>

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

/**
 * Gallery Room Walls and Floor
 */
function Room({ device }: { device: string }) {
  const wallDepth = device === 'mobile' ? 6 : 10;
  const roomHeight = 5;

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[wallDepth * 2, wallDepth * 2]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, roomHeight, 0]}>
        <planeGeometry args={[wallDepth * 2, wallDepth * 2]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.9} />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, roomHeight / 2, -wallDepth]} receiveShadow>
        <planeGeometry args={[wallDepth * 2, roomHeight]} />
        <meshStandardMaterial color="#f9faf8" roughness={0.9} />
      </mesh>

      {/* Left Wall */}
      <mesh
        position={[-wallDepth, roomHeight / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[wallDepth * 2, roomHeight]} />
        <meshStandardMaterial color="#f9faf8" roughness={0.9} />
      </mesh>

      {/* Right Wall */}
      <mesh
        position={[wallDepth, roomHeight / 2, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[wallDepth * 2, roomHeight]} />
        <meshStandardMaterial color="#f9faf8" roughness={0.9} />
      </mesh>
    </group>
  );
}