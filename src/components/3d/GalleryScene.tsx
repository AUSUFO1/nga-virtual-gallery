// src/components/3d/GalleryScene.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import GalleryFloor from './GalleryFloor';
import ArtworkFrame from './ArtworkFrame';
import { Artwork } from '@/src/types/artwork';

interface GallerySceneProps {
  artworks: Artwork[];
  onArtworkClick: (artwork: Artwork) => void;
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function GalleryScene({ artworks, onArtworkClick }: GallerySceneProps) {
  return (
    <div className="w-full h-screen">
      <Canvas shadows>
        {/* Camera */}
        <PerspectiveCamera makeDefault position={[0, 1.6, 8]} fov={75} />
        
        {/* Controls - First Person Style */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
          target={[0, 1.6, 0]}
          minDistance={2}
          maxDistance={15}
        />

        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={0.6}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[0, 3, 0]} intensity={0.3} />

        {/* Gallery Environment */}
        <Suspense fallback={<LoadingFallback />}>
          <GalleryFloor />
          
          {/* Render all artworks */}
          {artworks.map((artwork) => (
            <ArtworkFrame
              key={artwork.id}
              artwork={artwork}
              onClick={onArtworkClick}
            />
          ))}
        </Suspense>

        {/* Fog for atmosphere */}
        <fog attach="fog" args={['#f5f5f0', 10, 30]} />
      </Canvas>
    </div>
  );
}