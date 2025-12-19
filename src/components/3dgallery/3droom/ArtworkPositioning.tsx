'use client';

import { DeviceType } from './hooks/useDeviceType';

/**
 * Central room dimensions (MUST MATCH Room.tsx)
 * Keeping this explicit prevents magic numbers.
 */
const ROOM = {
  mobile: {
    width: 16,
    depth: 10,
    height: 4.5,
  },
  desktop: {
    width: 24,
    depth: 16,
    height: 5.5,
  },
};

/**
 * Distance artwork sits off the wall surface
 * (prevents z-fighting, adds realism)
 */
const WALL_OFFSET = 0.08;

/**
 * Calculate artwork position locked to wall planes
 */
export function getArtworkPosition(
  index: number,
  device: DeviceType
): [number, number, number] {
  const isMobile = device === 'mobile';
  const room = isMobile ? ROOM.mobile : ROOM.desktop;

  const artworksPerWall = isMobile ? 3 : 5;
  const spacing = isMobile ? 2.4 : 3;

  // We only use 3 walls: back, left, right
  const wallIndex = Math.floor(index / artworksPerWall) % 3;
  const positionOnWall = index % artworksPerWall;

  const offset =
    (positionOnWall - (artworksPerWall - 1) / 2) * spacing;

  // Vertical center of wall (museum standard)
  const y = room.height * 0.55;

  switch (wallIndex) {
    case 0: // BACK WALL
      return [
        offset,
        y,
        -room.depth / 2 + WALL_OFFSET,
      ];

    case 1: // LEFT WALL
      return [
        -room.width / 2 + WALL_OFFSET,
        y,
        offset,
      ];

    case 2: // RIGHT WALL
      return [
        room.width / 2 - WALL_OFFSET,
        y,
        offset,
      ];

    default:
      return [0, y, -room.depth / 2];
  }
}

/**
 * Rotation aligned strictly to wall normals
 */
export function getArtworkRotation(
  index: number,
  device: DeviceType
): [number, number, number] {
  const artworksPerWall = device === 'mobile' ? 3 : 5;
  const wallIndex = Math.floor(index / artworksPerWall) % 3;

  switch (wallIndex) {
    case 0:
      return [0, 0, 0]; // Back wall
    case 1:
      return [0, Math.PI / 2, 0]; // Left wall
    case 2:
      return [0, -Math.PI / 2, 0]; // Right wall
    default:
      return [0, 0, 0];
  }
}
