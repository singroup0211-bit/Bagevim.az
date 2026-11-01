import { Villa } from '../data/villas';

export type MarqueeSpeed = 'slow' | 'normal' | 'fast';
export type MarqueeDirection = 'left' | 'right';

/**
 * Calculates animation duration in seconds based on card count and speed setting
 */
export function calculateMarqueeDuration(itemCount: number, speed: MarqueeSpeed): number {
  const baseSecondsPerItem = {
    slow: 9,
    normal: 6,
    fast: 3.5,
  }[speed];

  // Minimum duration ensures calm, smooth animation
  return Math.max(20, itemCount * baseSecondsPerItem);
}

/**
 * Duplicates an array for seamless infinite marquee loop (-50% CSS translate3d)
 */
export function duplicateForInfiniteLoop<T>(items: T[], copies: number = 2): T[] {
  if (!items || items.length === 0) return [];
  const result: T[] = [];
  for (let i = 0; i < copies; i++) {
    result.push(...items);
  }
  return result;
}

/**
 * Formats a number as Azerbaijani Manat (AZN / ₼)
 */
export function formatAzn(amount: number): string {
  return new Intl.NumberFormat('az-AZ').format(amount) + ' ₼';
}

export interface VillaFilters {
  region?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  hasPool?: boolean;
}

/**
 * Pure filter function for villas
 */
export function filterVillas(villas: Villa[], filters: VillaFilters): Villa[] {
  return villas.filter((villa) => {
    if (filters.region && filters.region !== 'Bütün regionlar' && villa.region !== filters.region) {
      return false;
    }
    if (filters.type && filters.type !== 'Bütün növlər' && villa.type !== filters.type) {
      return false;
    }
    if (filters.minPrice !== undefined && villa.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== undefined && villa.price > filters.maxPrice) {
      return false;
    }
    if (filters.hasPool !== undefined && filters.hasPool && !villa.hasPool) {
      return false;
    }
    return true;
  });
}

/**
 * Generates standalone clean React + Tailwind component code for user export
 */
export function getStandaloneReactCode(): string {
  return `/*
 * bagevim.az - Sonsuz Hərəkət Edən (Infinite Marquee) Dynamic Ticker Komponenti
 * Framework: React + Tailwind CSS
 * Performans: GPU-accelerated CSS transform: translate3d()
 */

import React, { useState } from 'react';

export interface TickerCard {
  id: string;
  title: string;
  location: string;
  price: string;
  period: string;
  image: string;
  badge?: string;
}

const DEMO_CARDS: TickerCard[] = [
  {
    id: '1',
    title: 'Mərdəkan Infinity Oasis Villa',
    location: 'Mərdəkan qəs., Makaronnu yaxınlığı',
    price: '450 ₼',
    period: '/gün',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800&auto=format&fit=crop',
    badge: '360° Tur'
  },
  {
    id: '2',
    title: 'Bilgəh Sea Breeze Panorama',
    location: 'Bilgəh qəs., Dəniz sahili 1-ci xətt',
    price: '600 ₼',
    period: '/gün',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=800&auto=format&fit=crop',
    badge: 'Dəniz Mənzərəsi'
  },
  {
    id: '3',
    title: 'Şüvəlan Park Villa & Garden',
    location: 'Şüvəlan qəs., Mayak yolu',
    price: '380 ₼',
    period: '/gün',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop',
    badge: 'Hovuzlu'
  },
  {
    id: '4',
    title: 'Novxanı Sunset Beachfront',
    location: 'Novxanı qəs., Dəniz kənarı',
    price: '320 ₼',
    period: '/gün',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
    badge: 'Xüsusi Təklif'
  }
];

export default function VillaMarquee({ cards = DEMO_CARDS, speedSeconds = 35 }) {
  const [isPaused, setIsPaused] = useState(false);

  // Seamless sonsuz dövrə üçün massiv ikiqat çoxaldılır
  const loopedCards = [...cards, ...cards];

  return (
    <div className="relative w-full overflow-hidden bg-neutral-950 py-10">
      {/* Kənarlarda yumşaq şəffaflıq qradiyenti (Fade out masks) */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-neutral-950 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-neutral-950 to-transparent" />

      {/* Marquee Track */}
      <div
        className="group flex w-max items-center gap-6"
        style={{
          animation: \`marqueeScroll \${speedSeconds}s linear infinite\`,
          animationPlayState: isPaused ? 'paused' : 'running',
          willChange: 'transform',
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {loopedCards.map((card, idx) => (
          <div
            key={\`\${card.id}-\${idx}\`}
            className="relative flex h-[280px] w-[340px] shrink-0 flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-xl transition-all duration-300 hover:scale-[1.03] hover:border-amber-400/50"
          >
            {/* Arxa fon şəkli */}
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Qaranlıq qradiyent overlay (mətnin aydın oxunması üçün) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Xüsusi Nişan */}
            {card.badge && (
              <div className="absolute left-4 top-4 rounded-full bg-amber-500/90 px-3 py-1 text-xs font-semibold text-neutral-950 backdrop-blur-md">
                {card.badge}
              </div>
            )}

            {/* Kart Məlumatları */}
            <div className="relative z-10 p-5">
              <h4 className="text-base font-bold text-white line-clamp-1">{card.title}</h4>
              <p className="mt-1 text-xs text-neutral-300">{card.location}</p>
              <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-extrabold text-amber-400">{card.price}</span>
                  <span className="text-xs text-neutral-400">{card.period}</span>
                </div>
                <button className="rounded-lg bg-white/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-neutral-950">
                  Ətraflı Bax
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Global və ya Tailwind CSS üçün Keyframe təyini */}
      <style>{\`
        @keyframes marqueeScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
      \`}</style>
    </div>
  );
}`;
}

/**
 * Generates standalone HTML + Vanilla JS snippet for users who want to embed it directly
 */
export function getStandaloneVanillaHtmlCode(): string {
  return `<!-- bagevim.az - Sonsuz Hərəkət Edən (Infinite Marquee) Dynamic Ticker -->
<!-- Tələb olunan: Tailwind CSS (v3 və ya v4) -->

<div class="relative w-full overflow-hidden bg-neutral-950 py-12">
  <!-- Sol və sağ yumşaq qradiyent maskaları -->
  <div class="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-neutral-950 to-transparent"></div>
  <div class="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-neutral-950 to-transparent"></div>

  <!-- Marquee Kontenti (İkiqat dublikat) -->
  <div id="bagevim-marquee-track" class="marquee-track flex w-max gap-6 cursor-pointer">
    <!-- 1-ci Kart -->
    <div class="relative h-[290px] w-[350px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-xl transition-transform duration-300 hover:scale-[1.02]">
      <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800');"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
      <div class="relative z-10 flex h-full flex-col justify-end p-5">
        <span class="mb-auto inline-block self-start rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-neutral-950">360° Tur</span>
        <h4 class="text-lg font-bold text-white">Mərdəkan Infinity Oasis Villa</h4>
        <p class="text-xs text-neutral-300">Mərdəkan qəs. · 12 sot · İsidilən hovuz</p>
        <div class="mt-3 flex items-center justify-between border-t border-white/15 pt-2">
          <span class="text-base font-extrabold text-amber-400">450 ₼ <span class="text-xs text-neutral-400">/gün</span></span>
          <button class="rounded-lg bg-white/20 px-3 py-1.5 text-xs text-white backdrop-blur hover:bg-white hover:text-black">Rezerv Et</button>
        </div>
      </div>
    </div>

    <!-- 2-ci Kart -->
    <div class="relative h-[290px] w-[350px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-xl transition-transform duration-300 hover:scale-[1.02]">
      <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800');"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
      <div class="relative z-10 flex h-full flex-col justify-end p-5">
        <span class="mb-auto inline-block self-start rounded-full bg-cyan-500 px-3 py-1 text-xs font-bold text-neutral-950">Dəniz Kənarı</span>
        <h4 class="text-lg font-bold text-white">Bilgəh Sea Breeze Panorama</h4>
        <p class="text-xs text-neutral-300">Bilgəh qəs. · 1-ci sıra · 16 sot</p>
        <div class="mt-3 flex items-center justify-between border-t border-white/15 pt-2">
          <span class="text-base font-extrabold text-amber-400">600 ₼ <span class="text-xs text-neutral-400">/gün</span></span>
          <button class="rounded-lg bg-white/20 px-3 py-1.5 text-xs text-white backdrop-blur hover:bg-white hover:text-black">Rezerv Et</button>
        </div>
      </div>
    </div>

    <!-- Dublikat elementlər sonsuzluq üçün JS ilə və ya HTML-də klonlanır -->
  </div>
</div>

<style>
  /* CPU/GPU yükünü minimum edən 60fps translate3d keyframe */
  @keyframes marqueeScroll {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(-50%, 0, 0);
    }
  }

  .marquee-track {
    animation: marqueeScroll 35s linear infinite;
    will-change: transform;
    backface-visibility: hidden;
  }

  /* Siçan üzərinə gəldikdə yumşaq dayanma */
  .marquee-track:hover {
    animation-play-state: paused;
  }
</style>

<script>
  // Avtomatik elementləri klonlayaraq qüsursuz sonsuz dövrə yaratmaq
  document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('bagevim-marquee-track');
    if (track) {
      // Elementləri təkrar əlavə edirik (-50% transform üçün)
      track.innerHTML += track.innerHTML;
    }
  });
</script>`;
}
