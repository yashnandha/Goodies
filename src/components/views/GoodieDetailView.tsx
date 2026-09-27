import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Repeat,
  Gift,
  ArrowLeft,
  Share2,
  Bookmark,
  Flag,
  MessageSquare,
  ShieldCheck,
  Star,
  MapPin,
  Sparkles,
  Calendar,
  Layers,
  Truck,
  CheckCircle2,
} from 'lucide-react';

export const GoodieDetailView: React.FC = () => {
  const {
    selectedGoodieId,
    goodies,
    navigateTo,
    openBarterModal,
    openGiveawayRequestModal,
    openReportModal,
    savedGoodieIds,
    toggleSaveGoodie,
    showToast,
    currentUser,
    setActiveConversationId,
  } = useApp();

  const goodie = goodies.find((g) => g.id === selectedGoodieId) || goodies[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!goodie) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-slate-500">Goodie not found.</p>
        <button
          onClick={() => navigateTo('explore')}
          className="mt-3 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs"
        >
          Back to Explore
        </button>
      </div>
    );
  }

  const isSaved = savedGoodieIds.includes(goodie.id);
  const isOwner = goodie.ownerId === currentUser.id;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Listing link copied to clipboard!', 'success');
    } else {
      showToast('Listing ready to share!', 'info');
    }
  };

  const relatedGoodies = goodies
    .filter((g) => g.id !== goodie.id && (g.event === goodie.event || g.category === goodie.category))
    .slice(0, 3);

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Back breadcrumb */}
      <div className="pt-4 pb-6 flex items-center justify-between">
        <button
          onClick={() => navigateTo('explore')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleSaveGoodie(goodie.id)}
            className={`p-2 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-medium ${
              isSaved
                ? 'border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
            }`}
            title="Save to collection"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-medium"
            title="Share listing"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>

          <button
            onClick={() => openReportModal({ title: goodie.title, id: goodie.id })}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 transition-colors"
            title="Report this listing"
          >
            <Flag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Goodie Spec View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Image Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800 shadow-md">
            <img
              src={goodie.images[activeImageIndex] || goodie.images[0]}
              alt={goodie.title}
              className="w-full h-full object-cover"
            />

            {/* Type badge overlay */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase shadow-sm ${
                  goodie.type === 'barter'
                    ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200'
                    : 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200'
                }`}
              >
                {goodie.type === 'barter' ? (
                  <>
                    <Repeat className="w-3.5 h-3.5" /> Barter Listing
                  </>
                ) : (
                  <>
                    <Gift className="w-3.5 h-3.5" /> 100% Free Giveaway
                  </>
                )}
              </span>

              <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold">
                {goodie.condition}
              </span>
            </div>
          </div>

          {/* Thumbnails if multiple images */}
          {goodie.images.length > 1 && (
            <div className="flex items-center gap-3">
              {goodie.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-amber-500 ring-2 ring-amber-500/20'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Escrow & Verification Guarantee Ribbon */}
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-0.5">
              <p className="font-bold text-slate-900 dark:text-white">
                Protected by Goodies Escrow System
              </p>
              <p>
                Cashless community policy strictly enforced. Both parties confirm handoff receipt
                before Karma points and badges unlock.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Information, Wishlist & Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              <span>{goodie.event}</span>
              <span>·</span>
              <span>{goodie.organization}</span>
              <span>·</span>
              <span>{goodie.year}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
              {goodie.title}
            </h1>

            {/* Spec tags strip */}
            <div className="flex flex-wrap items-center gap-2 mt-3.5">
              <span className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold">
                {goodie.category}
              </span>
              {goodie.size && (
                <span className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold">
                  Size {goodie.size}
                </span>
              )}
              {goodie.dimensions && (
                <span className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold">
                  {goodie.dimensions}
                </span>
              )}
              <span className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                {goodie.city}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Description</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {goodie.description}
            </p>
          </div>

          {/* Wishlist Box (if Barter) */}
          {goodie.type !== 'give' && (
            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/60 space-y-2">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Repeat className="w-4 h-4 text-amber-600" />
                <span>Owner's Swap Wishlist</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
                {goodie.wishlist || 'Open to all reasonable developer merchandise trades.'}
              </p>
              {goodie.targetCategories && goodie.targetCategories.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] text-slate-500">Interested in:</span>
                  {goodie.targetCategories.map((c) => (
                    <span
                      key={c}
                      className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] border border-amber-200/60 font-medium"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Giver Note (if Give) */}
          {goodie.type !== 'barter' && goodie.giverNote && (
            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/60 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Gift className="w-4 h-4 text-emerald-600" />
                <span>Giver Note</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 italic">
                "{goodie.giverNote}"
              </p>
            </div>
          )}

          {/* Owner Profile Card */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Posted By
              </span>
              {goodie.owner.isVerifiedAttendee && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-600 dark:text-sky-400">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Attendee
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <img
                src={goodie.owner.avatar}
                alt={goodie.owner.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {goodie.owner.name}
                  </h4>
                  <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-600">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{goodie.owner.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 font-mono">@{goodie.owner.username}</p>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                  <span>{goodie.owner.city}</span>
                  <span>·</span>
                  <span className="font-semibold text-amber-600 dark:text-amber-400">
                    {goodie.owner.karma} Karma
                  </span>
                  <span>·</span>
                  <span>{goodie.owner.successfulBartersCount} swaps</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 italic">
              "{goodie.owner.bio}"
            </p>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-2">
            {!isOwner ? (
              <>
                {goodie.type === 'barter' || goodie.type === 'both' ? (
                  <button
                    onClick={() => openBarterModal(goodie)}
                    className="w-full py-3.5 px-4 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Repeat className="w-4 h-4" />
                    <span>Make Barter Offer</span>
                  </button>
                ) : null}

                {goodie.type === 'give' || goodie.type === 'both' ? (
                  <button
                    onClick={() => openGiveawayRequestModal(goodie)}
                    className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Gift className="w-4 h-4" />
                    <span>Request Goodie</span>
                  </button>
                ) : null}

                <button
                  onClick={() => {
                    navigateTo('messages');
                  }}
                  className="w-full py-3 px-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Message Owner (@{goodie.owner.username})</span>
                </button>
              </>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-center space-y-2">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  This is your listed goodie.
                </span>
                <button
                  onClick={() => navigateTo('my-goodies')}
                  className="w-full py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold"
                >
                  Manage in My Goodies
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Goodies */}
      {relatedGoodies.length > 0 && (
        <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-6">
            Similar Swag Drops
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {relatedGoodies.map((rel) => (
              <div
                key={rel.id}
                onClick={() => navigateTo('goodie-detail', { goodieId: rel.id })}
                className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-3"
              >
                <img src={rel.images[0]} alt={rel.title} className="w-14 h-14 rounded-xl object-cover" />
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    {rel.event} · {rel.year}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {rel.title}
                  </h4>
                  <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                    {rel.type === 'barter' ? 'Barter' : 'Giveaway'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
