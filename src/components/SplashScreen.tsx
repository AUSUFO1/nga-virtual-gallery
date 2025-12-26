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
      setTimeout(onComplete, 800);
    }, 5500);

    return () => clearTimeout(fadeTimer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center 
      transition-opacity duration-1000
      ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ 
        background: 'linear-gradient(135deg, #20a25b 0%, #1a8a4d 50%, #20a25b 100%)'
      }}
    >
      {/* Animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animated-circle circle-1"></div>
        <div className="animated-circle circle-2"></div>
        <div className="animated-circle circle-3"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center px-4 max-w-4xl mx-auto">
        {/* NGA Logo with scale animation */}
        <div className="mb-6 md:mb-8 logo-entrance">
          <Image
            src={Logo}
            alt="NGA Logo"
            className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-2xl"
            priority
          />
        </div>

        {/* Welcome Message */}
        <div className="text-center mb-4 md:mb-6 welcome-fade-in">
          <h1 className="text-2xl md:text-4xl font-bold tracking-wide mb-2 md:mb-4" style={{ color: '#f9faf8' }}>
            Welcome to
          </h1>
          <h2 className="text-xl md:text-5xl font-light tracking-wider md:tracking-widest mb-3 md:mb-4 px-2" style={{ color: '#f9faf8' }}>
            National Gallery of Art
          </h2>
          <div className="mt-3 md:mt-4 h-1 w-32 md:w-40 mx-auto rounded-full" style={{ 
            background: 'linear-gradient(to right, transparent, #a8cf45, #d1e28c, #a8cf45, transparent)'
          }}></div>
        </div>

        {/* Subtitle */}
        <p className="text-lg md:text-2xl opacity-90 mb-6 md:mb-8 subtitle-fade-in text-center" style={{ color: '#f9faf8' }}>
          Virtual Gallery Experience
        </p>

        {/* Loading spinner */}
        <div className="flex items-center justify-center gap-3 md:gap-4 loading-fade-in">
          <div className="relative w-7 h-7 md:w-8 md:h-8 shrink-0">
            <div className="spinner"></div>
          </div>
          <p className="text-base md:text-xl text-center" style={{ color: '#f9faf8' }}>
            Preparing your gallery experience...
          </p>
        </div>
      </div>

      {/* Enhanced animations */}
      <style jsx>{`
        /* Animated circles */
        .animated-circle {
          position: absolute;
          border-radius: 50%;
          border: 2px solid rgba(168, 207, 69, 0.3);
          animation: pulse ease-in-out infinite;
        }
        .circle-1 {
          width: 300px;
          height: 300px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-duration: 4s;
        }
        .circle-2 {
          width: 450px;
          height: 450px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-duration: 5s;
          animation-delay: -1s;
        }
        .circle-3 {
          width: 600px;
          height: 600px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-duration: 6s;
          animation-delay: -2s;
        }

        @keyframes pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.1;
          }
        }

        /* Logo entrance - MORE DRAMATIC */
        .logo-entrance {
          animation: logoScale 1.5s ease-out;
        }
        @keyframes logoScale {
          0% {
            transform: scale(0.2) rotate(-20deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.3) rotate(5deg);
          }
          70% {
            transform: scale(0.9) rotate(-2deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        /* Fade in animations with delays - SLOWER */
        .welcome-fade-in {
          animation: fadeInUp 1.2s ease-out 0.5s both;
        }
        .subtitle-fade-in {
          animation: fadeInUp 1.2s ease-out 1s both;
        }
        .loading-fade-in {
          animation: fadeInUp 1.2s ease-out 1.5s both;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Spinner animation - BIGGER AND SLOWER */
        .spinner {
          width: 100%;
          height: 100%;
          border: 4px solid rgba(209, 226, 140, 0.3);
          border-top: 4px solid rgba(168, 207, 69, 1);
          border-radius: 50%;
          animation: spin 1.5s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}