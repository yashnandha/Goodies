import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, AlertTriangle, ShieldCheck, Flag } from 'lucide-react';

export const ReportModal: React.FC = () => {
  const { reportTarget, closeReportModal, showToast } = useApp();

  const [reason, setReason] = useState('Counterfeit or bootleg swag (not genuine event merch)');
  const [details, setDetails] = useState('');

  if (!reportTarget) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Report submitted for moderator review. Thank you for keeping Goodies safe!', 'info');
    closeReportModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <Flag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Report Listing or User
              </h3>
              <p className="text-xs text-slate-500">Target: {reportTarget.title}</p>
            </div>
          </div>

          <button
            onClick={closeReportModal}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Reason for reporting
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs border border-slate-200 dark:border-slate-700 focus:outline-none"
            >
              <option value="Counterfeit or bootleg swag">
                Counterfeit or bootleg merchandise (not genuine event merch)
              </option>
              <option value="Attempted money/cash transaction">
                Attempted money/cash sale (Cashless violation)
              </option>
              <option value="Item condition not matching description">
                Item condition misrepresented
              </option>
              <option value="Inappropriate communication or harassment">
                Inappropriate communication or harassment
              </option>
              <option value="Spam or fraudulent account">Spam or fake profile</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Additional Details (Optional)
            </label>
            <textarea
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Provide any context or chat references..."
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs border border-slate-200 dark:border-slate-700 focus:outline-none resize-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={closeReportModal}
              className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-sm transition-all"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
