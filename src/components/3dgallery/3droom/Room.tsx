'use client';

import { DeviceType } from './hooks/useDeviceType';

interface RoomProps {
  device: DeviceType;
}

/**
 * Gallery Room Shell
 * Professional museum-scale proportions
 */
export default function Room({ device }: RoomProps) {
  /**
   * Room proportions
   * Wider than deep for better 360 rotation
   */
  const roomWidth = device === 'mobile' ? 16 : 24;
  const roomDepth = device === 'mobile' ? 10 : 16;
  const roomHeight = device === 'mobile' ? 4.5 : 5.5;

  /**
   * Wall thickness for realism
   */
  const wallThickness = 0.15;

  return (
    <group>
      {/* FLOOR  */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[roomWidth + 6, roomDepth + 6]} />
        <meshStandardMaterial
          color="#2a2a2a"
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>

      {/*  CEILING  */}
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, roomHeight, 0]}
      >
        <planeGeometry args={[roomWidth, roomDepth]} />
        <meshStandardMaterial
          color="#3b3b3b"
          roughness={0.9}
        />
      </mesh>

      {/* BACK WALL */}
      <mesh
        position={[0, roomHeight / 2, -roomDepth / 2]}
        receiveShadow
      >
        <boxGeometry
          args={[roomWidth, roomHeight, wallThickness]}
        />
        <meshStandardMaterial
          color="#f9faf8"
          roughness={0.9}
        />
      </mesh>

      {/* LEFT WALL */}
      <mesh
        position={[-roomWidth / 2, roomHeight / 2, 0]}
        receiveShadow
      >
        <boxGeometry
          args={[wallThickness, roomHeight, roomDepth]}
        />
        <meshStandardMaterial
          color="#f9faf8"
          roughness={0.9}
        />
      </mesh>

      {/* RIGHT WALL */}
      <mesh
        position={[roomWidth / 2, roomHeight / 2, 0]}
        receiveShadow
      >
        <boxGeometry
          args={[wallThickness, roomHeight, roomDepth]}
        />
        <meshStandardMaterial
          color="#f9faf8"
          roughness={0.9}
        />
      </mesh>
    </group>
  );
}
