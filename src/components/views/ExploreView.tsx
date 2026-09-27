import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Goodie, GoodieType, GoodieCategory, GoodieCondition, ApparelSize } from '../../types';
import {
  Search,
  Repeat,
  Gift,
  Filter,
  SlidersHorizontal,
  X,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Plus,
} from 'lucide-react';

const CATEGORIES: GoodieCategory[] = [
  'T-Shirt',
  'Hoodie',
  'Jacket',
  'Sticker',
  'Mug',
  'Bottle',
  'Cap',
  'Bag',
  'Notebook',
  'Pin',
  'Badge',
  'Tech Accessory',
  'Other',
];

const EVENTS = [
  'Google I/O',
  'AWS re:Invent',
  'GitHub Universe',
  'GDG DevFest',
  'Microsoft Build',
  'KubeCon',
  'Config',
  'DockerCon',
  'RustConf',
  'Hackathons',
];

export const ExploreView: React.FC = () => {
  const {
    goodies,
    navigateTo,
    openBarterModal,
    openGiveawayRequestModal,
    setIsAddGoodieModalOpen,
    selectedTabParam,
  } = useApp();

  // Active filters
  const [activeTypeTab, setActiveTypeTab] = useState<'all' | 'barter' | 'give'>(
    selectedTabParam === 'barter' || selectedTabParam === 'give' ? selectedTabParam : 'all'
  );
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'event'>('recent');

  // Mobile filter drawer
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const resetFilters = () => {
    setActiveTypeTab('all');
    setSearch('');
    setSelectedCategory('all');
    setSelectedEvent('all');
    setSelectedYear('all');
    setSelectedCondition('all');
    setSelectedSize('all');
    setSelectedCity('all');
    setCurrentPage(1);
  };

  const filteredGoodies = useMemo(() => {
    return goodies.filter((item) => {
      // Type tab
      if (activeTypeTab === 'barter' && item.type === 'give') return false;
      if (activeTypeTab === 'give' && item.type === 'barter') return false;

      // Search keyword
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchEvent = item.event.toLowerCase().includes(query);
        const matchOrg = item.organization.toLowerCase().includes(query);
        const matchCategory = item.category.toLowerCase().includes(query);
        const matchWishlist = (item.wishlist || '').toLowerCase().includes(query);
        const matchGiver = (item.giverNote || '').toLowerCase().includes(query);
        if (!matchTitle && !matchEvent && !matchOrg && !matchCategory && !matchWishlist && !matchGiver) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;

      // Event
      if (selectedEvent !== 'all' && !item.event.toLowerCase().includes(selectedEvent.toLowerCase()))
        return false;

      // Year
      if (selectedYear !== 'all' && item.year.toString() !== selectedYear) return false;

      // Condition
      if (selectedCondition !== 'all' && item.condition !== selectedCondition) return false;

      // Size
      if (selectedSize !== 'all' && item.size !== selectedSize) return false;

      // City / Location
      if (selectedCity !== 'all' && !item.city.toLowerCase().includes(selectedCity.toLowerCase()))
        return false;

      return true;
    });
  }, [
    goodies,
    activeTypeTab,
    search,
    selectedCategory,
    selectedEvent,
    selectedYear,
    selectedCondition,
    selectedSize,
    selectedCity,
  ]);

  const totalPages = Math.ceil(filteredGoodies.length / itemsPerPage) || 1;
  const paginatedItems = filteredGoodies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col w-full pb-16">
      {/* 1. TOP DISCOVERY HEADER */}
      <div className="pt-4 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Peer-to-Peer Community Discovery</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
              Explore Goodies
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Browse 1,240+ developer swags, conference tees, hoodies, and collectible badges ready for barter or giveaway.
            </p>
          </div>

          <button
            onClick={() => setIsAddGoodieModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs shadow-sm self-start md:self-auto transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>List a Goodie</span>
          </button>
        </div>

        {/* 2. SEARCH & MODE BAR */}
        <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center gap-2">
          <div className="relative flex-1 w-full flex items-center">
            <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search T-shirts, events, stickers, hoodies, sizes..."
              className="w-full h-11 pl-10 pr-3 bg-transparent text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none"
            />
            {search && (
              <button onClick={() => setSearch('')} className="p-1 mr-2 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Quick City selector */}
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="h-10 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium border border-transparent focus:outline-none cursor-pointer"
            >
              <option value="all">All Locations / Shipping</option>
              <option value="San Francisco">San Francisco Bay Area</option>
              <option value="Seattle">Seattle / WA</option>
              <option value="Berkeley">Berkeley / East Bay</option>
              <option value="Denver">Denver / Las Vegas</option>
              <option value="Berlin">Berlin / Europe</option>
            </select>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="h-10 px-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold lg:hidden flex items-center gap-1.5"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* 3. SEGMENTED TABS: ALL | BARTER | GIVE */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
          <div className="inline-flex p-1 bg-slate-200/70 dark:bg-slate-800/80 rounded-2xl w-fit">
            <button
              onClick={() => {
                setActiveTypeTab('all');
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTypeTab === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              All Goodies ({goodies.length})
            </button>

            <button
              onClick={() => {
                setActiveTypeTab('barter');
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTypeTab === 'barter'
                  ? 'bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Repeat className="w-3.5 h-3.5 text-amber-500" />
              <span>Barter</span>
            </button>

            <button
              onClick={() => {
                setActiveTypeTab('give');
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTypeTab === 'give'
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Gift className="w-3.5 h-3.5 text-emerald-500" />
              <span>Give</span>
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span>
              Showing <strong className="text-slate-900 dark:text-white">{filteredGoodies.length}</strong> items
            </span>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="h-9 px-3 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-xs font-medium cursor-pointer focus:outline-none"
            >
              <option value="recent">Sort: Recently Added</option>
              <option value="popular">Sort: Most Viewed</option>
              <option value="event">Sort: By Event</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. WORKSPACE: FILTER RAIL + GRID */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* DESKTOP FILTER RAIL (280px) */}
        <aside className="w-full lg:w-64 shrink-0 hidden lg:flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-slate-500" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Filters</h3>
              </div>
              <button
                onClick={resetFilters}
                className="text-xs text-amber-600 dark:text-amber-400 hover:underline font-medium"
              >
                Reset all
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Event Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                Conference Event
              </label>
              <select
                value={selectedEvent}
                onChange={(e) => {
                  setSelectedEvent(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none"
              >
                <option value="all">All Events</option>
                {EVENTS.map((ev) => (
                  <option key={ev} value={ev}>
                    {ev}
                  </option>
                ))}
              </select>
            </div>

            {/* Apparel Size */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                Size
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {['all', 'XS', 'S', 'M', 'L', 'XL', '2XL', 'Universal'].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`h-8 rounded-lg text-xs font-semibold transition-all ${
                      selectedSize === sz
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {sz === 'all' ? 'All' : sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Condition */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                Condition
              </label>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none"
              >
                <option value="all">All Conditions</option>
                <option value="Mint / Brand New">Mint / Brand New</option>
                <option value="Brand New in Box">Brand New in Box</option>
                <option value="Like New (Unworn)">Like New (Unworn)</option>
                <option value="Gently Used">Gently Used</option>
              </select>
            </div>

            {/* Year */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                Event Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none"
              >
                <option value="all">All Years</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>
          </div>
        </aside>

        {/* MAIN PRODUCT GRID */}
        <main className="flex-1 flex flex-col gap-6">
          {paginatedItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
              {paginatedItems.map((goodie) => (
                <div
                  key={goodie.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-3.5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Image viewport */}
                    <div
                      onClick={() => navigateTo('goodie-detail', { goodieId: goodie.id })}
                      className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-3 cursor-pointer"
                    >
                      <img
                        src={goodie.images[0]}
                        alt={goodie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Mode Badge */}
                      <span
                        className={`absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase shadow-sm flex items-center gap-1 ${
                          goodie.type === 'barter'
                            ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200'
                            : 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200'
                        }`}
                      >
                        {goodie.type === 'barter' ? (
                          <>
                            <Repeat className="w-3 h-3" /> BARTER
                          </>
                        ) : (
                          <>
                            <Gift className="w-3 h-3" /> GIVE
                          </>
                        )}
                      </span>

                      {goodie.size && (
                        <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 text-[10px] font-bold shadow-xs">
                          {goodie.size}
                        </span>
                      )}
                    </div>

                    {/* Metadata & Title */}
                    <div className="px-1 space-y-1">
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                        <span>
                          {goodie.event} · {goodie.year}
                        </span>
                        <span className="text-slate-400">{goodie.condition}</span>
                      </div>

                      <h3
                        onClick={() => navigateTo('goodie-detail', { goodieId: goodie.id })}
                        className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 hover:text-amber-600 transition-colors cursor-pointer"
                      >
                        {goodie.title}
                      </h3>

                      {goodie.type === 'barter' ? (
                        <p className="text-xs text-slate-600 dark:text-slate-300 bg-amber-50/50 dark:bg-amber-950/20 p-2 rounded-xl line-clamp-2 mt-1.5">
                          <strong className="text-amber-700 dark:text-amber-400">Wants:</strong>{' '}
                          {goodie.wishlist || 'Open to proposals'}
                        </p>
                      ) : (
                        <p className="text-xs text-slate-600 dark:text-slate-300 bg-emerald-50/50 dark:bg-emerald-950/20 p-2 rounded-xl line-clamp-2 mt-1.5">
                          <strong className="text-emerald-700 dark:text-emerald-400">Note:</strong>{' '}
                          {goodie.giverNote || 'Free to community'}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Owner & Primary Action */}
                  <div className="px-1 pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <img
                        src={goodie.owner.avatar}
                        alt={goodie.owner.name}
                        className="w-6 h-6 rounded-full object-cover shrink-0"
                      />
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">
                        {goodie.owner.name.split(' ')[0]}
                      </span>
                      <span className="text-[11px] text-amber-600 font-bold font-mono">
                        ★ {goodie.owner.rating}
                      </span>
                    </div>

                    {goodie.type === 'barter' ? (
                      <button
                        onClick={() => openBarterModal(goodie)}
                        className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-xs transition-colors shrink-0"
                      >
                        Make Offer
                      </button>
                    ) : (
                      <button
                        onClick={() => openGiveawayRequestModal(goodie)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-colors shrink-0"
                      >
                        Request
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
              <Search className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No matching goodies found
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                Try widening your search terms or resetting filters to explore all community drops.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="pt-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-500">
                Page <strong className="text-slate-900 dark:text-white">{currentPage}</strong> of{' '}
                {totalPages}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                  <button
                    key={pg}
                    onClick={() => setCurrentPage(pg)}
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                      currentPage === pg
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {pg}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MOBILE FILTER MODAL DRAWER */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 h-full p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Filter Goodies</h3>
              <button onClick={() => setIsFilterDrawerOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-900 dark:text-white block mb-1.5">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700"
                >
                  <option value="all">All Categories</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-900 dark:text-white block mb-1.5">
                  Conference Event
                </label>
                <select
                  value={selectedEvent}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700"
                >
                  <option value="all">All Events</option>
                  {EVENTS.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-900 dark:text-white block mb-1.5">
                  Size
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {['all', 'XS', 'S', 'M', 'L', 'XL', '2XL', 'Universal'].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`h-8 rounded-lg text-xs font-semibold ${
                        selectedSize === sz
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                      }`}
                    >
                      {sz === 'all' ? 'All' : sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
              <button onClick={resetFilters} className="text-xs font-semibold text-slate-500">
                Reset
              </button>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
