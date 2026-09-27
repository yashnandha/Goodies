import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BarterOffer } from '../../types';
import {
  Repeat,
  CheckCircle2,
  Clock,
  ArrowRight,
  MessageSquare,
  Truck,
  ShieldCheck,
  Send,
  XCircle,
  HelpCircle,
  PackageCheck,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export const MyBartersView: React.FC = () => {
  const {
    barterOffers,
    currentUser,
    acceptBarterOffer,
    declineBarterOffer,
    counterBarterOffer,
    cancelBarterOffer,
    confirmSwagReceived,
    navigateTo,
    setActiveConversationId,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'received' | 'sent' | 'escrow' | 'completed'>(
    'all'
  );
  const [counterModalOfferId, setCounterModalOfferId] = useState<string | null>(null);
  const [counterText, setCounterText] = useState('');

  // Partition offers
  const receivedOffers = barterOffers.filter((o) => o.ownerId === currentUser.id);
  const sentOffers = barterOffers.filter((o) => o.proposerId === currentUser.id);
  const escrowOffers = barterOffers.filter(
    (o) => o.status === 'accepted_escrow' || o.status === 'in_transit'
  );
  const completedOffers = barterOffers.filter((o) => o.status === 'completed');

  const displayedOffers = barterOffers.filter((o) => {
    if (activeTab === 'received') return o.ownerId === currentUser.id && o.status === 'pending';
    if (activeTab === 'sent') return o.proposerId === currentUser.id && o.status === 'pending';
    if (activeTab === 'escrow') return o.status === 'accepted_escrow' || o.status === 'in_transit';
    if (activeTab === 'completed') return o.status === 'completed';
    return true;
  });

  const handleOpenCounter = (offerId: string) => {
    setCounterModalOfferId(offerId);
    setCounterText('Would you be able to bundle an extra enamel pin or sticker pack with this?');
  };

  const submitCounter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!counterModalOfferId) return;
    counterBarterOffer(counterModalOfferId, counterText);
    setCounterModalOfferId(null);
  };

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Top Header Strip */}
      <div className="pt-4 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <button onClick={() => navigateTo('landing')} className="hover:underline">
              Home
            </button>
            <span>/</span>
            <span className="text-slate-900 dark:text-white">Dashboard</span>
            <span>/</span>
            <span className="text-amber-600 dark:text-amber-400">My Barters</span>
          </div>

          <h1 className="text-3xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
            My Barters
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Track incoming exchange proposals, monitor your sent offers, negotiate items, and
            coordinate swag handoffs with zero landfill waste.
          </p>
        </div>

        {/* Trader Escrow Score Banner */}
        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs self-start md:self-auto">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Trader Escrow Score
              </span>
              <span className="text-[10px] font-bold text-emerald-600">Top 5%</span>
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">
              99.4% Fulfillment Rate (18 Swaps)
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-slate-900 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs mb-6 flex items-center gap-1.5 overflow-x-auto">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'all'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          All Barters ({barterOffers.length})
        </button>

        <button
          onClick={() => setActiveTab('received')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'received'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <span>Received Offers</span>
          <span className="px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-900 text-[10px]">
            {receivedOffers.filter((o) => o.status === 'pending').length} Pending
          </span>
        </button>

        <button
          onClick={() => setActiveTab('sent')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'sent'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <span>Sent Offers</span>
          <span className="text-[10px] text-slate-400 font-mono">({sentOffers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('escrow')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'escrow'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <span>In Escrow</span>
          <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-900 text-[10px]">
            {escrowOffers.length} Active
          </span>
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'completed'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Completed ({completedOffers.length})
        </button>
      </div>

      {/* Trades List */}
      <div className="space-y-6">
        {displayedOffers.length > 0 ? (
          displayedOffers.map((offer) => {
            const isReceived = offer.ownerId === currentUser.id;
            const otherParty = isReceived ? offer.proposer : offer.owner;

            return (
              <div
                key={offer.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
              >
                {/* Status Ribbon */}
                <div
                  className={`px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs ${
                    offer.status === 'accepted_escrow' || offer.status === 'in_transit'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
                      : offer.status === 'countered'
                      ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300'
                      : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] ${
                        offer.status === 'in_transit'
                          ? 'bg-emerald-600 text-white'
                          : offer.status === 'countered'
                          ? 'bg-amber-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {offer.status === 'in_transit'
                        ? 'In Transit • Escrow Lock'
                        : isReceived
                        ? 'Pending Your Decision'
                        : 'Offer Sent • Awaiting Response'}
                    </span>
                    <span>
                      Proposal {isReceived ? `from @${otherParty.username}` : `to @${otherParty.username}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{offer.expiresInHours ? `Auto-expires in ${offer.expiresInHours}h` : 'Active'}</span>
                    </span>
                    <span className="font-semibold text-amber-600 dark:text-amber-400 font-mono">
                      ★ {otherParty.rating} ({otherParty.successfulBartersCount} barters)
                    </span>
                  </div>
                </div>

                {/* Trade Comparison Visualizer */}
                <div className="p-6 md:p-8 space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 items-center">
                    {/* Left: Listing A */}
                    <div className="lg:col-span-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-4">
                      <img
                        src={offer.goodieRequested.images[0]}
                        alt={offer.goodieRequested.title}
                        className="w-20 h-20 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase text-slate-400">
                          {isReceived ? 'Your Listing' : "Their Goodie"}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                          {offer.goodieRequested.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {offer.goodieRequested.event} · {offer.goodieRequested.condition}
                          {offer.goodieRequested.size && ` · Size ${offer.goodieRequested.size}`}
                        </p>
                      </div>
                    </div>

                    {/* Center swap icon */}
                    <div className="lg:col-span-1 flex flex-col items-center justify-center py-2">
                      <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs">
                        <Repeat className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Right: Offered Goodie */}
                    <div className="lg:col-span-5 p-4 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 flex items-center gap-4">
                      <img
                        src={offer.offeredGoodies[0]?.images[0] || offer.goodieRequested.images[0]}
                        alt={offer.offeredGoodies[0]?.title || 'Offered Item'}
                        className="w-20 h-20 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase text-amber-700 dark:text-amber-400">
                          {isReceived ? `${otherParty.name.split(' ')[0]}'s Offer` : 'You Offered'}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                          {offer.offeredGoodies[0]?.title || 'Merchandise Bundle'}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {offer.offeredGoodies[0]?.event || 'Tech Event'} ·{' '}
                          {offer.offeredGoodies[0]?.condition || 'Mint condition'}
                          {offer.offeredGoodies[0]?.size && ` · Size ${offer.offeredGoodies[0].size}`}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Proposal Note */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-3">
                    <MessageSquare className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-700 dark:text-slate-300">
                      <strong className="text-slate-900 dark:text-white">Note: </strong>
                      "{offer.message}"
                    </div>
                  </div>

                  {/* Escrow Stepper if In-Transit or Escrow */}
                  {(offer.status === 'accepted_escrow' || offer.status === 'in_transit') && (
                    <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/60 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-emerald-900 dark:text-emerald-300">
                          Handoff & Escrow Progress
                        </span>
                        <span className="text-slate-500">Step {offer.escrowStep || 3} of 4</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-800">
                          <div className="font-bold text-emerald-700 dark:text-emerald-400">1. Agreed</div>
                          <div className="text-[11px] text-slate-400">Terms locked</div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-800">
                          <div className="font-bold text-emerald-700 dark:text-emerald-400">2. Labels</div>
                          <div className="text-[11px] text-slate-400">Prepaid & shared</div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-emerald-600 text-white font-bold shadow-xs">
                          <div>3. In Transit</div>
                          <div className="text-[11px] text-emerald-100">Out for delivery</div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 opacity-60">
                          <div className="font-bold text-slate-700 dark:text-slate-300">4. Release</div>
                          <div className="text-[11px] text-slate-400">+30 Karma</div>
                        </div>
                      </div>

                      {offer.trackingNumber && (
                        <div className="text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between pt-1">
                          <span className="font-mono">{offer.trackingNumber}</span>
                          <span className="text-emerald-600 font-bold">Estimated: Tomorrow</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Actions Ribbon */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex flex-wrap items-center gap-2">
                      {isReceived && offer.status === 'pending' && (
                        <>
                          <button
                            onClick={() => acceptBarterOffer(offer.id)}
                            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all"
                          >
                            Accept Barter Offer
                          </button>

                          <button
                            onClick={() => handleOpenCounter(offer.id)}
                            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 font-semibold text-xs transition-colors"
                          >
                            Counter Offer
                          </button>

                          <button
                            onClick={() => declineBarterOffer(offer.id)}
                            className="px-3 py-2 text-xs font-semibold text-rose-600 hover:underline"
                          >
                            Decline
                          </button>
                        </>
                      )}

                      {!isReceived && offer.status === 'pending' && (
                        <button
                          onClick={() => cancelBarterOffer(offer.id)}
                          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold hover:bg-slate-200"
                        >
                          Cancel Proposal
                        </button>
                      )}

                      {(offer.status === 'accepted_escrow' || offer.status === 'in_transit') && (
                        <button
                          onClick={() => confirmSwagReceived(offer.id)}
                          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm flex items-center gap-2 transition-all"
                        >
                          <PackageCheck className="w-4 h-4" />
                          <span>Confirm Swag Received (+30 Karma)</span>
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => navigateTo('messages')}
                      className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
                      <span>Chat with @{otherParty.username}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <Repeat className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              No barters in this section
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Explore community merchandise to propose your next swap!
            </p>
            <button
              onClick={() => navigateTo('explore', { tab: 'barter' })}
              className="mt-4 px-5 py-2.5 rounded-xl bg-amber-600 text-white text-xs font-bold shadow-sm"
            >
              Explore Barter Swag
            </button>
          </div>
        )}
      </div>

      {/* COUNTER OFFER MODAL */}
      {counterModalOfferId && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-2">
              Send Counter-Offer
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Describe what modification or bundle item you want to request from the proposer.
            </p>

            <form onSubmit={submitCounter} className="space-y-4">
              <textarea
                rows={3}
                required
                value={counterText}
                onChange={(e) => setCounterText(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCounterModalOfferId(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 text-white font-bold text-xs shadow-sm"
                >
                  Send Counter-Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Community Karma Escrow Guarantee Banner */}
      <div className="mt-12 p-6 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Goodies Community Karma Escrow Guarantee
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Every barter is backed by developer peer accountability. Swag handoffs require mutual confirmation
            upon arrival to unlock verified karma points, badge achievements, and maintain fair swaps across the network.
          </p>
        </div>
      </div>
    </div>
  );
};
