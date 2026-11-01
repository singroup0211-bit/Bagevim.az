import React, { useState } from 'react';
import { Villa } from '../data/villas';
import { InfiniteMarquee } from './InfiniteMarquee';
import { AzerbaijanRegions } from './AzerbaijanRegions';
import { VillaFilters } from '../utils/ticker';
import { Search, MapPin, Calendar } from 'lucide-react';

interface HeroSectionProps {
  villas: Villa[];
  onSelectVilla: (villa: Villa) => void;
  onFilterChange: (filters: VillaFilters) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  villas,
  onSelectVilla,
  onFilterChange,
}) => {
  // Search filter states across all of Azerbaijan
  const [selectedRegion, setSelectedRegion] = useState<string>('Bütün regionlar');
  const [selectedType, setSelectedType] = useState<string>('Bütün növlər');
  const [onlyPool, setOnlyPool] = useState<boolean>(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({
      region: selectedRegion,
      type: selectedType,
      hasPool: onlyPool ? true : undefined,
    });

    const grid = document.getElementById('villas-grid');
    if (grid) {
      grid.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRegionSelectFromNavigator = (region: string) => {
    setSelectedRegion(region);
    onFilterChange({
      region: region,
      type: selectedType,
      hasPool: onlyPool ? true : undefined,
    });
  };

  return (
    <section className="relative min-h-[700px] w-full overflow-hidden bg-neutral-950 pt-28 pb-16 sm:pt-36 sm:pb-24">
      {/* 
        Arxa fonda fasiləsiz hərəkət edən dinamik kadr lenti (Default olaraq stabil hərəkət edir)
        və üzərində yarı-şəffaf qaranlıq qradiyent overlay (H1 və axtarış oxunaqlılığı üçün)
      */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-45">
        <div className="absolute -top-12 left-0 right-0">
          <InfiniteMarquee
            villas={villas}
            speed="normal"
            direction="left"
            isPausedManually={false}
            onSelectVilla={onSelectVilla}
            variant="compact"
          />
        </div>

        {/* Semi-transparent dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-neutral-950 backdrop-blur-[2px]" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 
          Tələb olunan: "Dayandır", "Normal", "Sola", "Kodu al" düymələri 
          və "Dinamik kadr lenti" mətni tamamilə yığışdırıldı. 
          Lent təbii və default olaraq axır.
        */}

        {/* H1 Main Headline & Subtitle with Centered Brand Logo */}
        <div className="mx-auto max-w-4xl text-center">
          {/* Tam ortalanmış və zərif işıq effekti ilə bagevim loqosu */}
          <div className="mx-auto mb-6 flex justify-center">
            <div className="relative group flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full border border-amber-400/40 bg-black p-2 shadow-2xl shadow-amber-500/25 ring-2 ring-amber-400/30 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-amber-400/70 hover:shadow-amber-500/40">
              <div className="pointer-events-none absolute -inset-2 rounded-full bg-radial from-amber-400/25 via-amber-500/5 to-transparent blur-md opacity-75 group-hover:opacity-100" />
              <img
                src="/logo.jpeg"
                alt="bagevim loqo"
                className="relative z-10 h-full w-full rounded-full object-contain object-center"
                onError={(e) => {
                  e.currentTarget.src = '/assets/aistudio/Gemini_Generated_Image_j6n1npj6n1npj6n1_copy_1275488f.jpeg';
                }}
              />
            </div>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl text-balance leading-tight">
            Azərbaycanın bütün{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              bağ evləri
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-neutral-300 text-balance leading-relaxed">
            Qəbələ, Quba, Bakı, Naxçıvan, Gəncə, İsmayıllı və Şəkidə dağ meşələri, göl və dəniz kənarında
            isidilən hovuzlu ən seçmə bağ evləri və villaların icarəsi.
          </p>
        </div>

        {/* Real-Estate Filter & Search Panel Across Azerbaijan (Oval-softened borders) */}
        <div id="filter-section" className="mx-auto mt-9 max-w-4xl">
          <form
            onSubmit={handleSearchSubmit}
            className="rounded-[2rem] border border-white/15 bg-neutral-900/90 p-4 sm:p-5 shadow-2xl backdrop-blur-xl"
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {/* Region Filter */}
              <div className="flex flex-col">
                <label className="mb-1 text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-amber-400" />
                  Bölgə / Şəhər
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full rounded-full border border-white/10 bg-neutral-950 px-4 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer"
                >
                  <option value="Bütün regionlar">Bütün Azərbaycan</option>
                  <option value="Qəbələ">Qəbələ (Tufandağ / Nohurgöl)</option>
                  <option value="Quba">Quba (Qəçrəş / Qudyalçay)</option>
                  <option value="Bakı">Bakı (Mərdəkan / Bilgəh / Şüvəlan)</option>
                  <option value="Naxçıvan">Naxçıvan (Batabat / Ordubad)</option>
                  <option value="Gəncə">Gəncə & Göygöl (Hacıkənd)</option>
                  <option value="İsmayıllı">İsmayıllı (Lahıc / Qaranohur)</option>
                  <option value="Şəki">Şəki (Kiş kəndi / Xan sarayı)</option>
                </select>
              </div>

              {/* Type Filter */}
              <div className="flex flex-col">
                <label className="mb-1 text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-amber-400" />
                  İcarə Növü
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full rounded-full border border-white/10 bg-neutral-950 px-4 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer"
                >
                  <option value="Bütün növlər">Bütün növlər</option>
                  <option value="Günlük">Günlük İcarə</option>
                  <option value="Aylıq">Aylıq / Mövsümi</option>
                  <option value="Satış">Satış</option>
                </select>
              </div>

              {/* Pool Option */}
              <div className="flex flex-col justify-end">
                <label
                  onClick={() => setOnlyPool((prev) => !prev)}
                  className="flex h-[42px] cursor-pointer items-center justify-between rounded-full border border-white/10 bg-neutral-950 px-4 py-2 text-sm text-neutral-200 hover:border-white/20 transition-colors"
                >
                  <span className="text-xs font-medium">Yalnız Hovuzlu</span>
                  <input
                    type="checkbox"
                    checked={onlyPool}
                    onChange={(e) => setOnlyPool(e.target.checked)}
                    className="h-4 w-4 rounded-full border-white/20 accent-amber-500 cursor-pointer"
                  />
                </label>
              </div>

              {/* Submit CTA */}
              <div className="flex flex-col justify-end">
                <button
                  type="submit"
                  className="flex h-[42px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-5 py-2 text-sm font-bold text-neutral-950 shadow-lg shadow-amber-500/25 transition-all hover:brightness-110 active:scale-95 cursor-pointer"
                >
                  <Search className="h-4 w-4" />
                  <span>Bağ Evlərini Axtar</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* 
          OVAL ŞƏKİLDƏ ƏHATƏLƏYƏN ÇƏRÇİVƏ İÇİNDƏ CANLI KADR LENTİ 
          (İstifadəçi idarəetmə düymələri yığışdırıldı, default olaraq hamar axır)
        */}
        <div id="marquee-section" className="mt-12 sm:mt-16">
          <div className="relative overflow-hidden rounded-[2.5rem] sm:rounded-[3.5rem] md:rounded-[4rem] border border-white/20 bg-gradient-to-b from-neutral-900/80 via-neutral-950/95 to-neutral-900/80 p-3 sm:p-6 backdrop-blur-2xl shadow-[0_0_80px_-20px_rgba(245,158,11,0.22),inset_0_0_30px_rgba(255,255,255,0.03)] ring-1 ring-white/10">
            {/* Daxili üst və alt oval ambient parıltı */}
            <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-32 w-4/5 rounded-[50%] bg-radial from-amber-400/20 via-amber-500/5 to-transparent blur-xl" />
            <div className="pointer-events-none absolute -bottom-16 left-1/2 -translate-x-1/2 h-32 w-4/5 rounded-[50%] bg-radial from-amber-400/15 via-amber-500/5 to-transparent blur-xl" />

            {/* Infinite Marquee Component */}
            <div className="relative z-10">
              <InfiniteMarquee
                villas={villas}
                speed="normal"
                direction="left"
                isPausedManually={false}
                onSelectVilla={onSelectVilla}
                variant="detailed"
              />
            </div>
          </div>
        </div>

        {/* 
          Bütün Azərbaycanın İstirahət Bölgələri (Qəbələ, Quba, Bakı, Naxçıvan, Gəncə, İsmayıllı, Şəki)
        */}
        <AzerbaijanRegions
          villas={villas}
          selectedRegion={selectedRegion}
          onSelectRegion={handleRegionSelectFromNavigator}
        />
      </div>
    </section>
  );
};
