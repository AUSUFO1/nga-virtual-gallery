'use client';

import { motion } from 'framer-motion';
import { Filter, Paintbrush, Image, Box, Camera, Scissors, Layers } from 'lucide-react';

export const CATEGORIES = [
  { id: 'all', label: 'All Artworks', icon: Paintbrush },
  { id: 'painting', label: 'Painting', icon: Image },
  { id: 'sculpture', label: 'Sculpture', icon: Box },
  { id: 'photography', label: 'Photography', icon: Camera },
  { id: 'textile', label: 'Textile', icon: Scissors },
  { id: 'mixed-media', label: 'Mixed Media', icon: Layers },
];

interface CategoryFiltersProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  categoryCounts: Record<string, number>;
}

/**
 * CategoryFilters Component
 * 
 * Sleek horizontal category buttons with NGA branding
 */
export default function CategoryFilters({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}: CategoryFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-10"
    >
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-nga-navy flex items-center justify-center">
          <Filter className="w-5 h-5 text-nga-green" />
        </div>
        <h2 className="text-2xl font-bold text-nga-navy">Filter by Category</h2>
      </div>

      {/* Horizontal Scrollable Row */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide py-3 px-1">
        {CATEGORIES.map((category, index) => {
          const count = categoryCounts[category.id] || 0;
          const isActive = selectedCategory === category.id;

          return (
            <CategoryButton
              key={category.id}
              category={category}
              count={count}
              isActive={isActive}
              index={index}
              onClick={() => onSelectCategory(category.id)}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

/**
 * Individual Sleek Category Button
 */
function CategoryButton({
  category,
  count,
  isActive,
  index,
  onClick,
}: {
  category: { id: string; label: string; icon: any };
  count: number;
  isActive: boolean;
  index: number;
  onClick: () => void;
}) {
  const IconComponent = category.icon;

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`
        relative flex items-center gap-3
        min-w-40 px-5 py-3.5
        rounded-2xl transition-all duration-300
        group overflow-hidden
        ${isActive
          ? 'bg-nga-navy shadow-xl shadow-nga-navy/30'
          : 'bg-white border-2 border-nga-navy/10 hover:border-nga-green/50 hover:shadow-lg'}
      `}
    >
      {/* Animated Background Gradient (Active State) */}
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-nga-navy via-nga-green/20 to-nga-navy"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* Content Container */}
      <div className="relative z-10 flex items-center gap-3 w-full">
        {/* Icon Circle */}
        <div className={`
          flex items-center justify-center
          w-10 h-10 rounded-xl
          transition-all duration-300
          ${isActive
            ? 'bg-nga-green shadow-lg shadow-nga-green/30'
            : 'bg-nga-navy/5 group-hover:bg-nga-green/20'}
        `}>
          <IconComponent className={`w-5 h-5 ${isActive ? 'text-nga-navy' : 'text-nga-navy group-hover:text-nga-green'}`} />
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-start flex-1">
          {/* Label */}
          <div className={`text-sm font-bold transition-colors ${isActive ? 'text-nga-cream' : 'text-nga-navy'}`}>
            {category.label}
          </div>

          {/* Count Badge */}
          <div className={`
            text-xs font-semibold mt-0.5
            ${isActive ? 'text-nga-green' : 'text-nga-navy/60 group-hover:text-nga-green'}
          `}>
            {count} {count === 1 ? 'item' : 'items'}
          </div>
        </div>

        {/* Active Indicator Dot */}
        {isActive && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-2 h-2 rounded-full bg-nga-green"
          />
        )}
      </div>

      {/* Hover Glow Effect */}
      {!isActive && (
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-nga-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </motion.button>
  );
}