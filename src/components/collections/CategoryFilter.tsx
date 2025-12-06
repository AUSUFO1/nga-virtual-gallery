'use client';

import { motion } from 'framer-motion';
import { Filter, Paintbrush, Image, Box, Camera, Scissors, Layers, Sparkle, Archive } from 'lucide-react';

export const CATEGORIES = [
  { id: 'all', label: 'All Artworks', icon: Paintbrush },
  { id: 'painting', label: 'Painting', icon: Image },
  { id: 'sculpture', label: 'Sculpture', icon: Box },
  { id: 'photography', label: 'Photography', icon: Camera },
  { id: 'textile', label: 'Textile', icon: Scissors },
  { id: 'mixed-media', label: 'Mixed Media', icon: Layers },
  { id: 'contemporary', label: 'Contemporary', icon: Sparkle },
  { id: 'traditional', label: 'Traditional', icon: Archive },
];

interface CategoryFiltersProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  categoryCounts: Record<string, number>;
}

/**
 * CategoryFilters Component
 * 
 * Horizontal scrollable category buttons
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
      className="mb-8"
    >
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-4">
        <Filter className="w-5 h-5 text-nga-navy" />
        <h2 className="text-xl font-bold text-nga-navy">Filter by Category</h2>
      </div>

      {/* Horizontal Scrollable Row */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2">
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
 * Individual Category Button
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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center
        min-w-[90px] px-3 py-2
        rounded-xl transition-all duration-300 border-2
        group
        ${isActive
          ? 'bg-nga-green border-nga-green shadow-lg shadow-nga-green/30'
          : 'bg-nga-navy border-nga-green/20 hover:border-nga-green/50 hover:bg-nga-cream'}
      `}
    >
      {/* Icon */}
      <IconComponent className={`text-2xl mb-1 ${isActive ? 'text-nga-navy' : 'text-nga-cream group-hover:text-nga-navy'}`} />

      {/* Label */}
      <div className={`text-sm font-bold ${isActive ? 'text-nga-navy' : 'text-nga-cream group-hover:text-nga-navy'}`}>
        {category.label}
      </div>

      {/* Count Badge */}
      <div
        className={`text-xs font-bold mt-1 px-2 py-0.5 rounded-full
          ${isActive ? 'bg-nga-navy text-nga-green' : 'bg-nga-green/20 text-nga-green group-hover:bg-nga-navy group-hover:text-nga-cream'}
        `}
      >
        {count}
      </div>
    </motion.button>
  );
}