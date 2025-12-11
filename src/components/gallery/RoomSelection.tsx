'use client';

import { motion } from 'framer-motion';
import RoomCard from './RoomCard';

// Update type to use TSX components for icons
interface GalleryRoom {
  id: string;
  label: string;
  Icon: React.ComponentType; // <- TSX component
  category: string;
}

interface RoomSelectionProps {
  galleryRooms: GalleryRoom[];
  roomCounts: Record<string, number>;
  isLoading: boolean;
}

export default function RoomSelection({ galleryRooms, roomCounts, isLoading }: RoomSelectionProps) {
  return (
    <div className="container-custom pb-20 px-4">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-white mb-2">
          Choose Your Gallery Room
        </h2>
        <p className="text-[#f9faf8]/70">
          Select a category to begin your virtual tour
        </p>
      </motion.div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block w-12 h-12 border-4 border-[#a8cf45] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#f9faf8]/70 mt-4">Loading gallery rooms...</p>
        </div>
      )}

      {/* Room Cards Grid */}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryRooms.map((room, index) => (
            <RoomCard
              key={room.id}
              category={room.category}
              Icon={room.Icon}   // <- Pass TSX component
              label={room.label}
              count={roomCounts[room.category] || 0}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}
