 'use client';
import { DeviceType } from './hooks/useDeviceType';

/*
 Calculate artwork position on walls based on index and device
 */
export function getArtworkPosition(
  index: number, 
  device: DeviceType
): [number, number, number] {
  const spacing = device === 'mobile' ? 2.5 : 3;
  const wallDepth = device === 'mobile' ? 5 : 7.5;
  const artworksPerWall = device === 'mobile' ? 2 : device === 'tablet' ? 3 : 5;

  // Determine which wall (back, left, right, front)
  const wallIndex = Math.floor(index / artworksPerWall);
  const positionOnWall = index % artworksPerWall;
  const offset = (positionOnWall - (artworksPerWall - 1) / 2) * spacing;

  switch (wallIndex) {
    case 0: // Back wall
      return [offset, 1.6, -wallDepth];
    case 1: // Left wall
      return [-wallDepth, 1.6, offset];
    case 2: // Right wall
      return [wallDepth, 1.6, offset];
    case 3: // Front wall (opposite side)
      return [offset, 1.6, wallDepth];
    default:
      return [0, 1.6, -wallDepth];
  }
}

/*
 Get rotation for wall placement based on index and device
 */
export function getArtworkRotation(
  index: number, 
  device: DeviceType
): [number, number, number] {
  const artworksPerWall = device === 'mobile' ? 2 : device === 'tablet' ? 3 : 5;
  const wallIndex = Math.floor(index / artworksPerWall);

  switch (wallIndex) {
    case 0: return [0, 0, 0];           // Back wall
    case 1: return [0, Math.PI / 2, 0]; // Left wall
    case 2: return [0, -Math.PI / 2, 0]; // Right wall
    case 3: return [0, Math.PI, 0];     // Front wall
    default: return [0, 0, 0];
  }
}