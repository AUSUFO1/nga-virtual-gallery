'use client';

import LobbyCanvas from '../lobby/LobbyCanvas';

export default function Lobby() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <LobbyCanvas />

      {/* Gradient overlay on top of everything */}
      <div className="absolute inset-0 bg-linear-to-b from-[#20a25b]/70 via-transparent to-[#1a4d2e]/80 pointer-events-none" />
    </div>
  );
}
