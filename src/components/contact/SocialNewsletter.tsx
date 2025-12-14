'use client';

import { motion } from 'framer-motion';
import { Facebook, X, Instagram, Youtube } from 'lucide-react';

const SOCIAL_LINKS = [
  { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/profile.php?id=61554762980750', color: '#1877F2' },
  { name: 'Twitter', icon: X, url: 'https://x.com/NGANIGERIA?t=wCt-Y6d5Xlp6wfoyNSeJNQ&s=09', color: '#1DA1F2' },
  { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/nganigeria?igsh=b3FkbzBuZnV1ZDdt', color: '#E4405F' },
  { name: 'Youtube', icon: Youtube, url: 'https://youtube.com/@nationalgalleryofartnigeria?si=JJKmmO7KAwmqGTUJ', color: '#FF0000' },
];

export default function SocialNewsletter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.0 }}
      className="text-center w-full px-4"
    >
      <h2 className="text-3xl font-bold text-nga-navy">
        Connect With <span className="text-nga-green">Us</span>
      </h2>
      <p className="text-[#f9faf8]/80 mb-8">
        Follow us on social media for updates, exhibitions, and Nigerian art news
      </p>

      {/* Social Media Icons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {SOCIAL_LINKS.map((social) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 rounded-full bg-[#1a4d2e] border-2 border-[#a8cf45]/30 hover:border-[#a8cf45] flex items-center justify-center transition-all hover:shadow-lg"
            aria-label={social.name}
          >
            <social.icon className="w-6 h-6 text-nga-cream" />
          </motion.a>
        ))}
      </div>

      {/* Newsletter Signup */}
      <div className="max-w-md mx-auto w-full">
        <div className="card bg-gradient-to-br from-[#1a4d2e] to-[#143d26] p-6 w-full">
          <h3 className="text-xl font-bold text-white mb-2">Stay Updated</h3>
          <p className="text-[#f9faf8]/70 text-sm mb-4">
            Subscribe to our newsletter for exhibition updates
          </p>
          <form className="flex flex-col sm:flex-row gap-2 w-full" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              required
              className="flex-1 px-4 py-2 rounded-lg bg-[#143d26] border border-[#a8cf45]/30 focus:border-[#a8cf45] focus:outline-none text-white placeholder:text-[#f9faf8]/50 w-full"
            />
            <button type="submit" className="btn-primary px-6 py-2 whitespace-nowrap w-full sm:w-auto">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}