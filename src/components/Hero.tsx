'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-playfair',
  display: 'swap',
});

function AnimatedCounter({ value }: { value: number }) {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate(latest) {
        setDisplay(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [value, count]);

  return <>{display}</>;
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [currentHeadline, setCurrentHeadline] = useState(0);

  const headlines = [
    {
      parts: [
        { text: 'NATIONAL', className: 'text-nga-green' },
        { text: 'GALLERY', className: 'text-nga-cream' },
        { text: 'OF', className: 'text-nga-green' },
        { text: 'ART', className: 'text-nga-cream' },
      ],
    },
    {
      parts: [
        { text: 'PROMOTING', className: 'text-nga-green' },
        { text: 'ART', className: 'text-nga-cream' },
        { text: '& ARTISTS', className: 'text-nga-green' },
      ],
    },
    {
      parts: [
        { text: 'PRESERVING', className: 'text-nga-green' },
        { text: 'CULTURAL', className: 'text-nga-cream' },
        { text: 'HERITAGE', className: 'text-nga-green' },
      ],
    },
  ];

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;

    const timer = setInterval(() => {
      setCurrentHeadline(prev => (prev + 1) % headlines.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <section className="
      relative
      min-h-[55vh]
      sm:min-h-[80vh]
      md:min-h-[50vh]
      lg:min-h-screen
      flex flex-col items-center justify-center
      pt-10 sm:pt-0
      overflow-hidden
      bg-nga-navy text-nga-cream
    ">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/bg-hero.jpeg')" }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/70 to-nga-navy/90" />
        <div className="absolute inset-0 bg-linear-to-t from-transparent via-transparent to-black/40" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto"
      >
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentHeadline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`${playfair.variable} text-xl mt-20 sm:text-3xl md:mt-0 md:text-4xl lg:text-5xl lg:mt-25 font-extrabold leading-tight drop-shadow-[0_6px_30px_rgba(0,0,0,0.8)]`}
          >
            {headlines[currentHeadline].parts.map((part, i) => (
              <span key={i} className={part.className}>{part.text} </span>
            ))}
          </motion.h1>
        </AnimatePresence>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1, delay: 0.3 }}
          className="h-1 max-w-xs mx-auto mt-6 bg-linear-to-r from-transparent via-nga-green to-transparent rounded-full"
        />

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-lg md:text-2xl lg:text-2xl text-nga-cream/90 max-w-3xl mx-auto mt-8 mb-12 px-4 leading-relaxed font-poppins drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]"
        >
          Experience Nigeria's artistic heritage through our immersive virtual gallery — 
          explore curated artworks, discover emerging creators, and connect with 
          centuries of cultural excellence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/gallery" className="group w-full sm:w-auto min-w-[260px] h-14 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 bg-nga-green hover:bg-nga-light-green text-nga-navy shadow-2xl shadow-nga-green/30 hover:shadow-nga-green/50 transition-all duration-300">
              Enter Virtual Gallery
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/collections" className="w-full sm:w-auto min-w-[220px] h-14 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 bg-transparent border-2 border-nga-cream/30 hover:border-nga-green text-nga-cream hover:text-nga-green backdrop-blur-sm transition-all duration-300">
              View Collections
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-8 sm:gap-12 mt-16 pt-8 border-t border-nga-cream/20"
        >
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-nga-green mb-1">
              <AnimatedCounter value={500} />+
            </div>
            <div className="text-sm text-nga-cream/70">Artworks</div>
          </div>

          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-nga-green mb-1">
              <AnimatedCounter value={100} />+
            </div>
            <div className="text-sm text-nga-cream/70">Artists</div>
          </div>

          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-nga-green mb-1">
              <AnimatedCounter value={50} />+
            </div>
            <div className="text-sm text-nga-cream/70">Years Heritage</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
