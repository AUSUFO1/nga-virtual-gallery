'use client';

import { useState } from 'react';
import { Text, useTexture } from '@react-three/drei';

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
  const [hovered, setHovered] = useState(false);

  const artSize: [number, number] =
    device === 'mobile' ? [1, 1.3] : [1.5, 2];

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
          <meshStandardMaterial color={FRAME_COLOR} metalness={0.4} roughness={0.3} />
        </mesh>

        {/* Bottom */}
        <mesh position={[0, -(artSize[1] / 2 + FRAME_THICKNESS / 2), 0]}>
          <boxGeometry
            args={[artSize[0] + FRAME_THICKNESS * 2, FRAME_THICKNESS, FRAME_DEPTH]}
          />
          <meshStandardMaterial color={FRAME_COLOR} metalness={0.4} roughness={0.3} />
        </mesh>

        {/* Left */}
        <mesh position={[-(artSize[0] / 2 + FRAME_THICKNESS / 2), 0, 0]}>
          <boxGeometry
            args={[FRAME_THICKNESS, artSize[1], FRAME_DEPTH]}
          />
          <meshStandardMaterial color={FRAME_COLOR} metalness={0.4} roughness={0.3} />
        </mesh>

        {/* Right */}
        <mesh position={[artSize[0] / 2 + FRAME_THICKNESS / 2, 0, 0]}>
          <boxGeometry
            args={[FRAME_THICKNESS, artSize[1], FRAME_DEPTH]}
          />
          <meshStandardMaterial color={FRAME_COLOR} metalness={0.4} roughness={0.3} />
        </mesh>
      </group>

      {/* ARTWORK */}
      <mesh
        position={[0, 0, 0.02]}
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
        <meshStandardMaterial
          map={imageUrl ? useTexture(imageUrl) : undefined}
          color={imageUrl ? '#ffffff' : '#2a2a2a'}
        />
      </mesh>

      {/* ================= LABEL ================= */}
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
    </group>
  );
}
