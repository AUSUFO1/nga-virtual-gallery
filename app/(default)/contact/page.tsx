import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with the National Gallery of Art. Find contact details, departments, location, and social channels.',
  openGraph: {
    title: 'Contact NGA',
    description:
      'Reach the National Gallery of Art for inquiries, support, and collaborations.',
    images: ['/images/bg-hero1.jpg'], 
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
