// src/components/3d/GalleryFloor.tsx
import { useRef } from 'react';
import * as THREE from 'three';

export default function GalleryFloor() {
  const floorRef = useRef<THREE.Mesh>(null);

  return (
    <>
      {/* Main Floor */}
      <mesh 
        ref={floorRef} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial 
          color="#e8e4df"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Ceiling */}
      <mesh 
        rotation={[Math.PI / 2, 0, 0]} 
        position={[0, 4, 0]}
      >
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial 
          color="#ffffff"
          roughness={0.9}
        />
      </mesh>

      {/* Walls */}
      {/* Back Wall */}
      <mesh position={[0, 2, -5]} receiveShadow>
        <boxGeometry args={[20, 4, 0.2]} />
        <meshStandardMaterial color="#f5f5f0" />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-5, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[10, 4, 0.2]} />
        <meshStandardMaterial color="#f5f5f0" />
      </mesh>

      {/* Right Wall */}
      <mesh position={[5, 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[10, 4, 0.2]} />
        <meshStandardMaterial color="#f5f5f0" />
      </mesh>

      {/* Front Wall (with opening) */}
      <mesh position={[0, 2, 5]} receiveShadow>
        <boxGeometry args={[20, 4, 0.2]} />
        <meshStandardMaterial color="#f5f5f0" />
      </mesh>
    </>
  );
}