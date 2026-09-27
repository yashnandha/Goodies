import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Goodie, GoodieType, GoodieStatus } from '../../types';
import {
  Plus,
  Repeat,
  Gift,
  CheckCircle2,
  Pause,
  Play,
  Trash2,
  Edit,
  Handshake,
  Users,
  Eye,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Package,
} from 'lucide-react';

export const MyGoodiesView: React.FC = () => {
  const {
    goodies,
    currentUser,
    setIsAddGoodieModalOpen,
    openEditGoodieModal,
    deleteGoodie,
    togglePauseGoodie,
    markGoodieCompleted,
    navigateTo,
    openGiveawayReviewModal,
  } = useApp();

  const [filterTab, setFilterTab] = useState<'all' | 'barter' | 'give' | 'completed' | 'paused'>(
    'all'
  );
  const [search, setSearch] = useState('');

  // Items owned by logged in user
  const myItems = goodies.filter((g) => g.ownerId === currentUser.id);

  // Counts
  const totalCount = myItems.length;
  const activeCount = myItems.filter((g) => g.status === 'active' || g.status === 'in_negotiation').length;
  const barterCount = myItems.filter((g) => g.type === 'barter' || g.type === 'both').length;
  const giveCount = myItems.filter((g) => g.type === 'give' || g.type === 'both').length;
  const completedCount = myItems.filter((g) => g.status === 'completed').length;
  const pausedCount = myItems.filter((g) => g.status === 'paused').length;

  const filteredItems = myItems.filter((item) => {
    if (filterTab === 'barter' && item.type === 'give') return false;
    if (filterTab === 'give' && item.type === 'barter') return false;
    if (filterTab === 'completed' && item.status !== 'completed') return false;
    if (filterTab === 'paused' && item.status !== 'paused') return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.event.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Top Header & Breadcrumb */}
      <div className="pt-4 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <button onClick={() => navigateTo('landing')} className="hover:underline">
              Home
            </button>
            <span>/</span>
            <span className="text-slate-900 dark:text-white">Dashboard</span>
            <span>/</span>
            <span className="text-amber-600 dark:text-amber-400">My Goodies</span>
          </div>

          <h1 className="text-3xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
            My Goodies
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Manage your posted developer merchandise, review barter proposals, track community giveaways,
            or update swap wishlists.
          </p>
        </div>

        <button
          onClick={() => setIsAddGoodieModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs shadow-md active:scale-95 transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Goodie</span>
        </button>
      </div>

      {/* Summary Stat Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-8">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Total Goodies</span>
          <div className="text-2xl font-extrabold font-display text-slate-900 dark:text-white font-mono mt-1">
            {totalCount}
          </div>
          <span className="text-[11px] text-slate-400">Items registered</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Active Listings</span>
          <div className="text-2xl font-extrabold font-display text-emerald-600 dark:text-emerald-400 font-mono mt-1">
            {activeCount}
          </div>
          <span className="text-[11px] text-emerald-600/80">Live in feed</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Barter Items</span>
          <div className="text-2xl font-extrabold font-display text-amber-600 dark:text-amber-400 font-mono mt-1">
            {barterCount}
          </div>
          <span className="text-[11px] text-amber-600/80">Swaps open</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Giveaways</span>
          <div className="text-2xl font-extrabold font-display text-sky-600 dark:text-sky-400 font-mono mt-1">
            {giveCount}
          </div>
          <span className="text-[11px] text-sky-600/80">Free gifts</span>
        </div>

        <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Completed & Karma</span>
          <div className="text-2xl font-extrabold font-display text-purple-600 dark:text-purple-400 font-mono mt-1">
            +{currentUser.karma}
          </div>
          <span className="text-[11px] text-slate-400">{completedCount} swaps finished</span>
        </div>
      </div>

      {/* Tabs and Local Search Filter */}
      <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterTab('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterTab === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            All ({totalCount})
          </button>

          <button
            onClick={() => setFilterTab('barter')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterTab === 'barter'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Barter ({barterCount})
          </button>

          <button
            onClick={() => setFilterTab('give')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterTab === 'give'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Give ({giveCount})
          </button>

          <button
            onClick={() => setFilterTab('completed')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterTab === 'completed'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Completed ({completedCount})
          </button>

          <button
            onClick={() => setFilterTab('paused')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterTab === 'paused'
                ? 'bg-slate-700 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Paused ({pausedCount})
          </button>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter your goodies..."
          className="w-full sm:w-60 h-9 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-transparent focus:outline-none"
        />
      </div>

      {/* Goodie List Cards */}
      <div className="space-y-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className={`p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border transition-all flex flex-col lg:flex-row gap-5 ${
                item.status === 'completed'
                  ? 'border-slate-200 dark:border-slate-800 opacity-80'
                  : item.status === 'paused'
                  ? 'border-dashed border-slate-300 dark:border-slate-700'
                  : 'border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Image Aspect */}
              <div className="w-full lg:w-48 h-44 lg:h-auto shrink-0 relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute top-2.5 left-2.5">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase shadow-sm ${
                      item.type === 'barter'
                        ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200'
                        : 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200'
                    }`}
                  >
                    {item.type === 'barter' ? (
                      <>
                        <Repeat className="w-3 h-3" /> Barter
                      </>
                    ) : (
                      <>
                        <Gift className="w-3 h-3" /> Give
                      </>
                    )}
                  </span>
                </div>
              </div>

              {/* Central Information */}
              <div className="flex-1 flex flex-col justify-between gap-3 min-w-0">
                <div>
                  <div className="flex items-center gap-2 mb-1.5 text-xs text-slate-500">
                    <span>{item.event}</span>
                    <span>·</span>
                    <span>{item.category}</span>
                    <span>·</span>
                    <span
                      className={`font-semibold capitalize ${
                        item.status === 'active'
                          ? 'text-emerald-600'
                          : item.status === 'in_negotiation'
                          ? 'text-amber-600'
                          : item.status === 'completed'
                          ? 'text-purple-600'
                          : 'text-slate-400'
                      }`}
                    >
                      {item.status === 'in_negotiation' ? 'In Negotiation' : item.status}
                    </span>
                  </div>

                  <h3
                    onClick={() => navigateTo('goodie-detail', { goodieId: item.id })}
                    className="text-base font-bold text-slate-900 dark:text-white truncate hover:text-amber-600 transition-colors cursor-pointer"
                  >
                    {item.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
                    {item.size && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-bold">
                        Size {item.size}
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {item.condition}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {item.city}
                    </span>
                  </div>

                  {item.type === 'barter' && item.wishlist && (
                    <div className="mt-3 p-2.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 text-xs text-slate-700 dark:text-slate-300">
                      <strong className="text-amber-700 dark:text-amber-400">Wishlist: </strong>
                      {item.wishlist}
                    </div>
                  )}

                  {item.type === 'give' && item.giverNote && (
                    <div className="mt-3 p-2.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 text-xs text-slate-700 dark:text-slate-300">
                      <strong className="text-emerald-700 dark:text-emerald-400">Giver Note: </strong>
                      {item.giverNote}
                    </div>
                  )}
                </div>

                {/* Offer / Request Indicator */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs text-slate-500">
                  <div className="flex items-center gap-3">
                    {item.type === 'barter' ? (
                      <span className="font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                        <Handshake className="w-3.5 h-3.5" />
                        <span>3 barter offers pending</span>
                      </span>
                    ) : (
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        <span>5 community requests</span>
                      </span>
                    )}
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> {item.viewsCount} views
                    </span>
                  </div>

                  <span className="text-slate-400">Updated recently</span>
                </div>
              </div>

              {/* Action Column */}
              <div className="lg:w-44 shrink-0 flex flex-col justify-center gap-2 lg:pl-3 border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800 pt-3 lg:pt-0">
                {item.type === 'barter' ? (
                  <button
                    onClick={() => navigateTo('my-barters')}
                    className="w-full py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Handshake className="w-3.5 h-3.5" />
                    <span>View Offers (3)</span>
                  </button>
                ) : (
                  <button
                    onClick={() => openGiveawayReviewModal(item)}
                    className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Review Requests</span>
                  </button>
                )}

                <button
                  onClick={() => openEditGoodieModal(item)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit Details</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => togglePauseGoodie(item.id)}
                    className="flex-1 py-1.5 px-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 text-[11px] font-medium transition-colors text-center"
                    title={item.status === 'paused' ? 'Resume listing' : 'Pause listing'}
                  >
                    {item.status === 'paused' ? 'Resume' : 'Pause'}
                  </button>

                  {item.status !== 'completed' && (
                    <button
                      onClick={() => markGoodieCompleted(item.id)}
                      className="flex-1 py-1.5 px-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold transition-colors text-center"
                    >
                      Completed
                    </button>
                  )}

                  <button
                    onClick={() => deleteGoodie(item.id)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <Package className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">No goodies in this view</h3>
            <p className="text-xs text-slate-500 mt-1">
              Have extra tees, stickers, or badges from a recent conference?
            </p>
            <button
              onClick={() => setIsAddGoodieModalOpen(true)}
              className="mt-4 px-5 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs"
            >
              + Add Your First Goodie
            </button>
          </div>
        )}
      </div>

      {/* SWAG HEALTH TIP & FULFILLMENT DISTRIBUTION INSIGHTS */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                Algorithm Insight
              </span>
              <span className="text-xs text-slate-400">Swag Health Tip</span>
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Listings with specific wishlist tags receive matches 4x faster
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Developers prefer knowing what you want in return. Specifying target conference years, garment sizes, or open-source software brands reduces back-and-forth negotiation delays by 68%.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Fulfillment Preferences
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              How your current active inventory is configured for handoffs.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span>Tracked Shipping (USPS / PirateShip)</span>
                  <span className="font-mono text-amber-600 font-bold">60%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '60%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span>Local Meetup / Conference Booth</span>
                  <span className="font-mono text-emerald-600 font-bold">40%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '40%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Location: {currentUser.city}</span>
            <button onClick={() => navigateTo('settings')} className="text-amber-600 font-bold hover:underline">
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
