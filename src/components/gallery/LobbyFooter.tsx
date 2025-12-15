'use client';

import { motion } from 'framer-motion';

export default function LobbyFooter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="text-center mt-6 pb-5"
    >
      <a 
        href="/collections"
        className="
          inline-flex items-center gap-2
          text-[#f9faf8] hover:text-[#a8cf45]
          font-bold text-2xl
          transition-colors duration-300
          group
        "
      >
        <span>Or browse all artworks in grid view</span>
        <svg 
          className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </a>
    </motion.div>
  );
}
