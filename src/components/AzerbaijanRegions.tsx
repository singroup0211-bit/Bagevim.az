import React from 'react';
import { Compass, ArrowUpRight, Mountain, Trees, Waves, Sparkles } from 'lucide-react';
import { Villa } from '../data/villas';

interface AzerbaijanRegionsProps {
  villas: Villa[];
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
}

export interface RegionInfo {
  name: string;
  queryRegion: 'Bakı' | 'Quba' | 'Qəbələ' | 'Naxçıvan' | 'Gəncə' | 'İsmayıllı' | 'Şəki';
  title: string;
  highlights: string;
  climateNote: string;
  badge: string;
}

export const AZERBAIJAN_REGIONS: RegionInfo[] = [
  {
    name: 'Qəbələ',
    queryRegion: 'Qəbələ',
    title: 'Tufandağ və Nohurgöl Dağ Villaları',
    highlights: 'Sıx şam meşəsi, dağ çayı və isidilən hovuzlar',
    climateNote: 'Sərin dağ havası və qış/yay kurortu',
    badge: 'Dağ Kurortu',
  },
  {
    name: 'Quba',
    queryRegion: 'Quba',
    title: 'Qəçrəş Meşəsi və Qudyalçay Sahili',
    highlights: 'Qəçrəş çaykənarı kottecləri, fıstıq bağları və sərinlik',
    climateNote: 'Yüksək dağ və meşə mikroklimatı',
    badge: 'Meşəlik & Çay',
  },
  {
    name: 'Bakı (Abşeron)',
    queryRegion: 'Bakı',
    title: 'Mərdəkan və Bilgəh Sahil Rezidensiyaları',
    highlights: 'Xəzər sahili 1-ci xətt, Sea Breeze və infinity hovuzlar',
    climateNote: 'Yumşaq dəniz mehi və yay bağ mədəniyyəti',
    badge: 'Dəniz Sahili',
  },
  {
    name: 'Naxçıvan',
    queryRegion: 'Naxçıvan',
    title: 'Batabat və Ordubad Daş Kottecləri',
    highlights: 'Batabat gölü panoraması, alp çəmənlikləri və bulaq hovuzu',
    climateNote: 'Təmiz yüksək dağ havası və müalicəvi iqlim',
    badge: 'Batabat Yaylağı',
  },
  {
    name: 'Gəncə & Göygöl',
    queryRegion: 'Gəncə',
    title: 'Hacıkənd və Göygöl Dağ Ətəyi Bağları',
    highlights: 'Hacıkənd şamlıqları, Göygöl Milli Parkı ətrafı kotteclər',
    climateNote: 'Kəpəz dağı ətəyi sərin hava',
    badge: 'Milli Park Ətəyi',
  },
  {
    name: 'İsmayıllı & Şəki',
    queryRegion: 'İsmayıllı',
    title: 'Lahıc və Kiş Kəndi Dağ Evləri',
    highlights: 'Tarixi daş memarlıq, Qaranohur gölü və qoz-şabalıd bağları',
    climateNote: 'Böyük Qafqaz silsiləsi yamacları',
    badge: 'Tarix & Təbiət',
  },
];

export const AzerbaijanRegions: React.FC<AzerbaijanRegionsProps> = ({
  villas,
  selectedRegion,
  onSelectRegion,
}) => {
  return (
    <div id="regions-section" className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* 
        Azərbaycanın Bütün İstirahət Bölgələri - Oval Əhatələyən Memarlıq Çərçivəsi 
      */}
      <div className="relative overflow-hidden rounded-[2.5rem] sm:rounded-[3.5rem] border border-white/15 bg-gradient-to-b from-neutral-900/90 via-neutral-950 to-neutral-900/90 p-6 sm:p-9 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        {/* Soft Ambient Radial Light */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-44 w-3/4 rounded-[50%] bg-amber-500/10 blur-3xl" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Compass className="h-4 w-4" />
              <span>Azərbaycanın Bütün İstirahət Bölgələri</span>
            </div>
            <h3 className="mt-1.5 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Qəbələ, Quba, Bakı, Naxçıvan, Gəncə və İsmayıllı üzrə bağ evləri
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-neutral-400">
              Dağ meşələrindən Xəzər dənizinə, Batabat yaylağından Qəçrəş çayına qədər istirahət məkanları.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelectRegion('Bütün regionlar')}
            className={`rounded-full px-5 py-2.5 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap self-start md:self-auto ${
              selectedRegion === 'Bütün regionlar'
                ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/20'
                : 'border border-white/15 bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700'
            }`}
          >
            Bütün Azərbaycanı Göstər ({villas.length} villa)
          </button>
        </div>

        {/* Region Cards Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {AZERBAIJAN_REGIONS.map((reg) => {
            const count = villas.filter(
              (v) => v.region === reg.queryRegion || (reg.queryRegion === 'Bakı' && v.region === 'Bakı')
            ).length;
            const isSelected = selectedRegion === reg.queryRegion;

            return (
              <div
                key={reg.name}
                onClick={() => onSelectRegion(reg.queryRegion)}
                className={`group relative flex flex-col justify-between rounded-2xl p-5 transition-all duration-300 cursor-pointer border ${
                  isSelected
                    ? 'border-amber-400 bg-amber-400/10 shadow-lg shadow-amber-500/15 ring-1 ring-amber-400/50'
                    : 'border-white/10 bg-neutral-900/80 hover:border-white/25 hover:bg-neutral-800/80 hover:scale-[1.01]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-400">
                      {reg.badge}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-neutral-500 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  <h4 className="mt-3 text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {reg.name}
                  </h4>

                  <p className="mt-1 text-xs font-medium text-neutral-300">
                    {reg.title}
                  </p>

                  <p className="mt-1.5 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {reg.highlights}
                  </p>
                </div>

                <div className="mt-5 border-t border-white/10 pt-3 flex items-center justify-between text-xs text-neutral-400">
                  <span className="text-[11px] text-neutral-400">{reg.climateNote}</span>
                  <span className="font-bold text-white bg-white/10 rounded-full px-2.5 py-0.5">
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
