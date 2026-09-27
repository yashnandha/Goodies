import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Repeat,
  Gift,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Truck,
  Heart,
} from 'lucide-react';

export const HowItWorksView: React.FC = () => {
  const { navigateTo, setIsAddGoodieModalOpen } = useApp();

  const faqs = [
    {
      q: 'Is any money ever allowed on Goodies?',
      a: 'Never. Goodies is strictly a cashless developer community. You can trade swag item-for-item (Barter) or give it away without cost (Give). If a user attempts to sell or ask for fiat payment, report the listing immediately.',
    },
    {
      q: 'How does Goodies Escrow work?',
      a: 'When two users accept a barter proposal, the trade enters Escrow Lock. Goodies generates a prepaid shipping QR label or meetup verification code. Once both participants scan or confirm mutual delivery, verified Karma points unlock.',
    },
    {
      q: 'Who pays for postage?',
      a: 'For 1-for-1 barters, each trader covers their own small shipping box or label (often via PirateShip / USPS at ~$4–$6). For giveaways, the recipient may choose to cover postage or meet at an upcoming conference.',
    },
    {
      q: 'What counts as a tech goodie?',
      a: 'Any genuine merchandise received from technology events, hackathons, open-source conferences (Google I/O, AWS re:Invent, KubeCon, GitHub Universe, GDG DevFest, Config, etc.), including tees, hoodies, stickers, keycaps, mugs, and pins.',
    },
  ];

  return (
    <div className="flex flex-col w-full pb-20 max-w-4xl mx-auto">
      {/* Header */}
      <div className="pt-4 pb-8 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
          The Circular Swag Manifesto
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight mt-1">
          How Goodies Works
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-xl mx-auto leading-relaxed">
          Every year, thousands of tons of high quality tech conference gear sit forgotten in boxes.
          Goodies connects developers to circularize, trade, and re-home unworn merchandise.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        <div className="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <Repeat className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
            1. The Barter Economy
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Have an extra hoodie in size L, but looking for a Docker cap or artisan keycap set? Propose a
            direct trade. Review item photos, negotiate bundle decals in the Barter Room, and agree on terms.
          </p>
        </div>

        <div className="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <Gift className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
            2. The Free Gift Culture
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Speakers and attendees often receive duplicate items. List your extra stickers or tumblers as
            Giveaways. Review requests from students and juniors, and select who receives it.
          </p>
        </div>

        <div className="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
            3. Goodies Karma Escrow
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Every member has a Karma trust score. Mutual delivery confirmation releases +30 Karma for
            barters and +50 Karma for giveaways, unlocking verified badges and community standing.
          </p>
        </div>

        <div className="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
            4. Zero Landfill Waste
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Instead of tech merch ending up discarded in event hotel rooms or junk drawers, items are
            treasured by enthusiasts who missed the conference.
          </p>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="space-y-4 mb-12">
        <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-4">
          Frequently Asked Questions
        </h2>
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5"
          >
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{faq.q}</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-6 leading-relaxed">
              {faq.a}
            </p>
          </div>
        ))}
      </div>

      {/* CTA Bottom Banner */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white text-center space-y-4">
        <h3 className="text-2xl font-bold font-display">Ready to join the movement?</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
          Start sharing your conference swag or propose a swap with verified attendees today.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={() => setIsAddGoodieModalOpen(true)}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md"
          >
            List a Goodie Now
          </button>
          <button
            onClick={() => navigateTo('explore')}
            className="px-6 py-3 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700"
          >
            Explore Swag
          </button>
        </div>
      </div>
    </div>
  );
};
