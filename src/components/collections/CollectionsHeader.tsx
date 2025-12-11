'use client';

import { motion } from 'framer-motion';

/*
 CollectionsHeader Component
 Displays the main header for collections page
 */
export default function CollectionsHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-nga-navy mb-4">
        Our <span className="text-nga-green">Collections</span>
      </h1>
      <p className="text-black text-lg max-w-2xl mx-auto">
        Explore our complete gallery of Nigerian artworks across various categories and mediums
      </p>
    </motion.div>
  );
}