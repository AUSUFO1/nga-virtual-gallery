'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, useTexture } from '@react-three/drei';
import { Mesh } from 'three';

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

export default function ArtworkFrame3D({
  artwork,
  imageUrl,
  position,
  rotation,
  onClick,
  device,
}: ArtworkFrame3DProps) {
  const meshRef = useRef<Mesh | null>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!meshRef.current) return;

    const targetScale = hovered ? 1.05 : 1;
    meshRef.current.scale.lerp(
      { x: targetScale, y: targetScale, z: targetScale } as any,
      0.1
    );
  });

  const frameSize: [number, number] =
    device === 'mobile' ? [1, 1.3] : [1.5, 2];

  return (
    <group position={position} rotation={rotation}>
      {/* Frame border */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[frameSize[0] + 0.2, frameSize[1] + 0.2]} />
        <meshStandardMaterial
          color={hovered ? '#a8cf45' : '#8B4513'}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* Image or placeholder */}
      {imageUrl ? (
        <ArtworkImage
          meshRef={meshRef}
          imageUrl={imageUrl}
          frameSize={frameSize}
          onClick={onClick}
          onHoverChange={setHovered}
        />
      ) : (
        <PlaceholderImage
          meshRef={meshRef}
          frameSize={frameSize}
          onClick={onClick}
          onHoverChange={setHovered}
        />
      )}

      {/* Label */}
      {device !== 'mobile' && (
        <Text
          position={[0, -(frameSize[1] / 2 + 0.3), 0.01]}
          fontSize={0.12}
          color={hovered ? '#a8cf45' : '#1a1a1a'}
          anchorX="center"
          anchorY="middle"
          maxWidth={frameSize[0]}
        >
          {artwork.title}
          {'\n'}
          <Text fontSize={0.1} color="#666">
            {artwork.artist}, {artwork.year}
          </Text>
        </Text>
      )}
    </group>
  );
}

/* ================= IMAGE ================= */

function ArtworkImage({
  meshRef,
  imageUrl,
  frameSize,
  onClick,
  onHoverChange,
}: {
  meshRef: React.RefObject<Mesh | null>;
  imageUrl: string;
  frameSize: [number, number];
  onClick: () => void;
  onHoverChange: (hover: boolean) => void;
}) {
  const texture = useTexture(imageUrl);

  return (
    <mesh
      ref={meshRef}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHoverChange(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        onHoverChange(false);
        document.body.style.cursor = 'default';
      }}
    >
      <planeGeometry args={frameSize} />
      <meshStandardMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

/* ================= PLACEHOLDER ================= */

function PlaceholderImage({
  meshRef,
  frameSize,
  onClick,
  onHoverChange,
}: {
  meshRef: React.RefObject<Mesh | null>;
  frameSize: [number, number];
  onClick: () => void;
  onHoverChange: (hover: boolean) => void;
}) {
  return (
    <mesh
      ref={meshRef}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHoverChange(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        onHoverChange(false);
        document.body.style.cursor = 'default';
      }}
    >
      <planeGeometry args={frameSize} />
      <meshStandardMaterial color="#2a2a2a" />
    </mesh>
  );
}
