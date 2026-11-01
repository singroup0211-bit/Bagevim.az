import React from 'react';
import { Home, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="border-t border-white/10 bg-neutral-950 py-12 text-neutral-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black border border-amber-400/40 overflow-hidden p-0.5 shadow-md shadow-amber-500/15">
              <img
                src="/logo.jpeg"
                alt="bagevim loqo"
                className="h-full w-full rounded-full object-contain object-center"
              />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              bagevim<span className="text-amber-400">.az</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-amber-400" />
              <span>Azərbaycan · Qəbələ, Quba, Bakı, Naxçıvan, Gəncə, İsmayıllı</span>
            </span>
            <button
              onClick={onOpenBooking}
              className="text-amber-400 hover:underline font-semibold cursor-pointer"
            >
              Bağ Evi Bron Et
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <p>© {new Date().getFullYear()} bagevim.az. Bütün hüquqlar qorunur.</p>
          <p>Azərbaycanın bütün bölgələri üzrə bağ evləri və villalar portalı.</p>
        </div>
      </div>
    </footer>
  );
};
