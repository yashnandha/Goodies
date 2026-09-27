import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Plus,
  Bell,
  Sun,
  Moon,
  Sparkles,
  Menu,
  X,
  User as UserIcon,
  LogOut,
  Settings,
  Heart,
  Package,
  Repeat,
  Gift,
  Check,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    isDarkMode,
    toggleDarkMode,
    currentView,
    navigateTo,
    setIsSearchModalOpen,
    setIsAddGoodieModalOpen,
    currentUser,
    isLoggedIn,
    logoutUser,
    openAuthModal,
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close popovers on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchModalOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* ZONE 1: BRAND */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigateTo('landing')}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
            aria-label="Goodies Home"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-emerald-500 to-sky-500 p-0.5 shadow-sm group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[10px] flex items-center justify-center">
                <span className="text-base font-black tracking-tight bg-gradient-to-r from-amber-600 to-emerald-600 bg-clip-text text-transparent">
                  G
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold font-display tracking-tight text-slate-900 dark:text-white leading-none">
                Goodies
              </span>
              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 tracking-wider uppercase mt-0.5">
                Swag Circularity
              </span>
            </div>
          </button>

          {/* ZONE 2: PRIMARY NAVIGATION LINKS */}
          <nav className="hidden lg:flex items-center gap-1 font-medium text-sm text-slate-600 dark:text-slate-300">
            <button
              onClick={() => navigateTo('explore')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                currentView === 'explore'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                  : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <span>Explore</span>
              <span className="text-[10px] px-1.5 py-0.2 font-bold uppercase rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                Live
              </span>
            </button>

            <button
              onClick={() => navigateTo('how-it-works')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                currentView === 'how-it-works'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                  : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              How It Works
            </button>

            {isLoggedIn && (
              <>
                <button
                  onClick={() => navigateTo('my-goodies')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    currentView === 'my-goodies'
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                      : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  My Goodies
                </button>

                <button
                  onClick={() => navigateTo('my-barters')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    currentView === 'my-barters'
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                      : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  My Barters
                </button>

                <button
                  onClick={() => navigateTo('my-giveaways')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    currentView === 'my-giveaways'
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                      : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  My Giveaways
                </button>

                <button
                  onClick={() => navigateTo('messages')}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                    currentView === 'messages'
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                      : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <span>Barter Room</span>
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                </button>
              </>
            )}
          </nav>
        </div>

        {/* SEARCH BAR (CLICK OPENS MODAL / SHORTCUT) */}
        <div className="flex-1 max-w-xs md:max-w-sm hidden sm:block">
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="w-full h-9.5 pl-3.5 pr-3 rounded-full bg-slate-100 dark:bg-slate-800/90 text-slate-400 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 border border-slate-200/60 dark:border-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600 flex items-center justify-between text-xs transition-all shadow-inner"
          >
            <div className="flex items-center gap-2 truncate">
              <Search className="w-4 h-4 shrink-0 text-slate-400" />
              <span className="truncate">Search T-shirts, stickers, events, hoodies...</span>
            </div>
            <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 text-[10px] font-mono font-medium text-slate-500 dark:text-slate-300 shadow-sm border border-slate-200 dark:border-slate-600">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* ZONE 3: ACTIONS & ACCOUNT CONTROLS */}
        <div className="flex items-center gap-2.5">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          {/* Post Swag Button */}
          {isLoggedIn ? (
            <button
              onClick={() => setIsAddGoodieModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs transition-all shadow-sm active:scale-95 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Add Goodie</span>
            </button>
          ) : (
            <button
              onClick={() => openAuthModal('signup')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs transition-all shadow-sm active:scale-95"
            >
              <span>Get Started</span>
            </button>
          )}

          {/* Notifications Popover */}
          {isLoggedIn && (
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center leading-none">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 py-3 z-50">
                  <div className="px-4 py-2 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
                    <span className="font-semibold text-sm text-slate-900 dark:text-white">
                      Notifications
                    </span>
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-xs text-amber-600 dark:text-amber-400 hover:underline font-medium"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markNotificationAsRead(n.id);
                          if (n.linkTarget) {
                            navigateTo(n.linkTarget.view);
                            setIsNotifOpen(false);
                          }
                        }}
                        className={`p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors ${
                          !n.read ? 'bg-amber-50/40 dark:bg-amber-950/20' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-medium text-xs text-slate-900 dark:text-slate-100">
                            {n.title}
                          </p>
                          <span className="text-[10px] text-slate-400 tabular-nums">
                            {n.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                          {n.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Karma Badge & User Menu */}
          {isLoggedIn ? (
            <div className="relative flex items-center gap-2 pl-1" ref={userMenuRef}>
              {/* Karma Pill */}
              <button
                onClick={() => navigateTo('profile')}
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200/60 dark:border-amber-800/60 text-amber-700 dark:text-amber-300 text-xs font-semibold hover:bg-amber-100 transition-colors"
                title="Your Goodies Karma & Escrow Trust Score"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span className="font-mono tabular-nums">{currentUser.karma}</span>
                <span className="text-[10px] font-normal text-amber-600/80 dark:text-amber-400/80">Karma</span>
              </button>

              {/* Avatar trigger */}
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="relative focus:outline-none"
                aria-label="User profile menu"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8.5 h-8.5 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700 hover:ring-amber-500 transition-all"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900"></span>
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                    <p className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                      {currentUser.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate">
                      @{currentUser.username}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                      <span>Trader Karma</span>
                      <span className="font-bold text-amber-600 dark:text-amber-400 font-mono">
                        {currentUser.karma} pts
                      </span>
                    </div>
                  </div>

                  <div className="py-1 space-y-0.5 text-xs font-medium text-slate-700 dark:text-slate-200">
                    <button
                      onClick={() => {
                        navigateTo('profile');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                    >
                      <UserIcon className="w-4 h-4 text-slate-400" />
                      <span>My Public Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        navigateTo('my-goodies');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                    >
                      <Package className="w-4 h-4 text-slate-400" />
                      <span>My Goodies Inventory ({currentUser.goodiesListedCount})</span>
                    </button>

                    <button
                      onClick={() => {
                        navigateTo('my-barters');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                    >
                      <Repeat className="w-4 h-4 text-amber-500" />
                      <span>My Barters (Active Trades)</span>
                    </button>

                    <button
                      onClick={() => {
                        navigateTo('my-giveaways');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                    >
                      <Gift className="w-4 h-4 text-emerald-500" />
                      <span>My Giveaways & Requests</span>
                    </button>

                    <button
                      onClick={() => {
                        navigateTo('settings');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                      <span>Preferences & Handoffs</span>
                    </button>
                  </div>

                  <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => {
                        logoutUser();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 transition-colors text-left text-xs font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuthModal('login')}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white"
              >
                Log In
              </button>
            </div>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE EXPANDED DRAWER */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-3">
          <div className="pt-1 pb-2">
            <button
              onClick={() => {
                setIsSearchModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full h-10 px-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center gap-2 text-xs"
            >
              <Search className="w-4 h-4" />
              <span>Search goodies & conference drops...</span>
            </button>
          </div>

          <div className="space-y-1 font-medium text-sm text-slate-700 dark:text-slate-200">
            <button
              onClick={() => {
                navigateTo('explore');
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <span>Explore All Goodies</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                1,248
              </span>
            </button>

            <button
              onClick={() => {
                navigateTo('how-it-works');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              How It Works & Escrow Rules
            </button>

            {isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    navigateTo('my-goodies');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  My Goodies
                </button>
                <button
                  onClick={() => {
                    navigateTo('my-barters');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between"
                >
                  <span>My Barters</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold">
                    3 Active
                  </span>
                </button>
                <button
                  onClick={() => {
                    navigateTo('my-giveaways');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  My Giveaways
                </button>
                <button
                  onClick={() => {
                    navigateTo('messages');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Messages & Barter Room
                </button>
                <button
                  onClick={() => {
                    navigateTo('profile');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Profile & Karma ({currentUser.karma} pts)
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  openAuthModal('login');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl bg-slate-900 text-white font-semibold text-center"
              >
                Log In / Sign Up
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
