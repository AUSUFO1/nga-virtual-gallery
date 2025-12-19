'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from '@/src/components/SplashScreen';
import Navbar from '@/src/components/NavBar';
import Hero from '@/src/components/Hero';
import FeaturedCollection from '@/src/components/FeaturedCollection';
import Footer from '@/src/components/Footer';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Prevent scrolling while splash screen is showing
    if (showSplash) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showSplash]);

  return (
    <main className="min-h-screen bg-dark-900">
      {/* Splash Screen */}
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {/* Main Content - Only render after splash is complete */}
      {!showSplash && (
        <>
          <Navbar />
          <Hero />
          <FeaturedCollection />
          <Footer />
        </>
      )}
    </main>
  );
}