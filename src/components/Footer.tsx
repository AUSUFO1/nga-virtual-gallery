'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-nga-navy text-nga-cream pt-20 pb-6 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-nga-green rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-nga-light-green rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">

          {/* ABOUT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <h3 className="text-2xl font-bold mb-4 text-nga-cream">
              National Gallery of Art
            </h3>
            <p className="text-nga-cream/80 text-sm sm:text-base leading-relaxed mb-6">
              Nigeria's premier institution for preserving, promoting, and showcasing
              the nation's artistic heritage and cultural treasures.
            </p>

            {/* Social Media Icons */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Youtube, href: '#', label: 'YouTube' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-nga-green/20 hover:bg-nga-green flex items-center justify-center transition-all duration-300 group"
                >
                  <social.icon className="w-5 h-5 text-nga-cream group-hover:text-nga-navy transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* QUICK LINKS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold mb-4 text-nga-cream border-b-2 border-nga-green/30 pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm sm:text-base mt-4">
              {[
                { label: "Virtual Gallery", href: "/gallery" },
                { label: "Collections", href: "/collections" },
                { label: "Exhibitions", href: "https://nga.gov.ng/events/" },
                { label: "About Us", href: "https://nga.gov.ng/who-we-are/" },
                { label: "Contact", href: "https://nga.gov.ng/contact/" },
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href={item.href}
                    className="text-nga-cream/80 hover:text-nga-green transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-nga-green group-hover:w-4 transition-all duration-300" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CONTACT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold mb-4 text-nga-cream border-b-2 border-nga-green/30 pb-2 inline-block">
              Contact
            </h4>

            <ul className="space-y-4 text-sm sm:text-base mt-4">
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-nga-green/20 flex items-center justify-center shrink-0 group-hover:bg-nga-green transition-colors">
                  <MapPin className="w-4 h-4 text-nga-green group-hover:text-nga-navy transition-colors" />
                </div>
                <span className="text-nga-cream/80">
                  Federal Secretariat Complex, Phase II, Shehu Shagari Way, Abuja, FCT.
                </span>
              </li>

              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-nga-green/20 flex items-center justify-center shrink-0 group-hover:bg-nga-green transition-colors">
                  <Phone className="w-4 h-4 text-nga-green group-hover:text-nga-navy transition-colors" />
                </div>
                <a href="tel:+2348023170178" className="text-nga-cream/80 hover:text-nga-green transition-colors">
                  +234 (80) 231 701 78
                </a>
              </li>

              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-nga-green/20 flex items-center justify-center shrink-0 group-hover:bg-nga-green transition-colors">
                  <Mail className="w-4 h-4 text-nga-green group-hover:text-nga-navy transition-colors" />
                </div>
                <a href="mailto:info@nga.gov.ng" className="text-nga-cream/80 hover:text-nga-green transition-colors">
                  info@nga.gov.ng
                </a>
              </li>
            </ul>
          </motion.div>

          {/* OPENING HOURS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold mb-4 text-nga-cream border-b-2 border-nga-green/30 pb-2 inline-block">
              Opening Hours
            </h4>

            <ul className="space-y-3 text-sm sm:text-base text-nga-cream/80 mt-4">
              <li className="flex justify-between items-center p-2 rounded-lg hover:bg-nga-green/10 transition-colors">
                <span>Monday - Friday:</span>
                <span className="font-bold text-nga-cream">9:00 AM - 5:00 PM</span>
              </li>

              <li className="flex justify-between items-center p-2 rounded-lg hover:bg-nga-green/10 transition-colors">
                <span>Saturday - Sunday:</span>
                <span className="font-bold text-nga-cream">Closed</span>
              </li>

              <li className="mt-4 pt-4 border-t border-nga-cream/20 p-3 rounded-lg bg-nga-green/10">
                <span className="font-bold text-nga-green block mb-1">Virtual Gallery</span>
                <span className="text-nga-cream">Open 24/7 for exploration</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-nga-cream/20 pt-8 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-nga-cream/80">
            <p className="text-center sm:text-left">
              © {currentYear} National Gallery of Art, Nigeria. All rights reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <a href="/privacy" className="hover:text-nga-green transition-colors">
                Privacy Policy
              </a>
              <span className="text-nga-cream/40">•</span>
              <a href="#terms" className="hover:text-nga-green transition-colors">
                Terms of Use
              </a>
              <span className="text-nga-cream/40">•</span>
              <a href="/accessibility" className="hover:text-nga-green transition-colors">
                Accessibility
              </a>
            </div>
          </div>

          {/* Credit */}
          <div className="text-center mt-6 text-xs text-nga-cream/50">
            <p>Designed for Nigerian Art & Culture</p>
          </div>
        </div>
      </div>
    </footer>
  );
}