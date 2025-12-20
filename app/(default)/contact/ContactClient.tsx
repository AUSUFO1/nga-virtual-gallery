'use client';

import { motion } from 'framer-motion';
import ContactInfoCards from '@/src/components/contact/ContactInfoCards';
import DepartmentContacts from '@/src/components/contact/DepartmentContacts';
import SocialNewsletter from '@/src/components/contact/SocialNewsletter';

export default function ContactClient() {
  return (
    <div className="min-h-screen bg-nga-cream pt-24 pb-16">
      <div className="container-custom">
        
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-nga-navy mb-4">
            Contact <span className="text-nga-green">NGA</span>
          </h1>
          <p className="text-nga-navy text-sm lg:text-2xl font-bold max-w-2xl mx-auto">
            Get in touch with the National Gallery of Art. We're here to help with your inquiries.
          </p>
        </motion.div>

        <ContactInfoCards />
        <DepartmentContacts />
        <SocialNewsletter />
      </div>
    </div>
  );
}
