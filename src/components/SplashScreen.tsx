'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Logo from '@/public/images/NGA-Logo.png';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 3000);

    return () => clearTimeout(fadeTimer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center 
      transition-opacity duration-500
      ${isVisible ? 'opacity-100' : 'opacity-0'}
      bg-nga-navy`}
    >
      {/* NGA Logo */}
      <div className="mb-8">
        <Image
          src={Logo}
          alt="NGA Logo"
          className="w-36 h-36 object-contain"
          priority
        />
      </div>

      {/* Title */}
      <h1 className="text-nga-cream text-3xl font-semibold tracking-wide">
        NGA VIRTUAL GALLERY
      </h1>

      {/* Loading text */}
      <p className="text-nga-cream text-lg mt-3 opacity-80 breathing-animation">
        Loading…
      </p>

      {/* Breathing animation */}
      <style jsx>{`
        @keyframes breathing {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .breathing-animation {
          animation: breathing 1500ms ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
