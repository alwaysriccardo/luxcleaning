
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  ArrowUpRight, 
  Phone, 
  Sparkles, 
  Star, 
  Send,
  MapPin,
  Languages,
  Hand,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Mail,
  Menu
} from 'lucide-react';

const SERVICES_DATA = [
  {
    id: 'maintenance',
    img: "/01cleaning.jpg"
  },
  {
    id: 'deep',
    img: "/02cleaning.jpg"
  },
  {
    id: 'office',
    img: "/03cleaning.jpg"
  },
  {
    id: 'windows',
    img: "/04cleaning.jpg"
  },
  {
    id: 'moving',
    img: "/05cleaning.jpg"
  },
  {
    id: 'kitchen',
    img: "/06cleaning.jpg"
  }
];

const translations = {
  de: {
    nav: {
      services: "Leistungen",
      reviews: "Bewertungen",
      quote: "Gratis Angebot",
      getQuote: "Angebot anfordern"
    },
    hero: {
      badge: "Schweizer Standard",
      title1: "Reinigung ist eine",
      title2: "Kunst",
      title3: "Exzellenz ist unser",
      title4: "Standard.",
      description: "Zuverlässig, gründlich und zu fairen Preisen. Fordern Sie jetzt Ihr kostenloses Angebot an – wir melden uns innerhalb von 24 Stunden.",
      servicesBtn: "Unsere Leistungen",
      quoteBtn: "Angebot einholen"
    },
    promo: {
      discount: "20% RABATT",
      onAll: "AUF ALLE LEISTUNGEN",
      until: "BIS ENDE FEBRUAR",
      requestNow: "JETZT ANGEBOT ANFORDERN"
    },
    services: {
      title: "Entdecken Sie Unsere Leistungen",
      subtitle: "Tippen Sie auf eine Karte, um sie zu erweitern",
      maintenance: { 
    title: "Unterhaltsreinigung",
    desc: "Regelmäßige, hochwertige Reinigung für Privat- und Geschäftsräume.",
        details: "Wöchentliche oder monatliche Reinigung mit Premium-Produkten. Inklusive Staubsaugen, Wischen, Oberflächenreinigung und Müllentsorgung. Flexible Terminvereinbarung nach Ihren Bedürfnissen."
  },
      deep: { 
    title: "Grundreinigung",
    desc: "Gründliche Tiefenreinigung für höchste Ansprüche.",
        details: "Umfassende Reinigung aller Bereiche inklusive schwer zugänglicher Stellen. Reinigung von Möbeln, Lampen, Heizkörpern und Fensterbänken. Perfekt für Einzüge oder saisonale Tiefenreinigung."
  },
      office: { 
    title: "Büro- & Gewerbereinigung",
    desc: "Sauberkeit auf Premium-Niveau für Arbeits- und Geschäftsräume.",
        details: "Diskrete Reinigung außerhalb der Geschäftszeiten. Sanitärbereiche, Küchen, Arbeitsplätze und Gemeinschaftsräume. Regelmäßige Wartung für ein professionelles Arbeitsumfeld."
  },
      windows: { 
    title: "Fenster- & Glasreinigung",
    desc: "Streifenfreie Reinigung von Fenstern, Glasflächen und Rahmen.",
        details: "Innen- und Außenreinigung mit professionellen Werkzeugen. Auch schwer erreichbare Fenster und Wintergärten. Rahmen, Dichtungen und Fensterbänke inklusive."
  },
      moving: { 
    title: "Umzugsreinigung",
    desc: "Professionelle Endreinigung mit Abnahmegarantie.",
        details: "Komplette Reinigung der alten Wohnung für die Übergabe. Küche, Badezimmer, alle Räume und Böden. Garantiert abnahmefähig für einen reibungslosen Umzug."
  },
      kitchen: { 
    title: "Sanitär- & Küchenreinigung",
    desc: "Hygienische Reinigung mit Blick fürs Detail.",
        details: "Gründliche Reinigung von Küchengeräten, Kühlschrank, Herd und Backofen. Sanitärbereiche mit Desinfektion. Entkalkung und Entfernung hartnäckiger Verschmutzungen."
      },
      requestQuote: "Angebot anfordern",
      showMore: "Mehr erfahren",
      showLess: "Weniger anzeigen"
    },
    painting: {
      title: "Zusätzlich: Malerarbeiten",
      subtitle: "nur Weiß",
      description: "Saubere, präzise Malerarbeiten in Weiß – ideal für Auszüge, Renovationen und Auffrischungen"
    },
    reviews: {
      title: "Unsere zufriedenen Kunden",
      customer: "Kunde",
      googleReviews: "Google Bewertungen",
      rating: "4.9",
      percentage: "98% 5-Sterne Bewertungen",
      viewAll: "Alle Bewertungen anzeigen",
      readMore: "Mehr lesen",
      readLess: "Weniger"
    },
    contact: {
      title: "Bereit zu glänzen?",
      description: "Schildern Sie uns Ihr Anliegen. Wir erstellen Ihnen innerhalb von 24h ein personalisiertes Angebot.",
      freeQuote: "Gratis Angebot",
      name: "Name",
      email: "Email",
      message: "Ihre Nachricht...",
      submit: "Absenden",
      phone: "Anruf / WhatsApp",
      location: "Standort"
    },
    footer: {
      tagline: "Die Kunst der Sauberkeit",
      copyright: "© 2026 LUX CLEANING. FÜR PERFEKTE SAUBERKEIT.",
      imprint: "Impressum",
      privacy: "Datenschutz"
    },
    promoModal: {
      title: "20% RABATT FÜR NEUE KUNDEN",
      subtitle: "Exklusives Angebot - Gültig bis Ende Februar",
      name: "Name",
      email: "Email",
      phone: "Telefon",
      submit: "Angebot sichern",
      later: "Später",
      success: "Vielen Dank! Wir senden Ihnen das Angebot per Email.",
      close: "Schließen"
    }
  },
  en: {
    nav: {
      services: "Services",
      reviews: "Reviews",
      quote: "Free Quote",
      getQuote: "Get a Quote"
    },
    hero: {
      badge: "Swiss Standard",
      title1: "Cleaning is an",
      title2: "art",
      title3: "excellence is our",
      title4: "standard.",
      description: "Reliable, thorough, and fairly priced. Request your free quote now – we'll get back to you within 24 hours.",
      servicesBtn: "Our Services",
      quoteBtn: "Get a Quote"
    },
    promo: {
      discount: "20% DISCOUNT",
      onAll: "ON ALL SERVICES",
      until: "UNTIL END OF FEBRUARY",
      requestNow: "REQUEST QUOTE NOW"
    },
    services: {
      title: "Explore Our Services",
      subtitle: "Tap any card to expand",
      maintenance: { 
        title: "Maintenance Cleaning", 
        desc: "Regular, high-quality cleaning for private and commercial spaces.",
        details: "Weekly or monthly cleaning with premium products. Includes vacuuming, mopping, surface cleaning, and waste disposal. Flexible scheduling to suit your needs."
      },
      deep: { 
        title: "Deep Cleaning", 
        desc: "Thorough deep cleaning for the highest standards.",
        details: "Comprehensive cleaning of all areas including hard-to-reach spots. Furniture, light fixtures, radiators, and window sills. Perfect for move-ins or seasonal deep cleans."
      },
      office: { 
        title: "Office & Commercial Cleaning", 
        desc: "Premium-level cleanliness for work and business spaces.",
        details: "Discreet cleaning outside business hours. Restrooms, kitchens, workstations, and common areas. Regular maintenance for a professional work environment."
      },
      windows: { 
        title: "Window & Glass Cleaning", 
        desc: "Streak-free cleaning of windows, glass surfaces, and frames.",
        details: "Interior and exterior cleaning with professional tools. Hard-to-reach windows and conservatories included. Frames, seals, and window sills cleaned thoroughly."
      },
      moving: { 
        title: "Move-out Cleaning", 
        desc: "Professional final cleaning with acceptance guarantee.",
        details: "Complete cleaning of the old apartment for handover. Kitchen, bathroom, all rooms and floors. Guaranteed acceptance-ready for a smooth move."
      },
      kitchen: { 
        title: "Bathroom & Kitchen Cleaning", 
        desc: "Hygienic cleaning with attention to detail.",
        details: "Thorough cleaning of kitchen appliances, refrigerator, stove, and oven. Sanitary areas with disinfection. Descaling and removal of stubborn stains."
      },
      requestQuote: "Request Quote",
      showMore: "Learn More",
      showLess: "Show Less"
    },
    painting: {
      title: "Additionally: Painting Services",
      subtitle: "White Only",
      description: "Clean, precise white painting work – ideal for move-outs, renovations, and touch-ups"
    },
    reviews: {
      title: "Our Satisfied Customers",
      customer: "Customer",
      googleReviews: "Google Reviews",
      rating: "4.9",
      percentage: "98% 5-Star Reviews",
      viewAll: "View All Reviews",
      readMore: "Read More",
      readLess: "Show Less"
    },
    contact: {
      title: "Ready to shine?",
      description: "Tell us about your needs. We'll create a personalized quote within 24 hours.",
      freeQuote: "Free Quote",
      name: "Name",
      email: "Email",
      message: "Your message...",
      submit: "Submit",
      phone: "Call / WhatsApp",
      location: "Location"
    },
    footer: {
      tagline: "The Art of Cleanliness",
      copyright: "© 2026 LUX CLEANING. FOR PERFECT CLEANLINESS.",
      imprint: "Imprint",
      privacy: "Privacy"
    },
    promoModal: {
      title: "20% DISCOUNT FOR NEW CUSTOMERS",
      subtitle: "Exclusive Offer - Valid Until End of February",
      name: "Name",
      email: "Email",
      phone: "Phone",
      submit: "Secure Offer",
      later: "Later",
      success: "Thank you! We'll send you the offer via email.",
      close: "Close"
    }
  },
  fr: {
    nav: {
      services: "Services",
      reviews: "Avis",
      quote: "Devis Gratuit",
      getQuote: "Demander un Devis"
    },
    hero: {
      badge: "Standard Suisse",
      title1: "Le nettoyage est un",
      title2: "art",
      title3: "l'excellence est notre",
      title4: "standard.",
      description: "Fiable, minutieux et à prix équitable. Demandez votre devis gratuit – nous vous répondons sous 24 heures.",
      servicesBtn: "Nos Services",
      quoteBtn: "Demander un Devis"
    },
    promo: {
      discount: "20% DE RÉDUCTION",
      onAll: "SUR TOUS LES SERVICES",
      until: "JUSQU'À LA FIN FÉVRIER",
      requestNow: "DEMANDER UN DEVIS MAINTENANT"
    },
    services: {
      title: "Découvrez Nos Services",
      subtitle: "Appuyez sur une carte pour l'agrandir",
      maintenance: { 
        title: "Nettoyage Régulier", 
        desc: "Nettoyage régulier et de haute qualité pour espaces privés et commerciaux.",
        details: "Nettoyage hebdomadaire ou mensuel avec des produits premium. Aspiration, serpillière, nettoyage des surfaces et gestion des déchets. Planification flexible selon vos besoins."
      },
      deep: { 
        title: "Nettoyage en Profondeur", 
        desc: "Nettoyage approfondi pour les plus hauts standards.",
        details: "Nettoyage complet de tous les espaces y compris les endroits difficiles d'accès. Meubles, luminaires, radiateurs et appuis de fenêtre. Parfait pour les emménagements ou nettoyages saisonniers."
      },
      office: { 
        title: "Nettoyage de Bureau & Commercial", 
        desc: "Propreté de niveau premium pour espaces de travail et commerciaux.",
        details: "Nettoyage discret en dehors des heures de bureau. Sanitaires, cuisines, postes de travail et espaces communs. Entretien régulier pour un environnement professionnel."
      },
      windows: { 
        title: "Nettoyage de Fenêtres & Vitres", 
        desc: "Nettoyage sans traces des fenêtres, surfaces vitrées et cadres.",
        details: "Nettoyage intérieur et extérieur avec outils professionnels. Fenêtres difficiles d'accès et vérandas inclus. Cadres, joints et appuis de fenêtre nettoyés en profondeur."
      },
      moving: { 
        title: "Nettoyage après Déménagement", 
        desc: "Nettoyage final professionnel avec garantie d'acceptation.",
        details: "Nettoyage complet de l'ancien appartement pour la remise des clés. Cuisine, salle de bain, toutes les pièces et sols. Garanti prêt pour acceptation pour un déménagement sans tracas."
      },
      kitchen: { 
        title: "Nettoyage Sanitaire & Cuisine", 
        desc: "Nettoyage hygiénique avec attention aux détails.",
        details: "Nettoyage approfondi des appareils de cuisine, réfrigérateur, cuisinière et four. Espaces sanitaires avec désinfection. Détartrage et élimination des taches tenaces."
      },
      requestQuote: "Demander un Devis",
      showMore: "En savoir plus",
      showLess: "Afficher moins"
    },
    painting: {
      title: "En Plus: Travaux de Peinture",
      subtitle: "Uniquement Blanc",
      description: "Travaux de peinture blancs propres et précis – idéal pour les déménagements, rénovations et retouches"
    },
    reviews: {
      title: "Nos Clients Satisfaits",
      customer: "Client",
      googleReviews: "Avis Google",
      rating: "4.9",
      percentage: "98% Avis 5 Étoiles",
      viewAll: "Voir Tous les Avis",
      readMore: "Lire Plus",
      readLess: "Moins"
    },
    contact: {
      title: "Prêt à briller?",
      description: "Décrivez-nous vos besoins. Nous créerons un devis personnalisé sous 24 heures.",
      freeQuote: "Devis Gratuit",
      name: "Nom",
      email: "Email",
      message: "Votre message...",
      submit: "Envoyer",
      phone: "Appel / WhatsApp",
      location: "Emplacement"
    },
    footer: {
      tagline: "L'Art de la Propreté",
      copyright: "© 2026 LUX CLEANING. POUR UNE PROPRETÉ PARFAITE.",
      imprint: "Mentions Légales",
      privacy: "Confidentialité"
    },
    promoModal: {
      title: "20% DE RÉDUCTION POUR NOUVEAUX CLIENTS",
      subtitle: "Offre Exclusive - Valable Jusqu'à la Fin Février",
      name: "Nom",
      email: "Email",
      phone: "Téléphone",
      submit: "Réserver l'Offre",
      later: "Plus Tard",
      success: "Merci! Nous vous enverrons l'offre par email.",
      close: "Fermer"
    }
  }
};

const REVIEWS = [
  {
    name: "Thomas B.",
    service: "Unterhaltsreinigung",
    text: "Seit 3 Monaten kommt Lux Cleaning wöchentlich zu uns. Catalin und sein Team sind immer pünktlich und machen wirklich gründliche Arbeit. Besonders die Küche und Bäder sind immer perfekt sauber. Kann ich nur empfehlen!",
    initials: "TB"
  },
  {
    name: "Sabine K.",
    service: "Fenster- & Glasreinigung",
    text: "Habe die Fensterreinigung gebucht und war echt überrascht wie sauber die geworden sind. Keine Streifen, keine Flecken. Die Jungs waren auch sehr vorsichtig mit meinen Pflanzen am Fensterbrett. Top Service! :)",
    initials: "SK"
  },
  {
    name: "Michael S.",
    service: "Umzugsreinigung",
    text: "Nach unserem Umzug war die Wohnung ein Chaos. Lux Cleaning hat alles wieder auf Vordermann gebracht. Catalin hat sogar noch ein paar Ecken gereinigt die ich gar nicht gesehen hatte. Sehr zuverlässig und gründlich.",
    initials: "MS"
  },
  {
    name: "Julia F.",
    service: "Büro- & Gewerbereinigung",
    text: "Unser Büro wird jetzt regelmäßig von Lux Cleaning gereinigt. Die Mitarbeiter sind sehr diskret und stören nie während der Arbeitszeit. Alles ist immer ordentlich und sauber wenn wir morgens kommen. :)",
    initials: "JF"
  },
  {
    name: "Andreas W.",
    service: "Grundreinigung",
    text: "Habe eine Grundreinigung für meine neue Wohnung gebucht. War echt beeindruckt wie gründlich die waren. Sogar hinter den Möbeln wurde alles sauber gemacht. Preis-Leistung ist super fair.",
    initials: "AW"
  },
  {
    name: "Nicole H.",
    service: "Sanitär- & Küchenreinigung",
    text: "Die Küche und Bäder waren nach der Reinigung wie neu. Besonders das Bad glänzt jetzt richtig. Catalin hat mir auch ein paar Tipps gegeben wie ich es länger sauber halten kann. Sehr freundlich und professionell! :)",
    initials: "NH"
  },
  {
    name: "Daniel B.",
    service: "Fenster- & Glasreinigung",
    text: "Habe die Fenster vor dem Winter reinigen lassen. War echt zufrieden, alles streifenfrei und die Rahmen wurden auch mitgereinigt. Kommt nächstes Jahr wieder.",
    initials: "DB"
  },
  {
    name: "Martina Z.",
    service: "Unterhaltsreinigung",
    text: "Bin berufstätig und habe keine Zeit für die Hausreinigung. Lux Cleaning übernimmt das jetzt für mich. Die Wohnung sieht immer top aus und ich muss mir keine Sorgen mehr machen. Absolut empfehlenswert! :)",
    initials: "MZ"
  },
  {
    name: "Stefan R.",
    service: "Büro- & Gewerbereinigung",
    text: "Unser Geschäft wird seit einem Jahr von Lux Cleaning betreut. Immer zuverlässig, immer gründlich. Die Kunden bemerken die Sauberkeit sofort. Top! :)",
    initials: "SR"
  },
  {
    name: "Claudia M.",
    service: "Grundreinigung",
    text: "Nach dem Einzug war alles perfekt sauber. Sogar die Fensterrahmen wurden mitgereinigt. Sehr professionell und freundlich. Kann ich nur weiterempfehlen! :)",
    initials: "CM"
  },
  {
    name: "Robert K.",
    service: "Fenster- & Glasreinigung",
    text: "Die Fensterreinigung war spitze. Keine Streifen, alles blitzblank. Die Jungs waren sehr sorgfältig. Werde ich definitiv wieder buchen. :)",
    initials: "RK"
  },
  {
    name: "Sarah L.",
    service: "Unterhaltsreinigung",
    text: "Seit 6 Monaten wöchentliche Reinigung. Immer pünktlich, immer gründlich. Die Wohnung sieht immer perfekt aus. Beste Entscheidung! :)",
    initials: "SL"
  }
];

const App = () => {
  const [language, setLanguage] = useState<'de' | 'en' | 'fr'>('de');
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const [promoModalOpen, setPromoModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [expandedReview, setExpandedReview] = useState<number | null>(null);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isReviewPaused, setIsReviewPaused] = useState(false);
  const [contactFormData, setContactFormData] = useState({ name: '', email: '', message: '' });
  const [contactFormSubmitted, setContactFormSubmitted] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const promoModalShown = useRef(false);
  const reviewIntervalRef = useRef<number | null>(null);
  const reviewCarouselRef = useRef<HTMLDivElement>(null);
  const servicesScrollRef = useRef<HTMLDivElement>(null);
  const [navTextColor, setNavTextColor] = useState<'light' | 'dark'>('dark');
  const t = translations[language];

  // Preloader effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Detect background color for nav text
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('nav');
      if (!nav) return;

      const navRect = nav.getBoundingClientRect();
      const navCenterY = navRect.top + navRect.height / 2;
      const elementBelow = document.elementFromPoint(window.innerWidth / 2, navCenterY);
      
      if (elementBelow) {
        // Get computed background color
        const bgColor = window.getComputedStyle(elementBelow).backgroundColor;
        const rgb = bgColor.match(/\d+/g);
        
        if (rgb && rgb.length >= 3) {
          const r = parseInt(rgb[0]);
          const g = parseInt(rgb[1]);
          const b = parseInt(rgb[2]);
          // Calculate luminance
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          // Use light text on dark backgrounds, dark text on light backgrounds
          setNavTextColor(luminance < 0.5 ? 'light' : 'dark');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView();
  };

  const changeLanguage = (lang: 'de' | 'en' | 'fr') => {
    setLanguage(lang);
    setLanguageMenuOpen(false);
  };

  const languageNames = {
    de: 'Deutsch',
    en: 'English',
    fr: 'Français'
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setLanguageMenuOpen(false);
      }
    };

    if (languageMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [languageMenuOpen]);

  // Parallax effect for hero image - optimized with throttling
  useEffect(() => {
    let rafId: number | null = null;
    let lastScrollY = 0;
    const PARALLAX_SPEED = 0.4;
    const SCROLL_THROTTLE = 16; // ~60fps
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Throttle scroll updates
      if (Math.abs(currentScrollY - lastScrollY) < 5) return;
      lastScrollY = currentScrollY;
      
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      
      rafId = requestAnimationFrame(() => {
        if (heroRef.current) {
          const heroImage = heroRef.current.querySelector('.hero-bg-image') as HTMLImageElement;
          if (heroImage && currentScrollY < window.innerHeight) {
            heroImage.style.transform = `translate3d(0, ${currentScrollY * PARALLAX_SPEED}px, 0)`;
          }
        }
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);


  // Promo Modal - Show after 3 seconds or on scroll
  useEffect(() => {
    if (promoModalShown.current) return;

    const showModal = () => {
      if (!promoModalShown.current) {
        setPromoModalOpen(true);
        promoModalShown.current = true;
      }
    };

    // Show after 3 seconds
    const timer = setTimeout(showModal, 3000);

    // Show on scroll (50% down the page)
    let scrollTriggered = false;
    const handleScroll = () => {
      if (!scrollTriggered && window.scrollY > window.innerHeight * 0.5) {
        scrollTriggered = true;
        clearTimeout(timer);
        showModal();
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email.trim()) return;
    
    // Create email content
    const subject = encodeURIComponent('20% Rabatt Anfrage - Lux Cleaning');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nTelefon: ${formData.phone}\n\nIch interessiere mich für das 20% Rabatt Angebot.`
    );
    
    // Open email client
    window.location.href = `mailto:luxcleaning@mail.ch?subject=${subject}&body=${body}`;
    
    // Show success message
    setFormSubmitted(true);
    
    // Close modal after 3 seconds
    setTimeout(() => {
      setPromoModalOpen(false);
      setFormSubmitted(false);
      setFormData({ name: '', email: '', phone: '' });
    }, 3000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactFormData.email.trim() || !contactFormData.name.trim()) return;
    
    // Create email content
    const subject = encodeURIComponent('Anfrage von Website - Lux Cleaning');
    const body = encodeURIComponent(
      `Name: ${contactFormData.name}\nEmail: ${contactFormData.email}\n\nNachricht:\n${contactFormData.message}`
    );
    
    // Open email client
    window.location.href = `mailto:luxcleaning@mail.ch?subject=${subject}&body=${body}`;
    
    // Show success and reset form
    setContactFormSubmitted(true);
    setContactFormData({ name: '', email: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setContactFormSubmitted(false);
    }, 5000);
  };

  // Horizontal carousel seamless infinite scroll
  useEffect(() => {
    if (!reviewCarouselRef.current) return;

    const carousel = reviewCarouselRef.current;
    if (!carousel) return;

    const SCROLL_SPEED = 0.5; // pixels per frame (adjust for speed)
    let animationFrameId: number | null = null;

    const scrollCarousel = () => {
      if (!carousel) {
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId);
        }
        return;
      }

      // Only scroll if not paused
      if (!isReviewPaused) {
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        
        // Only proceed if carousel is ready
        if (maxScroll > 0) {
          const currentScroll = carousel.scrollLeft;
          
          // Seamless infinite loop: when we reach halfway (first set of reviews),
          // reset to the equivalent position in the first half (invisible to user)
          const halfPoint = maxScroll / 2;
          if (currentScroll >= halfPoint) {
            carousel.scrollLeft = currentScroll - halfPoint;
          } else {
            carousel.scrollLeft = currentScroll + SCROLL_SPEED;
          }
        }
      }

      animationFrameId = requestAnimationFrame(scrollCarousel);
    };

    // Start the animation
    animationFrameId = requestAnimationFrame(scrollCarousel);

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isReviewPaused]);

  // Memoize SERVICES to prevent recalculation on every render
  const SERVICES = useMemo(() => {
    const serviceKeys = ['maintenance', 'deep', 'office', 'windows', 'moving', 'kitchen'] as const;
    return SERVICES_DATA.map((s, idx) => {
      const key = serviceKeys[idx];
      return {
        ...s,
        title: t.services[key].title,
        desc: t.services[key].desc,
        details: t.services[key].details
      };
    });
  }, [t.services]);

  // Lock body scroll when service overlay is open
  useEffect(() => {
    if (expandedService !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [expandedService]);

  return (
    <>
      {/* Preloader */}
      {isLoading && (
        <div className="preloader fixed inset-0 bg-white z-[9999] flex items-center justify-center">
          <div className="text-center">
            <div className="preloader-logo mb-6">
              <img 
                src="/preloader-logo.png" 
                alt="Lux Cleaning & Hauswartung" 
                className="mx-auto max-w-[280px] md:max-w-[350px] h-auto preloader-icon"
                loading="eager"
              />
            </div>
            <div className="preloader-spinner w-8 h-8 border-3 border-stone-200 border-t-blue-600 rounded-full mx-auto"></div>
          </div>
        </div>
      )}

      {/* Promo Modal */}
      {promoModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setPromoModalOpen(false)}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
          
          {/* Modal */}
          <div 
            className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 animate-modal-in-smooth"
            onClick={(e) => e.stopPropagation()}
            style={{
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setPromoModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              aria-label="Close modal"
            >
              <X size={18} className="text-white" />
            </button>

            {/* Content */}
            {!formSubmitted ? (
              <>
                {/* Badge */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-yellow-400/20 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-400/30 mb-4">
                    <span className="text-3xl font-bold text-yellow-400">20%</span>
                    <span className="text-white/90 text-sm font-bold uppercase">RABATT</span>
                  </div>
                  <h3 className="font-serif-display text-3xl md:text-4xl text-white mb-2 drop-shadow-lg">
                    {t.promoModal.title}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {t.promoModal.subtitle}
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handlePromoSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder={t.promoModal.name}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all"
                  />
                  <input
                    type="email"
                    placeholder={t.promoModal.email}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all"
                  />
                  <input
                    type="tel"
                    placeholder={t.promoModal.phone}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all"
                  />
                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 bg-yellow-400 text-[#1a1a1a] px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-yellow-500 transition-all shadow-lg"
                    >
                      {t.promoModal.submit}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPromoModalOpen(false)}
                      className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-xl font-medium text-sm hover:bg-white/20 transition-all"
                    >
                      {t.promoModal.later}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles size={32} className="text-yellow-400" />
                </div>
                <h3 className="font-serif-display text-2xl text-white mb-2">{t.promoModal.success}</h3>
                <p className="text-white/70 text-sm">{t.promoModal.close}</p>
              </div>
            )}
          </div>
        </div>
      )}

    <div className="p-2 md:p-4 lg:p-6 w-full max-w-[1800px] mx-auto min-h-screen bg-[#Fdfcf8]">
      <div className="bg-[#Fdfcf8] rounded-[2.5rem] w-full relative flex flex-col border border-[#e5e2dd] shadow-sm overflow-hidden">
        
          {/* Language Switcher */}
        <div className="fixed bottom-6 right-6 md:right-12 z-50" ref={languageMenuRef}>
          <button
            onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
            className="bg-white/90 backdrop-blur-md px-3 py-2 rounded-full border border-black/10 shadow-lg hover:shadow-xl transition-all flex items-center gap-1.5 group"
            title="Change Language"
            aria-label="Change Language"
            aria-expanded={languageMenuOpen}
            aria-haspopup="true"
          >
            <Languages size={14} className="text-stone-700" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-700">
              {language.toUpperCase()}
              </span>
          </button>
          
          {/* Dropdown Menu */}
          {languageMenuOpen && (
            <div className="absolute bottom-full right-0 mb-2 bg-white rounded-2xl border border-black/10 shadow-xl overflow-hidden min-w-[140px]">
              {(['de', 'en', 'fr'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLanguage(lang)}
                  className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors flex items-center justify-between ${
                    language === lang
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <span>{languageNames[lang]}</span>
                  {language === lang && (
                    <span className="text-blue-600">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
          </div>
        
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-between items-center px-6 md:px-12 max-w-[1800px] mx-auto pt-8 pointer-events-none">
            {/* Company Name - Top Left */}
            <div className="pointer-events-auto">
              <div className="text-left">
                <div className={`font-serif-display text-lg md:text-xl font-semibold tracking-tight transition-colors duration-300 ${
                  navTextColor === 'light' ? 'text-white drop-shadow-lg' : 'text-[#1a1a1a]'
                }`}>
                  Lux Cleaning
                </div>
                <div className={`font-serif-display text-sm md:text-base tracking-tight transition-colors duration-300 ${
                  navTextColor === 'light' ? 'text-white/90 drop-shadow-lg' : 'text-stone-600'
                }`}>
                  & Hauswartung
                </div>
              </div>
            </div>

            <div className="pointer-events-auto flex items-center gap-1 bg-white/80 backdrop-blur-md px-1.5 py-1.5 rounded-full border border-black/5 shadow-sm">
              <button onClick={() => scrollToSection('services')} className="px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-stone-100 transition-colors">{t.nav.services}</button>
              <button onClick={() => scrollToSection('reviews')} className="px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-stone-100 transition-colors">{t.nav.reviews}</button>
              <button onClick={() => scrollToSection('angebot')} className="px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest bg-yellow-400 hover:bg-yellow-500 transition-colors">{t.nav.quote}</button>
            </div>

            <div className="pointer-events-auto relative">
              <button 
                onClick={() => scrollToSection('angebot')}
                className="nav-quote-btn flex items-center gap-2 bg-white/90 backdrop-blur-md text-[#1a1a1a] px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all group relative border border-white/50 shadow-[0_0_20px_rgba(251,191,36,0.5)]"
                style={{
                  backdropFilter: 'blur(12px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(12px) saturate(180%)'
                }}
                aria-label="Angebot anfordern"
              >
                <span className="relative z-10">ANGEBOT</span>
              </button>
              {/* Badge with text */}
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-[#1a1a1a] text-[8px] font-black uppercase tracking-wider px-2 py-1 rounded-full shadow-lg border border-yellow-300">
                20% OFF
              </div>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="md:hidden w-full bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm px-4 py-3 flex items-center justify-between pointer-events-auto">
            {/* Menu Button - Left */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2"
              aria-label="Toggle menu"
            >
              <Menu size={24} className="text-[#1a1a1a]" />
            </button>

            {/* Brand Name - Center */}
            <div className="text-center flex-1">
              <div className="font-serif-display text-base font-semibold text-[#1a1a1a] tracking-tight">
                Lux Cleaning
              </div>
              <div className="font-serif-display text-xs text-stone-600 tracking-tight">
                & Hauswartung
              </div>
            </div>

            {/* Angebot Button - Right */}
            <div className="relative">
              <button 
                onClick={() => scrollToSection('angebot')}
                className="flex items-center gap-1.5 bg-yellow-400 text-[#1a1a1a] px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all"
                aria-label="Angebot anfordern"
              >
                <span>ANGEBOT</span>
              </button>
              {/* Badge with text */}
              <div className="absolute -top-1 -right-1 bg-yellow-500 text-[#1a1a1a] text-[7px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full border border-yellow-400">
                20%
              </div>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          {mobileMenuOpen && (
            <div className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm pointer-events-auto" onClick={() => setMobileMenuOpen(false)}>
              <div className="bg-white w-64 h-full shadow-xl" onClick={(e) => e.stopPropagation()}>
                <div className="p-6 border-b border-stone-200 flex items-center justify-between">
                  <div className="font-serif-display text-lg font-semibold text-[#1a1a1a]">Menu</div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 -mr-2"
                    aria-label="Close menu"
                  >
                    <X size={20} className="text-[#1a1a1a]" />
                  </button>
                </div>
                <div className="py-4">
                  <button
                    onClick={() => {
                      scrollToSection('services');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-6 py-4 text-sm font-bold uppercase tracking-widest text-[#1a1a1a] hover:bg-stone-100 transition-colors"
                  >
                    SERVICES
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection('angebot');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-6 py-4 text-sm font-bold uppercase tracking-widest text-[#1a1a1a] hover:bg-stone-100 transition-colors"
                  >
                    GET A QUOTE
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection('angebot');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-6 py-4 text-sm font-bold uppercase tracking-widest text-[#1a1a1a] hover:bg-stone-100 transition-colors"
                  >
                    CONTACT
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <header ref={heroRef} className="relative w-full min-h-screen flex flex-col items-center justify-center pt-24 md:pt-32 pb-20 px-6 text-center overflow-hidden">
          {/* Background Image - Behind everything */}
          <div className="absolute inset-0 z-0 overflow-hidden bg-[#Fdfcf8]">
            <img
              src="/hero-gloves-image.jpg"
              alt="Professionelle Reinigungsdienstleistungen in der Schweiz"
              className="hero-bg-image absolute inset-0 w-full h-full object-cover"
              style={{
                filter: 'brightness(0.9) blur(1.5px)',
                willChange: 'transform'
              }}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/5 to-[#Fdfcf8]/90 z-[1]"></div>
          </div>

          {/* Content - In front of background */}
          <div className="max-w-5xl mx-auto relative z-10">
            <h1 className="fade-in-up delay-100 font-serif-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] text-white mb-8 md:mb-10 tracking-tight drop-shadow-2xl">
              {t.hero.title1} <span className="italic text-yellow-400 drop-shadow-lg">{t.hero.title2}</span>, <br />
              {t.hero.title3} <span className="italic text-yellow-400 drop-shadow-lg">{t.hero.title4}</span>
            </h1>

            <p className="fade-in-up delay-200 text-white text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light mb-8 md:mb-12 drop-shadow-lg px-4">
              {t.hero.description}
            </p>

            <div className="fade-in-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-[280px] sm:max-w-none mx-auto">
              <button 
                onClick={() => scrollToSection('angebot')} 
                className="w-full sm:w-auto px-10 py-5 rounded-full bg-yellow-400 text-[#1a1a1a] text-[11px] font-bold uppercase tracking-[0.2em] md:hover:bg-white md:hover:scale-105 transition-all duration-200 shadow-2xl"
              >
                {t.hero.quoteBtn}
              </button>
              <button 
                onClick={() => scrollToSection('services')} 
                className="w-full sm:w-auto px-10 py-5 rounded-full border-2 border-white bg-white/10 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-[0.2em] md:hover:bg-yellow-400 md:hover:border-yellow-400 md:hover:text-[#1a1a1a] md:hover:scale-105 transition-colors duration-200 shadow-xl"
              >
                {t.hero.servicesBtn}
              </button>
            </div>
          </div>
        </header>

        {/* Reviews Section - Right Below Hero */}
        <section id="reviews" className="py-6 md:py-12 bg-white border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-6">
            {/* Google Reviews Badge & Stats */}
            <div className="text-center mb-4 md:mb-8">
              <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-2xl border border-stone-200 shadow-lg">
                <div className="flex items-center gap-2">
                  <svg className="w-7 h-7" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xl font-bold text-[#1a1a1a]">{t.reviews.rating}</div>
                    <div className="flex text-yellow-400">
                      {[1,2,3,4,5].map(star => <Star key={star} size={14} fill="currentColor" />)}
                    </div>
                  </div>
                </div>
                <div className="h-10 w-px bg-stone-300 mx-2"></div>
                <div className="text-left">
                  <div className="text-base font-bold text-[#1a1a1a]">{t.reviews.googleReviews}</div>
                  <div className="text-xs text-stone-500">{t.reviews.percentage}</div>
                </div>
          </div>
        </div>

            {/* Horizontal Carousel */}
            <div 
              ref={reviewCarouselRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
              onMouseEnter={() => setIsReviewPaused(true)}
              onMouseLeave={() => setIsReviewPaused(false)}
            >
              {[...REVIEWS.slice(0, 12), ...REVIEWS.slice(0, 12)].map((r, idx) => {
                const isExpanded = expandedReview === idx;
                const shortText = r.text.length > 120 ? r.text.substring(0, 120) + '...' : r.text;
                
                return (
                  <div
                    key={idx}
                    className="flex-shrink-0 w-[300px] bg-white rounded-xl p-3 md:p-5 border border-stone-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    {/* Service Badge */}
                    <div className="mb-2 md:mb-3">
                      <span className="inline-block px-2.5 py-1 bg-stone-100 rounded-full text-[9px] font-bold uppercase tracking-wider text-stone-600">
                        {r.service}
                      </span>
          </div>

                    {/* Stars */}
                    <div className="flex text-yellow-400 mb-2 md:mb-3">
                      {[1,2,3,4,5].map(star => <Star key={star} size={14} fill="currentColor" />)}
                    </div>

                    {/* Review Text */}
                    <div className="mb-3 md:mb-4">
                      <p className="text-stone-700 leading-relaxed text-sm">
                        {isExpanded ? r.text : shortText}
                      </p>
                      {r.text.length > 120 && (
                        <button
                          onClick={() => setExpandedReview(isExpanded ? null : idx)}
                          className="mt-1.5 text-blue-600 text-xs font-medium hover:underline"
                        >
                          {isExpanded ? t.reviews.readLess : t.reviews.readMore}
                        </button>
                      )}
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-2.5 pt-2 md:pt-3 border-t border-stone-100">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-xs font-bold text-white">
                        {r.initials}
                      </div>
                      <div>
                        <div className="font-semibold text-stone-900 text-sm">{r.name}</div>
                        <div className="text-[10px] text-stone-500">{t.reviews.customer}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services Section - Horizontal Scroll (Desktop) / Vertical (Mobile) */}
        <section id="services" className="relative bg-white pt-8 md:pt-12 pb-8 overflow-hidden">
          <div className="px-6 md:px-12 text-center mb-8 md:mb-12">
            <h2 className="font-serif-display text-5xl md:text-7xl lg:text-8xl text-[#1a1a1a] tracking-tight italic font-light relative inline-block">
              {t.services.title}
            </h2>
            {/* Mobile subtitle */}
            <p className="lg:hidden mt-4 text-sm text-stone-500 font-light italic">
              {t.services.subtitle}
            </p>
          </div>

          {/* Desktop: Horizontal Scroll with Arrows */}
          <div className="hidden lg:block relative pb-8">
            {/* Left Arrow */}
            <button
              onClick={() => {
                if (servicesScrollRef.current) {
                  const startScroll = servicesScrollRef.current.scrollLeft;
                  const targetScroll = Math.max(0, startScroll - 450);
                  const duration = 300;
                  const startTime = performance.now();
                  
                  const animateScroll = (currentTime: number) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const ease = 1 - Math.pow(1 - progress, 3);
                    servicesScrollRef.current!.scrollLeft = startScroll + (targetScroll - startScroll) * ease;
                    
                    if (progress < 1) {
                      requestAnimationFrame(animateScroll);
                    }
                  };
                  requestAnimationFrame(animateScroll);
                }
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md border border-black/10 shadow-lg hover:bg-white hover:scale-110 transition-transform duration-200"
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} className="text-[#1a1a1a]" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => {
                if (servicesScrollRef.current) {
                  const startScroll = servicesScrollRef.current.scrollLeft;
                  const maxScroll = servicesScrollRef.current.scrollWidth - servicesScrollRef.current.clientWidth;
                  const targetScroll = Math.min(maxScroll, startScroll + 450);
                  const duration = 300;
                  const startTime = performance.now();
                  
                  const animateScroll = (currentTime: number) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const ease = 1 - Math.pow(1 - progress, 3);
                    servicesScrollRef.current!.scrollLeft = startScroll + (targetScroll - startScroll) * ease;
                    
                    if (progress < 1) {
                      requestAnimationFrame(animateScroll);
                    }
                  };
                  requestAnimationFrame(animateScroll);
                }
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md border border-black/10 shadow-lg hover:bg-white hover:scale-110 transition-transform duration-200"
              aria-label="Scroll right"
            >
              <ChevronRight size={24} className="text-[#1a1a1a]" />
            </button>

            {/* Scrollable Container */}
            <div 
              ref={servicesScrollRef}
              className="overflow-x-auto scrollbar-hide pb-8 px-6 md:px-12 gap-6 min-w-0 w-full flex"
            >
              {SERVICES.map((s, idx) => {
                const isExpanded = expandedService === idx;
                
                return (
                  <div
                    key={idx}
                    className="flex-shrink-0 w-[400px] h-[500px] relative overflow-hidden rounded-2xl cursor-pointer group"
                    onClick={() => setExpandedService(isExpanded ? null : idx)}
                  >
                    {/* Service Card Image */}
                    <div className="absolute inset-0">
                  <img 
                    src={s.img} 
                    alt={s.title} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="eager"
                      decoding="async"
                    onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800'}
                  />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>
                </div>

                    {/* Expand Icon - Top Right Corner */}
                    <div className="absolute top-4 right-4 z-20 pointer-events-none">
                      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full border border-white/30 shadow-lg group-hover:bg-white/30 transition-colors duration-200">
                        <Maximize2 size={16} className="text-white" />
                        <span className="text-white text-[10px] font-medium uppercase tracking-wider hidden sm:inline">Tap</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10 pointer-events-none">
                      <div className="mb-2 opacity-70">
                        <span className="font-serif-display text-4xl font-light">{String(idx + 1).padStart(2, '0')}</span>
                      </div>
                      <h3 className="font-serif-display text-3xl mb-2 tracking-tight font-semibold drop-shadow-lg">
                        {s.title}
                      </h3>
                      <p className="text-sm leading-relaxed font-light mb-4 line-clamp-2 drop-shadow-md">
                        {s.desc}
                      </p>
                <button 
                        className="px-6 py-2.5 rounded-full bg-white text-[#1a1a1a] text-[10px] font-bold uppercase tracking-wider hover:bg-yellow-400 transition-colors duration-200 pointer-events-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedService(isExpanded ? null : idx);
                        }}
                      >
                        {t.services.showMore}
                </button>
              </div>
          </div>
                );
              })}
            </div>
          </div>

          {/* Mobile: Vertical Scroll */}
          <div className="lg:hidden flex flex-col gap-6 px-6">
            {SERVICES.map((s, idx) => {
              const isExpanded = expandedService === idx;
              
              return (
                <div
                  key={idx}
                  className="w-full h-[400px] relative overflow-hidden rounded-2xl cursor-pointer group"
                  onClick={() => setExpandedService(isExpanded ? null : idx)}
                >
                  {/* Service Card Image */}
                  <div className="absolute inset-0">
                    <img 
                      src={s.img} 
                      alt={s.title} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="eager"
                      decoding="async"
                      onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800'}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>
                    </div>

                  {/* Expand Icon - Top Right Corner */}
                  <div className="absolute top-4 right-4 z-20 pointer-events-none">
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full border border-white/30 shadow-lg group-hover:bg-white/30 transition-colors duration-200">
                      <Maximize2 size={16} className="text-white" />
                      <span className="text-white text-[10px] font-medium uppercase tracking-wider">Tap</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                    <div className="mb-2 opacity-70">
                      <span className="font-serif-display text-4xl font-light">{String(idx + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="font-serif-display text-3xl mb-2 tracking-tight font-semibold drop-shadow-lg">
                      {s.title}
                    </h3>
                    <p className="text-sm leading-relaxed font-light mb-4 line-clamp-2 drop-shadow-md">
                      {s.desc}
                    </p>
                    <button className="px-6 py-2.5 rounded-full bg-white text-[#1a1a1a] text-[10px] font-bold uppercase tracking-wider hover:bg-yellow-400 transition-colors duration-200">
                      {t.services.showMore}
                </button>
                      </div>
                      </div>
              );
            })}
                    </div>

          {/* Full-Screen Overlay Modal - Mobile / Split-Screen Popup - Desktop */}
          {expandedService !== null && (
            <div 
              className="fixed inset-0 z-[200] flex flex-col lg:items-center lg:justify-center bg-black/95 backdrop-blur-md animate-fade-in overflow-hidden lg:p-8"
              onClick={() => setExpandedService(null)}
            >
              {/* Immersive Backdrop */}
              <div className="absolute inset-0 bg-black/80 lg:bg-black/60"></div>
              
              {/* Close Button */}
              <button
                onClick={() => setExpandedService(null)}
                className="absolute top-4 right-4 lg:top-6 lg:right-6 z-50 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
                aria-label="Close"
              >
                <X size={20} className="lg:w-6 lg:h-6 text-white" />
              </button>

              {/* Content Container - Full screen on mobile, split-screen popup on desktop */}
              <div 
                className="relative z-10 flex flex-col lg:flex-row h-full w-full lg:h-auto lg:max-h-[85vh] lg:max-w-6xl lg:w-full lg:rounded-3xl overflow-hidden bg-black lg:shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Left Side - Image (Mobile: Top, Desktop: Left) */}
                <div className="h-[50vh] lg:h-auto lg:w-1/2 relative overflow-hidden flex-shrink-0">
                  <img 
                    src={SERVICES[expandedService].img} 
                    alt={SERVICES[expandedService].title} 
                    className="w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                    onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800'}
                  />
                  {/* Subtle overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 lg:bg-gradient-to-r lg:from-black/20 lg:via-transparent lg:to-black/40"></div>
                  </div>

                {/* Right Side - Text Content Panel (Mobile: Bottom, Desktop: Right) */}
                <div className="flex-1 min-h-0 lg:w-1/2 bg-gradient-to-b from-black via-[#1a1a1a] to-black lg:bg-[#1a1a1a] overflow-y-auto">
                  <div className="h-full flex flex-col px-6 md:px-8 lg:px-10 py-6 md:py-8 lg:py-10">
                    {/* Service Number */}
                    <div className="mb-3 lg:mb-4 opacity-60">
                      <span className="font-serif-display text-3xl md:text-4xl lg:text-4xl font-light text-white">
                        {String(expandedService + 1).padStart(2, '0')}
                      </span>
              </div>

                    {/* Service Title */}
                    <h3 className="font-serif-display text-2xl md:text-3xl lg:text-3xl text-white mb-3 md:mb-4 lg:mb-4 tracking-tight font-semibold">
                      {SERVICES[expandedService].title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-sm md:text-base lg:text-base text-white/90 mb-4 md:mb-5 lg:mb-5 leading-relaxed font-light">
                      {SERVICES[expandedService].desc}
                    </p>

                    {/* Full Details */}
                    <div className="border-t border-white/20 pt-4 md:pt-5 lg:pt-5 mb-5 lg:mb-6 flex-1">
                      <p className="text-xs md:text-sm lg:text-sm text-white/80 leading-relaxed font-light">
                        {SERVICES[expandedService].details}
                      </p>
            </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 mt-auto">
                      <button 
                        onClick={() => {
                          setExpandedService(null);
                          scrollToSection('angebot');
                        }}
                        className="px-6 lg:px-8 py-3 lg:py-3 rounded-full bg-white text-[#1a1a1a] text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-yellow-400 hover:scale-105 transition-all shadow-2xl"
                      >
                        {t.services.requestQuote}
                      </button>
                      <button 
                        onClick={() => setExpandedService(null)}
                        className="px-6 lg:px-8 py-3 lg:py-3 rounded-full border-2 border-white/50 bg-white/10 backdrop-blur-sm text-white text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/20 transition-all"
                      >
                        {t.services.showLess}
                      </button>
          </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Painting Service Section */}
        <section className="relative bg-gradient-to-b from-white via-stone-50 to-white pt-20 md:pt-28 pb-12 md:pb-16 overflow-hidden">
          {/* Subtle background accent */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-stone-100/30 to-white opacity-50"></div>
          
          <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
            <div className="text-center">
              {/* Title with emphasis on "nur Weiß" */}
              <div className="mb-6">
                <div className="mb-4 opacity-60">
                  <span className="font-serif-display text-4xl md:text-5xl font-light text-[#1a1a1a]">07</span>
                </div>
                <h2 className="font-serif-display text-4xl md:text-6xl lg:text-7xl text-[#1a1a1a] tracking-tight italic font-light mb-3">
                  {t.painting.title}
                </h2>
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border-2 border-[#1a1a1a] rounded-full shadow-lg">
                  <span className="text-2xl md:text-3xl font-serif-display text-[#1a1a1a] font-semibold italic">
                    {t.painting.subtitle}
                  </span>
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center">
                    <span className="text-white text-lg md:text-xl font-bold">✓</span>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-stone-600 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mt-8">
                {t.painting.description}
              </p>
            </div>
          </div>
        </section>

        {/* Redesigned Footer Section */}
        <section id="angebot" className="relative py-32 px-6 bg-white overflow-hidden text-center">
          {/* Subtle Background Animation */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-blue-400/5 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
          
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="font-serif-display text-5xl md:text-7xl text-[#1a1a1a] mb-4 italic tracking-tight">{t.contact.title}</h2>
            <p className="text-stone-500 font-light mb-12 max-w-md mx-auto">{t.contact.description}</p>
            
            {/* Big Fancy Text CTA */}
            <div className="mb-16">
              <a 
                href="mailto:luxcleaning@mail.ch" 
                className="group relative inline-flex items-center gap-4 text-5xl md:text-8xl font-serif-display text-[#1a1a1a] hover:text-blue-600 transition-colors duration-500"
              >
                <span>{t.contact.freeQuote}</span>
                <ArrowUpRight size={56} className="text-blue-500 group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform duration-500" />
                <span className="absolute bottom-[-10px] left-0 w-0 h-[3px] bg-yellow-400 group-hover:w-full transition-all duration-700 rounded-full"></span>
              </a>
            </div>

            {/* Minimalist Form */}
            <div className="bg-[#Fdfcf8] p-8 md:p-12 rounded-[3.5rem] border border-stone-100 shadow-2xl max-w-xl mx-auto mb-12 hover:scale-[1.01] transition-transform duration-500">
              {contactFormSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={32} className="text-green-600" />
                  </div>
                  <h3 className="font-serif-display text-2xl text-[#1a1a1a] mb-2">Vielen Dank!</h3>
                  <p className="text-stone-600">Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>
                </div>
              ) : (
                <form className="space-y-5" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="sr-only">{t.contact.name}</label>
                      <input 
                        id="contact-name"
                        type="text" 
                        value={contactFormData.name}
                        onChange={(e) => setContactFormData({ ...contactFormData, name: e.target.value })}
                        className="w-full bg-white border border-stone-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                        placeholder={t.contact.name}
                        required
                        aria-label={t.contact.name}
                      />
                </div>
                    <div>
                      <label htmlFor="contact-email" className="sr-only">{t.contact.email}</label>
                      <input 
                        id="contact-email"
                        type="email" 
                        value={contactFormData.email}
                        onChange={(e) => setContactFormData({ ...contactFormData, email: e.target.value })}
                        className="w-full bg-white border border-stone-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                        placeholder={t.contact.email}
                        required
                        aria-label={t.contact.email}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="sr-only">{t.contact.message}</label>
                    <textarea 
                      id="contact-message"
                      value={contactFormData.message}
                      onChange={(e) => setContactFormData({ ...contactFormData, message: e.target.value })}
                      className="w-full bg-white border border-stone-200 rounded-2xl p-4 text-sm h-32 focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all" 
                      placeholder={t.contact.message}
                      required
                      aria-label={t.contact.message}
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-5 bg-[#1a1a1a] text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-blue-600 transition-all flex items-center justify-center gap-3 group shadow-xl"
                    aria-label={t.contact.submit}
                  >
                    {t.contact.submit}
                  <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
              )}
            </div>

            {/* Contact Details with reduced padding */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-400/10 flex items-center justify-center text-yellow-600">
                  <Phone size={18} />
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{t.contact.phone}</div>
                  <div className="text-lg font-serif-display font-medium">+41 78 352 57 78</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-400/10 flex items-center justify-center text-blue-600">
                  <MapPin size={18} />
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{t.contact.location}</div>
                  <div className="text-lg font-serif-display font-medium">Baden & Wettingen, CH</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Minimal Bottom Bar */}
        <footer className="bg-[#1a1a1a] text-white py-12 px-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <div>
              <div className="font-serif-display text-4xl mb-2 tracking-tighter">Lux Cleaning</div>
              <div className="text-[9px] text-stone-500 tracking-[0.5em] font-bold uppercase">{t.footer.tagline}</div>
            </div>
            <div className="text-[10px] text-stone-600 font-bold uppercase tracking-[0.2em]">{t.footer.copyright}</div>
            <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-stone-400">
              <a href="#" className="hover:text-yellow-400 transition-colors">{t.footer.imprint}</a>
              <a href="#" className="hover:text-yellow-400 transition-colors">{t.footer.privacy}</a>
            </div>
          </div>
        </footer>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-24 right-6 md:right-12 z-50 flex flex-col gap-2.5">
          {/* WhatsApp Button */}
          <a
            href="https://wa.me/41783525778"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 group"
            aria-label="WhatsApp"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </a>

          {/* Call Button */}
          <a
            href="tel:+41783525778"
            className="w-11 h-11 bg-[#1a1a1a] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 group"
            aria-label="Call us"
          >
            <Phone className="w-5 h-5 text-white" />
          </a>

          {/* Mail Button */}
          <a
            href="mailto:luxcleaning@mail.ch"
            className="w-11 h-11 bg-[#1a1a1a] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 group"
            aria-label="Email us"
          >
            <Mail className="w-5 h-5 text-white" />
          </a>

          {/* TikTok Button */}
          <a
            href="https://www.tiktok.com/@lux.cleaning3"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 bg-[#1a1a1a] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 group"
            aria-label="TikTok"
          >
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </a>
      </div>

    </div>
    </div>
    </>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
