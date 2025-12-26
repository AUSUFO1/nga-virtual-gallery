'use client';

import { DeviceType } from './hooks/useDeviceType';

/*
 * Central room dimensions - UPDATED to match Room.tsx
 * Keeping this explicit prevents magic numbers.
 */
const ROOM = {
  mobile: {
    width: 18,   // CHANGED from 16
    depth: 12,   // CHANGED from 10
    height: 5,   // CHANGED from 4.5
  },
  desktop: {
    width: 24,
    depth: 16,
    height: 5.5,
  },
};

// Wall offset to prevent z-fighting
const WALL_OFFSET = 0.08;

/**
 * Calculate artwork position locked to wall planes
 * UPDATED: Mobile now supports 4 artworks per wall for better balance
 */
export function getArtworkPosition(
  index: number,
  device: DeviceType
): [number, number, number] {
  const isMobile = device === 'mobile';
  const room = isMobile ? ROOM.mobile : ROOM.desktop;

  // CHANGED: Mobile now shows 4 artworks per wall instead of 3
  const artworksPerWall = isMobile ? 4 : 5;
  
  // CHANGED: Adjusted spacing for better visual balance
  const spacing = isMobile ? 2.2 : 3;

  // only use 3 walls: back, left, right
  const wallIndex = Math.floor(index / artworksPerWall) % 3;
  const positionOnWall = index % artworksPerWall;

  // Calculate offset from center - IMPROVED for even distribution
  const offset =
    (positionOnWall - (artworksPerWall - 1) / 2) * spacing;

  // Vertical center of wall (museum standard) - ADJUSTED for new room height
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
 * Calculate artwork rotation to face the center of the room
 * No changes needed - rotation logic remains the same
 */
export function getArtworkRotation(
  index: number,
  device: DeviceType
): [number, number, number] {
  // CHANGED: Mobile now uses 4 artworks per wall
  const artworksPerWall = device === 'mobile' ? 4 : 5;
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