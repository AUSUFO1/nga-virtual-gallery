'use client';

import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

export default function Accessibility() {
  return (
    <div className="min-h-screen bg-nga-cream">
      
      {/* Header */}
      <header className="bg-nga-navy text-nga-cream py-16 md:py-20 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl mt-4 font-bold text-center mb-3"
          >
            Accessibility Statement
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
            Last Updated: December 13, 2025
          </p>
        </motion.div>

        {/* Accessibility Content */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="prose prose-lg max-w-none"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-nga-navy mb-6">
            Our Commitment to Accessibility
          </h2>

          <p className="text-nga-navy/80 text-base md:text-xl leading-relaxed mb-6">
            The National Gallery of Art (NGA) is committed to ensuring that the Virtual
            Gallery website is accessible to the widest possible audience, regardless
            of ability, technology, or environment.
          </p>

          <h3 className="text-xl md:text-2xl font-bold text-nga-navy mt-10 mb-4">
            Inclusive Design
          </h3>

          <p className="text-nga-navy/80 text-base md:text-xl leading-relaxed mb-6">
            This platform is designed to function across modern browsers and devices,
            including desktops, tablets, and mobile phones. Core content remains
            accessible even if animations or advanced features are limited or disabled.
          </p>

          <h3 className="text-xl md:text-2xl font-bold text-nga-navy mt-10 mb-4">
            Assistive Technologies
          </h3>

          <p className="text-nga-navy/80 text-base md:text-xl leading-relaxed mb-6">
            We strive to support assistive technologies such as screen readers,
            keyboard navigation, and accessibility tools by following established
            web accessibility standards and best practices.
          </p>

          <h3 className="text-xl md:text-2xl font-bold text-nga-navy mt-10 mb-4">
            Known Limitations
          </h3>

          <p className="text-nga-navy/80 text-base md:text-xl leading-relaxed mb-6">
            Certain experiences, including 3D visual content or immersive media,
            may present limitations depending on device capability, browser support,
            or network conditions. We continue to improve accessibility where possible.
          </p>

          <h3 className="text-xl md:text-2xl font-bold text-nga-navy mt-10 mb-4">
            Feedback & Support
          </h3>

          <p className="text-nga-navy/80 text-base md:text-xl leading-relaxed mb-6">
            If you experience difficulty accessing any part of this website or have
            suggestions on how we can improve accessibility, we welcome your feedback.
          </p>

          <div className="mt-12 pt-8 border-t-2 border-nga-navy/20">
            <h3 className="text-xl md:text-2xl font-bold text-nga-navy mb-4">
              Contact Us
            </h3>

            <p className="text-nga-navy/80 text-base md:text-xl leading-relaxed mb-4">
              For accessibility-related questions or assistance, please contact:
            </p>

            <div className="space-y-2 text-nga-navy/80 text-base md:text-xl">
              <p><strong className="text-nga-navy">Email:</strong> info@nga.gov.ng</p>
              <p><strong className="text-nga-navy">Phone:</strong> +234 (80) 231 701 78</p>
              <p>
                <strong className="text-nga-navy">Address:</strong> Federal Secretariat Complex,
                Phase II, Shehu Shagari Way, Abuja, FCT
              </p>
            </div>
          </div>
        </motion.section>

      </main>
    </div>
  );
}
