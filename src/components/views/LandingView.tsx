import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Repeat,
  Gift,
  ArrowRight,
  Plus,
  Sparkles,
  ShieldCheck,
  Star,
  CheckCircle2,
  Package,
  Layers,
  HeartHandshake,
  Heart,
  ExternalLink,
} from 'lucide-react';

export const LandingView: React.FC = () => {
  const { navigateTo, setIsAddGoodieModalOpen, goodies, openBarterModal, openGiveawayRequestModal } =
    useApp();

  const barterItems = goodies.filter((g) => g.type === 'barter' || g.type === 'both').slice(0, 4);
  const giveItems = goodies.filter((g) => g.type === 'give' || g.type === 'both').slice(0, 4);
  const recentItems = [...goodies].slice(0, 6);

  const popularEvents = [
    { name: 'Google I/O', drops: '145 Drops', icon: '⚡' },
    { name: 'AWS re:Invent', drops: '128 Drops', icon: '☁️' },
    { name: 'GitHub Universe', drops: '94 Drops', icon: '🐙' },
    { name: 'GDG DevFest', drops: '182 Drops', icon: '✨' },
    { name: 'Microsoft Build', drops: '76 Drops', icon: '🪟' },
    { name: 'KubeCon NA', drops: '65 Drops', icon: '☸️' },
    { name: 'Figma Config', drops: '54 Drops', icon: '🎨' },
    { name: 'Hackathons', drops: '210 Drops', icon: '🚀' },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden">
        {/* Subtle decorative aura */}
        <div className="absolute -top-24 -left-20 w-96 h-96 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto text-center px-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="tracking-wide">The Tech Swag Circularity Platform · 14,200+ Developers</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-5">
            Got extra tech goodies?
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            Barter them, give them away, and help them find someone who actually wants them.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <button
              onClick={() => navigateTo('explore')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <span>Explore Goodies</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsAddGoodieModalOpen(true)}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 shadow-sm transition-all active:scale-95"
            >
              <Plus className="w-4 h-4 text-amber-500" />
              <span>Add Your Goodie</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="p-3 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white font-mono tabular-nums">
                28,400+
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Goodies Re-homed</div>
            </div>
            <div className="p-3 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold font-display text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
                $0
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Money Exchanged</div>
            </div>
            <div className="p-3 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold font-display text-amber-600 dark:text-amber-400 font-mono tabular-nums">
                99.4%
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Successful Barters</div>
            </div>
            <div className="p-3 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold font-display text-sky-600 dark:text-sky-400 font-mono tabular-nums">
                100%
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Free Giveaways</div>
            </div>
          </div>
        </div>

        {/* Hero Visual Goodies Collection Strip */}
        <div className="mt-14 max-w-7xl mx-auto px-4">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Community Gear Showcase
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {recentItems.map((item) => (
              <div
                key={item.id}
                onClick={() => navigateTo('goodie-detail', { goodieId: item.id })}
                className="group bg-white dark:bg-slate-900 rounded-2xl p-2.5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-2.5">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase shadow-sm ${
                        item.type === 'barter'
                          ? 'bg-amber-100 text-amber-900 dark:bg-amber-900 dark:text-amber-200'
                          : 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-200'
                      }`}
                    >
                      {item.type === 'barter' ? 'Barter' : 'Give'}
                    </span>
                  </div>
                  {item.size && (
                    <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold">
                      {item.size}
                    </span>
                  )}
                </div>

                <div>
                  <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">
                    {item.event} · {item.year}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. TWO WAYS TO CIRCULARIZE (BARTER VS GIVE) */}
      <section className="py-12 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
              Two Ways to Circularize Swag
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              Whether you want to trade for rare holy grail conference items or donate spare shirts to
              eager students, Goodies provides two focused modes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Mode 1: Barter */}
            <div className="p-7 sm:p-9 rounded-3xl bg-white dark:bg-slate-900 border border-amber-200/60 dark:border-amber-900/40 shadow-sm flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
                  <Repeat className="w-3.5 h-3.5" />
                  <span>Item for Item Exchange</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white mb-2">
                  🔄 Barter
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Exchange your extra tech goodie for another attendee's merchandise. Post your wishlist
                  tags (e.g. "Looking for KubeCon hoodie in L") or review incoming offers.
                </p>

                <div className="space-y-2.5 mb-8 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Direct 1-for-1 swaps or multi-item bundles</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Accept, counter-offer, or decline proposals</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Prepaid tracked labels or in-person meetup swaps</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => navigateTo('explore', { tab: 'barter' })}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-sm transition-all"
                >
                  <span>Explore Barters</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs text-slate-400 font-medium">780 Active Trades</span>
              </div>
            </div>

            {/* Mode 2: Give */}
            <div className="p-7 sm:p-9 rounded-3xl bg-white dark:bg-slate-900 border border-emerald-200/60 dark:border-emerald-900/40 shadow-sm flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
                  <Gift className="w-3.5 h-3.5" />
                  <span>100% Free Community Gift</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white mb-2">
                  🎁 Give
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Got duplicate speaker backpacks, extra sticker packs, or shirts that don't fit? Pay it
                  forward to students, junior developers, or remote contributors.
                </p>

                <div className="space-y-2.5 mb-8 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>No return item required — completely free</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Review requests & choose the recipient you prefer</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Earn verified Community Karma trust points (+50 pts)</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => navigateTo('explore', { tab: 'give' })}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all"
                >
                  <span>Claim Free Goodies</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs text-slate-400 font-medium">468 Free Gifts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. AVAILABLE FOR BARTER SECTION */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
              <Repeat className="w-3.5 h-3.5" />
              <span>Direct Swaps</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
              🔥 Available for Barter
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Offer one of your extra swag items in return.
            </p>
          </div>

          <button
            onClick={() => navigateTo('explore', { tab: 'barter' })}
            className="text-xs sm:text-sm font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>View all barters</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {barterItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-3.5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div
                  onClick={() => navigateTo('goodie-detail', { goodieId: item.id })}
                  className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-3 cursor-pointer"
                >
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 text-[10px] font-bold uppercase shadow-sm flex items-center gap-1">
                    <Repeat className="w-3 h-3" /> BARTER
                  </span>
                  {item.size && (
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 text-[10px] font-bold shadow-xs">
                      {item.size}
                    </span>
                  )}
                </div>

                <div className="px-1 space-y-1">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {item.event} · {item.year} · {item.condition}
                  </div>
                  <h3
                    onClick={() => navigateTo('goodie-detail', { goodieId: item.id })}
                    className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 hover:text-amber-600 cursor-pointer transition-colors"
                  >
                    {item.title}
                  </h3>

                  {item.wishlist && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 bg-amber-50/50 dark:bg-amber-950/20 p-2 rounded-xl line-clamp-2 mt-2">
                      <strong className="text-amber-700 dark:text-amber-400">Wants:</strong> {item.wishlist}
                    </p>
                  )}
                </div>
              </div>

              <div className="px-1 pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <img
                    src={item.owner.avatar}
                    alt={item.owner.name}
                    className="w-6 h-6 rounded-full object-cover shrink-0"
                  />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">
                    {item.owner.name.split(' ')[0]}
                  </span>
                  <span className="text-[11px] text-amber-600 font-bold font-mono">
                    ★ {item.owner.rating}
                  </span>
                </div>

                <button
                  onClick={() => openBarterModal(item)}
                  className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition-colors shadow-xs shrink-0"
                >
                  Make Offer
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. AVAILABLE TO GIVE SECTION */}
      <section className="py-14 bg-emerald-50/30 dark:bg-emerald-950/10 border-y border-emerald-100/60 dark:border-emerald-900/30 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                <Gift className="w-3.5 h-3.5" />
                <span>Community Gifts</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
                🎁 Available to Give
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Free to claim by community members, juniors, and contributors.
              </p>
            </div>

            <button
              onClick={() => navigateTo('explore', { tab: 'give' })}
              className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>View all free gear</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {giveItems.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-3.5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div
                    onClick={() => navigateTo('goodie-detail', { goodieId: item.id })}
                    className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-3 cursor-pointer"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 text-[10px] font-bold uppercase shadow-sm flex items-center gap-1">
                      <Gift className="w-3 h-3" /> GIVE
                    </span>
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-white/90 dark:bg-slate-900/90 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold shadow-xs">
                      100% Free
                    </span>
                  </div>

                  <div className="px-1 space-y-1">
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {item.event} · {item.year} · {item.condition}
                    </div>
                    <h3
                      onClick={() => navigateTo('goodie-detail', { goodieId: item.id })}
                      className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 hover:text-emerald-600 cursor-pointer transition-colors"
                    >
                      {item.title}
                    </h3>

                    {item.giverNote && (
                      <p className="text-xs text-slate-600 dark:text-slate-300 bg-emerald-50/50 dark:bg-emerald-950/20 p-2 rounded-xl line-clamp-2 mt-2">
                        <strong className="text-emerald-700 dark:text-emerald-400">Giver Note:</strong> {item.giverNote}
                      </p>
                    )}
                  </div>
                </div>

                <div className="px-1 pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <img
                      src={item.owner.avatar}
                      alt={item.owner.name}
                      className="w-6 h-6 rounded-full object-cover shrink-0"
                    />
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">
                      {item.owner.name.split(' ')[0]}
                    </span>
                    <span className="text-[11px] text-amber-600 font-bold font-mono">
                      ★ {item.owner.rating}
                    </span>
                  </div>

                  <button
                    onClick={() => openGiveawayRequestModal(item)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-xs shrink-0"
                  >
                    Request
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. POPULAR TECH EVENTS SECTION */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
            Popular Tech Events
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Browse authentic merchandise by verified developer summits and hackathons.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {popularEvents.map((evt) => (
            <div
              key={evt.name}
              onClick={() => navigateTo('explore')}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-amber-400 dark:hover:border-amber-500 cursor-pointer transition-all flex items-center gap-3 group"
            >
              <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">
                {evt.icon}
              </span>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  {evt.name}
                </h4>
                <p className="text-xs text-slate-400 font-mono">{evt.drops}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. HOW IT WORKS (1. Add, 2. Choose, 3. Connect, 4. Complete) */}
      <section className="py-16 bg-slate-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 my-8 px-6 sm:px-12 relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Circular Economy Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight mt-1 text-white">
            How Goodies Works
          </h2>
          <p className="text-sm text-slate-300 mt-2">
            No prices, no bidding wars, no e-commerce carts. Just developers sharing conference gear.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-extrabold font-mono flex items-center justify-center text-base mb-4">
                1
              </div>
              <h3 className="text-lg font-bold font-display mb-1.5">Add</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Post your extra goodie. Snap a photo of your extra tee, pin, or water bottle.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-700/60 text-[11px] text-amber-400 font-mono">
              Takes &lt; 60 seconds
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 font-extrabold font-mono flex items-center justify-center text-base mb-4">
                2
              </div>
              <h3 className="text-lg font-bold font-display mb-1.5">Choose</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Select <strong>Barter</strong> to trade for items on your wishlist, or <strong>Give</strong> to gift it freely.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-700/60 text-[11px] text-emerald-400 font-mono">
              Cashless & Transparent
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-500 text-slate-950 font-extrabold font-mono flex items-center justify-center text-base mb-4">
                3
              </div>
              <h3 className="text-lg font-bold font-display mb-1.5">Connect</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Find someone interested. Review trade offers or applicant requests in the Barter Room.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-700/60 text-[11px] text-sky-400 font-mono">
              Verified Attendee Checks
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-500 text-slate-950 font-extrabold font-mono flex items-center justify-center text-base mb-4">
                4
              </div>
              <h3 className="text-lg font-bold font-display mb-1.5">Complete</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Exchange or give the item. Meet locally at a conference booth or ship with tracked postage.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-700/60 text-[11px] text-purple-400 font-mono">
              Unlock Karma Points
            </div>
          </div>
        </div>
      </section>

      {/* 7. PRE-FOOTER CALLOUT */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-sky-500/10 border border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight mb-3">
            Ready to clean out your conference tote bags?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-6">
            Join the developer circular economy. Swap unused swag with peers and discover collectors items.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setIsAddGoodieModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs shadow-md transition-all active:scale-95"
            >
              + List Your Goodie in 60s
            </button>
            <button
              onClick={() => navigateTo('explore')}
              className="px-6 py-3 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-all shadow-sm"
            >
              Browse All Drops
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
