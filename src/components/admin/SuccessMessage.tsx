'use client';

import { CheckCircle } from "lucide-react";

export default function SuccessMessage({ uploadStats }: any) {
  return (
    <div className="bg-nga-green text-[#1a1a1a] p-6 rounded-lg mb-6 flex items-start gap-4">
      <CheckCircle className="w-6 h-6 shrink-0 mt-1" />

      <div>
        <p className="font-bold text-lg mb-2">Artwork Successfully Added!</p>

        {uploadStats && (
          <div className="text-sm space-y-1">
            <p>Original size: {uploadStats.originalSize}</p>
            <p>Final size: {uploadStats.finalSize}</p>
            <p>Compression: {uploadStats.compression}</p>
          </div>
        )}
      </div>
    </div>
  );
}
