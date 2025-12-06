'use client';
import { useState } from "react";
import Header from "./Header";
import ImageUpload from "./ImageUpload";
import SuccessMessage from "./SuccessMessage";
import ArtworkForm from "./ArtworkForm";

export default function AdminPanel() {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    year: '',
    medium: '',
    dimensions: '',
    description: '',
    category: 'painting',
    isFeatured: false,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploadStats, setUploadStats] = useState<any>(null);

  const handleImageChange = (file: File) => {
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      artist: '',
      year: '',
      medium: '',
      dimensions: '',
      description: '',
      category: 'painting',
      isFeatured: false,
    });
    setImageFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return alert("Please select an image");

    setIsUploading(true);
    setSuccess(false);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('image', imageFile);
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, String(value));
      });

      const response = await fetch('/api/admin/artworks/add', {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) throw new Error("Failed to upload");

      const result = await response.json();
      setSuccess(true);
      setUploadStats(result.stats);

      resetForm();
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#20a25b] py-12 px-4">
      <div className="max-w-4xl mx-auto">

        <Header />

        {success && <SuccessMessage uploadStats={uploadStats} />}

        <form onSubmit={handleSubmit} className="card space-y-6">

          {/* IMAGE UPLOAD */}
          <ImageUpload
            previewUrl={previewUrl}
            onFileSelected={handleImageChange}
            clearImage={() => { setImageFile(null); setPreviewUrl(null); }}
            isUploading={isUploading}
          />

          {/* ARTWORK FORM FIELDS */}
          <ArtworkForm
            formData={formData}
            setFormData={setFormData}
            isUploading={isUploading}
            imageFile={imageFile}
          />
        </form>

      </div>
    </div>
  );
}
