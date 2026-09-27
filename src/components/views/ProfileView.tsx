import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_REVIEWS } from '../../data/initialData';
import {
  Sparkles,
  ShieldCheck,
  Star,
  MapPin,
  Calendar,
  Repeat,
  Gift,
  Package,
  CheckCircle2,
  Lock,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { currentUser, goodies, navigateTo } = useApp();

  const [activeTab, setActiveTab] = useState<'active' | 'collection' | 'reviews'>('active');

  const myActiveGoodies = goodies.filter(
    (g) => g.ownerId === currentUser.id && (g.status === 'active' || g.status === 'in_negotiation')
  );

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Profile Header Card */}
      <div className="pt-4 pb-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-amber-500/20 shadow-md"
              />
              <span
                className="absolute -bottom-1.5 -right-1.5 p-1 rounded-xl bg-emerald-500 text-white shadow-xs"
                title="Verified Attendee"
              >
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
                  {currentUser.name}
                </h1>
                <span className="text-xs font-mono text-slate-400">@{currentUser.username}</span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Attendee
                </span>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                {currentUser.bio}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{currentUser.city}, {currentUser.country}</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Private contact info protected</span>
                </span>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto shrink-0 justify-between">
              <button
                onClick={() => navigateTo('settings')}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Edit Preferences
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
              <span className="text-xs text-slate-500">Goodies Listed</span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                {currentUser.goodiesListedCount}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30">
              <span className="text-xs text-amber-800 dark:text-amber-300 font-semibold">
                Successful Barters
              </span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-amber-700 dark:text-amber-400 mt-0.5">
                {currentUser.successfulBartersCount}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30">
              <span className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
                Goodies Given
              </span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-700 dark:text-emerald-400 mt-0.5">
                {currentUser.goodiesGivenCount}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
              <span className="text-xs text-slate-500">Community Rating</span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white mt-0.5 flex items-center gap-1">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span>{currentUser.rating}</span>
                <span className="text-xs text-slate-400 font-normal">({currentUser.reviewCount})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Active Goodies | Collection Wishlist | Reviews */}
      <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs mb-6 flex items-center gap-1.5 overflow-x-auto">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'active'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Active Goodies ({myActiveGoodies.length})
        </button>

        <button
          onClick={() => setActiveTab('collection')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'collection'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Permanent Collection
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'reviews'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Trader Reviews ({INITIAL_REVIEWS.length})
        </button>
      </div>

      {/* Tab 1: Active Goodies Grid */}
      {activeTab === 'active' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {myActiveGoodies.map((item) => (
            <div
              key={item.id}
              onClick={() => navigateTo('goodie-detail', { goodieId: item.id })}
              className="bg-white dark:bg-slate-900 rounded-3xl p-3.5 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-3">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span
                    className={`absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase shadow-sm ${
                      item.type === 'barter'
                        ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200'
                        : 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200'
                    }`}
                  >
                    {item.type === 'barter' ? 'Barter' : 'Give'}
                  </span>
                </div>

                <div className="px-1">
                  <span className="text-[11px] text-slate-400">
                    {item.event} · {item.year}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-amber-600 transition-colors">
                    {item.title}
                  </h4>
                </div>
              </div>

              <div className="px-1 pt-2 mt-2 text-xs text-amber-600 font-semibold flex items-center justify-between">
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Permanent Collection / Hall of Fame */}
      {activeTab === 'collection' && (
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
          <Package className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Personal Swag Collection Showcase
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            These are developer items kept for sentimental conference memories (Google I/O 2018 retro solar backpack, GitHub 10th anniversary varsity jacket, and Config limited pin sets).
          </p>
        </div>
      )}

      {/* Tab 3: Reviews */}
      {activeTab === 'reviews' && (
        <div className="space-y-4">
          {INITIAL_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.authorAvatar}
                    alt={rev.authorName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {rev.authorName}
                    </h4>
                    <span className="text-[11px] text-slate-400 font-mono">@{rev.authorUsername}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400">{rev.date}</span>
                </div>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                "{rev.comment}"
              </p>

              <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                <span>Traded for:</span>
                <strong className="text-slate-600 dark:text-slate-300">{rev.goodieName}</strong>
                <span>({rev.tradeType === 'barter' ? 'Barter' : 'Giveaway'})</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
