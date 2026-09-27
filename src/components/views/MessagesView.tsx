import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  Search,
  Check,
  Repeat,
  Gift,
  ShieldCheck,
  Send,
  Image as ImageIcon,
  MapPin,
  Clock,
  MoreVertical,
  User as UserIcon,
  CheckCheck,
  ZoomIn,
  Truck,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';

export const MessagesView: React.FC = () => {
  const {
    conversations,
    activeConversationId,
    setActiveConversationId,
    sendMessage,
    currentUser,
    acceptBarterOffer,
    declineBarterOffer,
    navigateTo,
    showToast,
  } = useApp();

  const [chatFilter, setChatFilter] = useState<'all' | 'barter' | 'giveaways'>('all');
  const [chatSearch, setChatSearch] = useState('');
  const [inputText, setInputText] = useState('');

  const activeConv =
    conversations.find((c) => c.id === activeConversationId) || conversations[0];

  const filteredConversations = conversations.filter((c) => {
    if (chatFilter === 'barter' && c.type !== 'barter') return false;
    if (chatFilter === 'giveaways' && c.type !== 'giveaway') return false;
    if (chatSearch.trim()) {
      const q = chatSearch.toLowerCase();
      return (
        c.participant.name.toLowerCase().includes(q) ||
        c.participant.username.toLowerCase().includes(q) ||
        c.goodieTitle.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(activeConv.id, inputText);
    setInputText('');
  };

  const handleQuickReply = (text: string) => {
    sendMessage(activeConv.id, text);
    showToast('Sent quick reply', 'info');
  };

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Top Header */}
      <div className="pt-4 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <button onClick={() => navigateTo('landing')} className="hover:underline">
              Dashboard
            </button>
            <span>/</span>
            <span className="text-slate-900 dark:text-white">Messages & Negotiations</span>
          </div>

          <h1 className="text-3xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
            Messages & Barter Room
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Coordinate trades, negotiate barter terms, and organize verified swag handoffs.
          </p>
        </div>

        {/* Escrow Protected Badge */}
        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <span>Escrow Protected</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">
              3 Active Negotiations ({currentUser.karma} Karma)
            </div>
          </div>
        </div>
      </div>

      {/* Main Split-Pane Workspace (Sidebar + Center Chat + Right Collateral) */}
      <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[840px]">
        {/* LEFT PANEL: Conversation Sidebar (~340px) */}
        <div className="w-full lg:w-80 shrink-0 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50/70 dark:bg-slate-900/40">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-slate-900 dark:text-white">Chats</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-300">
                {conversations.length} Active
              </span>
            </div>

            {/* Filter Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={chatSearch}
                onChange={(e) => setChatSearch(e.target.value)}
                placeholder="Filter chats by user or goodie..."
                className="w-full h-9 pl-9 pr-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-transparent focus:outline-none focus:bg-white dark:focus:bg-slate-700"
              />
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-1.5 text-xs overflow-x-auto pb-0.5">
              <button
                onClick={() => setChatFilter('all')}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-colors ${
                  chatFilter === 'all'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setChatFilter('barter')}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-colors ${
                  chatFilter === 'barter'
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Barter
              </button>
              <button
                onClick={() => setChatFilter('giveaways')}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-colors ${
                  chatFilter === 'giveaways'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Giveaways
              </button>
            </div>
          </div>

          {/* Conversations Stream */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
            {filteredConversations.map((c) => {
              const isActive = c.id === activeConv.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setActiveConversationId(c.id)}
                  className={`p-3.5 cursor-pointer transition-colors relative ${
                    isActive
                      ? 'bg-white dark:bg-slate-800/90 shadow-xs'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800/40'
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 rounded-r" />
                  )}

                  <div className="flex items-start gap-3">
                    <img
                      src={c.participant.avatar}
                      alt={c.participant.name}
                      className="w-11 h-11 rounded-full object-cover shrink-0 ring-1 ring-slate-200 dark:ring-slate-700"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-bold text-xs text-slate-900 dark:text-white truncate">
                          {c.participant.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {c.lastMessageTime}
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 mb-1 truncate max-w-full">
                        <Repeat className="w-2.5 h-2.5 shrink-0" />
                        <span className="truncate">{c.statusText}</span>
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                        {c.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CENTER PANEL: Chat Transcript & Contextual Barter Deal Viewport */}
        <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-slate-900">
          {/* Top Header of Chat */}
          <div className="h-16 px-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 z-10 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={activeConv.participant.avatar}
                alt={activeConv.participant.name}
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {activeConv.participant.name}
                  </h2>
                  <span className="px-2 py-0.2 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 text-[10px] font-bold">
                    Verified Attendee
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 truncate">
                  <span>@{activeConv.participant.username}</span>
                  <span>·</span>
                  <span className="text-emerald-600 font-bold">99.4% Escrow Karma</span>
                  <span>·</span>
                  <span>{activeConv.participant.city}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => navigateTo('profile')}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Profile
              </button>
              <button
                onClick={() => navigateTo('how-it-works')}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 hidden sm:inline"
              >
                Escrow Rules
              </button>
            </div>
          </div>

          {/* Chat Body & Messages */}
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/50 dark:bg-slate-950/40">
            {/* Sticky Barter Deal Comparison Header Widget */}
            {activeConv.barterOffer && (
              <div className="m-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/60 shadow-xs shrink-0">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 font-bold uppercase text-[10px]">
                      Barter Proposal
                    </span>
                    <span className="text-amber-600 font-bold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Auto-expires in 45h
                    </span>
                  </div>
                  <span className="font-mono text-slate-400">Trade #BK-2024-89</span>
                </div>

                {/* Swag comparison 2-box */}
                <div className="grid grid-cols-1 sm:grid-cols-11 gap-3 items-center py-3">
                  <div className="sm:col-span-5 flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <img
                      src={activeConv.barterOffer.goodieRequested.images[0]}
                      alt="Goodie"
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-bold text-slate-400">You Offer</span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {activeConv.barterOffer.goodieRequested.title}
                      </h4>
                      <span className="text-[11px] text-slate-500 font-mono">Size L · Mint</span>
                    </div>
                  </div>

                  <div className="sm:col-span-1 flex justify-center py-1">
                    <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
                      <Repeat className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="sm:col-span-5 flex items-center gap-3 p-2 rounded-xl bg-amber-50/60 dark:bg-amber-950/40">
                    <img
                      src={
                        activeConv.barterOffer.offeredGoodies[0]?.images[0] ||
                        activeConv.barterOffer.goodieRequested.images[0]
                      }
                      alt="Offer"
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400">
                        {activeConv.participant.name.split(' ')[0]}'s Offer (+Bundle)
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {activeConv.barterOffer.offeredGoodies[0]?.title || 'Conference Swag'}
                      </h4>
                      <span className="text-[11px] text-amber-700 dark:text-amber-300 font-semibold">
                        + 3x Rust/Go Decals
                      </span>
                    </div>
                  </div>
                </div>

                {/* Deal Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Protected by Goodies Escrow · Mutual handoff release</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => declineBarterOffer(activeConv.barterOffer!.id)}
                      className="px-3 py-1.5 rounded-lg text-slate-500 hover:text-rose-600"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() =>
                        handleQuickReply('Would you consider bundling the official Rust enamel pin?')
                      }
                      className="px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold"
                    >
                      Counter-Offer
                    </button>
                    <button
                      onClick={() => acceptBarterOffer(activeConv.barterOffer!.id)}
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-xs flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Accept Barter</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {activeConv.messages.map((m) => {
                if (m.isSystemNotice) {
                  return (
                    <div key={m.id} className="flex justify-center my-2">
                      <div className="bg-slate-200/80 dark:bg-slate-800 px-3.5 py-1 rounded-full text-slate-600 dark:text-slate-300 text-xs font-medium flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>{m.text}</span>
                        <span className="text-slate-400 font-mono text-[10px]">· {m.timestamp}</span>
                      </div>
                    </div>
                  );
                }

                const isMe = m.senderId === currentUser.id;

                return (
                  <div
                    key={m.id}
                    className={`flex items-end gap-2.5 max-w-xl ${isMe ? 'ml-auto justify-end' : ''}`}
                  >
                    {!isMe && (
                      <img
                        src={m.senderAvatar}
                        alt={m.senderName}
                        className="w-8 h-8 rounded-full object-cover shrink-0 mb-1"
                      />
                    )}

                    <div className={`flex flex-col gap-1 ${isMe ? 'items-end' : ''}`}>
                      <div
                        className={`p-3.5 rounded-2xl text-xs sm:text-sm font-normal leading-relaxed ${
                          isMe
                            ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-br-sm shadow-sm'
                            : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-sm shadow-xs border border-slate-200/60 dark:border-slate-700/60'
                        }`}
                      >
                        <p>{m.text}</p>

                        {/* Photo attachment preview */}
                        {m.attachmentImage && (
                          <div className="mt-2.5 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                            <img
                              src={m.attachmentImage}
                              alt="Attachment"
                              className="w-full h-44 object-cover"
                            />
                            {m.attachmentMeta && (
                              <div className="p-1.5 bg-black/70 text-[10px] text-white font-mono flex items-center justify-between">
                                <span>{m.attachmentMeta}</span>
                                <span className="text-emerald-400 flex items-center gap-0.5">
                                  <ZoomIn className="w-3 h-3" /> High-Res
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1 text-[10px] text-slate-400 px-1 font-mono">
                        <span>{m.timestamp}</span>
                        {isMe && <CheckCheck className="w-3 h-3 text-emerald-500" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Composer & Quick Replies */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
              {/* Quick Negotiation Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider shrink-0">
                  Quick replies:
                </span>
                <button
                  type="button"
                  onClick={() => handleQuickReply('Sounds great, accepting now!')}
                  className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs shrink-0 transition-colors"
                >
                  "Sounds great, accepting now!"
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickReply('Could we do SF meetup on Thursday?')}
                  className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs shrink-0 transition-colors"
                >
                  "Could we do SF meetup on Thursday?"
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickReply('Can I request one more photo of the tag?')}
                  className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs shrink-0 transition-colors"
                >
                  "Can I request one more photo of the tag?"
                </button>
              </div>

              {/* Input bar */}
              <form
                onSubmit={handleSend}
                className="bg-slate-100 dark:bg-slate-800/90 rounded-2xl p-2 flex flex-col gap-2"
              >
                <textarea
                  rows={2}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder={`Reply to @${activeConv.participant.username} regarding this barter...`}
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none resize-none p-1"
                />

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1 text-slate-500">
                    <button
                      type="button"
                      onClick={() =>
                        sendMessage(
                          activeConv.id,
                          "Here is an additional photo of my goodie's stitching detail!",
                          'https://lh3.googleusercontent.com/aida-public/AB6AXuBKUocKgymTfy1GmfQRxqvTg4KZsa5idq1ibrcqawRG_06xESavNA-ybWZNGCq9xQo9Vo8EbmQVMD5xy-1Tr7cdY7sTzAhXM4CwgXTbVR8p4X4l_U44IeAXgDBb0cZZUsw3EeFRpG6XBUwSHY45nx_GCLOWHz5dDGtk212u6b4Psmdvpbnr3dRkuQ23aS9ZgcBBkb9xtHFlpScHNHL7aElD-quw0C40e7cTt4wMXb_Fj1O6NZhtUtZp'
                        )
                      }
                      className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      title="Attach photo"
                    >
                      <ImageIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickReply('Proposing local handoff at the GitHub HQ event.')}
                      className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      title="Suggest Meetup Spot"
                    >
                      <MapPin className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 hidden sm:inline">⌘ + Enter to send</span>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs shadow-sm hover:opacity-90 active:scale-95 transition-all"
                    >
                      <span>Send</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* RIGHT COLLATERAL DRAWER: Trade Specs & Escrow (~260px) */}
        <div className="w-full lg:w-72 shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 p-5 bg-white dark:bg-slate-900 overflow-y-auto space-y-5">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Trade Specs</h3>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold">
                1:1 Verified
              </span>
            </div>
            <p className="text-xs text-slate-500">Review terms and safety mechanisms for this swap.</p>
          </div>

          {/* Stepper */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Exchange Lifecycle
            </span>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                  1
                </span>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Terms Negotiation</p>
                  <p className="text-[11px] text-amber-600 font-medium">Active right now</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 opacity-60">
                <span className="w-5 h-5 rounded-full bg-slate-300 dark:bg-slate-700 font-bold flex items-center justify-center text-[10px] shrink-0">
                  2
                </span>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Escrow Lock & QR Label</p>
                  <p className="text-[11px] text-slate-400">Prepaid shipping</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 opacity-60">
                <span className="w-5 h-5 rounded-full bg-slate-300 dark:bg-slate-700 font-bold flex items-center justify-center text-[10px] shrink-0">
                  3
                </span>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Mutual Delivery</p>
                  <p className="text-[11px] text-slate-400">+30 Developer Karma</p>
                </div>
              </div>
            </div>
          </div>

          {/* Escrow Rule box */}
          <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Goodies Escrow</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              Both swag items are backed by community trust scores. If an item isn't received as described,
              your trade balance is completely protected.
            </p>
          </div>

          {/* Swag Exchange Rules */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-white">Swag Exchange Rules</h4>
            <div className="flex items-start gap-2 text-slate-600 dark:text-slate-400 text-[11px]">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong>Cashless only:</strong> No fiat currency or gift cards may be traded on Goodies.
              </span>
            </div>
            <div className="flex items-start gap-2 text-slate-600 dark:text-slate-400 text-[11px]">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong>Authenticity:</strong> Swag must be genuine event merch or certified open-source gear.
              </span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => handleQuickReply('Could you suggest a coffee shop or tech meetup for handoff?')}
              className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
            >
              Suggest Meetup Spot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
