import React, { Suspense, useState } from 'react';
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

/*
 Safe Environment Loader with Error Boundary
 */
function SafeEnvironment({ device }: { device: DeviceType }) {
  const [envError, setEnvError] = useState(false);

  if (envError || device === 'mobile') {
    // Fallback: Just use standard lighting (no HDR environment)
    return null;
  }

  return (
    <ErrorBoundary onError={() => setEnvError(true)}>
      <Suspense fallback={null}>
        <Environment preset="warehouse" />
      </Suspense>
    </ErrorBoundary>
  );
}

/*
 Simple Error Boundary Component
 */
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: () => void },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('Environment loading failed, using fallback lighting:', error);
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

/*
 3D Canvas component for the gallery
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
        {/* Enhanced Lighting (works offline) */}
        <ambientLight intensity={0.6} />
        
        {/* Main directional light (simulates sun) */}
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={0.8} 
          castShadow={device === 'desktop'}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        
        {/* Fill lights */}
        <pointLight position={[10, 10, 10]} intensity={0.4} color="#ffffff" />
        <pointLight position={[-10, 10, -10]} intensity={0.3} color="#ffffff" />
        <pointLight position={[0, 10, -10]} intensity={0.2} color="#f9faf8" />
        
        {/* Hemisphere light (sky + ground) */}
        <hemisphereLight 
          intensity={0.4} 
          color="#ffffff"
          groundColor="#1a4d2e" 
        />

        {/* Gallery Room */}
        <Room device={device} />

        {/* Optional HDR Environment (only on desktop, with fallback) */}
        {device === 'desktop' && <SafeEnvironment device={device} />}

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