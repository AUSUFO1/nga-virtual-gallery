'use client';

import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import {
  SiFacebook,
  SiInstagram,
  SiYoutube,
  SiX,
} from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-nga-navy text-nga-cream pt-20 pb-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-nga-green rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-nga-light-green rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">

          {/* ABOUT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <h3 className="text-2xl font-bold mb-4">
              National Gallery of Art
            </h3>

            <p className="text-nga-cream/80 text-sm sm:text-base leading-relaxed mb-6">
              Nigeria's premier institution for preserving, promoting, and showcasing
              the nation's artistic heritage and cultural treasures.
            </p>

         {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { Icon: SiFacebook, color: '#1877F2', href: 'https://www.facebook.com/profile.php?id=61554762980750' },
                { Icon: SiX, color: '#000000', href: 'https://x.com/NGANIGERIA?t=wCt-Y6d5Xlp6wfoyNSeJNQ&s=09' },
                { Icon: SiInstagram, color: '#E4405F', href: 'https://www.instagram.com/nganigeria?igsh=b3FkbzBuZnV1ZDdt' },
                { Icon: SiYoutube, color: '#FF0000', href: 'https://youtube.com/@nationalgalleryofartnigeria?si=JJKmmO7KAwmqGTUJ' }
              ].map(({ Icon, color, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white hover:bg-nga-cream flex items-center justify-center transition-all duration-300 shadow-lg"
                  style={{ color: color }}
                >
                  <Icon className="w-5 h-5" />
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
            <h4 className="text-lg font-bold mb-4 border-b-2 border-nga-green/30 pb-2 inline-block">
              Quick Links
            </h4>

            <ul className="space-y-3 mt-4">
              {[
                ['Virtual Gallery', '/gallery'],
                ['Collections', '/collections'],
                ['Exhibitions', 'https://nga.gov.ng/events/'],
                ['About Us', 'https://nga.gov.ng/who-we-are/'],
                ['Contact', 'https://nga.gov.ng/contact/'],
              ].map(([label, href], i) => (
                <li key={i}>
                  <a
                    href={href}
                    className="text-nga-cream/80 hover:text-nga-green transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-nga-green group-hover:w-4 transition-all duration-300" />
                    {label}
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
            <h4 className="text-lg font-bold mb-4 border-b-2 border-nga-green/30 pb-2 inline-block">
              Contact
            </h4>

            <ul className="space-y-4 mt-4 text-nga-cream/80">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-nga-green/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>
                  Federal Secretariat Complex, Phase II, Shehu Shagari Way, Abuja, FCT.
                </span>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-nga-green/20 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <a href="tel:+2348023170178" className="hover:text-nga-green transition-colors">
                  +234 (80) 231 701 78
                </a>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-nga-green/20 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <a href="mailto:info@nga.gov.ng" className="hover:text-nga-green transition-colors">
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
            <h4 className="text-lg font-bold mb-4 border-b-2 border-nga-green/30 pb-2 inline-block">
              Opening Hours
            </h4>

            <ul className="space-y-3 mt-4 text-nga-cream/80">
              <li className="flex justify-between p-2 rounded-lg hover:bg-nga-green/10">
                <span>Monday – Friday:</span>
                <span className="font-bold text-nga-cream">9:00 AM – 5:00 PM</span>
              </li>

              <li className="flex justify-between p-2 rounded-lg hover:bg-nga-green/10">
                <span>Saturday – Sunday:</span>
                <span className="font-bold text-nga-cream">Closed</span>
              </li>

              <li className="mt-4 pt-4 border-t border-nga-cream/20 p-3 rounded-lg bg-nga-green/10">
                <span className="font-bold text-nga-green block mb-1">
                  Virtual Gallery
                </span>
                <span>Open 24/7 for exploration</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-nga-cream/20 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-nga-cream/80">
            <p>© {currentYear} National Gallery of Art, Nigeria.</p>

            <div className="flex gap-4">
              <a href="/privacy" className="hover:text-nga-green">Privacy</a>
              <span>•</span>
              <a href="#terms" className="hover:text-nga-green">Terms</a>
              <span>•</span>
              <a href="/accessibility" className="hover:text-nga-green">Accessibility</a>
            </div>
          </div>

          <p className="text-center mt-6 text-xs text-nga-cream/50">
            Designed for Nigerian Art & Culture
          </p>
        </div>
      </div>
    </footer>
  );
}
