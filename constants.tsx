
import { Service, Review, ContactMethod } from './types';

export const SERVICES: Service[] = [
  {
    id: 'res-1',
    title: 'Elite Residential',
    description: 'Bespoke cleaning for luxury homes. We treat every surface with the care of a master conservator.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    tag: 'Home Artistry'
  },
  {
    id: 'com-1',
    title: 'Precision Corporate',
    description: 'Immaculate office environments that reflect your professionalism. In and out with Swiss-like efficiency.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
    tag: 'Executive Spaces'
  },
  {
    id: 'deep-1',
    title: 'Molecular Deep Clean',
    description: 'A comprehensive restoration of your space. We find the dust you didn\'t even know existed.',
    image: 'https://images.unsplash.com/photo-1581578731522-745d05cb9724?q=80&w=800&auto=format&fit=crop',
    tag: 'Full Restoration'
  },
  {
    id: 'con-1',
    title: 'Post-Build Refinement',
    description: 'Turning construction sites into habitable masterpieces. Rapid, meticulous, and professional.',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=800&auto=format&fit=crop',
    tag: 'After Care'
  }
];

export const REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Hans Müller',
    location: 'Munich, DE',
    text: 'German punctuality is hard to match, but Kristall Art Cleaning actually exceeded it. They arrived exactly at 08:00 and the kitchen looks brand new.',
    initials: 'HM',
    source: 'Google Review'
  },
  // Added missing initials and source properties
  {
    id: '2',
    name: 'Elena Vogt',
    location: 'Zürich, CH',
    text: 'Incredible Swiss precision. Every corner was addressed with meticulous detail. They are fast, professional, and very discreet.',
    initials: 'EV',
    source: 'Trustpilot'
  }
];

// Added missing CONTACT_METHODS export required by types.ts
export const CONTACT_METHODS: ContactMethod[] = [
  {
    id: 'tel',
    name: 'Phone',
    icon: 'phone',
    href: 'tel:+41783525778',
    color: 'blue'
  },
  {
    id: 'mail',
    name: 'Email',
    icon: 'mail',
    href: 'mailto:luxcleaning@mail.ch',
    color: 'stone'
  }
];
