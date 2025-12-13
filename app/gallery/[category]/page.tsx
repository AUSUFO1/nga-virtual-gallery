'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import GalleryRoom3D from '@/src/components/3dgallery/GalleryRoom3D';

const VALID_CATEGORIES = [
  'painting',
  'sculpture',
  'photography',
  'textile',
  'mixed-media',
  'contemporary',
  'traditional',
] as const;

type Category = (typeof VALID_CATEGORIES)[number];

const CATEGORY_LABELS: Record<Category, string> = {
  painting: 'Painting Room',
  sculpture: 'Sculpture Room',
  photography: 'Photography Room',
  textile: 'Textile Room',
  'mixed-media': 'Mixed Media Room',
  contemporary: 'Contemporary Room',
  traditional: 'Traditional Room',
};

export default function GalleryRoomPage() {
  const params = useParams<{ category?: string }>();
  const router = useRouter();

  const rawCategory = params?.category;
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (rawCategory && VALID_CATEGORIES.includes(rawCategory as Category)) {
      setCategory(rawCategory as Category);
    } else {
      setCategory(null);
    }
  }, [rawCategory]);

  // Invalid or missing category
  if (!category) {
    return (
      <div className="min-h-screen bg-linear-to-b from-[#20a25b] to-[#1a4d2e] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Invalid Gallery Room
          </h1>
          <p className="text-[#f9faf8]/70 mb-8">
            The category &quot;{rawCategory ?? 'unknown'}&quot; does not exist.
          </p>
          <button
            onClick={() => router.push('/gallery')}
            className="btn-primary"
          >
            ← Back to Lobby
          </button>
        </div>
      </div>
    );
  }

  // ✅ From here down, TypeScript KNOWS category is a string
  return (
    <GalleryRoom3D
      category={category}
      categoryLabel={CATEGORY_LABELS[category]}
    />
  );
}
