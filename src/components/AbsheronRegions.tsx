import React from 'react';
import { MapPin, ArrowUpRight, Compass, Waves } from 'lucide-react';
import { Villa } from '../data/villas';

interface AbsheronRegionsProps {
  villas: Villa[];
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
}

export interface RegionInfo {
  name: string;
  shortDesc: string;
  climateNote: string;
  driveTime: string;
  tag: string;
}

export const ABSHERON_REGIONS: RegionInfo[] = [
  {
    name: 'Mərdəkan',
    shortDesc: 'İsidilən hovuzlu lüks villalar və qədim bağlar',
    climateNote: 'Yellərdən qorunan yumşaq mikroklimat',
    driveTime: 'Mərkəzdən 25 dəqiqə',
    tag: 'Ən Çox Tələb Olunan',
  },
  {
    name: 'Bilgəh',
    shortDesc: 'Açıq dəniz panoraması və 1-ci sıra rezidensiyalar',
    climateNote: 'Müalicəvi təmiz dəniz mehi',
    driveTime: 'Mərkəzdən 30 dəqiqə',
    tag: 'Dəniz Sahili',
  },
  {
    name: 'Şüvəlan',
    shortDesc: 'Mayak yolu, yaşıl meyvə bağları və sakit ailəvi mühit',
    climateNote: 'Sakit təbiət və təmiz hava',
    driveTime: 'Mərkəzdən 28 dəqiqə',
    tag: 'Ailəvi İstirahət',
  },
  {
    name: 'Buzovna',
    shortDesc: 'Məşhur qayalıq sahili və terraslı kotteclər',
    climateNote: 'Xəzərin təbii daşlıq dalğa mənzərəsi',
    driveTime: 'Mərkəzdən 26 dəqiqə',
    tag: 'Qayalıq Panoramı',
  },
  {
    name: 'Novxanı',
    shortDesc: 'Duz gölü və dənizkənarı günbatımı terrasları',
    climateNote: 'Geniş çimərlik zolağı və axşam mehi',
    driveTime: 'Mərkəzdən 22 dəqiqə',
    tag: 'Günbatımı',
  },
];

export const AbsheronRegions: React.FC<AbsheronRegionsProps> = ({
  villas,
  selectedRegion,
  onSelectRegion,
}) => {
  return (
    <div id="regions-section" className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* 
        Süni intellekt şablonu kimi deyil, prestijli Abşeron memarlıq navigatoru 
      */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-gradient-to-b from-neutral-900/90 via-neutral-950 to-neutral-900/90 p-6 sm:p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {/* Soft Ambient Oval Background Glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-3/4 rounded-[50%] bg-amber-500/10 blur-3xl" />

        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Compass className="h-4 w-4" />
              <span>Abşeron Yarımadasının Prestijli İstirahət Zonaları</span>
            </div>
            <h3 className="mt-1.5 text-xl sm:text-2xl font-bold text-white tracking-tight">
              Mərdəkan, Bilgəh, Şüvəlan və Buzovna üzrə fərdi seçimlər
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-neutral-400">
              Hər bir qəsəbə özünəməxsus hava axını, dəniz sahili və bağ mədəniyyəti ilə fərqlənir.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelectRegion('Bütün regionlar')}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap self-start md:self-auto ${
              selectedRegion === 'Bütün regionlar'
                ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20'
                : 'border border-white/15 bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700'
            }`}
          >
            Bütün Abşeronu Göstər ({villas.length} villa)
          </button>
        </div>

        {/* Region Cards Horizontal Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {ABSHERON_REGIONS.map((reg) => {
            const count = villas.filter((v) => v.region === reg.name).length;
            const isSelected = selectedRegion === reg.name;

            return (
              <div
                key={reg.name}
                onClick={() => onSelectRegion(reg.name)}
                className={`group relative flex flex-col justify-between rounded-2xl p-4 transition-all duration-300 cursor-pointer border ${
                  isSelected
                    ? 'border-amber-400 bg-amber-400/10 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400/50'
                    : 'border-white/10 bg-neutral-900/80 hover:border-white/30 hover:bg-neutral-800/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-amber-400">
                      {reg.tag}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-neutral-500 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  <h4 className="mt-2 text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    {reg.name}
                  </h4>

                  <p className="mt-1 text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                    {reg.shortDesc}
                  </p>
                </div>

                <div className="mt-4 border-t border-white/10 pt-3 flex items-center justify-between text-[11px] text-neutral-400">
                  <span>{reg.driveTime}</span>
                  <span className="font-semibold text-white bg-white/10 rounded-full px-2 py-0.5">
                    {count} mülk
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
