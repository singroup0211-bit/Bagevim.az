import React from 'react';
import { ShieldCheck, Mountain, Trees, Waves } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about-section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Editorial Proposition */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            bagevim.az Təcrübəsi
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Azərbaycanın hər bölgəsində etibarlı və rahat bağ evi seçimi
          </h2>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Biz Qəbələnin sıx meşələrindən Qubanın sərin dağ çaylarına, Bakının dənizkənarı villalarından Naxçıvanın
            Batabat yaylağına qədər bütün mülkləri vahid şəffaf platformada təqdim edirik.
          </p>

          <div className="pt-2">
            <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-5">
              <p className="text-xs italic text-neutral-300 leading-relaxed">
                "Qəbələdə ailəvi istirahət üçün dağ mənzərəli villa axtarırdıq. bagevim.az vasitəsilə Tufandağ yaxınlığında
                isidilən hovuzlu kottec tapdıq və hər şey təsvir olunan kimi real və təmiz idi."
              </p>
              <div className="mt-3 flex items-center justify-between text-xs border-t border-white/10 pt-3">
                <span className="font-semibold text-white">Kamran Əliyev</span>
                <span className="text-neutral-400">Qəbələ Tufandağ Chalet qonağı</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 4 Curated Pillars */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 bg-neutral-900/80 p-6 space-y-3">
            <span className="text-lg font-bold text-amber-400">01.</span>
            <h3 className="text-base font-bold text-white">100% Real Foto və Video Çəkiliş</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Bütün elanlar peşəkar çəkiliş qrupumuz tərəfindən yerində çəkilir. Heç bir saxta və ya köhnə foto yerləşdirilmir.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-neutral-900/80 p-6 space-y-3">
            <span className="text-lg font-bold text-amber-400">02.</span>
            <h3 className="text-base font-bold text-white">Sanitariya və Hovuz Nəzarəti</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              İstər dağ bulağı, istərsə də dənizkənarı isidilən hovuzlar hər qonaq qəbulundan öncə təmizlənir və dezinfeksiya edilir.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-neutral-900/80 p-6 space-y-3">
            <span className="text-lg font-bold text-amber-400">03.</span>
            <h3 className="text-base font-bold text-white">Bölgələr Üzrə Birbaşa Əlaqə</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Əlavə vasitəçi komissiyaları olmadan, Quba, Qəbələ, Bakı, Naxçıvan və digər bölgələrdə mülk sahibləri ilə birbaşa əlaqə.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-neutral-900/80 p-6 space-y-3">
            <span className="text-lg font-bold text-amber-400">04.</span>
            <h3 className="text-base font-bold text-white">24/7 Dəstək və Qarşılama</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Giriş və çıxış zamanı köməklik, istilik və internet kimi məsələlərdə operativ dəstək xidməti.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
