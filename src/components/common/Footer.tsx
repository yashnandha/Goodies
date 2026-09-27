import React from 'react';
import { useApp } from '../../context/AppContext';
import { Repeat, Gift, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="w-full bg-slate-100 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 transition-colors mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand & Manifesto Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-emerald-500 p-0.5 shadow-sm">
                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[6px] flex items-center justify-center">
                  <span className="text-sm font-black bg-gradient-to-r from-amber-600 to-emerald-600 bg-clip-text text-transparent">
                    G
                  </span>
                </div>
              </div>
              <span className="text-lg font-bold font-display text-slate-900 dark:text-white">
                Goodies
              </span>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              The circular community for tech conference swag, developer hoodies, and rare collectible badges.
              Zero money exchanged, zero landfill waste. Built for developers, by developers.
            </p>

            <div className="flex items-center gap-4 pt-1 text-xs text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1">
                <Repeat className="w-3.5 h-3.5 text-amber-500" />
                <span>1-for-1 Barters</span>
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Gift className="w-3.5 h-3.5 text-emerald-500" />
                <span>100% Free Giveaways</span>
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
                <span>Escrow Protected</span>
              </span>
            </div>
          </div>

          {/* Column 2: Explore Tech Swag */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Explore Tech Swag
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => navigateTo('explore')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Google I/O Drops
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('explore')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  AWS re:Invent Merchandise
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('explore')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  GitHub Universe Hoodies
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('explore')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  KubeCon Cloud Native Gear
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('explore')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  GDG DevFest Sticker Packs
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Platform & Trust
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => navigateTo('how-it-works')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  How Barter & Give Work
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('how-it-works')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Goodies Karma Escrow
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('how-it-works')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Cashless Swag Manifesto
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('how-it-works')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Shipping & Meetup Safety
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Community */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Community
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => navigateTo('explore')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Community Swag Feed
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('profile')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Verified Attendee Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('how-it-works')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Discord Swag Guild
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('how-it-works')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Code of Conduct
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span>© 2026 Goodies Platform. Zero waste developer gear exchange.</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => navigateTo('how-it-works')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => navigateTo('how-it-works')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Terms of Swaps
            </button>
            <button onClick={() => navigateTo('settings')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Handoff Settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
