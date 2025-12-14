'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import RoomSliderCard from './RoomSliderCard';

interface Room {
  category: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  count: number;
}

interface GalleryRoomSliderProps {
  rooms: Room[];
}

export default function GalleryRoomSlider({ rooms }: GalleryRoomSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const getPosition = (index: number) => {
    const diff = index - currentIndex;
    if (diff === 0) return 'center';
    if (diff === -1 || diff === rooms.length - 1) return 'left';
    if (diff === 1 || diff === -rooms.length + 1) return 'right';
    return 'hidden';
  };

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % rooms.length);
  }, [rooms.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + rooms.length) % rooms.length);
  }, [rooms.length]);

  const handleDragEnd = useCallback((event: any, info: any) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      goToPrev();
    } else if (info.offset.x < -threshold) {
      goToNext();
    }
  }, [goToNext, goToPrev]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      goToNext();
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  return (
    <div className="w-full py-12 md:py-20">
      {/* Slider Container */}
      <div className="relative w-full h-[400px] md:h-[450px] flex items-center justify-center px-4">
        {/* Cards */}
        {rooms.map((room, index) => (
          <RoomSliderCard
            key={room.category}
            category={room.category}
            Icon={room.Icon}
            label={room.label}
            count={room.count}
            position={getPosition(index)}
            onDragEnd={handleDragEnd}
            onClick={() => {
              const position = getPosition(index);
              if (position === 'left') goToPrev();
              if (position === 'right') goToNext();
            }}
          />
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-6 mt-8">
        {/* Previous Button */}
        <button
          onClick={goToPrev}
          className="w-12 h-12 flex items-center justify-center rounded-full 
            bg-linear-to-br from-[#1a4d2e]/80 to-[#143d26]/90
            border-2 border-[#a8cf45]/30
            hover:border-[#a8cf45]/60
            hover:scale-110
            transition-all duration-300
            shadow-lg hover:shadow-[#a8cf45]/20"
          aria-label="Previous room"
        >
          <ChevronLeft className="w-6 h-6 text-[#a8cf45]" />
        </button>

        {/* Indicator Dots */}
        <div className="flex items-center gap-2">
          {rooms.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="group relative"
              aria-label={`Go to room ${index + 1}`}
            >
              <div
                className={`rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-10 h-3 bg-[#a8cf45]'
                    : 'w-3 h-3 bg-[#a8cf45]/40 hover:bg-[#a8cf45]/60'
                }`}
              />
              {index === currentIndex && (
                <div className="absolute inset-0 rounded-full bg-[#a8cf45] blur-md opacity-50" />
              )}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={goToNext}
          className="w-12 h-12 flex items-center justify-center rounded-full 
            bg-linear-to-br from-[#1a4d2e]/80 to-[#143d26]/90
            border-2 border-[#a8cf45]/30
            hover:border-[#a8cf45]/60
            hover:scale-110
            transition-all duration-300
            shadow-lg hover:shadow-[#a8cf45]/20"
          aria-label="Next room"
        >
          <ChevronRight className="w-6 h-6 text-[#a8cf45]" />
        </button>
      </div>

      {/* Play/Pause Control */}
      <div className="flex items-center justify-center mt-6">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="flex items-center gap-2 px-4 py-2 rounded-full
            bg-linear-to-br from-[#1a4d2e]/60 to-[#143d26]/70
            border border-[#a8cf45]/30
            hover:border-[#a8cf45]/50
            transition-all duration-300
            text-[#f9faf8] text-sm font-medium"
        >
          {isPaused ? (
            <>
              <Play className="w-4 h-4 text-[#a8cf45]" />
              <span>Play Auto-Slide</span>
            </>
          ) : (
            <>
              <Pause className="w-4 h-4 text-[#a8cf45]" />
              <span>Pause Auto-Slide</span>
            </>
          )}
        </button>
      </div>

      {/* Keyboard Instructions */}
      <div className="text-center mt-6 px-4">
        <p className="text-[#f9faf8]/50 text-xs md:text-sm">
          Use arrow keys or swipe to navigate • Click side cards to navigate
        </p>
      </div>
    </div>
  );
}