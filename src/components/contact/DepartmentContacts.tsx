'use client';

import { motion } from 'framer-motion';
import { Mail, Building2 } from 'lucide-react';

const DEPARTMENTS = [
  {
    name: 'Curatorial',
    email: 'curatorial@nationalgallery.gov.ng',
    description: 'Artwork exhibitions, collections, and curation inquiries',
  },
  {
    name: 'Education',
    email: 'education@nationalgallery.gov.ng',
    description: 'School visits, workshops, and educational programs',
  },
  {
    name: 'Administration',
    email: 'admin@nationalgallery.gov.ng',
    description: 'General administration and operational matters',
  },
  {
    name: 'Press & Media',
    email: 'press@nationalgallery.gov.ng',
    description: 'Media inquiries, press releases, and partnerships',
  },
];

export default function DepartmentContacts() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="mb-16 w-full"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 w-full max-w-full">
        {DEPARTMENTS.map((dept, index) => (
          <motion.div
            key={dept.name}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            className="card bg-linear-to-br from-[#1a4d2e] to-[#143d26] p-6 hover:shadow-[0_20px_60px_rgba(168,207,69,0.3)] transition-all w-full wrap-break-word"
          >
            <div className="flex items-start gap-4 w-full">
              <div className="w-12 h-12 rounded-lg bg-[#a8cf45]/20 flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-nga-green" />
              </div>
              <div className="flex-1 min-w-0 overflow-hidden">
                <h3 className="text-xl font-bold text-white mb-2 wrap-break-word">{dept.name}</h3>
                <p className="text-[#f9faf8]/70 text-sm mb-3 wrap-break-word">{dept.description}</p>
                <a
                  href={`mailto:${dept.email}`}
                  className="inline-flex items-center gap-2 text-nga-green hover:text-[#d1e28c] transition-colors text-sm font-semibold break-all"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span className="break-all">{dept.email}</span>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}