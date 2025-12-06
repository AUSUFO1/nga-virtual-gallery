'use client';

import { ImageIcon } from "lucide-react";

interface Props {
  previewUrl: string | null;
  onFileSelected: (file: File) => void;
  clearImage: () => void;
  isUploading: boolean;
}

export default function ImageUpload({
  previewUrl,
  onFileSelected,
  clearImage,
  isUploading
}: Props) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelected(file);
  };

  return (
    <div>
      <label className="block text-white font-semibold mb-2">
        Artwork Image *
      </label>

      <div className="border-2 border-dashed border-[#a8cf45]/30 rounded-lg p-8 text-center hover:border-[#a8cf45] transition-colors">
        {previewUrl ? (
          <div className="space-y-4">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-64 mx-auto rounded-lg shadow-lg"
            />
            <button
              type="button"
              onClick={clearImage}
              className="text-[#a8cf45] hover:text-[#d1e28c] underline font-semibold"
            >
              Change Image
            </button>
          </div>
        ) : (
          <label className="cursor-pointer block">
            <ImageIcon className="w-16 h-16 text-[#a8cf45]/50 mx-auto mb-4" />
            <p className="text-white mb-2 font-semibold">Click to upload artwork image</p>
            <p className="text-[#f9faf8]/60 text-sm">
              PNG, JPG up to 50MB (optimized automatically)
            </p>
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              disabled={isUploading}
              accept="image/*"
            />
          </label>
        )}
      </div>
    </div>
  );
}
