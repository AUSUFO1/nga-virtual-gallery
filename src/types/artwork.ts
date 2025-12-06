// src/types/artwork.ts

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: string;
  medium: string;
  dimensions: string;
  description: string;
  imageUrl: string;
  category: string;
  position: [number, number, number]; // x, y, z coordinates in 3D space
  rotation: [number, number, number]; // rotation in radians
  scale: number; // size of artwork in gallery
}

export interface GalleryRoom {
  id: string;
  name: string;
  description: string;
  theme: string;
  artworks: Artwork[];
}

export interface CameraState {
  position: [number, number, number];
  rotation: [number, number, number];
}