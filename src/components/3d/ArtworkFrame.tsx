// src/components/3d/ArtworkFrame.tsx
import { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { Artwork } from '@/src/types/artwork';

interface ArtworkFrameProps {
  artwork: Artwork;
  onClick: (artwork: Artwork) => void;
}

export default function ArtworkFrame({ artwork, onClick }: ArtworkFrameProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Load texture
  const texture = useLoader(THREE.TextureLoader, artwork.imageUrl);

  // Hover animation
  useFrame(() => {
    if (meshRef.current) {
      const targetZ = hovered ? 0.1 : 0;
      meshRef.current.position.z += (targetZ - meshRef.current.position.z) * 0.1;
    }
  });

  return (
    <group 
      position={artwork.position}
      rotation={artwork.rotation}
    >
      {/* Frame */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[artwork.scale + 0.1, artwork.scale + 0.1, 0.05]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Artwork Image */}
      <mesh
        ref={meshRef}
        onClick={() => onClick(artwork)}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'default';
        }}
      >
        <planeGeometry args={[artwork.scale, artwork.scale]} />
        <meshStandardMaterial 
          map={texture} 
          toneMapped={false}
        />
      </mesh>

      {/* Spotlight on artwork */}
      <spotLight
        position={[0, 1, 1]}
        angle={0.3}
        penumbra={0.5}
        intensity={0.5}
        castShadow
        target-position={[0, 0, 0]}
      />
    </group>
  );
}