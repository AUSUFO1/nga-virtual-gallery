
import type { Metadata } from 'next';
import { FileText } from 'lucide-react';


export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description:
    'Accessibility statement for the National Gallery of Art Virtual 3D Gallery. Learn how we ensure inclusive access for all users.',

  openGraph: {
    title: 'Accessibility | National Gallery of Art',
    description:
      'Our commitment to accessibility and inclusive access in the National Gallery of Art Virtual 3D Gallery.',
    url: '/accessibility',
    images: [
      {
        url: '/og-image.jpg', 
        width: 1200,
        height: 630,
        alt: 'National Gallery of Art Virtual Gallery',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Accessibility | National Gallery of Art',
    description:
      'Read the accessibility statement for the National Gallery of Art Virtual 3D Gallery.',
    images: ['/og-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-[#f9faf8]">
      
      {/* Header */}
      <header className="bg-nga-navy mt-20 text-white py-6 shadow-md">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold">
            Accessibility
          </h1>
          <p className="text-[#f9faf8]/80 mt-2">
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

        {/* Accessibility Statement */}
        <section className="bg-white rounded-lg p-6 md:p-10 max-w-3xl mx-auto">
          <p className="text-black leading-relaxed mb-5">
            The National Gallery of Art (NGA) is committed to ensuring that our Virtual
            Gallery website is accessible and usable for as many people as possible,
            regardless of ability or technology.
          </p>

          <p className="text-black leading-relaxed mb-5">
            This platform is designed to work across a range of devices including
            desktops, tablets, and mobile phones, and to remain usable even when
            animations or advanced features are limited.
          </p>

          <p className="text-black leading-relaxed mb-5">
            While we continue to improve accessibility across the Virtual Gallery,
            some content — such as 3D experiences or visual media — may have limitations
            depending on device capability or network conditions.
          </p>

          <p className="text-black leading-relaxed">
            If you experience any difficulty accessing content on this website or have
            suggestions for improvement, we welcome your feedback.
          </p>
        </section>
      </main>
    </div>
  );
}
