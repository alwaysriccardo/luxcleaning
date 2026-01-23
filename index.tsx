
import React from 'react';
import { createRoot } from 'react-dom/client';
import { 
  ArrowUpRight, 
  Phone, 
  Sparkles, 
  Star, 
  Send,
  MapPin
} from 'lucide-react';

const SERVICES = [
  {
    title: "Unterhaltsreinigung",
    desc: "Regelmäßige, hochwertige Reinigung für Privat- und Geschäftsräume.",
    img: "./input_file_2.png"
  },
  {
    title: "Grundreinigung",
    desc: "Gründliche Tiefenreinigung für höchste Ansprüche.",
    img: "./input_file_3.png"
  },
  {
    title: "Büro- & Gewerbereinigung",
    desc: "Sauberkeit auf Premium-Niveau für Arbeits- und Geschäftsräume.",
    img: "./input_file_5.png"
  },
  {
    title: "Fenster- & Glasreinigung",
    desc: "Streifenfreie Reinigung von Fenstern, Glasflächen und Rahmen.",
    img: "./input_file_4.png"
  },
  {
    title: "Umzugsreinigung",
    desc: "Professionelle Endreinigung mit Abnahmegarantie.",
    img: "https://images.unsplash.com/photo-1603712726238-bf1375b651b1?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Sanitär- & Küchenreinigung",
    desc: "Hygienische Reinigung mit Blick fürs Detail.",
    img: "./input_file_1.png"
  }
];

const REVIEWS = [
  {
    name: "Hans Müller",
    location: "München, Deutschland",
    text: "Lux Cleaning war super pünktlich und hat echt gute Arbeit gemacht. Catalin war sehr freundlich und hat alles genau erklärt. Kann ich nur weiterempfehlen!",
    initials: "HM"
  },
  {
    name: "Elena Vogt",
    location: "Zürich, Schweiz",
    text: "Bin total zufrieden mit Lux Cleaning. Die waren schnell und diskret, meine Kanzlei war in 2 Stunden fertig. Service war top!",
    initials: "EV"
  },
  {
    name: "Stephan Weber",
    location: "Basel, Schweiz",
    text: "Die Umzugsreinigung von Lux Cleaning hat mir echt viel Stress erspart. Catalin und sein Team waren sehr zuverlässig und alles war perfekt sauber. Würde ich wieder buchen!",
    initials: "SW"
  },
  {
    name: "Karin Schmid",
    location: "Berlin, Deutschland",
    text: "Die Fensterreinigung war klasse, keine Streifen überhaupt. Lux Cleaning macht das wirklich professionell, merkt man sofort.",
    initials: "KS"
  }
];

const App = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="p-2 md:p-4 lg:p-6 w-full max-w-[1800px] mx-auto min-h-screen bg-[#Fdfcf8]">
      <div className="bg-[#Fdfcf8] rounded-[2.5rem] w-full relative flex flex-col border border-[#e5e2dd] shadow-sm overflow-hidden">
        
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
            <button onClick={() => scrollToSection('services')} className="px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-stone-100 transition-colors">Leistungen</button>
            <button onClick={() => scrollToSection('reviews')} className="px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-stone-100 transition-colors">Bewertungen</button>
            <button onClick={() => scrollToSection('angebot')} className="px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest bg-yellow-400 hover:bg-yellow-500 transition-colors">Gratis Angebot</button>
          </div>

          <div className="pointer-events-auto">
            <button 
              onClick={() => scrollToSection('angebot')}
              className="flex items-center gap-2 bg-[#1a1a1a] text-white px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-all group"
            >
              Angebot anfordern
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
              <span className="text-lg">🇨🇭</span> Makellose Sauberkeit
            </div>
            
            <h1 className="fade-in-up delay-100 font-serif-display text-6xl md:text-9xl leading-[0.85] text-[#1a1a1a] mb-10 tracking-tight">
              Reinigung ist eine <span className="italic text-blue-600">Kunst</span>, <br />
              Exzellenz ist unser <span className="italic text-yellow-500">Standard.</span>
            </h1>

            <p className="fade-in-up delay-200 text-stone-600 text-lg max-w-xl mx-auto leading-relaxed font-light mb-12">
              Wir verwandeln Ihre Räumlichkeiten in makellose Zonen der Ruhe. Schnell, diskret und mit der sprichwörtlichen deutschen Gründlichkeit.
            </p>

            <div className="fade-in-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => scrollToSection('services')} className="px-10 py-5 rounded-full bg-[#1a1a1a] text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-2xl">
                Unsere Leistungen
              </button>
              <button onClick={() => scrollToSection('angebot')} className="px-10 py-5 rounded-full border-2 border-[#1a1a1a] text-[#1a1a1a] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-yellow-400 hover:border-yellow-400 transition-all">
                Angebot einholen
              </button>
            </div>
          </div>
        </header>

        {/* Marquee Promotion */}
        <div className="py-12 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 text-white overflow-hidden whitespace-nowrap relative z-30 shadow-2xl border-y-4 border-yellow-400">
          {/* Decorative pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
          }}></div>
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          
          <div className="inline-block animate-marquee relative z-10">
            {[1, 2, 3, 4].map(i => (
              <React.Fragment key={i}>
                <span className="font-serif-display text-5xl md:text-7xl mx-12 italic text-yellow-400 font-bold drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]">20% RABATT</span>
                <span className="text-3xl uppercase tracking-[0.5em] mx-8 opacity-60">✨</span>
                <span className="font-serif-display text-5xl md:text-7xl mx-12 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">AUF ALLE LEISTUNGEN</span>
                <span className="text-3xl uppercase tracking-[0.5em] mx-8 opacity-60">✨</span>
                <span className="font-serif-display text-5xl md:text-7xl mx-12 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">BIS ENDE FEBRUAR</span>
                <span className="text-3xl uppercase tracking-[0.5em] mx-8 opacity-60">✨</span>
                <span className="font-serif-display text-4xl md:text-6xl mx-12 text-yellow-300 font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">JETZT ANGEBOT ANFORDERN</span>
                <span className="text-3xl uppercase tracking-[0.5em] mx-8 opacity-60">✨</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <section id="services" className="py-32 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto text-center mb-20">
            <h2 className="font-serif-display text-5xl md:text-7xl text-[#1a1a1a] mb-6 tracking-tight">Unsere Leistungen</h2>
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
                  Angebot anfordern
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
                Unsere zufriedenen Kunden
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 mx-auto rounded-full"></div>
            </div>

            <div className="mask-edges overflow-hidden relative">
              <div className="carousel-track flex gap-8 pb-8">
                {[...REVIEWS, ...REVIEWS].map((r, i) => (
                  <div key={i} className="w-[320px] md:w-[400px] flex-shrink-0 bg-white rounded-[2.5rem] p-10 border-2 border-stone-200 flex flex-col h-full shadow-lg hover:shadow-2xl hover:border-blue-300 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group">
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Quote mark decoration */}
                    <div className="absolute top-6 left-6 text-blue-100 text-6xl font-serif-display opacity-20">"</div>
                    
                    <div className="flex text-yellow-400 mb-6 relative z-10 drop-shadow-sm">
                      {[1,2,3,4,5].map(star => <Star key={star} size={18} fill="currentColor" className="drop-shadow-sm" />)}
                    </div>
                    <p className="text-stone-600 mb-8 flex-grow leading-relaxed italic font-light text-base relative z-10">
                      "{r.text}"
                    </p>
                    
                    {/* Bottom accent line */}
                    <div className="h-1 bg-gradient-to-r from-blue-400 via-yellow-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
            <h2 className="font-serif-display text-5xl md:text-7xl text-[#1a1a1a] mb-4 italic tracking-tight">Bereit zu glänzen?</h2>
            <p className="text-stone-500 font-light mb-12 max-w-md mx-auto">Schildern Sie uns Ihr Anliegen. Wir erstellen Ihnen innerhalb von 24h ein personalisiertes Angebot.</p>
            
            {/* Big Fancy Text CTA */}
            <div className="mb-16">
              <a 
                href="mailto:luxcleaning@mail.ch" 
                className="group relative inline-flex items-center gap-4 text-5xl md:text-8xl font-serif-display text-[#1a1a1a] hover:text-blue-600 transition-colors duration-500"
              >
                <span>Gratis Angebot</span>
                <ArrowUpRight size={56} className="text-blue-500 group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform duration-500" />
                <span className="absolute bottom-[-10px] left-0 w-0 h-[3px] bg-yellow-400 group-hover:w-full transition-all duration-700 rounded-full"></span>
              </a>
            </div>

            {/* Minimalist Form */}
            <div className="bg-[#Fdfcf8] p-8 md:p-12 rounded-[3.5rem] border border-stone-100 shadow-2xl max-w-xl mx-auto mb-12 hover:scale-[1.01] transition-transform duration-500">
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" className="w-full bg-white border border-stone-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Name" />
                  <input type="email" className="w-full bg-white border border-stone-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Email" />
                </div>
                <textarea className="w-full bg-white border border-stone-200 rounded-2xl p-4 text-sm h-32 focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all" placeholder="Ihre Nachricht..."></textarea>
                <button className="w-full py-5 bg-[#1a1a1a] text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-blue-600 transition-all flex items-center justify-center gap-3 group shadow-xl">
                  Absenden
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
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Anruf / WhatsApp</div>
                  <div className="text-lg font-serif-display font-medium">+41 78 352 57 78</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-400/10 flex items-center justify-center text-blue-600">
                  <MapPin size={18} />
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Standort</div>
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
              <div className="text-[9px] text-stone-500 tracking-[0.5em] font-bold uppercase">Die Kunst der Sauberkeit</div>
            </div>
            <div className="text-[10px] text-stone-600 font-bold uppercase tracking-[0.2em]">© 2024 LUX CLEANING. FÜR PERFEKTE SAUBERKEIT.</div>
            <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-stone-400">
              <a href="#" className="hover:text-yellow-400 transition-colors">Impressum</a>
              <a href="#" className="hover:text-yellow-400 transition-colors">Datenschutz</a>
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
