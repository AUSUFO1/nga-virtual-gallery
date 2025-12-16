'use client';

import { useState, useEffect, useRef } from 'react';
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
  const [isObscured, setIsObscured] = useState(false);

  const sessionId = useRef(
    Math.random().toString(36).substring(2, 10).toUpperCase()
  );

  /* LOAD SIGNED IMAGE URL */
  useEffect(() => {
    let mounted = true;

    const loadImage = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/artwork?id=${artworkId}`);
        if (!res.ok) throw new Error('Failed to load artwork');

        const data = await res.json();
        if (mounted) {
          setImageUrl(data.url);
          setIsLoading(false);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message);
          setIsLoading(false);
        }
      }
    };

    loadImage();
    const refresh = setInterval(loadImage, 50 * 60 * 1000);

    return () => {
      mounted = false;
      clearInterval(refresh);
    };
  }, [artworkId]);

  /* SCREENSHOT / RECORDING DETERRENCE */
  useEffect(() => {
    const obscure = () => setIsObscured(true);
    const restore = () => setTimeout(() => setIsObscured(false), 300);

    const handleVisibility = () => {
      document.hidden ? obscure() : restore();
    };

    const handleKeys = (e: KeyboardEvent) => {
      if (
        e.key === 'PrintScreen' ||
        (e.ctrlKey && e.shiftKey) ||
        (e.metaKey && e.shiftKey)
      ) {
        e.preventDefault();
        obscure();
        restore();
      }
    };

    window.addEventListener('blur', obscure);
    window.addEventListener('focus', restore);
    document.addEventListener('visibilitychange', handleVisibility);
    document.addEventListener('keydown', handleKeys);

    return () => {
      window.removeEventListener('blur', obscure);
      window.removeEventListener('focus', restore);
      document.removeEventListener('visibilitychange', handleVisibility);
      document.removeEventListener('keydown', handleKeys);
    };
  }, []);

  /* LOADING / ERROR STATES */
  if (isLoading) {
    return (
      <div
        className={`relative bg-nga-navy animate-pulse flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-[#a8cf45] text-sm">Loading artwork…</span>
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div
        className={`relative bg-nga-navy flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-red-400 text-sm">Artwork unavailable</span>
      </div>
    );
  }

  /* PROTECTED DISPLAY */
  return (
    <div
      className={`relative select-none overflow-hidden ${className}`}
      style={{ width, height }}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {/* IMAGE */}
      <div
        className={`transition-all duration-200 ${
          isObscured ? 'blur-2xl opacity-0' : 'blur-0 opacity-100'
        }`}
      >
        <Image
          src={imageUrl}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          unoptimized
          draggable={false}
          className="object-cover pointer-events-none select-none"
        />
      </div>

      {/* DYNAMIC WATERMARK */}
      {showWatermark && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div
            className="text-white opacity-[0.08] text-xl md:text-3xl font-bold rotate-[-30deg] leading-snug text-center select-none"
            style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.4)' }}
          >
            © NGA VIRTUAL GALLERY
            <br />
            ARTWORK: {artworkId}
            <br />
            SESSION: {sessionId.current}
          </div>
        </div>
      )}

      {/* INVISIBLE INTERACTION SHIELD */}
      <div className="absolute inset-0 cursor-default" />
    </div>
  );
}
