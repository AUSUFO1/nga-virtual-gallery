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
  title: 'National Gallery of Art - Virtual 3D Gallery',
  description:
    "Explore Nigeria's rich artistic heritage through our immersive Virtual 3D Gallery.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="font-poppins antialiased flex flex-col min-h-screen">
        {children} {/* No Navbar or Footer here */}
      </body>
    </html>
  );
}
