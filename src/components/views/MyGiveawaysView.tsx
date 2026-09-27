import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Gift,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Plus,
  Eye,
  Heart,
  MessageSquare,
  Package,
} from 'lucide-react';

export const MyGiveawaysView: React.FC = () => {
  const {
    goodies,
    currentUser,
    giveawayRequests,
    openGiveawayReviewModal,
    setIsAddGoodieModalOpen,
    navigateTo,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'active' | 'requests' | 'given'>('active');

  // Filter giveaways owned by current user
  const myGiveaways = goodies.filter(
    (g) => g.ownerId === currentUser.id && (g.type === 'give' || g.type === 'both')
  );

  const activeGiveaways = myGiveaways.filter((g) => g.status === 'active');
  const givenAway = myGiveaways.filter((g) => g.status === 'completed');

  // Requests on my items
  const myItemIds = myGiveaways.map((g) => g.id);
  const myReceivedRequests = giveawayRequests.filter((r) => myItemIds.includes(r.goodieId));

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Top Header */}
      <div className="pt-4 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <button onClick={() => navigateTo('landing')} className="hover:underline">
              Home
            </button>
            <span>/</span>
            <span className="text-slate-900 dark:text-white">Dashboard</span>
            <span>/</span>
            <span className="text-emerald-600 dark:text-emerald-400">My Giveaways</span>
          </div>

          <h1 className="text-3xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
            My Giveaways
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Pay it forward by sharing extra tech gear with students, juniors, and community members.
            Zero fees, zero monetary transactions.
          </p>
        </div>

        <button
          onClick={() => setIsAddGoodieModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Post a Free Giveaway</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs mb-6 flex items-center gap-1.5 overflow-x-auto">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'active'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Active Giveaways ({activeGiveaways.length})
        </button>

        <button
          onClick={() => setActiveTab('requests')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'requests'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <span>Applicant Requests</span>
          <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-900 text-[10px]">
            {myReceivedRequests.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('given')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'given'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Successfully Given ({givenAway.length})
        </button>
      </div>

      {/* Active Tab: List of Live Giveaways */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          {activeGiveaways.length > 0 ? (
            activeGiveaways.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-20 h-20 rounded-2xl object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">
                      {item.event} · {item.year}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {item.condition} · {item.city}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                        <Users className="w-3.5 h-3.5" />
                        <span>5 people requested this item</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0 justify-end">
                  <button
                    onClick={() => openGiveawayReviewModal(item)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all"
                  >
                    View Requests & Choose Recipient
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              <Gift className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No active giveaways
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Share extra stickers, bags, or shirts with junior engineers.
              </p>
              <button
                onClick={() => setIsAddGoodieModalOpen(true)}
                className="mt-4 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                + List a Free Goodie
              </button>
            </div>
          )}
        </div>
      )}

      {/* Requests Tab: Individual Applicants */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          {myReceivedRequests.length > 0 ? (
            myReceivedRequests.map((req) => (
              <div
                key={req.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={req.requester.avatar}
                      alt={req.requester.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {req.requester.name}
                        </span>
                        <span className="text-xs text-slate-400">@{req.requester.username}</span>
                      </div>
                      <span className="text-xs text-slate-500">{req.requester.city}</span>
                    </div>
                  </div>

                  <span className="text-xs text-slate-400 font-mono">
                    Target: {req.goodie.title}
                  </span>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/80 p-3 rounded-2xl italic">
                  "{req.message}"
                </p>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-500">
                    Preference: {req.deliveryPreference}
                  </span>

                  <button
                    onClick={() => openGiveawayReviewModal(req.goodie)}
                    className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500"
                  >
                    Review & Decide
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              <p className="text-sm font-semibold text-slate-500">No applicant requests pending</p>
            </div>
          )}
        </div>
      )}

      {/* Given Away Tab: Archive */}
      {activeTab === 'given' && (
        <div className="space-y-4">
          {givenAway.length > 0 ? (
            givenAway.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-16 h-16 rounded-2xl object-cover shrink-0"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white line-through opacity-80">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500">{item.event} · Successfully Re-homed</p>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-purple-600 font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>+50 Karma awarded</span>
                    </div>
                  </div>
                </div>

                <span className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 font-bold">
                  Delivered
                </span>
              </div>
            ))
          ) : (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              <p className="text-sm text-slate-500">No completed giveaways yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
