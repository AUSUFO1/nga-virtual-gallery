'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const CONTACT_INFO = {
  address: 'Federal Secretariat Complex, Phase II, Shehu Shagari Way, Abuja, FCT.',
  phone: '+234 (80) 2 317 0178', 
  email: 'info@nga.gov.ng',
  hours: {
    weekdays: 'Monday - Friday: 9:00 AM - 5:00 PM',
    saturday: 'Saturday: 10:00 AM - 4:00 PM',
    sunday: 'Sunday: Closed',
  },
};

export default function ContactInfoCards() {
  return (
    <section className="mb-16 w-full overflow-hidden">
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-8
          max-w-7xl
          mx-auto
        "
      >
        {/* Address */}
        <InfoItem delay={0.1} icon={<MapPin />} title="Address">
          {CONTACT_INFO.address}
        </InfoItem>

        {/* Phone */}
        <InfoItem delay={0.2} icon={<Phone />} title="Phone">
          <a
            href={`tel:${CONTACT_INFO.phone}`}
            className="hover:text-nga-green transition-colors wrap-break-word"
          >
            {CONTACT_INFO.phone}
          </a>
        </InfoItem>

        {/* Email */}
        <InfoItem delay={0.3} icon={<Mail />} title="Email">
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="hover:text-nga-green transition-colors break-all"
          >
            {CONTACT_INFO.email}
          </a>
        </InfoItem>

        {/* Hours */}
        <InfoItem delay={0.4} icon={<Clock />} title="Hours">
          <p>{CONTACT_INFO.hours.weekdays}</p>
          <p>{CONTACT_INFO.hours.saturday}</p>
          <p className="text-nga-green font-medium">
            {CONTACT_INFO.hours.sunday}
          </p>
        </InfoItem>
      </div>
    </section>
  );
}

/* Reusable Item Component */
function InfoItem({
  icon,
  title,
  children,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="
        flex
        flex-col
        items-center
        text-center
        px-2
        w-full
      "
    >
      <div
        className="
          mb-4
          flex
          items-center
          justify-center
          w-12
          h-12
          rounded-full
          bg-nga-green/10
          text-nga-green
        "
      >
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-nga-navy mb-2">
        {title}
      </h3>

      <div className="text-sm text-nga-navy/80 leading-relaxed max-w-xs">
        {children}
      </div>
    </motion.div>
  );
}
