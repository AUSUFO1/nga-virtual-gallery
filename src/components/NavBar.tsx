'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Logo from '@/public/images/NGA-Logo.png';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Collections', href: '/collections' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 bg-nga-navy/95 backdrop-blur-xl shadow-2xl border-b border-nga-green/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* LOGO + BRAND NAME */}
            <motion.a
              href="/"
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-nga-green/20 rounded-full blur-xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <Image
                  src={Logo}
                  alt="NGA Logo"
                  className="relative w-14 h-14 md:w-16 md:h-16 object-contain"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-nga-cream font-bold text-lg md:text-xl leading-tight">
                  National Gallery
                </h1>
                <p className="text-nga-green text-xs md:text-lg">of Art, Nigeria</p>
              </div>
            </motion.a>

            {/* DESKTOP NAV - CENTERED */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-2 p-1.5 bg-nga-cream/10 backdrop-blur-md rounded-full border border-nga-green/30">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        relative px-6 py-2.5 rounded-full font-semibold text-lg
                        transition-all duration-300
                        ${isActive 
                          ? "bg-nga-green text-nga-navy shadow-lg shadow-nga-green/30" 
                          : "text-nga-cream hover:text-nga-green hover:bg-nga-cream/5"}
                      `}
                    >
                      {link.name}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-nga-green rounded-full -z-10"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* CTA BUTTON (Desktop) */}
            <motion.a
              href="/gallery"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-nga-green text-nga-navy font-bold text-lg rounded-full shadow-lg shadow-nga-green/30 hover:shadow-nga-green/50 transition-all duration-300"
            >
              Virtual Gallery
            </motion.a>

            {/* MOBILE MENU TOGGLE */}
            <motion.button
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-nga-green/20 hover:bg-nga-green/30 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-nga-green" strokeWidth={2.5} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-nga-green" strokeWidth={2.5} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-20 right-0 bottom-0 w-72 bg-nga-navy border-l border-nga-green/20 z-50 md:hidden overflow-hidden"
            >
              {/* Decorative Background */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-nga-green rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-nga-light-green rounded-full blur-3xl" />
              </div>

              {/* Menu Content */}
              <div className="relative z-10 flex flex-col h-full p-6">
                {/* Navigation Links */}
                <div className="flex flex-col gap-3 mb-8">
                  {navLinks.map((link, index) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`
                          flex items-center gap-3 px-5 py-4 rounded-xl font-semibold text-base
                          transition-all duration-300
                          ${isActive 
                            ? "bg-nga-green text-nga-navy shadow-lg" 
                            : "text-nga-cream hover:bg-nga-green/10 hover:text-nga-green"}
                        `}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="mobileDot"
                            className="w-2 h-2 rounded-full bg-nga-navy"
                          />
                        )}
                        {link.name}
                      </motion.a>
                    );
                  })}
                </div>

                {/* CTA Button */}
                <motion.a
                  href="/gallery"
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-nga-green text-nga-navy font-bold text-base rounded-xl shadow-xl shadow-nga-green/30 hover:shadow-nga-green/50 transition-all duration-300"
                >
                  Enter Virtual Gallery
                </motion.a>

                {/* Footer Info */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-auto pt-6 border-t border-nga-green/20"
                >
                  <p className="text-nga-cream/60 text-xs text-center">
                    National Gallery of Art
                  </p>
                  <p className="text-nga-green text-xs text-center mt-1">
                    Abuja, Nigeria
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}