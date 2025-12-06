'use client';

interface Props {
  formData: any;
  setFormData: any;
  isUploading: boolean;
  imageFile: File | null;
}

import { Upload, Loader2 } from "lucide-react";

export default function ArtworkForm({ formData, setFormData, isUploading, imageFile }: Props) {
  return (
    <>
      {/* TITLE */}
      <div>
        <label className="block text-white font-semibold mb-2">Artwork Title *</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          disabled={isUploading}
          className="w-full px-4 py-3 rounded-lg bg-[#1a4d2e] text-white border border-[#a8cf45]/30"
        />
      </div>

      {/* ARTIST */}
      <div>
        <label className="block text-white font-semibold mb-2">Artist Name *</label>
        <input
          type="text"
          value={formData.artist}
          onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
          required
          disabled={isUploading}
          className="w-full px-4 py-3 rounded-lg bg-[#1a4d2e] text-white border border-[#a8cf45]/30"
        />
      </div>

      {/* YEAR / MEDIUM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-white font-semibold mb-2">Year *</label>
          <input
            type="number"
            min="1800"
            max={new Date().getFullYear()}
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            required
            disabled={isUploading}
            className="w-full px-4 py-3 rounded-lg bg-[#1a4d2e] text-white border border-[#a8cf45]/30"
          />
        </div>

        <div>
          <label className="block text-white font-semibold mb-2">Medium *</label>
          <input
            type="text"
            value={formData.medium}
            onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
            required
            disabled={isUploading}
            className="w-full px-4 py-3 rounded-lg bg-[#1a4d2e] text-white border border-[#a8cf45]/30"
          />
        </div>
      </div>

      {/* DIMENSIONS */}
      <div>
        <label className="block text-white font-semibold mb-2">Dimensions (optional)</label>
        <input
          type="text"
          value={formData.dimensions}
          onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
          disabled={isUploading}
          className="w-full px-4 py-3 rounded-lg bg-[#1a4d2e] text-white border border-[#a8cf45]/30"
        />
      </div>

      {/* CATEGORY */}
      <div>
        <label className="block text-white font-semibold mb-2">Category *</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          disabled={isUploading}
          className="w-full px-4 py-3 rounded-lg bg-[#1a4d2e] text-white border border-[#a8cf45]/30"
        >
          <option value="painting">Painting</option>
          <option value="sculpture">Sculpture</option>
          <option value="photography">Photography</option>
          <option value="textile">Textile</option>
          <option value="mixed-media">Mixed Media</option>
          <option value="contemporary">Contemporary</option>
          <option value="traditional">Traditional</option>
        </select>
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="block text-white font-semibold mb-2">Description *</label>
        <textarea
          rows={6}
          required
          disabled={isUploading}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-[#1a4d2e] text-white border border-[#a8cf45]/30 resize-none"
        />
      </div>

      {/* FEATURED */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={formData.isFeatured}
          onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
          disabled={isUploading}
          className="w-5 h-5"
        />
        <label className="text-white font-semibold">
          Mark as Featured (show on homepage)
        </label>
      </div>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={isUploading || !imageFile}
        className="w-full btn-primary py-4 text-lg font-bold flex items-center justify-center gap-2"
      >
        {isUploading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing & Uploading...
          </>
        ) : (
          <>
            <Upload className="w-5 h-5" />
            Add Artwork to Gallery
          </>
        )}
      </button>
    </>
  );
}
