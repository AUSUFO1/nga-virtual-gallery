 'use client';

import { DeviceType } from './hooks/useDeviceType';

interface RoomProps {
  device: DeviceType;
}

/*
 Gallery Room Walls and Floor
 */
export default function Room({ device }: RoomProps) {
  const wallDepth = device === 'mobile' ? 6 : 10;
  const roomHeight = 5;

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[wallDepth * 2, wallDepth * 2]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, roomHeight, 0]}>
        <planeGeometry args={[wallDepth * 2, wallDepth * 2]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.9} />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, roomHeight / 2, -wallDepth]} receiveShadow>
        <planeGeometry args={[wallDepth * 2, roomHeight]} />
        <meshStandardMaterial color="#f9faf8" roughness={0.9} />
      </mesh>

      {/* Left Wall */}
      <mesh
        position={[-wallDepth, roomHeight / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[wallDepth * 2, roomHeight]} />
        <meshStandardMaterial color="#f9faf8" roughness={0.9} />
      </mesh>

      {/* Right Wall */}
      <mesh
        position={[wallDepth, roomHeight / 2, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[wallDepth * 2, roomHeight]} />
        <meshStandardMaterial color="#f9faf8" roughness={0.9} />
      </mesh>
    </group>
  );
}