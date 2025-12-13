'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface RoomSliderCardProps {
  category: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  count: number;
  position: string;
  onDragStart?: any;
  onDragEnd?: any;
  onClick?: any;
}

export default function RoomSliderCard({
  category,
  Icon,
  label,
  count,
  position,
  onDragStart,
  onDragEnd,
  onClick,
}: RoomSliderCardProps) {
  const getCardStyles = () => {
    switch (position) {
      case 'center':
        return {
          scale: 1,
          x: '0%',
          opacity: 1,
          zIndex: 30,
          width: '90%',
          maxWidth: '500px',
          height: '340px',
        };
      case 'left':
        return {
          scale: 0.8,
          x: '-110%',
          opacity: 0.6,
          zIndex: 10,
          width: '75%',
          maxWidth: '400px',
          height: '300px',
        };
      case 'right':
        return {
          scale: 0.8,
          x: '110%',
          opacity: 0.6,
          zIndex: 10,
          width: '75%',
          maxWidth: '400px',
          height: '300px',
        };
      default:
        return {
          scale: 0.6,
          x: '0%',
          opacity: 0,
          zIndex: 0,
          width: '75%',
          maxWidth: '400px',
          height: '300px',
        };
    }
  };

  const styles = getCardStyles();
  const isActive = position === 'center';

  return (
    <motion.div
      drag={isActive ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      animate={styles}
      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      className="absolute cursor-pointer"
      style={{
        width: styles.width,
        maxWidth: styles.maxWidth,
        height: styles.height,
        pointerEvents: position === 'hidden' ? 'none' : 'auto',
      }}
    >
      {/* CARD SHELL */}
      <motion.div
        whileHover={isActive ? { scale: 1.02, y: -6 } : {}}
        className="relative w-full h-full overflow-hidden rounded-3xl"
        style={{
          background:
            'linear-gradient(135deg, rgba(26, 77, 46, 0.85) 0%, rgba(20, 61, 38, 0.90) 50%, rgba(15, 45, 26, 0.95) 100%)',
          backdropFilter: 'blur(12px)',
          border: isActive
            ? '2px solid rgba(168, 207, 69, 0.5)'
            : '2px solid rgba(168, 207, 69, 0.2)',
          boxShadow: isActive
            ? '0 20px 60px rgba(168, 207, 69, 0.25)'
            : '0 10px 30px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* CONTENT */}
        <div className="relative z-10 flex flex-col h-full px-6 py-7 text-center">

          {/* TOP */}
          <div className="flex flex-col items-center">
            <div className="mb-5 flex items-center justify-center w-24 h-24 rounded-2xl bg-linear-to-br from-[#a8cf45]/30 to-[#20a25b]/30 border border-[#a8cf45]/40">
              <Icon className="w-12 h-12 text-[#a8cf45]" />
            </div>

            <p className="text-xs uppercase tracking-widest text-[#a8cf45] mb-2">
              Gallery Room
            </p>

            <h3 className="text-xl md:text-2xl font-bold text-[#f9faf8]">
              {label}
            </h3>
          </div>

          {/* COUNT */}
          <div className="mt-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#20a25b]/30 border border-[#a8cf45]/40">
              <span className="w-2 h-2 rounded-full bg-[#a8cf45]" />
              <span className="text-sm text-[#f9faf8] font-semibold">
                {count} {count === 1 ? 'Artwork' : 'Artworks'}
              </span>
            </div>
          </div>

          {/* CTA — PUSHED TO BOTTOM SAFELY */}
          {isActive && (
            <div className="mt-auto pt-5">
              <Link href={`/gallery/${category}`} className="block">
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between px-5 py-3 rounded-xl bg-linear-to-br from-[#a8cf45]/25 to-[#a8cf45]/15 border border-[#a8cf45]/50"
                >
                  <span className="font-semibold text-[#f9faf8]">
                    Enter Room
                  </span>
                  <ArrowRight className="w-5 h-5 text-[#a8cf45]" />
                </motion.div>
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
