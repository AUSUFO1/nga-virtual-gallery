'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [currentHeadline, setCurrentHeadline] = useState(0);

  const headlines = [
    {
      parts: [
        { text: 'NATIONAL', className: 'text-nga-navy' },
        { text: 'GALLERY', className: 'text-nga-cream' },
        { text: 'OF', className: 'text-nga-navy' },
        { text: 'ART', className: 'text-nga-cream' },
      ],
    },
    {
      parts: [
        { text: 'PROMOTING', className: 'text-nga-navy' },
        { text: 'NIGERIAN', className: 'text-nga-cream' },
        { text: 'ART', className: 'text-nga-navy' },
        { text: '& ARTISTS', className: 'text-nga-cream' },
      ],
    },
    {
      parts: [
        { text: 'PRESERVING', className: 'text-nga-navy' },
        { text: 'CULTURAL', className: 'text-nga-cream' },
        { text: 'HERITAGE', className: 'text-nga-navy' },
      ],
    },
  ];

  // Mount checker
  useEffect(() => setMounted(true), []);

  // Headline rotator
  useEffect(() => {
    if (!mounted) return;

    const timer = setInterval(() => {
      setCurrentHeadline(prev => (prev + 1) % headlines.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <section className="relative min-h-[55vh] sm:min-h-screen flex flex-col items-center justify-center pt-20 sm:pt-0 overflow-hidden bg-nga-navy text-nga-cream">

      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/bg-hero.jpeg')" }}
      >
        {/* DARK OVERLAY TO REDUCE DISTRACTION */}
        <div className="absolute inset-0 bg-black/75" />
      </div>

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >

        {/* HEADLINES */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentHeadline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-x5l font-extrabold font-poppins leading-tight drop-shadow-[0_4px_26px_rgba(0,0,0,0.7)]"
          >
            {headlines[currentHeadline].parts.map((part, i) => (
              <span key={i} className={part.className}>{part.text} </span>
            ))}
          </motion.h1>
        </AnimatePresence>

        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-nga-cream/90 max-w-2xl mx-auto mt-6 mb-10 px-4 leading-relaxed font-poppins drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]"
        >
          Experience Nigeria's artistic heritage through our immersive virtual gallery — 
          explore curated artworks, discover emerging creators, and connect with 
          centuries of cultural excellence.
        </motion.p>

        {/* ENTER VIRTUAL GALLERY BUTTON (LINK TO /gallery) */}
        <motion.div
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.94 }}
          className="flex justify-center"
        >
          <Link
            href="/gallery"
            className="
              w-[260px] h-[55px] rounded-xl font-semibold text-lg 
              flex items-center justify-center gap-2
              bg-nga-cream/80 hover:bg-nga-cream text-nga-navy 
              shadow-2xl backdrop-blur-md transition-all duration-300
            "
          >
            Enter Virtual Gallery
            <ArrowRight className="w-5 h-5 text-nga-navy" />
          </Link>
        </motion.div>

      </motion.div>
    </section>
  );
}
