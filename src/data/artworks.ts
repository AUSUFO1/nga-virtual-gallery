// src/data/artworks.ts
import { Artwork, GalleryRoom } from '../types/artwork';
// Demo artworks - will be replaced with real NGA content
export const demoArtworks: Artwork[] = [
  {
    id: 'art-001',
    title: 'Nigerian Landscape',
    artist: 'Artist Name',
    year: '2020',
    medium: 'Oil on Canvas',
    dimensions: '120 x 90 cm',
    description: 'A stunning depiction of the Nigerian countryside, capturing the vibrant colors and rich textures of our natural heritage.',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800',
    category: 'Landscape',
    position: [-4, 1.5, -4.9],
    rotation: [0, 0, 0],
    scale: 1.2
  },
  {
    id: 'art-002',
    title: 'Cultural Heritage',
    artist: 'Artist Name',
    year: '2019',
    medium: 'Acrylic on Canvas',
    dimensions: '100 x 80 cm',
    description: 'An exploration of Nigerian cultural symbols and traditional patterns, reimagined through contemporary artistic vision.',
    imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800',
    category: 'Abstract',
    position: [0, 1.5, -4.9],
    rotation: [0, 0, 0],
    scale: 1.2
  },
  {
    id: 'art-003',
    title: 'Unity in Diversity',
    artist: 'Artist Name',
    year: '2021',
    medium: 'Mixed Media',
    dimensions: '150 x 100 cm',
    description: 'A powerful representation of Nigeria\'s diverse ethnic groups united in harmony and mutual respect.',
    imageUrl: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800',
    category: 'Contemporary',
    position: [4, 1.5, -4.9],
    rotation: [0, 0, 0],
    scale: 1.2
  },
  {
    id: 'art-004',
    title: 'Urban Stories',
    artist: 'Artist Name',
    year: '2022',
    medium: 'Digital Art Print',
    dimensions: '90 x 120 cm',
    description: 'Modern Nigerian city life captured through bold colors and dynamic composition.',
    imageUrl: 'https://images.unsplash.com/photo-1578926314433-e2789279f4aa?w=800',
    category: 'Modern',
    position: [-4, 1.5, 0],
    rotation: [0, Math.PI / 2, 0],
    scale: 1.2
  },
  {
    id: 'art-005',
    title: 'Ancestral Wisdom',
    artist: 'Artist Name',
    year: '2018',
    medium: 'Oil on Canvas',
    dimensions: '110 x 85 cm',
    description: 'A tribute to the wisdom and knowledge passed down through generations of Nigerian ancestors.',
    imageUrl: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800',
    category: 'Portrait',
    position: [4, 1.5, 0],
    rotation: [0, -Math.PI / 2, 0],
    scale: 1.2
  }
];

export const galleryRooms: GalleryRoom[] = [
  {
    id: 'room-001',
    name: 'Main Exhibition Hall',
    description: 'Contemporary Nigerian Art Collection',
    theme: 'contemporary',
    artworks: demoArtworks
  }
];

export const defaultRoom = galleryRooms[0];