'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

/*
 Google Maps Location Section
 */
export default function LocationMap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.9 }}
      className="mb-16 w-full px-4"
    >
      <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-[#a8cf45]/30 w-full max-w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.9305647890947!2d7.489770974296875!3d9.070830590992188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0ba90d8dfd3b%3A0x4d8f0d6c8a8e8e8e!2sFederal%20Secretariat%20Complex%2C%20Abuja!5e0!3m2!1sen!2sng!4v1234567890"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale-30 hover:grayscale-0 transition-all duration-500 w-full"
          title="National Gallery of Art Location"
        />
      </div>

      <div className="mt-6 text-center">
        <a
          href="https://maps.google.com/?q=Federal+Secretariat+Complex+Phase+II+Shehu+Shagari+Way+Abuja"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center gap-2"
        >
          <MapPin className="w-5 h-5" />
          Get Directions
        </a>
      </div>
    </motion.div>
  );
}