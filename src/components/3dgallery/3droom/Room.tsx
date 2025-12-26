'use client';

import { DeviceType } from './hooks/useDeviceType';

interface RoomProps {
  device: DeviceType;
}

export default function Room({ device }: RoomProps) {

  const roomWidth = device === 'mobile' ? 18 : 24;  // INCREASED mobile width
  const roomDepth = device === 'mobile' ? 12 : 16;  // INCREASED mobile depth
  const roomHeight = device === 'mobile' ? 5 : 5.5;  // INCREASED mobile height


  const wallThickness = 0.15;

  
  const baseboardHeight = 0.15; 
  const crownMoldingHeight = 0.12;  


  const polygonOffset = true;
  const polygonOffsetFactor = 1;

  return (
    <group>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[roomWidth + 6, roomDepth + 6]} />
        <meshStandardMaterial
          color="#3d2f1f"  
          roughness={0.7}   
          metalness={0.1}   
          polygonOffset={polygonOffset} 
          polygonOffsetFactor={polygonOffsetFactor}
        />
      </mesh>

      {/* CEILING - Classic white with subtle texture */}
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, roomHeight, 0]}
      >
        <planeGeometry args={[roomWidth, roomDepth]} />
        <meshStandardMaterial
          color="#f5f5f0"  
          roughness={0.95} 
        />
      </mesh>

      {/* BACK WALL - Classic gallery white */}
      <mesh
        position={[0, roomHeight / 2, -roomDepth / 2]}
        receiveShadow
      >
        <boxGeometry
          args={[roomWidth, roomHeight, wallThickness]}
        />
        <meshStandardMaterial
          color="#fafaf8"  
          roughness={0.92} 
        />
      </mesh>

      {/* LEFT WALL - Classic gallery white */}
      <mesh
        position={[-roomWidth / 2, roomHeight / 2, 0]}
        receiveShadow
      >
        <boxGeometry
          args={[wallThickness, roomHeight, roomDepth]}
        />
        <meshStandardMaterial
          color="#fafaf8"  
          roughness={0.92} 
        />
      </mesh>

      {/* RIGHT WALL - Classic gallery white */}
      <mesh
        position={[roomWidth / 2, roomHeight / 2, 0]}
        receiveShadow
      >
        <boxGeometry
          args={[wallThickness, roomHeight, roomDepth]}
        />
        <meshStandardMaterial
          color="#fafaf8"  
          roughness={0.92} 
        />
      </mesh>

      {/* BASEBOARD - Back Wall - ADDED for classic look */}
      <mesh
        position={[0, baseboardHeight / 2, -roomDepth / 2 + wallThickness / 2]}
      >
        <boxGeometry args={[roomWidth, baseboardHeight, wallThickness / 2]} />
        <meshStandardMaterial
          color="#2a2520"  // Dark wood trim
          roughness={0.6}
          metalness={0.05}
        />
      </mesh>

      {/* BASEBOARD - Left Wall - ADDED for classic look */}
      <mesh
        position={[-roomWidth / 2 + wallThickness / 2, baseboardHeight / 2, 0]}
      >
        <boxGeometry args={[wallThickness / 2, baseboardHeight, roomDepth]} />
        <meshStandardMaterial
          color="#2a2520"  // Dark wood trim
          roughness={0.6}
          metalness={0.05}
        />
      </mesh>

      {/* BASEBOARD - Right Wall - ADDED for classic look */}
      <mesh
        position={[roomWidth / 2 - wallThickness / 2, baseboardHeight / 2, 0]}
      >
        <boxGeometry args={[wallThickness / 2, baseboardHeight, roomDepth]} />
        <meshStandardMaterial
          color="#2a2520"  // Dark wood trim
          roughness={0.6}
          metalness={0.05}
        />
      </mesh>

      {/* CROWN MOLDING - Back Wall - ADDED for classic look */}
      <mesh
        position={[0, roomHeight - crownMoldingHeight / 2, -roomDepth / 2 + wallThickness / 2]}
      >
        <boxGeometry args={[roomWidth, crownMoldingHeight, wallThickness / 2]} />
        <meshStandardMaterial
          color="#e8e6e0"  
          roughness={0.8}
        />
      </mesh>

      {/* CROWN MOLDING - Left Wall - ADDED for classic look */}
      <mesh
        position={[-roomWidth / 2 + wallThickness / 2, roomHeight - crownMoldingHeight / 2, 0]}
      >
        <boxGeometry args={[wallThickness / 2, crownMoldingHeight, roomDepth]} />
        <meshStandardMaterial
          color="#e8e6e0"  
          roughness={0.8}
        />
      </mesh>

      {/* CROWN MOLDING - Right Wall - ADDED for classic look */}
      <mesh
        position={[roomWidth / 2 - wallThickness / 2, roomHeight - crownMoldingHeight / 2, 0]}
      >
        <boxGeometry args={[wallThickness / 2, crownMoldingHeight, roomDepth]} />
        <meshStandardMaterial
          color="#e8e6e0"  
          roughness={0.8}
        />
      </mesh>
    </group>
  );
}