import React, { Suspense, useState, useEffect } from 'react';
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

function GalleryLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-linear-to-b from-[#20a25b] to-[#1a4d2e] z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#a8cf45] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-lg">Preparing Gallery...</p>
        <p className="text-[#a8cf45] text-sm mt-2">Loading artworks</p>
      </div>
    </div>
  );
}

function SafeEnvironment({ device }: { device: DeviceType }) {
  const [envError, setEnvError] = useState(false);

  if (envError) return null;

  return (
    <ErrorBoundary onError={() => setEnvError(true)}>
      <Suspense fallback={null}>
        <Environment preset="warehouse" />
      </Suspense>
    </ErrorBoundary>
  );
}

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
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export default function GalleryCanvas({
  artworks,
  artworkUrls,
  device,
  onArtworkClick,
}: GalleryCanvasProps) {
  const [canRender, setCanRender] = useState(false);
  const canvasKey = React.useRef(Math.random()).current;

  useEffect(() => {
    setCanRender(false);
    
    if (artworks.length > 0 && Object.keys(artworkUrls).length > 0) {
      const hasMatchingUrls = artworks.some(artwork => 
        artworkUrls[artwork.imageId]
      );
      
      if (hasMatchingUrls) {
        const timer = setTimeout(() => setCanRender(true), 300);
        return () => clearTimeout(timer);
      }
    }
  }, [artworks, artworkUrls]);

  if (!canRender) {
    return <GalleryLoader />;
  }

  return (
    <Canvas
      key={canvasKey}
      shadows={device === 'desktop'}
      dpr={[1, device === 'desktop' ? 2 : 1]}
      gl={{
        antialias: device !== 'mobile',
        powerPreference: device === 'mobile' ? 'low-power' : 'high-performance',
        alpha: false,
        preserveDrawingBuffer: false,
        failIfMajorPerformanceCaveat: false,
      }}
      camera={{
        position: [0, 1.6, 5],
        fov: device === 'mobile' ? 60 : 75,
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={0.8} 
          castShadow={device === 'desktop'}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        
        <pointLight position={[10, 10, 10]} intensity={0.4} color="#ffffff" />
        <pointLight position={[-10, 10, -10]} intensity={0.3} color="#ffffff" />
        <pointLight position={[0, 10, -10]} intensity={0.2} color="#f9faf8" />
        
        <hemisphereLight 
          intensity={0.4} 
          color="#ffffff"
          groundColor="#1a4d2e" 
        />

        <Room device={device} />
        <SafeEnvironment device={device} />

        {artworks.map((artwork, index) => {
          const imageUrl = artworkUrls[artwork.imageId];
          if (!imageUrl) return null;
          
          return (
            <ArtworkFrame3D
              key={artwork.id}
              artwork={artwork}
              imageUrl={imageUrl}
              position={getArtworkPosition(index, device)}
              rotation={getArtworkRotation(index, device)}
              onClick={() => onArtworkClick(artwork)}
              device={device}
            />
          );
        })}

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={1}
          maxDistance={device === 'mobile' ? 8 : 10}
          maxPolarAngle={Math.PI / 2}
          target={[0, 1.6, 0]}
        />
      </Suspense>
    </Canvas>
  );
}