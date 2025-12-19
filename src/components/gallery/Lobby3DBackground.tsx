'use client';

import LobbyCanvas from '../lobby/LobbyCanvas';

export default function Lobby() {
  return (
    <div className="absolute mt--30 inset-0 w-full h-full">
      <LobbyCanvas />

      {/* Gradient overlay on top of everything */}
    </div>
  );
}
