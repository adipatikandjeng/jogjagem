'use client';

import React from 'react';
import { Star, Sparkles, Heart, Pencil } from 'lucide-react';
import { Destination, Review } from '@/types';
import { useLocale } from '@/contexts/LocaleContext';
import { useAuth } from '@/contexts/AuthContext';

export interface DestinationReviewsProps {
  destination: Destination;
  communityReviews: Review[];
  reviewsLoading?: boolean;
  reviewFilter: 'all' | 'Solo' | 'Couple' | 'Family' | 'Friends';
  onFilterChange: (filter: 'all' | 'Solo' | 'Couple' | 'Family' | 'Friends') => void;
  filteredReviews: Review[];
  visibleReviews: number;
  onLoadMore: () => void;
  likedReviewIds: Set<string>;
  reviewHelpfulCounts: Record<string, number>;
  onToggleLike: (id: string) => void;
  // Write review form
  newReviewText: string;
  onReviewTextChange: (text: string) => void;
  newReviewRating: number;
  onReviewRatingChange: (rating: number) => void;
  newReviewTravelerType: 'Solo' | 'Couple' | 'Family' | 'Friends';
  onTravelerTypeChange: (type: 'Solo' | 'Couple' | 'Family' | 'Friends') => void;
  submittingReview: boolean;
  reviewSubmitted: boolean;
  reviewError: string;
  onSubmitReview: () => void;
}

export default function DestinationReviews({
  destination,
  communityReviews,
  reviewsLoading,
  reviewFilter,
  onFilterChange,
  filteredReviews,
  visibleReviews,
  onLoadMore,
  likedReviewIds,
  reviewHelpfulCounts,
  onToggleLike,
  newReviewText,
  onReviewTextChange,
  newReviewRating,
  onReviewRatingChange,
  newReviewTravelerType,
  onTravelerTypeChange,
  submittingReview,
  reviewSubmitted,
  reviewError,
  onSubmitReview,
}: DestinationReviewsProps) {
  const { t } = useLocale();
  const { isAuthenticated } = useAuth();

  return (
    <div id="community-stories" className="space-y-6 scroll-mt-20">

      {/* ── Top: Rating Summary + AI Panel ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">

        {/* Left: numeric rating + star bars */}
        <div className="bg-white border border-stone-100 rounded-2xl p-5 flex gap-5 items-center shadow-sm">
          <div className="text-center shrink-0">
            <p className="text-5xl font-manrope font-extrabold text-[#1c1a17]">{destination.rating.toFixed(1)}</p>
            <div className="flex items-center gap-0.5 justify-center mt-1">
              {[1,2,3,4,5].map(s => (
                <Star key={s} className={`h-3.5 w-3.5 ${s <= Math.round(destination.rating) ? 'fill-amber-400 text-amber-400' : 'text-stone-200'}`} />
              ))}
            </div>
            <p className="text-[10px] text-stone-400 mt-1 font-mono">{communityReviews.length.toLocaleString()} {t('destination_detail.reviews')}</p>
          </div>
          <div className="flex-1 space-y-1.5">
            {[5,4,3,2,1].map(star => {
              const count = communityReviews.filter(r => Math.round(r.rating) === star).length;
              const pct = communityReviews.length > 0 ? (count / communityReviews.length) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-stone-500 w-2 shrink-0">{star}</span>
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400 shrink-0" />
                  <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-stone-400 font-mono w-7 text-right shrink-0">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: AI review summary */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-amber-400 rounded-lg flex items-center justify-center">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-[10px] font-mono font-bold text-amber-800 uppercase tracking-widest">{t('destination_detail.ai_review_summary')}</span>
          </div>
          <p className="text-[12px] font-semibold text-amber-900 mb-3">
            {communityReviews.length > 0
                ? `${Math.round((communityReviews.filter(r => r.rating >= 4).length / communityReviews.length) * 100)}% ${t('destination_detail.travelers_recommend')}`
                : t('destination_detail.be_first_review')}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[9px] font-mono font-bold text-emerald-700 uppercase tracking-widest mb-1.5">{t('destination_detail.most_loved')}</p>
              <ul className="space-y-1">
                {((destination as any).aiPros?.slice(0,3) as string[] | undefined
                  ?? (destination.travelTips.length > 0
                    ? destination.travelTips.slice(0, 3)
                    : [destination.description?.slice(0, 50) || t('destination_detail.pro_unique'), t('destination_detail.pro_scenery'), t('destination_detail.pro_heritage')])
                ).map((tip: string, i: number) => (
                  <li key={i} className="flex items-start gap-1.5 text-[11px] text-stone-700">
                    <span className="text-emerald-500 mt-0.5 shrink-0">●</span>{tip}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[9px] font-mono font-bold text-stone-500 uppercase tracking-widest mb-1.5">{t('destination_detail.could_be_better')}</p>
              <ul className="space-y-1">
                {(() => {
                  const aiCons = (destination as any).aiCons as string[] | undefined;
                  if (aiCons?.length) return aiCons.slice(0, 2);
                  const reviewText = communityReviews.map(r => r.comment?.toLowerCase() || ' ').join(' ');
                  const cons: string[] = [];
                  if (reviewText.includes('crowd') || reviewText.includes('busy')) cons.push(t('destination_detail.con_crowded'));
                  if (reviewText.includes('parking') || reviewText.includes('walk')) cons.push(t('destination_detail.con_walking'));
                  if (reviewText.includes('hot') || reviewText.includes('sun')) cons.push(t('destination_detail.con_sun'));
                  if (cons.length === 0) cons.push(t('destination_detail.con_peak'));
                  if (cons.length < 2) cons.push(t('destination_detail.con_hours'));
                  return cons.slice(0, 2);
                })().map((con: string, i: number) => (
                  <li key={i} className="flex items-start gap-1.5 text-[11px] text-stone-500">
                    <span className="text-stone-400 mt-0.5 shrink-0">●</span>{con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── Filter chips with counts ── */}
      <div className="flex overflow-x-auto scrollbar-none gap-2 pb-1">
        {[
          { key: 'all' as const, label: t('destination_detail.filter_all_reviews', { count: communityReviews.length }) },
          { key: 'Solo' as const, label: t('destination_detail.filter_solo_reviews', { count: communityReviews.filter(r => (r as any).travelerType === 'Solo' || (r as any).traveler_type === 'Solo').length }) },
          { key: 'Couple' as const, label: t('destination_detail.filter_couple_reviews', { count: communityReviews.filter(r => (r as any).travelerType === 'Couple' || (r as any).traveler_type === 'Couple').length }) },
          { key: 'Family' as const, label: t('destination_detail.filter_family_reviews', { count: communityReviews.filter(r => (r as any).travelerType === 'Family' || (r as any).traveler_type === 'Family').length }) },
          { key: 'Friends' as const, label: t('destination_detail.filter_friends_reviews', { count: communityReviews.filter(r => (r as any).travelerType === 'Friends' || (r as any).traveler_type === 'Friends').length }) },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`whitespace-nowrap text-[11px] font-semibold px-4 py-1.5 rounded-full border transition-all ${
              reviewFilter === key
                ? 'bg-[#1c1a17] text-white border-[#1c1a17]'
                : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Write a Review form ── */}
      <div className="relative overflow-hidden rounded-2xl border border-stone-200 bg-gradient-to-br from-[#FAF8F5] to-white shadow-sm">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-400 via-amber-300 to-gold-500" />
        <div className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 bg-gradient-to-br from-gold-400 to-amber-500 rounded-lg flex items-center justify-center shadow-sm">
              <Pencil className="h-3.5 w-3.5 text-white" />
            </div>
            <div>
              <p className="text-[13px] font-manrope font-bold text-[#1c1a17]">{t('destination_detail.write_a_review')}</p>
              <p className="text-[10px] text-stone-400">{t('destination_detail.share_experience')}</p>
            </div>
          </div>

          {!isAuthenticated ? (
            <div className="flex items-center gap-4 bg-stone-50 border border-stone-100 rounded-xl p-4">
              <span className="text-3xl">✍️</span>
              <div className="flex-1">
                <p className="text-[13px] font-semibold text-[#1c1a17]">{t('destination_detail.sign_in_review')}</p>
                <p className="text-[11px] text-stone-400">{t('destination_detail.help_travelers')}</p>
              </div>
              <a href="/login" className="shrink-0 px-4 py-1.5 bg-[#1c1a17] text-white text-[10px] font-mono font-bold uppercase tracking-widest rounded-full hover:bg-gold-600 transition-colors">
                {t('destination_detail.login')}
              </a>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Stars + traveler type row */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(star => (
                    <button key={star} onClick={() => onReviewRatingChange(star)} className="focus:outline-none transition-transform hover:scale-110">
                      <Star className={`h-6 w-6 transition-colors ${star <= newReviewRating ? 'fill-amber-400 text-amber-400' : 'text-stone-200 hover:text-amber-200'}`} />
                    </button>
                  ))}
                  <span className="text-[12px] font-semibold text-stone-500 ml-1">{newReviewRating}/5</span>
                </div>
                <div className="flex gap-1.5">
                  {(['Solo','Couple','Family','Friends'] as const).map(type => (
                    <button
                      key={type}
                      onClick={() => onTravelerTypeChange(type)}
                      className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border-2 transition-all ${
                        newReviewTravelerType === type ? 'bg-amber-50 border-amber-400 text-amber-800' : 'bg-white border-stone-200 text-stone-500'
                      }`}
                    >{t(`destination_detail.traveler_${type.toLowerCase()}`)}</button>
                  ))}
                </div>
              </div>
              <div className="relative">
                <textarea
                  placeholder={t('destination_detail.review_placeholder')}
                  value={newReviewText}
                  onChange={(e) => onReviewTextChange(e.target.value)}
                  rows={3}
                  maxLength={500}
                  className="w-full bg-stone-50 border border-stone-200 text-[12px] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none text-stone-700 placeholder:text-stone-300 leading-relaxed"
                />
                <span className="absolute bottom-3 right-4 text-[9px] text-stone-300 font-mono">{newReviewText.length}/500</span>
              </div>
              {reviewError && (<div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2"><span className="text-red-500 text-sm">⚠️</span><p className="text-[11px] text-red-600">{reviewError}</p></div>)}
              {reviewSubmitted && (<div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2"><span className="text-green-500 text-sm">✅</span><p className="text-[11px] text-green-700">{t('destination_detail.review_published')}</p></div>)}
              <button
                onClick={onSubmitReview}
                disabled={!newReviewText.trim() || submittingReview}
                className="w-full py-2.5 bg-[#1c1a17] text-white text-[11px] font-mono font-bold uppercase tracking-widest rounded-xl hover:bg-gold-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submittingReview ? `✦ ${t('destination_detail.publishing')}` : `✦ ${t('destination_detail.publish_review')}`}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Review Cards grid ── */}
      {filteredReviews.length === 0 ? (
        <div className="text-center py-12 text-stone-400">
          <p className="text-2xl mb-2">🔍</p>
          <p className="text-sm font-medium">{t('destination_detail.no_reviews_yet')}</p>
          <p className="text-[11px] mt-1">{t('destination_detail.be_first_experience')}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReviews.slice(0, visibleReviews).map((review) => {
              const isLiked = likedReviewIds.has(review.id);
              const tType = (review as any).travelerType || (review as any).traveler_type || null;
              const baseLikeHash = (Number(review.id.replace(/[^0-9]/g, '')) || 0) || (review.userName.charCodeAt(0) + (review.userName.charCodeAt(review.userName.length - 1) || 0));
              const likeCount = reviewHelpfulCounts[review.id] ?? (10 + (baseLikeHash % 15));
              return (
                <div
                  key={review.id}
                  className="bg-white border border-stone-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col text-left"
                >
                  {/* User row */}
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={review.userAvatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(review.userName)}`}
                      alt={review.userName}
                      className="h-10 w-10 rounded-full object-cover bg-stone-100 border-2 border-white shadow-sm shrink-0"
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${review.userName}`; }}
                    />
                    <div className="min-w-0">
                      <p className="text-[13px] font-bold text-[#1c1a17] truncate">{review.userName}</p>
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-0.5">
                          {[1,2,3,4,5].map(s => (
                            <Star key={s} className={`h-3 w-3 ${s <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-200'}`} />
                          ))}
                        </div>
                        {tType && (
                          <span className="text-[9px] bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded-full font-mono">{tType}</span>
                        )}
                      </div>
                      <p className="text-[10px] text-stone-400 font-mono">{review.date}</p>
                    </div>
                  </div>

                  {/* Comment */}
                  <p className="text-[12px] text-stone-600 leading-relaxed flex-1 line-clamp-4">
                    {review.comment}
                  </p>

                  {/* Footer */}
                  <div className="mt-3 pt-3 border-t border-stone-50 flex items-center">
                    <button
                      onClick={() => onToggleLike(review.id)}
                      className={`flex items-center gap-1.5 text-[11px] font-medium transition-all rounded-full px-2.5 py-1 ${
                        isLiked ? 'text-red-500 bg-red-50' : 'text-stone-400 hover:text-red-400 hover:bg-red-50'
                      }`}
                    >
                      <Heart className={`h-3.5 w-3.5 ${isLiked ? 'fill-red-500' : ''}`} />
                      <span>{t('destination_detail.helpful')} ({likeCount})</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load More */}
          {visibleReviews < filteredReviews.length && (
            <div className="flex justify-center pt-2">
              <button
                onClick={onLoadMore}
                className="px-8 py-2.5 border border-stone-300 text-[12px] font-semibold text-stone-600 rounded-full hover:bg-stone-50 hover:border-stone-400 transition-all"
              >
                {t('destination_detail.load_more_reviews_btn')} ({filteredReviews.length - visibleReviews} {t('destination_detail.remaining')})
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
