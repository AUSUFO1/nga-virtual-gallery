'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Logo from '@/public/images/NGA-Logo.png';

export default function LobbyHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="text-center lg:mt-15 mt-5 pt-20 pb-12 px-4"
    >
      {/* NGA Logo */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, type: 'spring', stiffness: 100 }}
        className="flex justify-center mb-8"
      >
        <div className="
          w-32 h-32 md:w-40 md:h-40
          bg-white/10 backdrop-blur-md 
          rounded-full p-6
          shadow-2xl
          border-2 border-[#a8cf45]/30
        ">
          <Image
            src={Logo}
            alt="NGA Logo"
            className="w-full h-full object-contain"
            priority
          />
        </div>
      </motion.div>

      {/* Title */}
      <h1 className="
        text-4xl md:text-6xl lg:text-7xl 
        font-bold 
        text-white 
        mb-4
        drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]
      ">
        Virtual <span className="text-[#a8cf45]">3D Gallery</span>
      </h1>

      {/* Subtitle */}
      <p className="
        text-lg md:text-xl 
        text-[#f9faf8]/90 
        max-w-2xl mx-auto
        drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]
      ">
        Explore Nigeria's artistic heritage in immersive 3D rooms
      </p>

      {/* Decorative Line */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <div className="h-px w-16 bg-linear-to-r from-transparent to-[#a8cf45]" />
        <div className="w-2 h-2 rounded-full bg-[#a8cf45] animate-pulse" />
        <div className="h-px w-16 bg-linear-to-l from-transparent to-[#a8cf45]" />
      </div>
    </motion.div>
  );
}
