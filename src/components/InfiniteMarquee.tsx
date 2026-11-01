import React, { useState } from 'react';
import { Villa } from '../data/villas';
import { duplicateForInfiniteLoop, formatAzn, calculateMarqueeDuration } from '../utils/ticker';
import { Eye, Waves, MapPin, Maximize2, Compass } from 'lucide-react';

interface InfiniteMarqueeProps {
  villas: Villa[];
  speed?: 'slow' | 'normal' | 'fast';
  direction?: 'left' | 'right';
  isPausedManually?: boolean;
  onSelectVilla: (villa: Villa) => void;
  variant?: 'compact' | 'hero-backdrop' | 'detailed';
}

export const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({
  villas,
  speed = 'normal',
  direction = 'left',
  isPausedManually = false,
  onSelectVilla,
  variant = 'detailed',
}) => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Duplicating array 3 times guarantees seamless continuous loop across ultra-wide monitors
  const loopedItems = duplicateForInfiniteLoop(villas, 3);
  const durationSeconds = calculateMarqueeDuration(villas.length, speed);

  const animationClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';

  return (
    <div
      className="relative w-full overflow-hidden py-4 select-none"
      style={{
        ['--marquee-duration' as string]: `${durationSeconds}s`,
      }}
      role="region"
      aria-label="Azərbaycanın bütün bağ evləri canlı kadr lenti"
    >
      {/* Edge gradient fade masks for smooth infinity transition */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-16 sm:w-28 md:w-36 bg-gradient-to-r from-neutral-950 via-neutral-950/70 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-16 sm:w-28 md:w-36 bg-gradient-to-l from-neutral-950 via-neutral-950/70 to-transparent" />

      {/* Marquee Track Container with hardware-accelerated translate3d */}
      <div
        className={`flex w-max items-center gap-5 sm:gap-6 pause-on-hover ${animationClass}`}
        style={{
          animationPlayState: isPausedManually ? 'paused' : undefined,
        }}
      >
        {loopedItems.map((villa, index) => {
          const uniqueKey = `${villa.id}-loop-${index}`;

          return (
            <div
              key={uniqueKey}
              onClick={() => onSelectVilla(villa)}
              onMouseEnter={() => setHoveredCardId(uniqueKey)}
              onMouseLeave={() => setHoveredCardId(null)}
              className={`group relative shrink-0 cursor-pointer overflow-hidden rounded-3xl border border-white/15 bg-neutral-900/90 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.025] hover:border-amber-400/70 hover:shadow-amber-500/15 ${
                variant === 'compact'
                  ? 'h-[220px] w-[260px] sm:h-[240px] sm:w-[300px]'
                  : 'h-[300px] w-[290px] sm:h-[330px] sm:w-[370px] md:h-[350px] md:w-[410px]'
              }`}
            >
              {/* Real Architecture & Villa Photography */}
              <div className="absolute inset-0 h-full w-full overflow-hidden bg-neutral-950">
                <img
                  src={villa.imageUrl}
                  alt={villa.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to high-res backup image if network hiccups
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80';
                  }}
                />

                {/* Subtle light overlay */}
                <div className="pointer-events-none absolute inset-0 bg-radial from-amber-500/5 via-transparent to-transparent opacity-40 mix-blend-screen" />
              </div>

              {/* High-legibility Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/45 to-neutral-950/20 transition-opacity group-hover:opacity-95" />

              {/* Top Badges & Highlights */}
              <div className="relative z-10 flex items-start justify-between p-4">
                <div className="flex flex-wrap items-center gap-1.5">
                  {villa.badge && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/95 px-3 py-1 text-[11px] font-bold text-neutral-950 shadow-md backdrop-blur-md">
                      <Compass className="h-3 w-3" />
                      {villa.badge}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 rounded-full bg-neutral-900/80 px-2.5 py-1 text-[10px] font-semibold text-neutral-200 border border-white/10 backdrop-blur-md">
                    <MapPin className="h-2.5 w-2.5 text-amber-400" />
                    {villa.region} · {villa.zone}
                  </span>
                </div>

                <div className="rounded-full bg-black/50 p-1.5 text-neutral-300 backdrop-blur-md transition-colors group-hover:bg-amber-400 group-hover:text-neutral-950">
                  <Maximize2 className="h-3.5 w-3.5" />
                </div>
              </div>

              {/* Bottom Information Card Layer */}
              <div className="relative z-10 mt-auto flex flex-col justify-end p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-bold text-white transition-colors group-hover:text-amber-300 line-clamp-1">
                  {villa.title}
                </h3>

                <p className="mt-0.5 text-xs text-neutral-300 line-clamp-1 flex items-center gap-1.5">
                  <span>{villa.location}</span>
                </p>

                {/* Key Villa Specifications */}
                <div className="mt-2.5 flex items-center gap-3 text-[11px] text-neutral-300 border-t border-white/10 pt-2.5">
                  <span className="flex items-center gap-1">
                    <span className="font-semibold text-white">{villa.bedrooms}</span> yataq
                  </span>
                  <span className="text-neutral-600">·</span>
                  <span className="flex items-center gap-1">
                    <span className="font-semibold text-white">{villa.landArea}</span> sot
                  </span>
                  <span className="text-neutral-600">·</span>
                  <span className="flex items-center gap-1">
                    <Waves className="h-3 w-3 text-cyan-400" />
                    <span className="text-cyan-200 font-medium">Hovuz</span>
                  </span>
                </div>

                {/* Pricing & Virtual Tour CTA button */}
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <span className="text-lg sm:text-xl font-extrabold tracking-tight text-amber-400">
                      {formatAzn(villa.price)}
                    </span>
                    <span className="ml-1 text-xs text-neutral-400">/{villa.period}</span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md transition-all group-hover:bg-amber-400 group-hover:text-neutral-950">
                    <Eye className="h-3.5 w-3.5" />
                    <span>Baxış</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
