import { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Mesh, TextureLoader } from 'three';

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

/**
 * Individual 3D Artwork Frame
 * 
 * Displays artwork with frame and label
 */
export default function ArtworkFrame3D({
  artwork,
  imageUrl,
  position,
  rotation,
  onClick,
  device,
}: ArtworkFrame3DProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Load texture if URL available
  const texture = imageUrl ? useLoader(TextureLoader, imageUrl) : null;

  // Hover animation
  useFrame(() => {
    if (meshRef.current && hovered) {
      meshRef.current.scale.lerp({ x: 1.05, y: 1.05, z: 1.05 } as any, 0.1);
    } else if (meshRef.current) {
      meshRef.current.scale.lerp({ x: 1, y: 1, z: 1 } as any, 0.1);
    }
  });

  const frameSize = device === 'mobile' ? [1, 1.3] : [1.5, 2];

  return (
    <group position={position} rotation={rotation}>
      
      {/* Frame Border */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[frameSize[0] + 0.2, frameSize[1] + 0.2]} />
        <meshStandardMaterial 
          color={hovered ? "#a8cf45" : "#8B4513"}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* Artwork Image */}
      <mesh
        ref={meshRef}
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
        <planeGeometry args={frameSize as [number, number]} />
        {texture ? (
          <meshStandardMaterial 
            map={texture} 
            toneMapped={false}
          />
        ) : (
          <meshStandardMaterial color="#1a4d2e" />
        )}
      </mesh>

      {/* Spotlight on artwork */}
      {device !== 'mobile' && (
        <spotLight
          position={[0, 1, 1]}
          angle={0.3}
          penumbra={0.5}
          intensity={hovered ? 1.5 : 0.8}
          castShadow={device === 'desktop'}
        />
      )}

      {/* Artwork Label */}
      {device !== 'mobile' && (
        <Text
          position={[0, -(frameSize[1] / 2 + 0.3), 0.01]}
          fontSize={0.12}
          color={hovered ? "#a8cf45" : "#1a1a1a"}
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

      {/* Watermark overlay */}
      {texture && (
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          rotation={[0, 0, -Math.PI / 6]}
        >
          © NGA
        </Text>
      )}

    </group>
  );
}