'use client';

import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-nga-cream">
      
      {/* Header */}
      <header className="bg-nga-navy text-nga-cream py-16 md:py-20 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-6"
          >
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-center mb-3"
          >
            Privacy Policy
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-nga-cream/80 text-lg text-center"
          >
            National Gallery of Art – Virtual Gallery
          </motion.p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-12 md:py-16">
        
        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-10 pb-6 border-b-2 border-nga-green/30"
        >
          <p className="text-nga-navy font-semibold flex items-center text-base md:text-lg">
            <FileText className="w-5 h-5 mr-3 text-nga-green" />
            Last Updated: December 24, 2024
          </p>
        </motion.div>

        {/* Policy Content */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="prose prose-lg max-w-none"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-nga-navy mb-6">
            Your Privacy Matters
          </h2>

          <p className="text-nga-navy/80 text-base md:text-xl leading-relaxed mb-6">
            The National Gallery of Art ("NGA") respects your privacy. This Virtual Gallery
            website is designed to allow visitors to explore artworks and exhibitions without
            providing personal information.
          </p>

          <h3 className="text-xl md:text-2xl font-bold text-nga-navy mt-10 mb-4">
            No Data Collection
          </h3>

          <p className="text-nga-navy/80 text-base md:text-xl leading-relaxed mb-6">
            <strong className="text-nga-navy">We do not collect, store, or process personal data</strong> from visitors
            to this website. You are not required to create an account, submit personal
            details, or provide identifiable information to use this platform.
          </p>

          <h3 className="text-xl md:text-2xl font-bold text-nga-navy mt-10 mb-4">
            No Tracking
          </h3>

          <p className="text-nga-navy/80 text-base md:text-xl leading-relaxed mb-6">
            This website does not use tracking cookies, advertising pixels,
            or third-party monitoring services that collect personal or behavioral data.
            Your browsing experience remains private and anonymous.
          </p>

          <h3 className="text-xl md:text-2xl font-bold text-nga-navy mt-10 mb-4">
            Content Purpose
          </h3>

          <p className="text-nga-navy/80 text-base md:text-xl leading-relaxed mb-6">
            Any images, artworks, or content displayed are provided solely for public viewing,
            educational, and cultural purposes. All materials are part of Nigeria's national 
            heritage and are shared for the benefit of the public.
          </p>

          <h3 className="text-xl md:text-2xl font-bold text-nga-navy mt-10 mb-4">
            Policy Updates
          </h3>

          <p className="text-nga-navy/80 text-base md:text-xl leading-relaxed mb-6">
            If this policy changes in the future, updates will be reflected clearly on this
            page with a new "Last Updated" date. We are committed to maintaining transparency 
            about how we operate this platform.
          </p>

          <div className="mt-12 pt-8 border-t-2 border-nga-navy/20">
            <h3 className="text-xl md:text-2xl font-bold text-nga-navy mb-4">
              Questions?
            </h3>
            <p className="text-nga-navy/80 text-base md:text-xl leading-relaxed mb-4">
              If you have any questions about this privacy policy or our practices, please contact us:
            </p>
            <div className="space-y-2 text-nga-navy/80 text-base md:text-xl">
              <p><strong className="text-nga-navy">Email:</strong> info@nga.gov.ng</p>
              <p><strong className="text-nga-navy">Phone:</strong> +234 (80) 231 701 78</p>
              <p><strong className="text-nga-navy">Address:</strong> Federal Secretariat Complex, Phase II, Shehu Shagari Way, Abuja, FCT</p>
            </div>
          </div>
        </motion.section>

      </main>
    </div>
  );
}