import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Gift, Check, Sparkles, MessageSquare, MapPin } from 'lucide-react';

export const GiveawayReviewModal: React.FC = () => {
  const {
    giveawayReviewGoodie,
    closeGiveawayReviewModal,
    giveawayRequests,
    acceptGiveawayRequest,
    declineGiveawayRequest,
    navigateTo,
  } = useApp();

  if (!giveawayReviewGoodie) return null;

  // Find all requests for this goodie
  const requests = giveawayRequests.filter(
    (r) => r.goodieId === giveawayReviewGoodie.id
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6"
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
                Review Giveaway Requests
              </h3>
              <p className="text-xs text-slate-500">
                {requests.length} community members requested {giveawayReviewGoodie.title}
              </p>
            </div>
          </div>

          <button
            onClick={closeGiveawayReviewModal}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-7 space-y-4 max-h-[70vh] overflow-y-auto">
          {requests.length > 0 ? (
            requests.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3"
              >
                {/* Requester info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={req.requester.avatar}
                      alt={req.requester.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/20"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {req.requester.name}
                        </span>
                        <span className="text-xs text-slate-400">@{req.requester.username}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <span className="flex items-center gap-0.5 text-amber-600 dark:text-amber-400 font-mono font-bold">
                          <Sparkles className="w-3 h-3" /> {req.requester.karma} Karma
                        </span>
                        <span>·</span>
                        <span>{req.requester.city}</span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      req.status === 'accepted'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : req.status === 'declined'
                        ? 'bg-slate-100 text-slate-600 dark:bg-slate-800'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}
                  >
                    {req.status}
                  </span>
                </div>

                {/* Message */}
                <p className="text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60 italic leading-relaxed">
                  "{req.message}"
                </p>

                {/* Delivery preference */}
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Preference: {req.deliveryPreference}</span>
                </div>

                {/* Action Buttons */}
                {req.status === 'pending' && (
                  <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-200/60 dark:border-slate-700/60">
                    <button
                      type="button"
                      onClick={() => declineGiveawayRequest(req.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      Decline
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        navigateTo('messages');
                        closeGiveawayReviewModal();
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 transition-colors flex items-center gap-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Message</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => acceptGiveawayRequest(req.id)}
                      className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-sm flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Gift to {req.requester.name.split(' ')[0]}</span>
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-slate-500">
              <Gift className="w-8 h-8 mx-auto text-slate-400 mb-2" />
              <p className="text-sm font-semibold">No requests submitted yet</p>
              <p className="text-xs mt-1">Your giveaway is live in the community feed.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
