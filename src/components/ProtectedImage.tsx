'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ProtectedImageProps {
  artworkId: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  showWatermark?: boolean;
}

/*
 ProtectedImage Component
 Displays artwork images with security features:
 - Fetches signed URL from API (expires in 1 hour)
 - Disables right-click and drag
 - Shows watermark overlay
 - Prevents image theft
 */
export default function ProtectedImage({
  artworkId,
  alt,
  width = 800,
  height = 600,
  className = '',
  priority = false,
  showWatermark = true,
}: ProtectedImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadImage() {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch signed URL from API
        const response = await fetch(`/api/artwork?id=${artworkId}`);
        
        if (!response.ok) {
          throw new Error('Failed to load image');
        }

        const data = await response.json();

        if (isMounted) {
          setImageUrl(data.url);
          setIsLoading(false);
        }
      } catch (err: any) {
        console.error('Error loading image:', err);
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
        }
      }
    }

    loadImage();

    // Refresh signed URL every 50 minutes (before 1-hour expiry)
    const refreshInterval = setInterval(loadImage, 50 * 60 * 1000);

    return () => {
      isMounted = false;
      clearInterval(refreshInterval);
    };
  }, [artworkId]);

  // Loading state
  if (isLoading) {
    return (
      <div 
        className={`relative bg-nga-navy animate-pulse flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <div className="text-[#a8cf45] text-sm">Loading artwork...</div>
      </div>
    );
  }

  // Error state
  if (error || !imageUrl) {
    return (
      <div 
        className={`relative bg-nga-navy flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <div className="text-red-400 text-sm">Failed to load artwork</div>
      </div>
    );
  }

  // Protected image display
  return (
    <div 
      className={`relative select-none ${className}`}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      style={{ width, height }}
    >
      {/* Main Image */}
      <Image
        src={imageUrl}
        alt={alt}
        width={width}
        height={height}
        className="object-cover select-none pointer-events-none"
        draggable={false}
        priority={priority}
        unoptimized={true}
      />

      {/* Watermark Overlay */}
      {showWatermark && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div 
            className="text-white text-2xl md:text-4xl opacity-10 font-bold transform rotate-[-30deg] select-none"
            style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              userSelect: 'none',
              WebkitUserSelect: 'none',
            }}
          >
            © NATIONAL GALLERY OF ART
          </div>
        </div>
      )}

      {/* Invisible overlay to prevent interactions */}
      <div className="absolute inset-0 cursor-default" />
    </div>
  );
}