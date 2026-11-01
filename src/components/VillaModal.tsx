import React, { useState } from 'react';
import { Villa } from '../data/villas';
import { formatAzn } from '../utils/ticker';
import {
  X,
  MapPin,
  Waves,
  Sparkles,
  Phone,
  MessageCircle,
  Compass,
  CheckCircle2,
  CalendarCheck,
  ShieldCheck,
} from 'lucide-react';

interface VillaModalProps {
  villa: Villa | null;
  onClose: () => void;
}

export const VillaModal: React.FC<VillaModalProps> = ({ villa, onClose }) => {
  if (!villa) return null;

  const [activeTourAngle, setActiveTourAngle] = useState<'pool' | 'front' | 'interior'>('pool');

  const whatsappMessage = encodeURIComponent(
    `Salam! bagevim.az saytında "${villa.title}" (ID: ${villa.id}, Region: ${villa.region}, ${formatAzn(villa.price)}/${villa.period}) haqqında məlumat almaq və bron etmək istəyirəm.`
  );
  const whatsappUrl = `https://wa.me/994502220000?text=${whatsappMessage}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-villa-title"
    >
      <div className="relative w-full max-w-4xl overflow-hidden rounded-[2.5rem] border border-white/20 bg-neutral-900 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md hover:bg-white hover:text-black transition-colors cursor-pointer"
          aria-label="Pəncərəni bağla"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Media / Real Photography Viewport */}
        <div className="relative h-[300px] sm:h-[400px] w-full overflow-hidden bg-neutral-950">
          <img
            src={villa.imageUrl}
            alt={villa.title}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-700"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80';
            }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-black/50" />

          {/* Tour View Selector */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-neutral-950/80 p-1 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setActiveTourAngle('pool')}
                className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                  activeTourAngle === 'pool' ? 'bg-amber-400 text-neutral-950' : 'text-neutral-300 hover:text-white'
                }`}
              >
                Hovuz & Terras
              </button>
              <button
                type="button"
                onClick={() => setActiveTourAngle('front')}
                className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                  activeTourAngle === 'front' ? 'bg-amber-400 text-neutral-950' : 'text-neutral-300 hover:text-white'
                }`}
              >
                Fasad & Ərazi
              </button>
              <button
                type="button"
                onClick={() => setActiveTourAngle('interior')}
                className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                  activeTourAngle === 'interior' ? 'bg-amber-400 text-neutral-950' : 'text-neutral-300 hover:text-white'
                }`}
              >
                İnteryer & Zal
              </button>
            </div>

            <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-neutral-950/80 px-3.5 py-1.5 text-xs text-amber-300 backdrop-blur-md">
              <Compass className="h-3.5 w-3.5" />
              <span>{villa.viewType}</span>
            </div>
          </div>
        </div>

        {/* Modal Details Body */}
        <div className="max-h-[55vh] overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <span className="font-bold text-amber-400">{villa.region}</span>
                <span>·</span>
                <span>{villa.zone}</span>
                <span>·</span>
                <span>Reytinq: {villa.rating} ({villa.reviewsCount} rəy)</span>
              </div>
              <h2 id="modal-villa-title" className="text-xl sm:text-2xl font-bold text-white mt-1">
                {villa.title}
              </h2>
              <p className="text-xs text-neutral-400 mt-1 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                {villa.location}
              </p>
            </div>

            <div className="flex sm:flex-col items-baseline sm:items-end justify-between border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">
                {formatAzn(villa.price)}
              </span>
              <span className="text-xs text-neutral-400">/{villa.period}</span>
            </div>
          </div>

          {/* Quick Specifications Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-2xl border border-white/10 bg-neutral-950/60 p-4 text-center">
            <div>
              <span className="text-xs text-neutral-400 block">Həyət sahəsi</span>
              <span className="text-base font-bold text-white mt-0.5 block">{villa.landArea} sot</span>
            </div>
            <div>
              <span className="text-xs text-neutral-400 block">Ev sahəsi</span>
              <span className="text-base font-bold text-white mt-0.5 block">{villa.houseArea} kv.m</span>
            </div>
            <div>
              <span className="text-xs text-neutral-400 block">Otaqlar</span>
              <span className="text-base font-bold text-white mt-0.5 block">{villa.bedrooms} yataq / {villa.bathrooms} s/q</span>
            </div>
            <div>
              <span className="text-xs text-neutral-400 block">Qonaq tutumu</span>
              <span className="text-base font-bold text-white mt-0.5 block">{villa.capacity} nəfər</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Təsvir</h4>
            <p className="mt-2 text-sm text-neutral-300 leading-relaxed">{villa.description}</p>
          </div>

          {/* Amenities & Tags */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Xüsusiyyətlər və Komfort</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {villa.tags.map((tag, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-neutral-800/80 px-3.5 py-1.5 text-xs text-neutral-200"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  {tag}
                </span>
              ))}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-neutral-800/80 px-3.5 py-1.5 text-xs text-neutral-200">
                <Waves className="h-3.5 w-3.5 text-cyan-400" />
                {villa.poolType}
              </span>
              {villa.hasSauna && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-neutral-800/80 px-3.5 py-1.5 text-xs text-neutral-200">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                  Sauna & Spa
                </span>
              )}
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="rounded-2xl border border-white/10 bg-amber-500/5 p-4 flex items-center gap-3 text-xs text-neutral-300">
            <ShieldCheck className="h-5 w-5 text-amber-400 shrink-0" />
            <span>
              bagevim.az zəmanəti: Bütün bağ evləri və villalar real şəkillərlə təqdim olunur və yerində yoxlanılmışdır.
            </span>
          </div>

          {/* Direct Reservation CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-600/20"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp ilə Bron Et</span>
            </a>

            <a
              href="tel:+994502220000"
              className="flex-1 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-5 py-3.5 text-sm font-bold text-neutral-950 hover:brightness-110 transition-colors shadow-md shadow-amber-500/20"
            >
              <Phone className="h-4 w-4" />
              <span>Zənglə Əlaqə Saxla</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
