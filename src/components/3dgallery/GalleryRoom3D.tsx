'use client';

import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Loader2 } from 'lucide-react';

import ArtworkFrame3D from './ArtworkFrame3D';
import GalleryUI from './GalleryUI';

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
 * Detect device type
 */
function useDeviceType() {
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 768) setDevice('mobile');
      else if (w < 1024) setDevice('tablet');
      else setDevice('desktop');
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return device;
}

/**
 * Main 3D Gallery Room
 */
export default function GalleryRoom3D({ category, categoryLabel }: GalleryRoom3DProps) {
  const device = useDeviceType();

  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [artworkUrls, setArtworkUrls] = useState<Record<string, string>>({});
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load artworks + signed URLs
   */
  useEffect(() => {
    let cancelled = false;

    async function loadGallery() {
      try {
        setIsLoading(true);
        setError(null);

        // 1. Fetch metadata
        const res = await fetch(`/api/artworks?category=${category}&limit=50`);
        if (!res.ok) throw new Error('Failed to load artworks');

        const data = await res.json();
        const fetched: Artwork[] = data.artworks ?? [];

        const max =
          device === 'mobile' ? 8 :
          device === 'tablet' ? 12 : 30;

        const limited = fetched.slice(0, max);
        if (cancelled) return;

        setArtworks(limited);

        // 2. Fetch signed URLs safely
        const urls: Record<string, string> = {};

        await Promise.all(
          limited.map(async (artwork) => {
            try {
              const urlRes = await fetch(`/api/artwork?id=${artwork.imageId}`);
              if (!urlRes.ok) return;

              const urlData = await urlRes.json();
              if (urlData?.url) {
                urls[artwork.imageId] = urlData.url;
              }
            } catch (err) {
              console.error('Image URL fetch failed:', artwork.imageId, err);
            }
          })
        );

        if (cancelled) return;

        setArtworkUrls(urls);
        setIsLoading(false);
      } catch (err: any) {
        if (cancelled) return;
        console.error(err);
        setError(err.message || 'Something went wrong');
        setIsLoading(false);
      }
    }

    loadGallery();
    return () => {
      cancelled = true;
    };
  }, [category, device]);

  /**
   * Artwork positioning helpers
   */
  function getArtworkPosition(index: number): [number, number, number] {
    const spacing = device === 'mobile' ? 2.5 : 3;
    const depth = device === 'mobile' ? 5 : 7.5;
    const perWall = device === 'mobile' ? 2 : device === 'tablet' ? 3 : 5;

    const wall = Math.floor(index / perWall);
    const pos = index % perWall;
    const offset = (pos - (perWall - 1) / 2) * spacing;

    switch (wall) {
      case 0: return [offset, 1.6, -depth];
      case 1: return [-depth, 1.6, offset];
      case 2: return [depth, 1.6, offset];
      case 3: return [offset, 1.6, depth];
      default: return [0, 1.6, -depth];
    }
  }

  function getArtworkRotation(index: number): [number, number, number] {
    const perWall = device === 'mobile' ? 2 : device === 'tablet' ? 3 : 5;
    const wall = Math.floor(index / perWall);

    switch (wall) {
      case 1: return [0, Math.PI / 2, 0];
      case 2: return [0, -Math.PI / 2, 0];
      case 3: return [0, Math.PI, 0];
      default: return [0, 0, 0];
    }
  }

  /**
   * States
   */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#20a25b] to-[#1a4d2e]">
        <div className="text-center">
          <Loader2 className="w-14 h-14 text-[#a8cf45] animate-spin mx-auto mb-4" />
          <p className="text-white text-xl">Loading {categoryLabel}…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#20a25b] to-[#1a4d2e] px-4">
        <div className="text-center">
          <h2 className="text-3xl text-white font-bold mb-4">Failed to Load Gallery</h2>
          <p className="text-[#f9faf8]/70 mb-6">{error}</p>
          <button className="btn-primary" onClick={() => location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (artworks.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#20a25b] to-[#1a4d2e] px-4">
        <div className="text-center">
          <h2 className="text-3xl text-white font-bold mb-4">No Artworks Yet</h2>
          <p className="text-[#f9faf8]/70 mb-6">This room is currently empty.</p>
          <a href="/gallery" className="btn-primary">← Back to Lobby</a>
        </div>
      </div>
    );
  }

  /**
   * Render
   */
  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-[#20a25b] to-[#1a4d2e]">
      <Canvas
        shadows={device === 'desktop'}
        camera={{
          position: [0, 1.6, 5],
          fov: device === 'mobile' ? 60 : 75,
        }}
        gl={{
          antialias: device !== 'mobile',
          powerPreference: device === 'mobile' ? 'low-power' : 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <pointLight position={[-10, 10, -10]} intensity={0.3} />

          <Environment preset="warehouse" />

          <Room device={device} />

          {artworks
            .filter((a) => artworkUrls[a.imageId])
            .map((artwork, index) => (
              <ArtworkFrame3D
                key={artwork.id}
                artwork={artwork}
                imageUrl={artworkUrls[artwork.imageId]!}
                position={getArtworkPosition(index)}
                rotation={getArtworkRotation(index)}
                onClick={() => setSelectedArtwork(artwork)}
                device={device}
              />
            ))}

          <OrbitControls
            enablePan
            enableZoom
            enableRotate
            minDistance={2}
            maxDistance={device === 'mobile' ? 8 : 15}
            maxPolarAngle={Math.PI / 2}
            target={[0, 1.6, 0]}
          />
        </Suspense>
      </Canvas>

      <GalleryUI
        categoryLabel={categoryLabel}
        artworkCount={artworks.length}
        selectedArtwork={selectedArtwork}
        onCloseArtwork={() => setSelectedArtwork(null)}
        artworkUrl={
          selectedArtwork ? artworkUrls[selectedArtwork.imageId] : undefined
        }
      />
    </div>
  );
}

/**
 * Room geometry
 */
function Room({ device }: { device: string }) {
  const depth = device === 'mobile' ? 6 : 10;
  const height = 5;

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[depth * 2, depth * 2]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.8} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, height, 0]}>
        <planeGeometry args={[depth * 2, depth * 2]} />
        <meshStandardMaterial color="#3a3a3a" />
      </mesh>

      <mesh position={[0, height / 2, -depth]} receiveShadow>
        <planeGeometry args={[depth * 2, height]} />
        <meshStandardMaterial color="#f9faf8" />
      </mesh>

      <mesh position={[-depth, height / 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[depth * 2, height]} />
        <meshStandardMaterial color="#f9faf8" />
      </mesh>

      <mesh position={[depth, height / 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[depth * 2, height]} />
        <meshStandardMaterial color="#f9faf8" />
      </mesh>
    </group>
  );
}
