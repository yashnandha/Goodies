import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Repeat, Check, ShieldCheck, MapPin, Truck, AlertCircle } from 'lucide-react';

export const BarterOfferModal: React.FC = () => {
  const {
    barterTargetGoodie,
    closeBarterModal,
    goodies,
    currentUser,
    createBarterOffer,
    setIsAddGoodieModalOpen,
  } = useApp();

  const [selectedOfferedIds, setSelectedOfferedIds] = useState<string[]>([]);
  const [message, setMessage] = useState(
    'Hey! Saw you were looking to barter this item. I would love to trade from my collection. Let me know if this works!'
  );
  const [exchangeMode, setExchangeMode] = useState<'Shipping' | 'Local Meetup'>('Shipping');

  if (!barterTargetGoodie) return null;

  // Filter current user's active goodies to offer
  const myAvailableGoodies = goodies.filter(
    (g) => g.ownerId === currentUser.id && g.status === 'active'
  );

  const toggleSelect = (id: string) => {
    if (selectedOfferedIds.includes(id)) {
      setSelectedOfferedIds(selectedOfferedIds.filter((x) => x !== id));
    } else {
      setSelectedOfferedIds([...selectedOfferedIds, id]);
    }
  };

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOfferedIds.length === 0) return;
    createBarterOffer(barterTargetGoodie.id, selectedOfferedIds, message, exchangeMode);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Repeat className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                Make Barter Offer
              </h3>
              <p className="text-xs text-slate-500">
                Propose a 1-for-1 or bundle swap backed by Goodies Escrow
              </p>
            </div>
          </div>

          <button
            onClick={closeBarterModal}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSendOffer} className="p-6 sm:p-7 space-y-6">
          {/* Top Target Goodie Preview */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center gap-3.5">
            <img
              src={barterTargetGoodie.images[0]}
              alt={barterTargetGoodie.title}
              className="w-16 h-16 rounded-xl object-cover shrink-0"
            />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 tracking-wider">
                Requested Item ({barterTargetGoodie.event})
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                {barterTargetGoodie.title}
              </h4>
              <p className="text-xs text-slate-500 truncate mt-0.5">
                Owner: @{barterTargetGoodie.owner.username} · {barterTargetGoodie.condition}
                {barterTargetGoodie.size && ` · Size ${barterTargetGoodie.size}`}
              </p>
            </div>
          </div>

          {/* Section: Choose Goodies From Your Collection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Choose goodies from your collection:
              </label>
              <span className="text-xs text-slate-500">
                {selectedOfferedIds.length} item{selectedOfferedIds.length !== 1 ? 's' : ''} selected
              </span>
            </div>

            {myAvailableGoodies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
                {myAvailableGoodies.map((g) => {
                  const isChecked = selectedOfferedIds.includes(g.id);
                  return (
                    <div
                      key={g.id}
                      onClick={() => toggleSelect(g.id)}
                      className={`p-2.5 rounded-xl border-2 flex items-center gap-2.5 cursor-pointer transition-all ${
                        isChecked
                          ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/30'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <img
                        src={g.images[0]}
                        alt={g.title}
                        className="w-11 h-11 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {g.title}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate">
                          {g.event} · {g.condition}
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                          isChecked
                            ? 'bg-amber-500 border-amber-500 text-white'
                            : 'border-slate-300 dark:border-slate-600'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-center space-y-2">
                <AlertCircle className="w-5 h-5 text-amber-600 mx-auto" />
                <p className="text-xs text-amber-800 dark:text-amber-300 font-medium">
                  You don't have any active goodies listed in your collection yet.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    closeBarterModal();
                    setIsAddGoodieModalOpen(true);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-bold hover:bg-amber-700"
                >
                  + Add a Goodie First
                </button>
              </div>
            )}
          </div>

          {/* Delivery Mode */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Handoff Preference
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setExchangeMode('Shipping')}
                className={`p-2.5 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-colors ${
                  exchangeMode === 'Shipping'
                    ? 'border-amber-500 bg-amber-50/40 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>Tracked Shipping</span>
              </button>
              <button
                type="button"
                onClick={() => setExchangeMode('Local Meetup')}
                className={`p-2.5 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-colors ${
                  exchangeMode === 'Local Meetup'
                    ? 'border-amber-500 bg-amber-50/40 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>In-Person Meetup</span>
              </button>
            </div>
          </div>

          {/* Message field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Message to Owner
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Introduce your trade proposal..."
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs border border-slate-200 dark:border-slate-700 focus:outline-none resize-none"
              required
            />
          </div>

          {/* Escrow Guarantee */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Protected by Goodies Escrow · Unlocks +30 Karma on verified delivery.</span>
          </div>

          {/* Submit */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={closeBarterModal}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={selectedOfferedIds.length === 0}
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send Barter Offer ({selectedOfferedIds.length})
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
