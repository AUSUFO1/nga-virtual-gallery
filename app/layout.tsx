// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});


export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#20a25b',
};


export const metadata: Metadata = {
  title: {
    default: 'National Gallery of Art | Virtual 3D Gallery',
    template: '%s | National Gallery of Art',
  },
  description:
    "Explore Nigeria’s rich artistic heritage through the National Gallery of Art’s immersive Virtual 3D Gallery.",
  keywords: [
    'National Gallery of Art',
    'Nigeria art',
    'virtual gallery',
    '3D art gallery',
    'digital museum',
    'Nigerian artists',
    'art exhibition',
  ],
  authors: [{ name: 'National Gallery of Art, Nigeria' }],
  creator: 'National Gallery of Art',
  publisher: 'National Gallery of Art',

  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://virtualgallery.nga.gov.ng',
    siteName: 'National Gallery of Art',
    title: 'National Gallery of Art | Virtual 3D Gallery',
    description:
      'Experience Nigeria’s finest artworks in an immersive virtual 3D gallery.',
    images: [
      {
        url: '/og-image.jpg', 
        height: 630,
        alt: 'National Gallery of Art Virtual Gallery',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'National Gallery of Art | Virtual 3D Gallery',
    description:
      'Explore Nigeria’s artistic heritage in an immersive virtual 3D gallery.',
    images: ['/og-image.jpg'],
  },

 
  metadataBase: new URL('https://virtualgallery.nga.gov.ng'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${poppins.variable}`}
      suppressHydrationWarning
    >
      <body
        className="font-poppins antialiased flex flex-col min-h-screen"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
