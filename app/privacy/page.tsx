import Link from 'next/link';
import { Shield, FileText } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#f9faf8]">
      
      {/* Header */}
      <header className=" bg-nga-navy text-white py-6 shadow-md">
        <div className="container-custom">
          <h1 className="text-xl mt-15 md:text-4xl font-bold">Privacy Policy</h1>
          <p className="text-[#f9faf8]/80 mt-3">
            National Gallery of Art – Virtual Gallery
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-custom py-10 md:py-14">
        
        {/* Last Updated */}
        <div className="bg-white border-l-4 border-nga-navy p-4 md:p-6 rounded-r-lg mb-10">
          <p className="text-black font-semibold flex items-center">
            <FileText className="w-5 h-5 mr-2 text-nga-navy" />
            Last Updated: December 13, 2025
          </p>
        </div>

        {/* Policy Content */}
        <section className="bg-white rounded-lg p-6 md:p-10 max-w-3xl mx-auto">
          
          <h2 className="text-xl md:text-3xl font-bold text-black mb-6 flex items-center">
            <Shield className="w-8 h-8 flex-wrap mr-3 text-nga-navy" />
            Our Privacy Commitment
          </h2>

          <p className="text-black leading-relaxed mb-5">
            The National Gallery of Art (“NGA”) respects your privacy. This Virtual Gallery
            website is designed to allow visitors explore artworks and exhibitions without
            providing personal information.
          </p>

          <p className="text-black leading-relaxed mb-5">
            <strong>We do not collect, store, or process personal data</strong> from visitors
            to this website. You are not required to create an account, submit personal
            details, or provide identifiable information to use this platform.
          </p>

          <p className="text-black leading-relaxed mb-5">
            This website does not use tracking cookies, advertising pixels,
            or third-party monitoring services that collect personal or behavioral data.
          </p>

          <p className="text-black leading-relaxed mb-5">
            Any images, artworks, or content displayed are provided solely for public viewing,
            educational, and cultural purposes.
          </p>

          <p className="text-black leading-relaxed">
            If this policy changes in the future, updates will be reflected clearly on this
            page.
          </p>
        </section>
      </main>
    </div>
  );
}
