'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Logo from '@/public/images/NGA-Logo.png';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // Get current route

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Collections', href: '/collections' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45 }}
      className="fixed top-0 left-0 right-0 z-50 bg-nga-cream/95 shadow-xl backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center h-16 md:h-20">

          {/* LOGO */}
          <div className="shrink-0">
            <motion.div
              className="cursor-pointer"
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ type: 'spring', stiffness: 350 }}
            >
              <Image
                src={Logo}
                alt="NGA Logo"
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
                priority
              />
            </motion.div>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-2 p-2 bg-nga-navy/40 backdrop-blur-md rounded-full border border-nga-green/40 shadow-lg">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href; //determine active from pathname
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 + 0.12 }}
                    className={`
                      font-poppins text-sm px-5 py-2 rounded-full transition-all duration-300
                      ${isActive 
                        ? "bg-nga-navy text-nga-cream shadow-md" 
                        : "text-black hover:text-nga-navy"}
                    `}
                  >
                    {link.name}
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="ml-auto">
            <motion.button
              className="md:hidden text-nga-navy"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-7 h-7 text-nga-green" strokeWidth={2.5} />
                </motion.div>
              ) : (
                <motion.div
                  animate={{
                    rotate: [0, -8, 8, -8, 0],
                    scale: [1, 1.04, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                >
                  <Sparkles
                    className="w-7 h-7 text-nga-navy"
                    strokeWidth={2}
                    fill="currentColor"
                  />
                </motion.div>
              )}
            </motion.button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
              className="
                md:hidden w-full bg-nga-cream mt-2 px-4 py-4 overflow-hidden
                border-t border-nga-green/40 rounded-b-xl
              "
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href; // active for mobile menu
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      initial={{ x: -16, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -16, opacity: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className={`
                        w-full text-left font-poppins text-base py-3
                        border-b border-nga-navy/10 last:border-0 transition-all duration-300
                        ${isActive 
                          ? "bg-nga-navy text-white px-3 rounded-md"
                          : "text-black hover:text-nga-navy"}
                      `}
                    >
                      {link.name}
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
