
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  ArrowUpRight, 
  Phone, 
  Sparkles, 
  Star, 
  Send,
  MapPin,
  Languages
} from 'lucide-react';

const SERVICES_DATA = [
  {
    id: 'maintenance',
    img: "./input_file_2.png"
  },
  {
    id: 'deep',
    img: "./input_file_3.png"
  },
  {
    id: 'office',
    img: "./input_file_5.png"
  },
  {
    id: 'windows',
    img: "./input_file_4.png"
  },
  {
    id: 'moving',
    img: "https://images.unsplash.com/photo-1603712726238-bf1375b651b1?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 'kitchen',
    img: "./input_file_1.png"
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
      title: "Unsere Leistungen",
      maintenance: { title: "Unterhaltsreinigung", desc: "Regelmäßige, hochwertige Reinigung für Privat- und Geschäftsräume." },
      deep: { title: "Grundreinigung", desc: "Gründliche Tiefenreinigung für höchste Ansprüche." },
      office: { title: "Büro- & Gewerbereinigung", desc: "Sauberkeit auf Premium-Niveau für Arbeits- und Geschäftsräume." },
      windows: { title: "Fenster- & Glasreinigung", desc: "Streifenfreie Reinigung von Fenstern, Glasflächen und Rahmen." },
      moving: { title: "Umzugsreinigung", desc: "Professionelle Endreinigung mit Abnahmegarantie." },
      kitchen: { title: "Sanitär- & Küchenreinigung", desc: "Hygienische Reinigung mit Blick fürs Detail." },
      requestQuote: "Angebot anfordern"
    },
    reviews: {
      title: "Unsere zufriedenen Kunden",
      customer: "Kunde"
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
      copyright: "© 2024 LUX CLEANING. FÜR PERFEKTE SAUBERKEIT.",
      imprint: "Impressum",
      privacy: "Datenschutz"
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
      title: "Our Services",
      maintenance: { title: "Maintenance Cleaning", desc: "Regular, high-quality cleaning for private and commercial spaces." },
      deep: { title: "Deep Cleaning", desc: "Thorough deep cleaning for the highest standards." },
      office: { title: "Office & Commercial Cleaning", desc: "Premium-level cleanliness for work and business spaces." },
      windows: { title: "Window & Glass Cleaning", desc: "Streak-free cleaning of windows, glass surfaces, and frames." },
      moving: { title: "Move-out Cleaning", desc: "Professional final cleaning with acceptance guarantee." },
      kitchen: { title: "Bathroom & Kitchen Cleaning", desc: "Hygienic cleaning with attention to detail." },
      requestQuote: "Request Quote"
    },
    reviews: {
      title: "Our Satisfied Customers",
      customer: "Customer"
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
      copyright: "© 2024 LUX CLEANING. FOR PERFECT CLEANLINESS.",
      imprint: "Imprint",
      privacy: "Privacy"
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
      title: "Nos Services",
      maintenance: { title: "Nettoyage Régulier", desc: "Nettoyage régulier et de haute qualité pour espaces privés et commerciaux." },
      deep: { title: "Nettoyage en Profondeur", desc: "Nettoyage approfondi pour les plus hauts standards." },
      office: { title: "Nettoyage de Bureau & Commercial", desc: "Propreté de niveau premium pour espaces de travail et commerciaux." },
      windows: { title: "Nettoyage de Fenêtres & Vitres", desc: "Nettoyage sans traces des fenêtres, surfaces vitrées et cadres." },
      moving: { title: "Nettoyage après Déménagement", desc: "Nettoyage final professionnel avec garantie d'acceptation." },
      kitchen: { title: "Nettoyage Sanitaire & Cuisine", desc: "Nettoyage hygiénique avec attention aux détails." },
      requestQuote: "Demander un Devis"
    },
    reviews: {
      title: "Nos Clients Satisfaits",
      customer: "Client"
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
      copyright: "© 2024 LUX CLEANING. POUR UNE PROPRETÉ PARFAITE.",
      imprint: "Mentions Légales",
      privacy: "Confidentialité"
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
    text: "Habe die Fensterreinigung gebucht und war echt überrascht wie sauber die geworden sind. Keine Streifen, keine Flecken. Die Jungs waren auch sehr vorsichtig mit meinen Pflanzen am Fensterbrett. Top Service!",
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
    text: "Unser Büro wird jetzt regelmäßig von Lux Cleaning gereinigt. Die Mitarbeiter sind sehr diskret und stören nie während der Arbeitszeit. Alles ist immer ordentlich und sauber wenn wir morgens kommen.",
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
    text: "Die Küche und Bäder waren nach der Reinigung wie neu. Besonders das Bad glänzt jetzt richtig. Catalin hat mir auch ein paar Tipps gegeben wie ich es länger sauber halten kann. Sehr freundlich und professionell!",
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
    text: "Bin berufstätig und habe keine Zeit für die Hausreinigung. Lux Cleaning übernimmt das jetzt für mich. Die Wohnung sieht immer top aus und ich muss mir keine Sorgen mehr machen. Absolut empfehlenswert!",
    initials: "MZ"
  }
];

const App = () => {
  const [language, setLanguage] = useState<'de' | 'en' | 'fr'>('de');
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  // Preloader effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
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

  // Parallax effect for hero image
  useEffect(() => {
    let rafId: number;
    
    const handleScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      
      rafId = requestAnimationFrame(() => {
        if (heroRef.current) {
          const scrolled = window.scrollY;
          const heroImage = heroRef.current.querySelector('.hero-bg-image') as HTMLElement;
          if (heroImage && scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${scrolled * 0.4}px)`;
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);


  const SERVICES = SERVICES_DATA.map((s, idx) => {
    const serviceKeys = ['maintenance', 'deep', 'office', 'windows', 'moving', 'kitchen'] as const;
    const key = serviceKeys[idx];
    return {
      ...s,
      title: t.services[key].title,
      desc: t.services[key].desc
    };
  });

  return (
    <>
      {/* Preloader */}
      {isLoading && (
        <div className="preloader fixed inset-0 bg-white z-[9999] flex items-center justify-center">
          <div className="text-center">
            <div className="preloader-logo mb-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-2xl mb-4 preloader-icon">
                <Sparkles className="text-white w-10 h-10" />
              </div>
              <h1 className="font-serif-display text-3xl md:text-4xl tracking-tight preloader-text">
                <span className="text-blue-600">LUX</span> CLEANING <span className="text-yellow-500">&</span> HAUSWARTUNG
              </h1>
            </div>
            <div className="preloader-spinner w-8 h-8 border-3 border-stone-200 border-t-blue-600 rounded-full mx-auto"></div>
          </div>
        </div>
      )}

      <div className="p-2 md:p-4 lg:p-6 w-full max-w-[1800px] mx-auto min-h-screen bg-[#Fdfcf8]">
        <div className="bg-[#Fdfcf8] rounded-[2.5rem] w-full relative flex flex-col border border-[#e5e2dd] shadow-sm overflow-hidden">
          
          {/* Language Switcher */}
        <div className="fixed top-24 right-6 md:right-12 z-50" ref={languageMenuRef}>
          <button
            onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
            className="bg-white/90 backdrop-blur-md px-4 py-3 rounded-full border border-black/10 shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group"
            title="Change Language"
          >
            <Languages size={18} className="text-stone-700" />
            <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
              {language.toUpperCase()}
            </span>
          </button>
          
          {/* Dropdown Menu */}
          {languageMenuOpen && (
            <div className="absolute top-full right-0 mt-2 bg-white rounded-2xl border border-black/10 shadow-xl overflow-hidden min-w-[140px]">
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
        <nav className="fixed top-8 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 max-w-[1800px] mx-auto pointer-events-none">
          <div className="pointer-events-auto">
            <div className="flex items-center gap-2 group cursor-pointer bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-black/5 shadow-sm hover:shadow-md transition-all" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
                <Sparkles className="text-white w-4 h-4" />
              </div>
              <span className="font-serif-display font-bold tracking-tight text-xs uppercase hidden md:block text-[#1a1a1a]">
                <span className="text-blue-600">LUX</span> CLEANING <span className="text-yellow-500">&</span> HAUSWARTUNG
              </span>
            </div>
          </div>

          <div className="pointer-events-auto hidden md:flex items-center gap-1 bg-white/80 backdrop-blur-md px-1.5 py-1.5 rounded-full border border-black/5 shadow-sm">
            <button onClick={() => scrollToSection('services')} className="px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-stone-100 transition-colors">{t.nav.services}</button>
            <button onClick={() => scrollToSection('reviews')} className="px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-stone-100 transition-colors">{t.nav.reviews}</button>
            <button onClick={() => scrollToSection('angebot')} className="px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest bg-yellow-400 hover:bg-yellow-500 transition-colors">{t.nav.quote}</button>
          </div>

          <div className="pointer-events-auto">
            <button 
              onClick={() => scrollToSection('angebot')}
              className="flex items-center gap-2 bg-[#1a1a1a] text-white px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-all group"
            >
              {t.nav.getQuote}
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <header ref={heroRef} className="relative w-full min-h-screen flex flex-col items-center justify-center pt-20 md:pt-32 pb-20 px-6 text-center overflow-hidden">
          {/* Background Image - Behind everything */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div 
              className="hero-bg-image absolute inset-0 w-full h-full will-change-transform"
              style={{
                backgroundImage: 'url(/hero-gloves-image.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: 'brightness(0.9) blur(1.5px)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/5 to-[#Fdfcf8]/90 z-[1]"></div>
          </div>

          {/* Content - In front of background */}
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="fade-in-up inline-flex items-center gap-2 mb-6 md:mb-8 px-5 py-2 rounded-full bg-white/95 backdrop-blur-sm border border-stone-200 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600 shadow-xl">
              <span className="text-lg">🇨🇭</span> {t.hero.badge}
            </div>
            
            <h1 className="fade-in-up delay-100 font-serif-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] text-white mb-8 md:mb-10 tracking-tight drop-shadow-2xl">
              {t.hero.title1} <span className="italic text-yellow-400 drop-shadow-lg">{t.hero.title2}</span>, <br />
              {t.hero.title3} <span className="italic text-yellow-400 drop-shadow-lg">{t.hero.title4}</span>
            </h1>

            <p className="fade-in-up delay-200 text-white text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light mb-8 md:mb-12 drop-shadow-lg px-4">
              {t.hero.description}
            </p>

            <div className="fade-in-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => scrollToSection('angebot')} 
                className="w-full sm:w-auto px-10 py-5 rounded-full bg-[#1a1a1a] text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-blue-600 hover:scale-105 transition-all shadow-2xl"
              >
                {t.hero.quoteBtn}
              </button>
              <button 
                onClick={() => scrollToSection('services')} 
                className="w-full sm:w-auto px-10 py-5 rounded-full border-2 border-white bg-white/10 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-yellow-400 hover:border-yellow-400 hover:text-[#1a1a1a] hover:scale-105 transition-all shadow-xl"
              >
                {t.hero.servicesBtn}
              </button>
            </div>
          </div>
        </header>

        {/* Services Grid */}
        <section id="services" className="py-32 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto text-center mb-20">
            <h2 className="font-serif-display text-5xl md:text-7xl text-[#1a1a1a] mb-6 tracking-tight">{t.services.title}</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {SERVICES.map((s, idx) => (
              <div key={idx} className="group flex flex-col bg-[#Fdfcf8] rounded-[2.5rem] p-6 border border-stone-100 hover:shadow-2xl transition-all duration-700">
                <div className="aspect-[4/3] rounded-[2rem] overflow-hidden mb-8 relative">
                  <img 
                    src={s.img} 
                    alt={s.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800'}
                  />
                  <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <h3 className="font-serif-display text-3xl text-[#1a1a1a] mb-3 group-hover:text-blue-600 transition-colors">{s.title}</h3>
                <p className="text-stone-500 text-sm font-light leading-relaxed mb-8 flex-grow">{s.desc}</p>
                <button 
                  onClick={() => scrollToSection('angebot')}
                  className="w-full py-4 rounded-full border border-stone-200 text-[10px] font-bold uppercase tracking-widest hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] transition-all"
                >
                  {t.services.requestQuote}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="py-32 bg-gradient-to-b from-stone-50 via-white to-stone-50 border-y border-stone-200 overflow-hidden relative">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-serif-display text-[#1a1a1a] mb-4">
                {t.reviews.title}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 mx-auto rounded-full"></div>
            </div>

            <div className="mask-edges overflow-hidden relative">
              <div className="carousel-track flex gap-8 pb-8">
                {[...REVIEWS, ...REVIEWS].map((r, i) => (
                  <div key={i} className="w-[340px] md:w-[420px] flex-shrink-0 bg-white rounded-[2.5rem] p-10 border-2 border-stone-200 flex flex-col h-full shadow-lg hover:shadow-2xl hover:border-blue-300 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group">
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Quote mark decoration */}
                    <div className="absolute top-6 left-6 text-blue-100 text-6xl font-serif-display opacity-20">"</div>
                    
                    {/* Service badge */}
                    <div className="mb-4 relative z-10">
                      <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-50 to-yellow-50 border border-blue-200 rounded-full text-[10px] font-bold uppercase tracking-widest text-blue-700">
                        {r.service}
                      </span>
                    </div>
                    
                    <div className="flex text-yellow-400 mb-6 relative z-10 drop-shadow-sm">
                      {[1,2,3,4,5].map(star => <Star key={star} size={18} fill="currentColor" className="drop-shadow-sm" />)}
                    </div>
                    
                    <p className="text-stone-600 mb-6 flex-grow leading-relaxed italic font-light text-base relative z-10">
                      "{r.text}"
                    </p>
                    
                    {/* Name section */}
                    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-stone-100 relative z-10">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-sm font-bold text-white shadow-md">
                        {r.initials}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-stone-900">{r.name}</div>
                        <div className="text-[10px] text-stone-500">{t.reviews.customer}</div>
                      </div>
                    </div>
                    
                    {/* Bottom accent line */}
                    <div className="h-1 bg-gradient-to-r from-blue-400 via-yellow-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-4"></div>
                  </div>
                ))}
              </div>
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
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" className="w-full bg-white border border-stone-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder={t.contact.name} />
                  <input type="email" className="w-full bg-white border border-stone-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder={t.contact.email} />
                </div>
                <textarea className="w-full bg-white border border-stone-200 rounded-2xl p-4 text-sm h-32 focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all" placeholder={t.contact.message}></textarea>
                <button className="w-full py-5 bg-[#1a1a1a] text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-blue-600 transition-all flex items-center justify-center gap-3 group shadow-xl">
                  {t.contact.submit}
                  <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
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

        </div>
      </div>
    </>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
