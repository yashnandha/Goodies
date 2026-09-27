import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, X, Repeat, Gift, MapPin, ArrowRight, Sparkles } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    goodies,
    navigateTo,
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const filteredGoodies = query.trim()
    ? goodies.filter((g) =>
        `${g.title} ${g.event} ${g.organization} ${g.category} ${g.city} ${g.wishlist || ''} ${g.giverNote || ''}`
          .toLowerCase()
          .includes(query.toLowerCase())
      )
    : goodies.slice(0, 6);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search T-shirts, events, stickers, hoodies, sizes..."
            className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none text-sm md:text-base font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200"
          >
            Esc
          </button>
        </div>

        {/* Popular Event Tags quick triggers */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/60 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto text-xs">
          <span className="text-slate-400 shrink-0 font-medium">Quick search:</span>
          {['Google I/O', 'AWS re:Invent', 'GitHub Universe', 'KubeCon', 'Config', 'Stickers'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400 transition-colors shrink-0"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1 divide-y divide-slate-100 dark:divide-slate-800/40">
          {filteredGoodies.length > 0 ? (
            filteredGoodies.map((goodie) => (
              <div
                key={goodie.id}
                onClick={() => {
                  navigateTo('goodie-detail', { goodieId: goodie.id });
                  setIsSearchModalOpen(false);
                }}
                className="pt-2 first:pt-0 group flex items-center gap-3.5 p-2.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/60 cursor-pointer transition-colors"
              >
                <img
                  src={goodie.images[0]}
                  alt={goodie.title}
                  className="w-14 h-14 rounded-xl object-cover shrink-0 bg-slate-100 dark:bg-slate-800"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        goodie.type === 'barter'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}
                    >
                      {goodie.type === 'barter' ? (
                        <>
                          <Repeat className="w-2.5 h-2.5" /> Barter
                        </>
                      ) : (
                        <>
                          <Gift className="w-2.5 h-2.5" /> Give
                        </>
                      )}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {goodie.event} · {goodie.year}
                    </span>
                    {goodie.size && (
                      <span className="text-xs text-slate-400">· Size {goodie.size}</span>
                    )}
                  </div>

                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {goodie.title}
                  </h4>

                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {goodie.type === 'barter'
                      ? `Wants: ${goodie.wishlist || 'Open to swap proposals'}`
                      : goodie.giverNote || 'Free community giveaway'}
                  </p>
                </div>

                <div className="text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white shrink-0 pr-1">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-slate-500 dark:text-slate-400">
              <p className="text-sm font-medium">No goodies matched "{query}"</p>
              <p className="text-xs mt-1">Try searching for "Google", "Hoodie", or "Stickers"</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>{filteredGoodies.length} items available</span>
          <button
            onClick={() => {
              navigateTo('explore');
              setIsSearchModalOpen(false);
            }}
            className="text-amber-600 dark:text-amber-400 hover:underline font-semibold"
          >
            Open Full Explore Grid →
          </button>
        </div>
      </div>
    </div>
  );
};
