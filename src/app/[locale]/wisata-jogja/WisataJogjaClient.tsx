'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import AdBanner from '@/components/AdBanner';
import type { Destination } from '@/types';
import { toSlug } from '@/lib/slug';

interface WisataJogjaClientProps {
  destinations: Destination[];
  locale: string;
}

const BADGE_LABEL: Record<string, { id: string; en: string }> = {
  trending:   { id: 'Trending',   en: 'Trending'   },
  hidden_gem: { id: 'Hidden Gem', en: 'Hidden Gem'  },
};

export default function WisataJogjaClient({ destinations, locale }: WisataJogjaClientProps) {
  const router = useRouter();
  const isEn = locale === 'en';
  const localePrefix = isEn ? '/en' : '';
  const updatedAt = new Date().toLocaleDateString(isEn ? 'en-US' : 'id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gold-50">
        <Header activeTab="discover" setActiveTab={() => router.push('/')} savedCount={0} isOverHero={false} />

        {/* ── Masthead ─────────────────────────────────────────────────────── */}
        <header className="border-b border-gold-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-10 md:pt-16 md:pb-14">

            {/* Breadcrumb */}
            <nav
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-gold-700/80 mb-6"
              aria-label="Breadcrumb"
            >
              <Link href={`${localePrefix}/`} className="hover:text-royal-900 transition-colors">
                {isEn ? 'Home' : 'Beranda'}
              </Link>
              <span className="mx-2 text-gold-300">/</span>
              <span className="text-royal-700">
                {isEn ? 'Popular Destinations' : 'Wisata Jogja'}
              </span>
            </nav>

            {/* Eyebrow */}
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-gold-700 mb-4">
              {isEn
                ? `Updated ${updatedAt} · ${destinations.length} spots`
                : `Diperbarui ${updatedAt} · ${destinations.length} tempat`}
            </p>

            {/* Headline */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-royal-900 leading-[1.05] mb-6">
              {isEn ? (
                <>Yogyakarta&apos;s{' '}
                  <span className="italic text-gold-600">Most Loved</span> Places
                </>
              ) : (
                <>Tempat Wisata{' '}
                  <span className="italic text-gold-600">Paling Dicari</span> di Jogja
                </>
              )}
            </h1>

            {/* Intro paragraph */}
            <p className="font-sans text-lg text-royal-700/85 leading-relaxed max-w-xl">
              {isEn
                ? 'Planning a trip to Yogyakarta? Here are the most popular places to visit right now, ranked by what travelers are actually searching for and rating highest — from iconic temples to beaches and trending hidden gems.'
                : 'Lagi rencanain liburan ke Jogja? Berikut tempat wisata paling populer saat ini, diurutkan berdasarkan apa yang paling banyak dicari dan dinilai tinggi oleh wisatawan — mulai dari candi ikonik, pantai, sampai hidden gem yang lagi trending.'}
            </p>
          </div>
        </header>

        {/* ── Listicle — "Kraton Ledger" ───────────────────────────────────── */}
        {/* Hairline gold dividers instead of card boxes; ghost ordinal numerals */}
        <main className="max-w-3xl mx-auto px-4 sm:px-6">
          <ol className="divide-y divide-gold-200">
            {destinations.map((d, i) => {
              const slug = toSlug(d.name);
              const badgeKey = d.badge?.toLowerCase().replace(/\s+/g, '_');
              const badgeLabel =
                badgeKey && BADGE_LABEL[badgeKey]
                  ? isEn ? BADGE_LABEL[badgeKey].en : BADGE_LABEL[badgeKey].id
                  : null;
              const image = d.images?.[0]?.url;
              const summary = d.description || d.tagline;

              return (
                <li key={d.id} className="scroll-mt-24 py-10 md:py-14" id={`item-${i + 1}`}>
                  {/* Two-column: ghost ordinal + content */}
                  <div className="grid grid-cols-[64px_1fr] md:grid-cols-[96px_1fr] gap-4 md:gap-8 items-start">

                    {/* Ghost ordinal numeral — "plat katalog kraton" */}
                    <span
                      className="font-display italic text-gold-200 leading-none select-none pt-1"
                      style={{ fontSize: 'clamp(48px, 8vw, 80px)' }}
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <div className="min-w-0">
                      {/* Name + badge row */}
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5 mb-4">
                        <h2 className="font-manrope text-2xl md:text-3xl font-bold text-royal-900">
                          <Link
                            href={`${localePrefix}/destinations/${slug}`}
                            className="hover:text-gold-700 transition-colors"
                          >
                            {d.name}
                          </Link>
                        </h2>
                        {badgeLabel && (
                          <span className="font-mono text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full border border-gold-300 text-gold-700 whitespace-nowrap">
                            {badgeLabel}
                          </span>
                        )}
                      </div>

                      {/* Cover image */}
                      {image && (
                        <Link
                          href={`${localePrefix}/destinations/${slug}`}
                          className="block mb-5 group"
                        >
                          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-gold-100">
                            <Image
                              src={image}
                              alt={d.name}
                              fill
                              sizes="(max-width: 768px) 100vw, 700px"
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                              loading={i < 3 ? 'eager' : 'lazy'}
                            />
                          </div>
                        </Link>
                      )}

                      {/* Summary */}
                      {summary && (
                        <p className="font-sans text-royal-700/90 leading-relaxed mb-4">
                          {summary}
                        </p>
                      )}

                      {/* "Read more" link */}
                      <Link
                        href={`${localePrefix}/destinations/${slug}`}
                        className="inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.15em] uppercase text-gold-700 hover:text-royal-900 hover:gap-2.5 transition-all duration-150"
                      >
                        {isEn ? 'Read more' : 'Selengkapnya'}
                        <ArrowUpRight size={14} strokeWidth={2.5} />
                      </Link>
                    </div>
                  </div>

                  {/* Native ad slot — unchanged cadence (every 8th item) */}
                  {(i + 1) % 8 === 0 && (
                    <div className="mt-8 ml-[72px] md:ml-[112px]">
                      <AdBanner placement="wisata_jogja_listicle" variant="native" showHouseAdFallback />
                    </div>
                  )}
                </li>
              );
            })}
          </ol>

          {/* ── Closing CTA ───────────────────────────────────────────────── */}
          <div className="py-16 md:py-24 text-center border-t border-gold-200">
            <p className="font-display italic text-xl md:text-2xl text-royal-900 mb-8">
              {isEn
                ? 'Want to see everything Yogyakarta has to offer?'
                : 'Mau lihat semua destinasi wisata Jogja?'}
            </p>
            <Link
              href={`${localePrefix}/destinations`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-royal-900 text-gold-100 font-manrope font-semibold text-sm tracking-wide hover:bg-royal-700 transition-colors"
            >
              {isEn ? 'Browse all destinations' : 'Lihat semua destinasi'}
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </Link>
          </div>
        </main>
      </div>
    </AuthProvider>
  );
}
