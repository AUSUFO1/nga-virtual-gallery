'use client';

import { motion } from 'framer-motion';
import GalleryRoomSlider from './gallery-slider/GalleryRoomSlider';

// Update type to use TSX components for icons
interface GalleryRoom {
  id: string;
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Updated type
  category: string;
}

interface RoomSelectionProps {
  galleryRooms: GalleryRoom[];
  roomCounts: Record<string, number>;
  isLoading: boolean;
}

export default function RoomSelection({ galleryRooms, roomCounts, isLoading }: RoomSelectionProps) {
  // Transform gallery rooms data for the slider
  const sliderRooms = galleryRooms.map(room => ({
    category: room.category,
    Icon: room.Icon,
    label: room.label,
    count: roomCounts[room.category] || 0,
  }));

  return (
    <div className="w-full pb-20">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center px-4"
      >
        <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-[#f9faf8] mb-4">
          Choose Your Gallery Room
        </h2>
        <p className="text-[#f9faf8]/70 text-base md:text-lg max-w-2xl mx-auto">
          Select a category to begin your virtual tour through Nigeria's finest art collections
        </p>
      </motion.div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-20">
          <div className="inline-block w-16 h-16 border-4 border-[#a8cf45] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#f9faf8]/70 mt-6 text-lg">Loading gallery rooms...</p>
        </div>
      )}

      {/* Gallery Room Slider */}
      {!isLoading && sliderRooms.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <GalleryRoomSlider rooms={sliderRooms} />
        </motion.div>
      )}

      {/* Empty State */}
      {!isLoading && sliderRooms.length === 0 && (
        <div className="text-center py-20 px-4">
          <div className="text-6xl mb-4">🎨</div>
          <h3 className="text-2xl font-bold text-[#f9faf8] mb-2">No Gallery Rooms Available</h3>
          <p className="text-[#f9faf8]/70">Please check back soon for new exhibitions.</p>
        </div>
      )}
    </div>
  );
}