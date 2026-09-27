import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Gift, Sparkles, Send, Heart, MapPin } from 'lucide-react';

export const GiveawayRequestModal: React.FC = () => {
  const { giveawayTargetGoodie, closeGiveawayRequestModal, createGiveawayRequest, currentUser } =
    useApp();

  const [message, setMessage] = useState(
    'I would love to receive this goodie because I am a student / junior developer building projects and missed the conference! Would treasure using this.'
  );
  const [deliveryPreference, setDeliveryPreference] = useState(
    'Happy to cover small USPS stamp postage or meet locally in ' + currentUser.city
  );

  if (!giveawayTargetGoodie) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createGiveawayRequest(giveawayTargetGoodie.id, message, deliveryPreference);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Gift className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                Request Free Goodie
              </h3>
              <p className="text-xs text-slate-500">
                100% free community giveaway from @{giveawayTargetGoodie.owner.username}
              </p>
            </div>
          </div>

          <button
            onClick={closeGiveawayRequestModal}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5">
          {/* Target goodie summary */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/60 flex items-center gap-3.5">
            <img
              src={giveawayTargetGoodie.images[0]}
              alt={giveawayTargetGoodie.title}
              className="w-16 h-16 rounded-xl object-cover shrink-0"
            />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400 tracking-wider">
                {giveawayTargetGoodie.event} · {giveawayTargetGoodie.year}
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                {giveawayTargetGoodie.title}
              </h4>
              <p className="text-xs text-slate-500 truncate mt-0.5">
                Condition: {giveawayTargetGoodie.condition}
              </p>
            </div>
          </div>

          {giveawayTargetGoodie.giverNote && (
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300">
              <strong className="text-emerald-600 dark:text-emerald-400">Giver Note: </strong>
              "{giveawayTargetGoodie.giverNote}"
            </div>
          )}

          {/* Reason / message */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Why would you like to receive this goodie? *
            </label>
            <textarea
              rows={3}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="I would love to receive this item because..."
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs border border-slate-200 dark:border-slate-700 focus:outline-none resize-none"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Friendly notes that share what you're working on help the giver choose a recipient.
            </p>
          </div>

          {/* Delivery Preference */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Delivery Preference & Location
            </label>
            <input
              type="text"
              required
              value={deliveryPreference}
              onChange={(e) => setDeliveryPreference(e.target.value)}
              placeholder="e.g. Willing to pay small USPS postage stamp, or meet in SF"
              className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs border border-slate-200 dark:border-slate-700 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={closeGiveawayRequestModal}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Request</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
