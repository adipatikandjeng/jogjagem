import React from 'react';

const BASE = {
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '2.5',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/* ─────────────────────────────────────────────
   All Journeys — Ornate "J": Merapi (back) + Tugu (mid) + sea (front)
───────────────────────────────────────────── */
export function TuguJogjaIcon({ className }: { className?: string }) {
  return (
    <svg {...BASE} className={className} aria-hidden>
      {/* ── J letter outline ── */}
      <line x1="14" y1="5" x2="32" y2="5" />
      <line x1="26" y1="5" x2="26" y2="33" />
      <path d="M26 33 Q26 47 17 47 Q9 47 8 39" />
      <line x1="6" y1="39" x2="12" y2="39" />

      {/* ── BACK: Merapi mountain ── */}
      <path d="M8 37 L13 27 L17 37" strokeWidth="1.6" />
      <path d="M13 37 L20 14 L27 37" strokeWidth="1.8" />
      <path d="M17.5 21 L20 14 L22.5 21 Q20 24 17.5 21 Z" strokeWidth="1.5" />
      <path d="M18.5 13 Q19.5 10 20 9 Q20.5 10 21.5 13" strokeWidth="1.3" />

      {/* ── MID: Tugu Jogja monument ── */}
      <rect x="13" y="33" width="6"  height="3"  rx="0.3" strokeWidth="1.4" />
      <rect x="14" y="27" width="4"  height="6"  rx="0.3" strokeWidth="1.4" />
      <rect x="15" y="22" width="2"  height="5"  rx="0.2" strokeWidth="1.4" />
      <path d="M15 22 L16 19 L17 22 Z" strokeWidth="1.3" />

      {/* ── FRONT: Sea waves ── */}
      <path d="M8 41 Q11 39 14 41 Q17 43 20 41 Q23 39 26 41" strokeWidth="1.8" />
      <path d="M8 44 Q11 42 14 44 Q17 46 20 44 Q23 42 26 44" strokeWidth="1.8" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Hidden Gems — Question mark + small temple + sparkles
───────────────────────────────────────────── */
export function HiddenGemsIcon({ className }: { className?: string }) {
  return (
    <svg {...BASE} className={className} aria-hidden>
      {/* Big question mark */}
      <path d="M18 14 Q18 8 24 8 Q30 8 30 14 Q30 19 24 21 L24 26" strokeWidth="2.5" />
      <circle cx="24" cy="31" r="1.5" fill="currentColor" stroke="none" />
      {/* Small Jogja pavilion at bottom */}
      <line x1="10" y1="45" x2="38" y2="45" />
      <path d="M12 40 Q24 35 36 40" strokeWidth="2" />
      <line x1="14" y1="40" x2="14" y2="45" />
      <line x1="34" y1="40" x2="34" y2="45" />
      <path d="M15 36 Q24 31 33 36" strokeWidth="1.8" />
      <line x1="24" y1="31" x2="24" y2="29" />
      <path d="M22 29 L24 27 L26 29" strokeWidth="1.6" />
      {/* Sparkles */}
      <path d="M8 18 L9 15 L10 18 L9 21 Z" strokeWidth="1.5" />
      <circle cx="37" cy="13" r="1" fill="currentColor" stroke="none" />
      <path d="M36 10 L37 8 L38 10 L37 12 Z" strokeWidth="1.4" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Nature Escapes — Twin peaks (Merapi style) + clouds
───────────────────────────────────────────── */
export function NatureEscapesIcon({ className }: { className?: string }) {
  return (
    <svg {...BASE} className={className} aria-hidden>
      {/* Ground */}
      <line x1="3" y1="44" x2="45" y2="44" />
      {/* Left smaller peak */}
      <path d="M3 44 L16 22 L26 44" />
      {/* Right taller peak (Merapi) */}
      <path d="M20 44 L32 10 L44 44" />
      {/* Snow cap on right peak */}
      <path d="M28 19 L32 10 L36 19 Q32 23 28 19 Z" strokeWidth="2" />
      {/* Eruption smoke */}
      <path d="M30 9 Q29 6 31 5 Q30 3 33 4 Q35 2 34 5" strokeWidth="1.8" />
      {/* Cloud left of left peak */}
      <path d="M3 33 Q5 30 8 31 Q8 28 12 29 Q12 26 15 28" strokeWidth="1.8" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Culinary Legends — Wide bowl + mounded food + steam + leaf
───────────────────────────────────────────── */
export function CulinaryLegendsIcon({ className }: { className?: string }) {
  return (
    <svg {...BASE} className={className} aria-hidden>
      {/* Bowl body */}
      <path d="M9 30 Q9 45 24 45 Q39 45 39 30 Z" />
      {/* Bowl rim ellipse */}
      <path d="M8 30 Q24 25 40 30" />
      {/* Mounded food — bumpy top surface above rim */}
      <path d="M13 30 Q15 24 18 22 Q20 19 22 22 Q24 17 26 22 Q28 19 30 22 Q33 24 35 30" strokeWidth="2.2" />
      {/* Garnish leaf */}
      <path d="M22 20 Q25 14 28 20 Q25 25 22 20 Z" strokeWidth="1.8" />
      <line x1="25" y1="14" x2="24" y2="20" strokeWidth="1.6" />
      {/* Steam curls × 3 */}
      <path d="M15 27 Q13 22 15 18 Q13 14 16 11" strokeWidth="1.8" />
      <path d="M24 26 Q22 21 24 17 Q22 13 25 10" strokeWidth="1.8" />
      <path d="M33 27 Q31 22 33 18 Q31 14 34 11" strokeWidth="1.8" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Heritage & Culture — Candi Prambanan
   Central tall spire + 2 flanking + base platform
───────────────────────────────────────────── */
export function HeritageIcon({ className }: { className?: string }) {
  return (
    <svg {...BASE} className={className} aria-hidden>
      {/* Ground */}
      <line x1="3" y1="46" x2="45" y2="46" />

      {/* ── LEFT small tower ── */}
      <rect x="4"  y="41" width="11" height="5" rx="0.5" />
      <rect x="5"  y="36" width="9"  height="5" rx="0.5" />
      <path d="M5  36 L9.5 31 L14 36 Z" />
      <path d="M6  31 L9.5 27 L13 31 Z" />
      <path d="M7  27 L9.5 23 L12 27 Z" />
      <line x1="9.5" y1="23" x2="9.5" y2="21" />
      <circle cx="9.5" cy="20" r="1.2" fill="currentColor" stroke="none" />

      {/* ── RIGHT small tower ── */}
      <rect x="33" y="41" width="11" height="5" rx="0.5" />
      <rect x="34" y="36" width="9"  height="5" rx="0.5" />
      <path d="M34 36 L38.5 31 L43 36 Z" />
      <path d="M35 31 L38.5 27 L42 31 Z" />
      <path d="M36 27 L38.5 23 L41 27 Z" />
      <line x1="38.5" y1="23" x2="38.5" y2="21" />
      <circle cx="38.5" cy="20" r="1.2" fill="currentColor" stroke="none" />

      {/* ── CENTER tall tower ── */}
      <rect x="14" y="42" width="20" height="4" rx="0.5" />
      <rect x="16" y="36" width="16" height="6" rx="0.5" />
      {/* Steps up */}
      <path d="M16 36 L24 29 L32 36 Z" />
      <path d="M18 29 L24 23 L30 29 Z" />
      <path d="M19 23 L24 18 L29 23 Z" />
      <path d="M20 18 L24 14 L28 18 Z" />
      <path d="M21 14 L24 11 L27 14 Z" />
      {/* Spire */}
      <line x1="24" y1="11" x2="24" y2="7" />
      <path d="M22 9 Q24 6 26 9 Q24 12 22 9 Z" strokeWidth="1.8" />
      {/* Door arch */}
      <path d="M21 46 L21 40 Q24 37 27 40 L27 46" strokeWidth="1.8" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Adventure — Bicycle + street lamp
───────────────────────────────────────────── */
export function AdventureIcon({ className }: { className?: string }) {
  return (
    <svg {...BASE} className={className} aria-hidden>
      {/* Left wheel */}
      <circle cx="14" cy="34" r="9" />
      {/* Right wheel */}
      <circle cx="34" cy="34" r="9" />
      {/* Frame: seat stay + chain stay */}
      <path d="M14 34 L22 18 L34 34" />
      <path d="M22 18 L28 34" />
      {/* Top tube */}
      <line x1="22" y1="18" x2="28" y2="18" />
      {/* Handlebar */}
      <path d="M28 18 L32 15 L34 16" strokeWidth="2.2" />
      {/* Saddle */}
      <path d="M19 18 L17 15 L23 15" strokeWidth="2.2" />
      {/* Street lamp pole */}
      <line x1="43" y1="6" x2="43" y2="43" strokeWidth="2.2" />
      {/* Lamp arm */}
      <path d="M43 6 Q43 3 39 3" strokeWidth="2" />
      {/* Lamp head */}
      <rect x="35" y="1" width="5" height="4" rx="1" />
      {/* Light rays */}
      <line x1="37" y1="6" x2="36" y2="9"  strokeWidth="1.5" />
      <line x1="37" y1="6" x2="38" y2="9"  strokeWidth="1.5" />
      <line x1="37" y1="6" x2="34" y2="8"  strokeWidth="1.5" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Beaches & Sunsets — Palm tree (left) + sun (right) + waves
───────────────────────────────────────────── */
export function BeachesIcon({ className }: { className?: string }) {
  return (
    <svg {...BASE} className={className} aria-hidden>
      {/* Sun */}
      <circle cx="36" cy="14" r="5" />
      <line x1="36" y1="6"  x2="36" y2="4"  />
      <line x1="36" y1="22" x2="36" y2="24" />
      <line x1="28" y1="14" x2="26" y2="14" />
      <line x1="44" y1="14" x2="46" y2="14" />
      <line x1="30.3" y1="8.3"  x2="28.9" y2="6.9"  />
      <line x1="41.7" y1="8.3"  x2="43.1" y2="6.9"  />
      <line x1="30.3" y1="19.7" x2="28.9" y2="21.1" />
      <line x1="41.7" y1="19.7" x2="43.1" y2="21.1" />
      {/* Palm trunk — curves right */}
      <path d="M12 46 Q14 38 16 30 Q14 22 18 16" strokeWidth="2.5" />
      {/* Palm leaves */}
      <path d="M18 16 Q26 12 28 18" />
      <path d="M18 16 Q10 8  6  13" />
      <path d="M18 16 Q24 8 22  4"  />
      <path d="M18 16 Q10 18 8  24" />
      {/* Coconuts */}
      <circle cx="19" cy="18" r="1.8" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.5" />
      {/* Waves × 2 */}
      <path d="M3 36 Q7 33 11 36 Q15 39 19 36 Q23 33 27 36 Q31 39 35 36" strokeWidth="2" />
      <path d="M3 41 Q7 38 11 41 Q15 44 19 41 Q23 38 27 41 Q31 44 35 41" strokeWidth="2" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Family Friendly — Open Jogja pendopo + two adults + child
───────────────────────────────────────────── */
export function FamilyFriendlyIcon({ className }: { className?: string }) {
  return (
    <svg {...BASE} className={className} aria-hidden>
      {/* Floor */}
      <line x1="6" y1="44" x2="42" y2="44" />
      {/* Columns */}
      <line x1="10" y1="26" x2="10" y2="44" />
      <line x1="38" y1="26" x2="38" y2="44" />
      {/* Lower roof tier */}
      <path d="M6 26 Q24 19 42 26" />
      {/* Upper roof tier */}
      <path d="M10 20 Q24 14 38 20" />
      {/* Roof peak + finial */}
      <path d="M16 14 Q24 9 32 14" />
      <line x1="24" y1="9" x2="24" y2="6" />
      <path d="M22 6 L24 4 L26 6" strokeWidth="1.8" />
      {/* Left adult */}
      <circle cx="16" cy="32" r="3" />
      <line x1="16" y1="35" x2="16" y2="44" />
      <path d="M11 39 L16 37 L21 39" />
      {/* Right adult */}
      <circle cx="32" cy="32" r="3" />
      <line x1="32" y1="35" x2="32" y2="44" />
      <path d="M27 39 L32 37 L37 39" />
      {/* Child centre */}
      <circle cx="24" cy="34" r="2.2" />
      <line x1="24" y1="36" x2="24" y2="44" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Weekend Ideas — Calendar with mini Prambanan inside
───────────────────────────────────────────── */
export function WeekendIdeasIcon({ className }: { className?: string }) {
  return (
    <svg {...BASE} className={className} aria-hidden>
      {/* Calendar outer */}
      <rect x="5" y="10" width="38" height="36" rx="3" />
      {/* Header band */}
      <rect x="5" y="10" width="38" height="10" rx="3" fill="currentColor" fillOpacity="0.1" />
      <line x1="5" y1="20" x2="43" y2="20" />
      {/* Binding pins */}
      <line x1="15" y1="6"  x2="15" y2="14" strokeWidth="2.5" />
      <line x1="33" y1="6"  x2="33" y2="14" strokeWidth="2.5" />
      {/* Date dots */}
      <circle cx="13" cy="25" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="20" cy="25" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="27" cy="25" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="34" cy="25" r="1.3" fill="currentColor" stroke="none" />
      {/* Mini Prambanan inside lower calendar */}
      {/* Ground */}
      <line x1="8" y1="44" x2="40" y2="44" />
      {/* Left mini tower */}
      <rect x="8"  y="40" width="7" height="4" rx="0.3" />
      <path d="M8  40 L11.5 36 L15 40 Z" strokeWidth="1.8" />
      <path d="M9  36 L11.5 33 L14 36 Z" strokeWidth="1.8" />
      <line x1="11.5" y1="33" x2="11.5" y2="31" strokeWidth="1.6" />
      <circle cx="11.5" cy="30.5" r="0.8" fill="currentColor" stroke="none" />
      {/* Right mini tower */}
      <rect x="33" y="40" width="7" height="4" rx="0.3" />
      <path d="M33 40 L36.5 36 L40 40 Z" strokeWidth="1.8" />
      <path d="M34 36 L36.5 33 L39 36 Z" strokeWidth="1.8" />
      <line x1="36.5" y1="33" x2="36.5" y2="31" strokeWidth="1.6" />
      <circle cx="36.5" cy="30.5" r="0.8" fill="currentColor" stroke="none" />
      {/* Centre tall tower */}
      <rect x="18" y="41" width="12" height="3" rx="0.3" />
      <rect x="19" y="37" width="10" height="4" rx="0.3" />
      <path d="M19 37 L24 32 L29 37 Z" strokeWidth="1.8" />
      <path d="M20 32 L24 28 L28 32 Z" strokeWidth="1.8" />
      <path d="M21 28 L24 25 L27 28 Z" strokeWidth="1.6" />
      <line x1="24" y1="25" x2="24" y2="23" strokeWidth="1.6" />
      <circle cx="24" cy="22.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Camping Grounds — Tent + stars + pine trees
───────────────────────────────────────────── */
export function CampingIcon({ className }: { className?: string }) {
  return (
    <svg {...BASE} className={className} aria-hidden>
      {/* Tent body */}
      <path d="M24 12 L10 38 L38 38 Z" strokeWidth="2" />
      {/* Tent opening */}
      <path d="M24 12 L19 38" strokeWidth="1.5" />
      <path d="M24 12 L29 38" strokeWidth="1.5" />
      {/* Ground line */}
      <line x1="8" y1="38" x2="40" y2="38" />
      {/* Stars */}
      <circle cx="12" cy="8" r="1" fill="currentColor" stroke="none" />
      <circle cx="36" cy="6" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="30" cy="10" r="0.8" fill="currentColor" stroke="none" />
      {/* Pine trees */}
      <path d="M6 38 L8 32 L10 38" strokeWidth="1.5" />
      <path d="M38 38 L40 34 L42 38" strokeWidth="1.5" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Sunset Spots — Sun dipping below horizon + gradient rays
───────────────────────────────────────────── */
export function SunsetIcon({ className }: { className?: string }) {
  return (
    <svg {...BASE} className={className} aria-hidden>
      {/* Sun half-visible above horizon */}
      <path d="M12 28 A12 12 0 0 1 36 28" strokeWidth="2.5" />
      {/* Horizon line */}
      <line x1="6" y1="28" x2="42" y2="28" />
      {/* Sun rays */}
      <line x1="24" y1="10" x2="24" y2="14" strokeWidth="2" />
      <line x1="12" y1="14" x2="14" y2="17" strokeWidth="2" />
      <line x1="36" y1="14" x2="34" y2="17" strokeWidth="2" />
      <line x1="8" y1="22" x2="11" y2="23" strokeWidth="2" />
      <line x1="40" y1="22" x2="37" y2="23" strokeWidth="2" />
      {/* Water reflection waves */}
      <path d="M10 34 Q17 32 24 34 Q31 36 38 34" strokeWidth="1.5" />
      <path d="M14 38 Q20 36 26 38 Q32 40 38 38" strokeWidth="1.5" />
    </svg>
  );
}
