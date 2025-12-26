'use client';

import { useState, useEffect } from 'react';
import Lobby3DBackground from '@/src/components/gallery/Lobby3DBackground';
import RoomSelection from '@/src/components/gallery/RoomSelection';
import LobbyHeader from '@/src/components/gallery/LobbyHeader';
import LobbyFooter from '@/src/components/gallery/LobbyFooter';
import DeviceNoticeSplash from '@/src/components/DeviceNoticeSplash';
import PaintingIcon from '@/public/icon/PaintingIcon';
import SculptureIcon from '@/public/icon/SculptureIcon';
import PhotographyIcon from '@/public/icon/PhotographyIcon';
import TextileIcon from '@/public/icon/TextileIcon';
import MixedMediaIcon from '@/public/icon/MixedMediaIcon';

export const GALLERY_ROOMS = [
  { id: 'painting', label: 'Painting Room', Icon: PaintingIcon, category: 'painting' },
  { id: 'sculpture', label: 'Sculpture Room', Icon: SculptureIcon, category: 'sculpture' },
  { id: 'photography', label: 'Photography Room', Icon: PhotographyIcon, category: 'photography' },
  { id: 'textile', label: 'Textile Room', Icon: TextileIcon, category: 'textile' },
  { id: 'mixed-media', label: 'Mixed Media Room', Icon: MixedMediaIcon, category: 'mixed-media' },
];

export default function GalleryLobbyClient() {
  const [roomCounts, setRoomCounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [showDeviceNotice, setShowDeviceNotice] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true); // ADDED: Track if desktop

  // ADDED: Device detection on mount
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const desktop = width >= 1024; // Desktop is 1024px and above
      setIsDesktop(desktop);
      
      // Show notice for mobile and tablet only
      if (!desktop) {
        setShowDeviceNotice(true);
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const response = await fetch('/api/artworks?limit=1000');
        const data = await response.json();
        const artworks = data.artworks || [];

        const counts: Record<string, number> = {};
        GALLERY_ROOMS.forEach(room => {
          counts[room.category] = artworks.filter(
            (art: any) => art.category === room.category
          ).length;
        });

        setRoomCounts(counts);
      } catch {
        // silently fail (no console noise in prod)
      } finally {
        setIsLoading(false);
      }
    }

    fetchCounts();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ADDED: Device notice splash for mobile/tablet */}
      {showDeviceNotice && (
        <DeviceNoticeSplash onContinue={() => setShowDeviceNotice(false)} />
      )}

      <Lobby3DBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        <LobbyHeader />
        <RoomSelection
          galleryRooms={GALLERY_ROOMS}
          roomCounts={roomCounts}
          isLoading={isLoading}
        />
        <LobbyFooter />
      </div>
    </div>
  );
}