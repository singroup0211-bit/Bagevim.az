import React from 'react';
import { Villa } from '../data/villas';
import { formatAzn, filterVillas, VillaFilters } from '../utils/ticker';
import { MapPin, Waves, Eye, Compass } from 'lucide-react';

interface FeaturedVillasProps {
  villas: Villa[];
  activeFilters: VillaFilters;
  onSelectVilla: (villa: Villa) => void;
  onFilterChange: (filters: VillaFilters) => void;
}

export const FeaturedVillas: React.FC<FeaturedVillasProps> = ({
  villas,
  activeFilters,
  onSelectVilla,
  onFilterChange,
}) => {
  const filtered = filterVillas(villas, activeFilters);
  const regions = [
    { label: 'Bütün Azərbaycan', value: 'Bütün regionlar' },
    { label: 'Qəbələ', value: 'Qəbələ' },
    { label: 'Quba', value: 'Quba' },
    { label: 'Bakı (Abşeron)', value: 'Bakı' },
    { label: 'Naxçıvan', value: 'Naxçıvan' },
    { label: 'Gəncə & Göygöl', value: 'Gəncə' },
    { label: 'İsmayıllı', value: 'İsmayıllı' },
    { label: 'Şəki', value: 'Şəki' },
  ];

  return (
    <section id="villas-grid" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      {/* 
        OVAL ŞƏKİLDƏ ƏHATƏLƏYƏN ÇƏRÇİVƏ (Seçilmiş Villalar Bölməsi)
      */}
      <div className="relative overflow-hidden rounded-[2.5rem] sm:rounded-[3.5rem] md:rounded-[4rem] border border-white/20 bg-gradient-to-b from-neutral-900/85 via-neutral-950 to-neutral-900/85 p-6 sm:p-10 backdrop-blur-2xl shadow-[0_0_90px_-20px_rgba(245,158,11,0.2),inset_0_0_30px_rgba(255,255,255,0.03)] ring-1 ring-white/10">
        {/* Daxili oval ambient parıltı */}
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-4/5 rounded-[50%] bg-radial from-amber-400/20 via-amber-500/5 to-transparent blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 left-1/2 -translate-x-1/2 h-40 w-4/5 rounded-[50%] bg-radial from-amber-400/15 via-amber-500/5 to-transparent blur-2xl" />

        {/* Section Header */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-5 border-b border-white/10 pb-6">
          <div>
            <span className="inline-block rounded-full bg-amber-400/10 border border-amber-400/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-400">
              Eksklüziv Seçim
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
              Azərbaycanın Bütün Bölgələri Üzrə Bağ Evləri və Villalar
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-neutral-400">
              {filtered.length} aktiv təklif tapıldı · Hər bir mülkün real çəkilişləri və dəqiq parametrləri
            </p>
          </div>

          {/* Region Filter Buttons in Oval Capsule Container */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-neutral-950/80 rounded-full border border-white/10 backdrop-blur-md">
            {regions.map((reg) => {
              const isActive =
                (reg.value === 'Bütün regionlar' && (!activeFilters.region || activeFilters.region === 'Bütün regionlar')) ||
                activeFilters.region === reg.value;

              return (
                <button
                  key={reg.value}
                  type="button"
                  onClick={() => onFilterChange({ ...activeFilters, region: reg.value })}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/20'
                      : 'text-neutral-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {reg.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid of Villas with Real Photography */}
        <div className="relative z-10 mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((villa) => (
            <div
              key={villa.id}
              onClick={() => onSelectVilla(villa)}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/90 transition-all duration-300 hover:border-amber-400/60 hover:shadow-2xl hover:shadow-amber-500/15 hover:scale-[1.015] cursor-pointer"
            >
              {/* Real Photography Image Thumbnail */}
              <div className="relative h-64 w-full overflow-hidden bg-neutral-950">
                <img
                  src={villa.imageUrl}
                  alt={villa.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />

                {villa.badge && (
                  <div className="absolute top-3.5 left-3.5 rounded-full bg-amber-500/95 px-3 py-1 text-[11px] font-bold text-neutral-950 shadow-md backdrop-blur-md">
                    {villa.badge}
                  </div>
                )}

                <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md border border-white/10">
                  {villa.viewType}
                </div>
              </div>

              {/* Villa Card Content */}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <span className="font-bold text-amber-400">{villa.region}</span>
                  <span>·</span>
                  <span>{villa.zone}</span>
                  <span>·</span>
                  <span>{villa.landArea} sot</span>
                  <span>·</span>
                  <span>{villa.houseArea} m²</span>
                </div>

                <h3 className="mt-2 text-lg font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                  {villa.title}
                </h3>

                <p className="mt-1 text-xs text-neutral-400 line-clamp-1 flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-neutral-500 shrink-0" />
                  <span>{villa.location}</span>
                </p>

                {/* Specs & Amenities */}
                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-neutral-300">
                  <span>{villa.bedrooms} yataq otağı</span>
                  <span>{villa.capacity} nəfərlik</span>
                  <span className="flex items-center gap-1 text-cyan-300">
                    <Waves className="h-3.5 w-3.5" />
                    <span>Hovuz</span>
                  </span>
                </div>

                {/* Price & CTA */}
                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                  <div>
                    <span className="text-xl font-extrabold text-amber-400">
                      {formatAzn(villa.price)}
                    </span>
                    <span className="ml-1 text-xs text-neutral-400">/{villa.period}</span>
                  </div>

                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white group-hover:bg-amber-400 group-hover:text-neutral-950 transition-colors"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>Baxış</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
