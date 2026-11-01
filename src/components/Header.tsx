import React from 'react';
import { CalendarCheck, Compass } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: () => void;
  onNavigateSection: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, onNavigateSection }) => {
  return (
    <aside className="fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl">
      {/* 
        Floating Translucent Oval Header 
        - Havada dururmuş kimi dərin kölgə və ambient işıq (floating elevation)
        - Oval kənarlar (rounded-full capsule)
        - Saydam və şüşə effekti (backdrop-blur-2xl bg-neutral-950/70 border-white/20)
      */}
      <header className="relative flex items-center justify-between gap-4 sm:gap-8 rounded-full border border-white/20 bg-neutral-950/70 px-4 sm:px-6 py-2.5 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.85),0_0_25px_rgba(245,158,11,0.12)] backdrop-blur-2xl ring-1 ring-white/10 transition-all duration-300">
        {/* 
          Yalnız Loqo Hissəsi (Yazısız)
          İstifadəçinin təqdim edəcəyi loqonu birbaşa qəbul etməyə hazır xüsusi konteyner
        */}
        <div className="flex items-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            id="brand-logo-container"
            className="group relative flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-black p-0.5 shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/40 transition-all duration-300 hover:scale-105 hover:ring-amber-400 cursor-pointer overflow-hidden"
            aria-label="bagevim loqo"
            title="bagevim loqo"
          >
            <img
              src="/logo.jpeg"
              alt="bagevim loqo"
              className="h-full w-full rounded-full object-contain object-center transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                e.currentTarget.src = '/assets/aistudio/Gemini_Generated_Image_j6n1npj6n1npj6n1_copy_1275488f.jpeg';
              }}
            />
          </a>
        </div>

        {/* Birsətirli naviqasiya keçidləri */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2 text-xs font-semibold text-neutral-300">
          <button
            onClick={() => onNavigateSection('marquee-section')}
            className="rounded-full px-3.5 py-1.5 transition-all hover:bg-white/10 hover:text-amber-300 cursor-pointer whitespace-nowrap shrink-0"
          >
            Canlı Kadr Lenti
          </button>
          <button
            onClick={() => onNavigateSection('villas-grid')}
            className="rounded-full px-3.5 py-1.5 transition-all hover:bg-white/10 hover:text-amber-300 cursor-pointer whitespace-nowrap shrink-0"
          >
            Seçilmiş Villalar
          </button>
          <button
            onClick={() => onNavigateSection('regions-section')}
            className="rounded-full px-3.5 py-1.5 transition-all hover:bg-white/10 hover:text-amber-300 cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Compass className="h-3.5 w-3.5 text-amber-400" />
            <span>Azərbaycan Regionları</span>
          </button>
          <button
            onClick={() => onNavigateSection('about-section')}
            className="rounded-full px-3.5 py-1.5 transition-all hover:bg-white/10 hover:text-amber-300 cursor-pointer whitespace-nowrap shrink-0"
          >
            Haqqımızda
          </button>
        </nav>

        {/* 
          Tələb olunan: "Kodu al" və "Nömrə" çıxarıldı, 
          yerinə tək və zərif "Bron et" düyməsi əlavə edildi
        */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-500 px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-bold text-neutral-950 shadow-lg shadow-amber-500/25 transition-all duration-300 hover:brightness-110 hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer"
          >
            <CalendarCheck className="h-4 w-4" />
            <span>Bron et</span>
          </button>
        </div>
      </header>
    </aside>
  );
};
