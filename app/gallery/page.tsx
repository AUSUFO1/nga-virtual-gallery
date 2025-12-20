import type { Metadata } from 'next';
import GalleryLobbyClient from './GalleryLobbyClient';

export const metadata: Metadata = {
  title: 'Virtual Gallery Lobby',
  description:
    'Enter the National Gallery of Art virtual lobby and explore curated rooms for paintings, sculptures, photography, textiles, and mixed media.',
  openGraph: {
    title: 'NGA Virtual Gallery Lobby',
    description:
      'Choose an exhibition room and experience art in our immersive 3D virtual gallery.',
    images: ['/images/bg-hero1.jpg'], 
  },
};

export default function GalleryPage() {
  return <GalleryLobbyClient />;
}
