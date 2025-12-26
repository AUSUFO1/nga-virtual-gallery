'use client';

import { useState, useMemo, Suspense } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: number;
}

interface ArtworkFrame3DProps {
  artwork: Artwork;
  imageUrl?: string;
  position: [number, number, number];
  rotation: [number, number, number];
  onClick: () => void;
  device: string;
}

// Separate component for texture loading
function ArtworkTexture({ imageUrl, device }: { imageUrl: string; device: string }) {
  const texture = useTexture(imageUrl);
  
  useMemo(() => {
    if (texture) {
      texture.minFilter = device === 'mobile' ? THREE.LinearFilter : THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = device !== 'mobile'; 
      texture.anisotropy = device === 'mobile' ? 2 : 4; 
      texture.needsUpdate = true; 
    }
  }, [texture, device]);
  
  return (
    <meshStandardMaterial 
      map={texture}
      toneMapped={false} 
      polygonOffset={true} 
      polygonOffsetFactor={-1} 
    />
  );
}

// Fallback material when no image
function FallbackMaterial() {
  return (
    <meshStandardMaterial 
      color="#2a2a2a"
      polygonOffset={true} // ADDED: Consistent offset
      polygonOffsetFactor={-1}
    />
  );
}

export default function ArtworkFrame3D({
  imageUrl,
  position,
  rotation,
  onClick,
  device,
}: ArtworkFrame3DProps) {
  const [hovered, setHovered] = useState(false);

  const artSize: [number, number] =
    device === 'mobile' ? [1.1, 1.4] : [1.5, 2]; // CHANGED: Slightly larger on mobile (was 1, 1.3)

  const FRAME_THICKNESS = 0.08;
  const FRAME_DEPTH = 0.05;

  const FRAME_COLOR = hovered ? '#a8cf45' : '#8B4513';

  return (
    <group position={position} rotation={rotation}>
      {/* FRAME */}
      <group position={[0, 0, 0.01]}>
        {/* Top */}
        <mesh position={[0, artSize[1] / 2 + FRAME_THICKNESS / 2, 0]}>
          <boxGeometry
            args={[artSize[0] + FRAME_THICKNESS * 2, FRAME_THICKNESS, FRAME_DEPTH]}
          />
          <meshStandardMaterial 
            color={FRAME_COLOR} 
            metalness={0.4} 
            roughness={0.3}
            polygonOffset={true} 
            polygonOffsetFactor={1}
          />
        </mesh>

        {/* Bottom */}
        <mesh position={[0, -(artSize[1] / 2 + FRAME_THICKNESS / 2), 0]}>
          <boxGeometry
            args={[artSize[0] + FRAME_THICKNESS * 2, FRAME_THICKNESS, FRAME_DEPTH]}
          />
          <meshStandardMaterial 
            color={FRAME_COLOR} 
            metalness={0.4} 
            roughness={0.3}
            polygonOffset={true} 
            polygonOffsetFactor={1}
          />
        </mesh>

        {/* Left */}
        <mesh position={[-(artSize[0] / 2 + FRAME_THICKNESS / 2), 0, 0]}>
          <boxGeometry
            args={[FRAME_THICKNESS, artSize[1], FRAME_DEPTH]}
          />
          <meshStandardMaterial 
            color={FRAME_COLOR} 
            metalness={0.4} 
            roughness={0.3}
            polygonOffset={true} 
            polygonOffsetFactor={1}
          />
        </mesh>

        {/* Right */}
        <mesh position={[artSize[0] / 2 + FRAME_THICKNESS / 2, 0, 0]}>
          <boxGeometry
            args={[FRAME_THICKNESS, artSize[1], FRAME_DEPTH]}
          />
          <meshStandardMaterial 
            color={FRAME_COLOR} 
            metalness={0.4} 
            roughness={0.3}
            polygonOffset={true} 
            polygonOffsetFactor={1}
          />
        </mesh>
      </group>

      <mesh
        position={[0, 0, 0.025]} 
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'default';
        }}
      >
        <planeGeometry args={artSize} />
        {/* Properly handle texture loading with Suspense */}
        <Suspense fallback={<FallbackMaterial />}>
          {imageUrl ? (
            <ArtworkTexture imageUrl={imageUrl} device={device} />
          ) : (
            <FallbackMaterial />
          )}
        </Suspense>
      </mesh>

      {/* TEMPORARILY DISABLED - Text component causes CSP worker issues */}
      {/* 
      {device !== 'mobile' && (
        <Text
          position={[0, -(artSize[1] / 2 + 0.35), 0.02]}
          fontSize={0.12}
          color={hovered ? '#a8cf45' : '#1a1a1a'}
          anchorX="center"
          anchorY="middle"
          maxWidth={artSize[0]}
        >
          {artwork.title}
          {'\n'}
          <Text fontSize={0.1} color="#666">
            {artwork.artist}, {artwork.year}
          </Text>
        </Text>
      )}
      */}
    </group>
  );
}