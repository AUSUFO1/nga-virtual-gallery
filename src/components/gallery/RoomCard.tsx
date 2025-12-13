'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface RoomCardProps {
  category: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  count: number;
  index: number;
}

export default function RoomCard({ category, Icon, label, count, index }: RoomCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100,
      }}
      whileHover={{
        y: -10,
        scale: 1.05,
        transition: { duration: 0.3 },
      }}
      className="relative"
    >
      <Link href={`/gallery/${category}`}>
        <div className="
          relative overflow-hidden
          bg-linear-to-br from-[#1a4d2e]/70 to-[#143d26]/80
          backdrop-blur-md
          rounded-2xl
          p-8
          border-2 border-[#a8cf45]/30
          shadow-lg
          cursor-pointer
          flex flex-col justify-between
          h-full
          transition-all duration-300
        ">
          {/* Centered Content */}
          <div className="flex flex-col items-center text-center">

            {/* Icon */}
            <motion.div
              className="w-16 h-16 flex items-center justify-center mb-4"
              whileHover={{
                rotate: [0, -10, 10, -10, 0],
                scale: 1.2,
              }}
              transition={{ duration: 0.5 }}
            >
              <Icon className="w-full h-full text-[#a8cf45]" />
            </motion.div>

            {/* Label */}
            <h3 className="text-2xl font-bold text-[#f9faf8] mb-1">
              {label}
            </h3>

            {/* Subtitle */}
            <p className="text-[#f9faf8]/70 text-sm mb-4">
              Gallery Room
            </p>

            {/* Count Badge */}
            <div className="inline-flex items-center gap-2 bg-[#20a25b]/30 backdrop-blur-sm px-4 py-2 rounded-full border border-[#a8cf45]/30 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#a8cf45] animate-pulse" />
              <span className="text-[#f9faf8] font-semibold text-sm">
                {count} {count === 1 ? 'artwork' : 'artworks'}
              </span>
            </div>
          </div>

          {/* CTA Button at bottom */}
          <motion.div
            className="flex items-center justify-between bg-[#a8cf45]/10 backdrop-blur-sm px-5 py-3 rounded-xl border border-[#a8cf45]/30 transition-all duration-300 mt-auto"
            whileHover={{ x: 5 }}
          >
            <span className="text-[#f9faf8] font-bold transition-colors duration-300">
              Enter Room
            </span>
            <ArrowRight className="w-5 h-5 text-[#a8cf45] transition-all duration-300" />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
