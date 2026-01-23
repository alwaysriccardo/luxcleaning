
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  ArrowUpRight, 
  Phone, 
  Sparkles, 
  Star, 
  Send,
  MapPin,
  Globe,
  ChevronDown
} from 'lucide-react';

type Language = 'de' | 'en' | 'fr' | 'it';

const translations: Record<Language, any> = {
  de: {
    nav: {
      services: "Leistungen",
      reviews: "Bewertungen",
      quote: "Gratis Angebot",
      getQuote: "Angebot anfordern"
    },
    hero: {
      badge: "Deutsche Pünktlichkeit & Präzision",
      title: "Reinigung ist eine {art}, Exzellenz ist unser {standard}.",
      art: "Kunst",
      standard: "Standard",
      subtitle: "Wir verwandeln Ihre Räumlichkeiten in makellose Zonen der Ruhe. Schnell, diskret und mit der sprichwörtlichen deutschen Gründlichkeit.",
      servicesBtn: "Unsere Leistungen",
      quoteBtn: "Angebot einholen"
    },
    promotion: {
      discount: "20% RABATT",
      until: "BIS ENDE FEBRUAR"
    },
    services: {
      title: "Unsere Leistungen",
      requestQuote: "Angebot anfordern"
    },
    reviews: {
      title: "Zufriedene Kunden aus {dch}",
      dch: "D & CH"
    },
    contact: {
      title: "Bereit zu glänzen?",
      subtitle: "Schildern Sie uns Ihr Anliegen. Wir erstellen Ihnen innerhalb von 24h ein personalisiertes Angebot.",
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
      badge: "German Punctuality & Precision",
      title: "Cleaning is an {art}, excellence is our {standard}.",
      art: "art",
      standard: "standard",
      subtitle: "We transform your spaces into flawless zones of tranquility. Fast, discreet, and with the proverbial German thoroughness.",
      servicesBtn: "Our Services",
      quoteBtn: "Get a Quote"
    },
    promotion: {
      discount: "20% DISCOUNT",
      until: "UNTIL END OF FEBRUARY"
    },
    services: {
      title: "Our Services",
      requestQuote: "Request Quote"
    },
    reviews: {
      title: "Satisfied Customers from {dch}",
      dch: "D & CH"
    },
    contact: {
      title: "Ready to shine?",
      subtitle: "Tell us about your needs. We'll create a personalized quote within 24 hours.",
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
      badge: "Ponctualité & Précision Allemandes",
      title: "Le nettoyage est un {art}, l'excellence est notre {standard}.",
      art: "art",
      standard: "standard",
      subtitle: "Nous transformons vos espaces en zones de tranquillité impeccables. Rapide, discret et avec le soin méticuleux allemand proverbial.",
      servicesBtn: "Nos Services",
      quoteBtn: "Demander un Devis"
    },
    promotion: {
      discount: "20% DE RÉDUCTION",
      until: "JUSQU'À LA FIN FÉVRIER"
    },
    services: {
      title: "Nos Services",
      requestQuote: "Demander un Devis"
    },
    reviews: {
      title: "Clients Satisfaits de {dch}",
      dch: "D & CH"
    },
    contact: {
      title: "Prêt à briller?",
      subtitle: "Décrivez-nous vos besoins. Nous créerons un devis personnalisé sous 24h.",
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
  },
  it: {
    nav: {
      services: "Servizi",
      reviews: "Recensioni",
      quote: "Preventivo Gratuito",
      getQuote: "Richiedi Preventivo"
    },
    hero: {
      badge: "Puntualità & Precisione Tedesche",
      title: "La pulizia è un {art}, l'eccellenza è il nostro {standard}.",
      art: "arte",
      standard: "standard",
      subtitle: "Trasformiamo i vostri spazi in zone di tranquillità impeccabili. Veloce, discreto e con la proverbiale meticolosità tedesca.",
      servicesBtn: "I Nostri Servizi",
      quoteBtn: "Richiedi Preventivo"
    },
    promotion: {
      discount: "20% DI SCONTO",
      until: "FINO ALLA FINE DI FEBBRAIO"
    },
    services: {
      title: "I Nostri Servizi",
      requestQuote: "Richiedi Preventivo"
    },
    reviews: {
      title: "Clienti Soddisfatti da {dch}",
      dch: "D & CH"
    },
    contact: {
      title: "Pronto a brillare?",
      subtitle: "Descrivici le tue esigenze. Creeremo un preventivo personalizzato entro 24 ore.",
      freeQuote: "Preventivo Gratuito",
      name: "Nome",
      email: "Email",
      message: "Il tuo messaggio...",
      submit: "Invia",
      phone: "Chiamata / WhatsApp",
      location: "Posizione"
    },
    footer: {
      tagline: "L'Arte della Pulizia",
      copyright: "© 2024 LUX CLEANING. PER UNA PULIZIA PERFETTA.",
      imprint: "Impressum",
      privacy: "Privacy"
    }
  }
};

const SERVICES = [
  {
    de: { title: "Unterhaltsreinigung", desc: "Regelmäßige, hochwertige Reinigung für Privat- und Geschäftsräume." },
    en: { title: "Maintenance Cleaning", desc: "Regular, high-quality cleaning for private and commercial spaces." },
    fr: { title: "Nettoyage d'Entretien", desc: "Nettoyage régulier et de qualité pour espaces privés et commerciaux." },
    it: { title: "Pulizia di Manutenzione", desc: "Pulizia regolare e di alta qualità per spazi privati e commerciali." },
    img: "./input_file_2.png"
  },
  {
    de: { title: "Grundreinigung", desc: "Gründliche Tiefenreinigung für höchste Ansprüche." },
    en: { title: "Deep Cleaning", desc: "Thorough deep cleaning for the highest standards." },
    fr: { title: "Nettoyage en Profondeur", desc: "Nettoyage approfondi pour les plus hauts standards." },
    it: { title: "Pulizia Profonda", desc: "Pulizia approfondita per i più alti standard." },
    img: "./input_file_3.png"
  },
  {
    de: { title: "Büro- & Gewerbereinigung", desc: "Sauberkeit auf Premium-Niveau für Arbeits- und Geschäftsräume." },
    en: { title: "Office & Commercial Cleaning", desc: "Premium-level cleanliness for work and business spaces." },
    fr: { title: "Nettoyage de Bureaux & Commerces", desc: "Propreté de niveau premium pour espaces de travail et commerciaux." },
    it: { title: "Pulizia Uffici & Commerciale", desc: "Pulizia di livello premium per spazi lavorativi e commerciali." },
    img: "./input_file_5.png"
  },
  {
    de: { title: "Fenster- & Glasreinigung", desc: "Streifenfreie Reinigung von Fenstern, Glasflächen und Rahmen." },
    en: { title: "Window & Glass Cleaning", desc: "Streak-free cleaning of windows, glass surfaces and frames." },
    fr: { title: "Nettoyage de Fenêtres & Vitres", desc: "Nettoyage sans traces de fenêtres, surfaces vitrées et cadres." },
    it: { title: "Pulizia Finestre & Vetri", desc: "Pulizia senza aloni di finestre, superfici vetrate e telai." },
    img: "./input_file_4.png"
  },
  {
    de: { title: "Umzugsreinigung", desc: "Professionelle Endreinigung mit Abnahmegarantie." },
    en: { title: "Move-out Cleaning", desc: "Professional final cleaning with acceptance guarantee." },
    fr: { title: "Nettoyage de Déménagement", desc: "Nettoyage final professionnel avec garantie d'acceptation." },
    it: { title: "Pulizia Post-Trasloco", desc: "Pulizia finale professionale con garanzia di accettazione." },
    img: "https://images.unsplash.com/photo-1603712726238-bf1375b651b1?q=80&w=800&auto=format&fit=crop"
  },
  {
    de: { title: "Sanitär- & Küchenreinigung", desc: "Hygienische Reinigung mit Blick fürs Detail." },
    en: { title: "Bathroom & Kitchen Cleaning", desc: "Hygienic cleaning with attention to detail." },
    fr: { title: "Nettoyage Sanitaires & Cuisine", desc: "Nettoyage hygiénique avec attention aux détails." },
    it: { title: "Pulizia Bagni & Cucine", desc: "Pulizia igienica con attenzione ai dettagli." },
    img: "./input_file_1.png"
  }
];

const REVIEWS = [
  {
    name: "Hans Müller",
    location: { de: "München, Deutschland", en: "Munich, Germany", fr: "Munich, Allemagne", it: "Monaco, Germania" },
    text: {
      de: "Lux Cleaning war super pünktlich und hat echt gute Arbeit gemacht. Catalin war sehr freundlich und hat alles genau erklärt. Kann ich nur weiterempfehlen!",
      en: "Lux Cleaning was super punctual and did really good work. Catalin was very friendly and explained everything clearly. Highly recommend!",
      fr: "Lux Cleaning était très ponctuel et a fait un excellent travail. Catalin était très sympathique et a tout expliqué clairement. Je recommande vivement!",
      it: "Lux Cleaning è stato super puntuale e ha fatto un ottimo lavoro. Catalin è stato molto cordiale e ha spiegato tutto chiaramente. Lo consiglio vivamente!"
    },
    initials: "HM"
  },
  {
    name: "Elena Vogt",
    location: { de: "Zürich, Schweiz", en: "Zurich, Switzerland", fr: "Zurich, Suisse", it: "Zurigo, Svizzera" },
    text: {
      de: "Bin total zufrieden mit Lux Cleaning. Die waren schnell und diskret, meine Kanzlei war in 2 Stunden fertig. Service war top!",
      en: "Totally satisfied with Lux Cleaning. They were fast and discreet, my office was ready in 2 hours. Service was top!",
      fr: "Totalement satisfaite de Lux Cleaning. Ils ont été rapides et discrets, mon bureau était prêt en 2 heures. Service au top!",
      it: "Totalmente soddisfatta di Lux Cleaning. Sono stati veloci e discreti, il mio ufficio era pronto in 2 ore. Servizio top!"
    },
    initials: "EV"
  },
  {
    name: "Stephan Weber",
    location: { de: "Basel, Schweiz", en: "Basel, Switzerland", fr: "Bâle, Suisse", it: "Basilea, Svizzera" },
    text: {
      de: "Die Umzugsreinigung von Lux Cleaning hat mir echt viel Stress erspart. Catalin und sein Team waren sehr zuverlässig und alles war perfekt sauber. Würde ich wieder buchen!",
      en: "The move-out cleaning from Lux Cleaning really saved me a lot of stress. Catalin and his team were very reliable and everything was perfectly clean. Would book again!",
      fr: "Le nettoyage de déménagement de Lux Cleaning m'a vraiment épargné beaucoup de stress. Catalin et son équipe étaient très fiables et tout était parfaitement propre. Je réserverais à nouveau!",
      it: "La pulizia post-trasloco di Lux Cleaning mi ha davvero risparmiato molto stress. Catalin e il suo team sono stati molto affidabili e tutto era perfettamente pulito. Prenoterei di nuovo!"
    },
    initials: "SW"
  },
  {
    name: "Karin Schmid",
    location: { de: "Berlin, Deutschland", en: "Berlin, Germany", fr: "Berlin, Allemagne", it: "Berlino, Germania" },
    text: {
      de: "Die Fensterreinigung war klasse, keine Streifen überhaupt. Lux Cleaning macht das wirklich professionell, merkt man sofort.",
      en: "The window cleaning was great, no streaks at all. Lux Cleaning does this really professionally, you can tell immediately.",
      fr: "Le nettoyage des fenêtres était excellent, aucune trace. Lux Cleaning fait cela vraiment professionnellement, on le remarque immédiatement.",
      it: "La pulizia delle finestre è stata ottima, nessun alone. Lux Cleaning lo fa davvero in modo professionale, si nota subito."
    },
    initials: "KS"
  }
];

const App = () => {
  const [language, setLanguage] = useState<Language>('de');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const t = translations[language];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' }
  ];

  const formatText = (text: string, replacements: Record<string, string>) => {
    let formatted = text;
    Object.entries(replacements).forEach(([key, value]) => {
      formatted = formatted.replace(`{${key}}`, value);
    });
    return formatted;
  };

  return (
    <div className="p-2 md:p-4 lg:p-6 w-full max-w-[1800px] mx-auto min-h-screen bg-[#Fdfcf8]">
      <div className="bg-[#Fdfcf8] rounded-[2.5rem] w-full relative flex flex-col border border-[#e5e2dd] shadow-sm overflow-hidden">
        
        {/* Language Switcher - Floating */}
        <div className="fixed bottom-8 right-8 z-50 pointer-events-none">
          <div className="pointer-events-auto relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-3 rounded-full border border-black/10 shadow-lg hover:shadow-xl transition-all group"
            >
              <Globe size={18} className="text-[#1a1a1a]" />
              <span className="text-sm font-bold text-[#1a1a1a] hidden sm:block">
                {languages.find(l => l.code === language)?.flag} {languages.find(l => l.code === language)?.name}
              </span>
              <ChevronDown size={16} className={`text-[#1a1a1a] transition-transform ${showLangMenu ? 'rotate-180' : ''}`} />
            </button>
            
            {showLangMenu && (
              <div className="absolute bottom-full right-0 mb-2 bg-white/95 backdrop-blur-md rounded-2xl border border-black/10 shadow-xl overflow-hidden min-w-[160px]">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setShowLangMenu(false);
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-stone-50 transition-colors flex items-center gap-3 ${
                      language === lang.code ? 'bg-blue-50 text-blue-600' : 'text-[#1a1a1a]'
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-sm font-medium">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
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
        <header className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center">
          <div className="absolute inset-0 -z-10">
            <img 
              src="./input_file_6.png" 
              alt="Hauptbild" 
              className="w-full h-full object-cover brightness-[0.95]"
              onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1581578731522-745d05cb9724?q=80&w=2000'}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-[#Fdfcf8]"></div>
          </div>

          <div className="max-w-5xl mx-auto z-10">
            <div className="fade-in-up inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-stone-200 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600 shadow-xl">
              <span className="text-lg">🇩🇪</span> {t.hero.badge}
            </div>
            
            <h1 className="fade-in-up delay-100 font-serif-display text-6xl md:text-9xl leading-[0.85] text-[#1a1a1a] mb-10 tracking-tight">
              {t.hero.title.split(', ').map((part, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <br />}
                  {part.includes('{art}') ? (
                    <>
                      {part.split('{art}')[0]}
                      <span className="italic text-blue-600">{t.hero.art}</span>
                      {part.split('{art}')[1]}
                    </>
                  ) : part.includes('{standard}') ? (
                    <>
                      {part.split('{standard}')[0]}
                      <span className="italic text-yellow-500">{t.hero.standard}</span>
                      {part.split('{standard}')[1]}
                    </>
                  ) : (
                    part
                  )}
                </React.Fragment>
              ))}
            </h1>

            <p className="fade-in-up delay-200 text-stone-600 text-lg max-w-xl mx-auto leading-relaxed font-light mb-12">
              {t.hero.subtitle}
            </p>

            <div className="fade-in-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => scrollToSection('services')} className="px-10 py-5 rounded-full bg-[#1a1a1a] text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-2xl">
                {t.hero.servicesBtn}
              </button>
              <button onClick={() => scrollToSection('angebot')} className="px-10 py-5 rounded-full border-2 border-[#1a1a1a] text-[#1a1a1a] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-yellow-400 hover:border-yellow-400 transition-all">
                {t.hero.quoteBtn}
              </button>
            </div>
          </div>
        </header>

        {/* Marquee Promotion */}
        <div className="py-12 bg-blue-600 text-white overflow-hidden whitespace-nowrap relative z-30 shadow-2xl">
          <div className="inline-block animate-marquee">
            {[1, 2, 3, 4].map(i => (
              <React.Fragment key={i}>
                <span className="font-serif-display text-5xl md:text-7xl mx-12 italic text-yellow-400 font-bold">{t.promotion.discount}</span>
                <span className="text-2xl uppercase tracking-[0.5em] mx-8 opacity-40">•</span>
                <span className="font-serif-display text-5xl md:text-7xl mx-12">{t.promotion.until}</span>
                <span className="text-2xl uppercase tracking-[0.5em] mx-8 opacity-40">•</span>
              </React.Fragment>
            ))}
          </div>
        </div>

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
                    alt={s[language].title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800'}
                  />
                  <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <h3 className="font-serif-display text-3xl text-[#1a1a1a] mb-3 group-hover:text-blue-600 transition-colors">{s[language].title}</h3>
                <p className="text-stone-500 text-sm font-light leading-relaxed mb-8 flex-grow">{s[language].desc}</p>
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
        <section id="reviews" className="py-32 bg-stone-50 border-y border-stone-100 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-serif-display text-[#1a1a1a] mb-16 text-center">
              {t.reviews.title.split('{dch}').map((part, i) => (
                <React.Fragment key={i}>
                  {part}
                  {i < t.reviews.title.split('{dch}').length - 1 && (
                    <span className="text-blue-600 italic">{t.reviews.dch}</span>
                  )}
                </React.Fragment>
              ))}
            </h2>

            <div className="mask-edges overflow-hidden relative">
              <div className="carousel-track flex gap-8 pb-8">
                {[...REVIEWS, ...REVIEWS].map((r, i) => (
                  <div key={i} className="w-[320px] md:w-[400px] flex-shrink-0 bg-white rounded-[2rem] p-10 border border-stone-100 flex flex-col h-full shadow-sm hover:shadow-xl transition-all">
                    <div className="flex text-yellow-400 mb-6">
                      {[1,2,3,4,5].map(star => <Star key={star} size={16} fill="currentColor" />)}
                    </div>
                    <p className="text-stone-600 mb-8 flex-grow leading-relaxed italic font-light">
                      "{r.text[language]}"
                    </p>
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-xs font-bold text-blue-600">
                        {r.initials}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-stone-900">{r.name}</div>
                        <div className="text-[10px] text-stone-400 uppercase tracking-widest">{r.location[language]}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Redesigned Footer Section */}
        <section id="angebot" className="relative py-32 px-6 bg-white overflow-hidden text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-blue-400/5 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
          
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="font-serif-display text-5xl md:text-7xl text-[#1a1a1a] mb-4 italic tracking-tight">{t.contact.title}</h2>
            <p className="text-stone-500 font-light mb-12 max-w-md mx-auto">{t.contact.subtitle}</p>
            
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
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
