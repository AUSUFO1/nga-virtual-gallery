'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-nga-navy text-nga-cream pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* ABOUT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl md:text-lg font-bold mb-4 text-nga-cream">
              National Gallery of Art
            </h3>
            <p className="text-nga-cream/70 text-sm leading-relaxed mb-4">
              Nigeria's premier institution for preserving, promoting, and showcasing
              the nation's artistic heritage and cultural treasures.
            </p>
          </motion.div>

          {/* QUICK LINKS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4 text-nga-cream">Quick Links</h4>
            <ul className="space-y-2 text-sm">
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
                    className="text-nga-cream/70 hover:text-nga-green transition-colors"
                  >
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
            <h4 className="text-lg font-semibold mb-4 text-nga-cream">Contact</h4>

            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-nga-green mt-1 shrink-0" />
                <span className="text-nga-cream/70">
                  Federal Secretariat Complex, Phase II, Shehu Shagari Way, Abuja, FCT.
                </span>
              </li>

              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-nga-green shrink-0" />
                <span className="text-nga-cream/70">+234 (80) 231 701 78</span>
              </li>

              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-nga-green shrink-0" />
                <span className="text-nga-cream/70">info@nga.gov.ng</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4 text-nga-cream">Opening Hours</h4>

            <ul className="space-y-2 text-sm text-nga-cream/70">
              <li className="flex justify-between">
                <span>Monday - Friday:</span>
                <span className="font-semibold text-nga-cream">9:00 AM - 5:00 PM</span>
              </li>

              <li className="flex justify-between">
                <span>Saturday - Sunday:</span>
                <span className="font-semibold text-nga-cream">Closed</span>
              </li>

              <li className="mt-4 pt-4 border-t border-nga-cream/20">
                <span className="font-semibold text-nga-cream">Virtual Gallery:</span><br />
                <span className="text-nga-cream">Open 24/7</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-nga-cream/20 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-nga-cream/70">
            <p>© {currentYear} National Gallery of Art, Nigeria. All rights reserved.</p>

            <div className="flex gap-6">
              <a href="/privacy" className="hover:text-nga-green transition-colors">Privacy Policy</a>
              <a href="/accessibility" className="hover:text-nga-green transition-colors">Accessibility</a>
            </div>
          </div>

          <p className="text-center mt-4 text-xs text-nga-cream/60">
            Developed by Abubakar Yusuf Onoruoiza | NYSC 2024
          </p>
        </div>
      </div>
    </footer>
  );
}