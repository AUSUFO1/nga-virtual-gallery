
import type { Metadata } from 'next';
import CollectionsContent from './CollectionsContent';

export const metadata: Metadata = {
  title: 'Collections | National Gallery of Art',
  description:
    'Browse the National Gallery of Art’s extensive collection of artworks. Filter by category, view artist details, and explore masterpieces.',
  keywords: [
    'art gallery',
    'art collection',
    'paintings',
    'sculptures',
    'national gallery',
    'artworks',
    'museum',
    'art categories',
    'art exhibition',
  ],
  openGraph: {
    title: 'Collections | National Gallery of Art',
    description:
      'Explore the National Gallery of Art’s curated collection of paintings, sculptures, and other masterpieces. Filter artworks by category and artist.',
    url: 'https://virtualgallery.nga.gov.ng/collections',
    siteName: 'National Gallery of Art',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Collections | National Gallery of Art',
    description:
      'Explore the National Gallery of Art’s curated collection of paintings, sculptures, and other masterpieces.',
  },
};

export default function CollectionsPage() {
  return <CollectionsContent />;
}
