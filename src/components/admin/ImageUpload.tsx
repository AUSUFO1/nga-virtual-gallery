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
      <label className="block text-nga-cream font-semibold mb-2">
        Artwork Image *
      </label>

      <div className="border-2 border-dashed border-nga-green rounded-lg p-8 text-center hover:border-nga-green transition-colors">
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
              className="text-nga-green hover:text-nga-light-green underline font-semibold"
            >
              Change Image
            </button>
          </div>
        ) : (
          <label className="cursor-pointer block">
            <ImageIcon className="w-16 h-16 text-nga-green mx-auto mb-4" />
            <p className="text-white mb-2 font-semibold">Click to upload artwork image</p>
            <p className="text-nga-cream text-sm">
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
