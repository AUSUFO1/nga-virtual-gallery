import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import ArtworkFrame3D from '../ArtworkFrame3D';
import Room from './Room';
import { getArtworkPosition, getArtworkRotation } from './ArtworkPositioning';
import { DeviceType } from './hooks/useDeviceType';

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

interface GalleryCanvasProps {
  artworks: Artwork[];
  artworkUrls: Record<string, string>;
  device: DeviceType;
  onArtworkClick: (artwork: Artwork) => void;
}

/**
 * 3D Canvas component for the gallery
 */
export default function GalleryCanvas({
  artworks,
  artworkUrls,
  device,
  onArtworkClick,
}: GalleryCanvasProps) {
  return (
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
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} castShadow={device === 'desktop'} />
        <pointLight position={[10, 10, 10]} intensity={0.4} />
        <pointLight position={[-10, 10, -10]} intensity={0.3} />
        <hemisphereLight intensity={0.3} groundColor="#1a4d2e" />

        {/* Gallery Room */}
        <Room device={device} />

        {/* Artworks */}
        {artworks.map((artwork, index) => (
          <ArtworkFrame3D
            key={artwork.id}
            artwork={artwork}
            imageUrl={artworkUrls[artwork.imageId]}
            position={getArtworkPosition(index, device)}
            rotation={getArtworkRotation(index, device)}
            onClick={() => onArtworkClick(artwork)}
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
  );
}