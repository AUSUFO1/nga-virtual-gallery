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
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleImageChange = (file: File) => {
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setErrorMessage('');
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
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageFile) {
      setErrorMessage("Please select an image");
      return;
    }

    setIsUploading(true);
    setSuccess(false);
    setErrorMessage('');

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

      const result = await response.json();

      if (!response.ok) {
        const errorMsg = result.error || result.message || `Upload failed (${response.status})`;
        throw new Error(errorMsg);
      }

      setSuccess(true);
      setUploadStats(result.stats);

      resetForm();
      setTimeout(() => setSuccess(false), 5000);
      
    } catch (err: any) {
      const errorMsg = err.message || "Upload failed - unknown error";
      setErrorMessage(errorMsg);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-nga-navy py-12 px-4">
      <div className="max-w-4xl mx-auto">

        <Header />

        {success && <SuccessMessage uploadStats={uploadStats} />}

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg">
            <p className="text-red-500 font-medium">{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="card space-y-6">

          <ImageUpload
            previewUrl={previewUrl}
            onFileSelected={handleImageChange}
            clearImage={() => { setImageFile(null); setPreviewUrl(null); }}
            isUploading={isUploading}
          />

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