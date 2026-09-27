import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Goodie,
  GoodieType,
  GoodieCategory,
  GoodieCondition,
  ApparelSize,
  ExchangeMode,
  User,
  BarterOffer,
  GiveawayRequest,
  Conversation,
  NotificationItem,
  AppView,
  ChatMessage,
} from '../types';
import {
  CURRENT_USER,
  INITIAL_GOODIES,
  INITIAL_BARTER_OFFERS,
  INITIAL_GIVEAWAY_REQUESTS,
  INITIAL_CONVERSATIONS,
  INITIAL_NOTIFICATIONS,
  OTHER_USERS,
} from '../data/initialData';

export interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Navigation
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  navigateTo: (view: AppView, params?: { goodieId?: string; tab?: string }) => void;
  selectedGoodieId: string | null;
  setSelectedGoodieId: (id: string | null) => void;
  selectedTabParam: string | null;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;

  // User & Auth
  currentUser: User;
  isLoggedIn: boolean;
  loginUser: (email: string) => void;
  signupUser: (name: string, username: string, email: string) => void;
  logoutUser: () => void;
  updateCurrentUserProfile: (updates: Partial<User>) => void;
  authModalState: { isOpen: boolean; mode: 'login' | 'signup' | 'forgot' };
  openAuthModal: (mode?: 'login' | 'signup' | 'forgot') => void;
  closeAuthModal: () => void;

  // Goodies Management
  goodies: Goodie[];
  addGoodie: (newGoodieData: Omit<Goodie, 'id' | 'createdAt' | 'viewsCount' | 'ownerId' | 'owner' | 'status'>) => void;
  updateGoodie: (id: string, updates: Partial<Goodie>) => void;
  deleteGoodie: (id: string) => void;
  togglePauseGoodie: (id: string) => void;
  markGoodieCompleted: (id: string, note?: string) => void;
  savedGoodieIds: string[];
  toggleSaveGoodie: (id: string) => void;

  // Barters
  barterOffers: BarterOffer[];
  createBarterOffer: (
    goodieRequestedId: string,
    offeredGoodieIds: string[],
    message: string,
    mode: 'Shipping' | 'Local Meetup'
  ) => void;
  acceptBarterOffer: (offerId: string) => void;
  declineBarterOffer: (offerId: string) => void;
  counterBarterOffer: (offerId: string, message: string) => void;
  cancelBarterOffer: (offerId: string) => void;
  confirmSwagReceived: (offerId: string) => void;

  // Giveaways
  giveawayRequests: GiveawayRequest[];
  createGiveawayRequest: (goodieId: string, message: string, deliveryPreference: string) => void;
  acceptGiveawayRequest: (requestId: string) => void;
  declineGiveawayRequest: (requestId: string) => void;

  // Messages
  conversations: Conversation[];
  activeConversationId: string;
  setActiveConversationId: (id: string) => void;
  sendMessage: (conversationId: string, text: string, attachmentImage?: string) => void;

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  // Modals
  isAddGoodieModalOpen: boolean;
  setIsAddGoodieModalOpen: (open: boolean) => void;
  goodieToEdit: Goodie | null;
  openEditGoodieModal: (goodie: Goodie) => void;
  closeEditGoodieModal: () => void;

  barterTargetGoodie: Goodie | null;
  openBarterModal: (goodie: Goodie) => void;
  closeBarterModal: () => void;

  giveawayTargetGoodie: Goodie | null;
  openGiveawayRequestModal: (goodie: Goodie) => void;
  closeGiveawayRequestModal: () => void;

  giveawayReviewGoodie: Goodie | null;
  openGiveawayReviewModal: (goodie: Goodie) => void;
  closeGiveawayReviewModal: () => void;

  reportTarget: { title: string; id: string } | null;
  openReportModal: (target: { title: string; id: string }) => void;
  closeReportModal: () => void;

  // Toasts
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state with local persistence
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('goodies_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('goodies_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('goodies_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // Routing / View navigation
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [selectedGoodieId, setSelectedGoodieId] = useState<string | null>('goodie_io_tee');
  const [selectedTabParam, setSelectedTabParam] = useState<string | null>(null);

  const navigateTo = (view: AppView, params?: { goodieId?: string; tab?: string }) => {
    if (params?.goodieId) setSelectedGoodieId(params.goodieId);
    if (params?.tab) setSelectedTabParam(params.tab);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Search
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // User
  const [currentUser, setCurrentUser] = useState<User>(CURRENT_USER);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [authModalState, setAuthModalState] = useState<{
    isOpen: boolean;
    mode: 'login' | 'signup' | 'forgot';
  }>({ isOpen: false, mode: 'login' });

  const openAuthModal = (mode: 'login' | 'signup' | 'forgot' = 'login') => {
    setAuthModalState({ isOpen: true, mode });
  };
  const closeAuthModal = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const loginUser = (email: string) => {
    setIsLoggedIn(true);
    closeAuthModal();
    showToast(`Welcome back, ${currentUser.name}!`, 'success');
  };

  const signupUser = (name: string, username: string, email: string) => {
    setCurrentUser((prev) => ({
      ...prev,
      name,
      username: username.startsWith('@') ? username.slice(1) : username,
    }));
    setIsLoggedIn(true);
    closeAuthModal();
    showToast(`Account created! Welcome to Goodies, ${name}!`, 'success');
    setCurrentView('explore');
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
    showToast('Signed out successfully.', 'info');
    setCurrentView('landing');
  };

  const updateCurrentUserProfile = (updates: Partial<User>) => {
    setCurrentUser((prev) => ({ ...prev, ...updates }));
    showToast('Profile updated.', 'success');
  };

  // Core Data Collections
  const [goodies, setGoodies] = useState<Goodie[]>(INITIAL_GOODIES);
  const [savedGoodieIds, setSavedGoodieIds] = useState<string[]>(['goodie_kubecon_hoodie_priya']);
  const [barterOffers, setBarterOffers] = useState<BarterOffer[]>(INITIAL_BARTER_OFFERS);
  const [giveawayRequests, setGiveawayRequests] = useState<GiveawayRequest[]>(INITIAL_GIVEAWAY_REQUESTS);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [activeConversationId, setActiveConversationId] = useState<string>('conv_priya');
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Modals state
  const [isAddGoodieModalOpen, setIsAddGoodieModalOpen] = useState(false);
  const [goodieToEdit, setGoodieToEdit] = useState<Goodie | null>(null);
  const [barterTargetGoodie, setBarterTargetGoodie] = useState<Goodie | null>(null);
  const [giveawayTargetGoodie, setGiveawayTargetGoodie] = useState<Goodie | null>(null);
  const [giveawayReviewGoodie, setGiveawayReviewGoodie] = useState<Goodie | null>(null);
  const [reportTarget, setReportTarget] = useState<{ title: string; id: string } | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = 'toast_' + Date.now() + Math.random().toString(36).slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Goodies operations
  const addGoodie = (
    newGoodieData: Omit<Goodie, 'id' | 'createdAt' | 'viewsCount' | 'ownerId' | 'owner' | 'status'>
  ) => {
    const newGoodie: Goodie = {
      ...newGoodieData,
      id: 'goodie_' + Date.now(),
      createdAt: new Date().toISOString(),
      viewsCount: 1,
      ownerId: currentUser.id,
      owner: currentUser,
      status: 'active',
      offersCount: 0,
      requestsCount: 0,
    };
    setGoodies((prev) => [newGoodie, ...prev]);
    setCurrentUser((prev) => ({
      ...prev,
      goodiesListedCount: prev.goodiesListedCount + 1,
      karma: prev.karma + 10,
    }));
    showToast('Your goodie was published to the community feed (+10 Karma)!', 'success');
  };

  const updateGoodie = (id: string, updates: Partial<Goodie>) => {
    setGoodies((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...updates } : g))
    );
    showToast('Goodie details updated.', 'success');
  };

  const deleteGoodie = (id: string) => {
    setGoodies((prev) => prev.filter((g) => g.id !== id));
    setCurrentUser((prev) => ({
      ...prev,
      goodiesListedCount: Math.max(0, prev.goodiesListedCount - 1),
    }));
    showToast('Listing removed.', 'info');
  };

  const togglePauseGoodie = (id: string) => {
    setGoodies((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const newStatus = g.status === 'paused' ? 'active' : 'paused';
          showToast(
            newStatus === 'active' ? 'Listing resumed and visible.' : 'Listing paused.',
            'info'
          );
          return { ...g, status: newStatus };
        }
        return g;
      })
    );
  };

  const markGoodieCompleted = (id: string, note?: string) => {
    setGoodies((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          return {
            ...g,
            status: 'completed',
            giverNote: note || g.giverNote || 'Completed exchange.',
          };
        }
        return g;
      })
    );
    setCurrentUser((prev) => ({ ...prev, karma: prev.karma + 30 }));
    showToast('Marked as completed! +30 Karma trust points awarded.', 'success');
  };

  const toggleSaveGoodie = (id: string) => {
    setSavedGoodieIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Removed from saved goodies', 'info');
        return prev.filter((x) => x !== id);
      } else {
        showToast('Saved to your wishlist bookmarks!', 'success');
        return [...prev, id];
      }
    });
  };

  // Barter actions
  const createBarterOffer = (
    goodieRequestedId: string,
    offeredGoodieIds: string[],
    message: string,
    mode: 'Shipping' | 'Local Meetup'
  ) => {
    const requested = goodies.find((g) => g.id === goodieRequestedId);
    if (!requested) return;

    const offeredItems = goodies.filter((g) => offeredGoodieIds.includes(g.id));

    const newOffer: BarterOffer = {
      id: 'offer_' + Date.now(),
      goodieRequestedId,
      goodieRequested: requested,
      proposerId: currentUser.id,
      proposer: currentUser,
      ownerId: requested.ownerId,
      owner: requested.owner,
      offeredGoodieIds,
      offeredGoodies: offeredItems,
      message,
      exchangeMode: mode,
      status: 'pending',
      createdAt: new Date().toISOString(),
      expiresInHours: 48,
    };

    setBarterOffers((prev) => [newOffer, ...prev]);

    // Also create or append to chat conversation
    const newConv: Conversation = {
      id: 'conv_' + Date.now(),
      participant: requested.owner,
      goodieId: requested.id,
      goodieTitle: requested.title,
      type: 'barter',
      lastMessage: message,
      lastMessageTime: 'Just now',
      unreadCount: 0,
      statusText: `Proposal Sent: ⇄ ${requested.title}`,
      barterOffer: newOffer,
      messages: [
        {
          id: 'msg_' + Date.now(),
          senderId: currentUser.id,
          senderName: currentUser.name,
          senderAvatar: currentUser.avatar,
          text: message,
          timestamp: 'Just now',
        },
      ],
    };

    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(newConv.id);

    showToast('Barter offer proposal sent to owner!', 'success');
    closeBarterModal();
    navigateTo('my-barters');
  };

  const acceptBarterOffer = (offerId: string) => {
    setBarterOffers((prev) =>
      prev.map((o) => {
        if (o.id === offerId) {
          return {
            ...o,
            status: 'accepted_escrow',
            escrowStep: 2,
            trackingNumber: 'Prepaid Goodies QR Label Generated (#USPS-' + Math.floor(100000000 + Math.random() * 900000000) + ')',
          };
        }
        return o;
      })
    );

    // Update conversation if associated
    setConversations((prev) =>
      prev.map((c) => {
        if (c.barterOffer?.id === offerId) {
          const sysMsg: ChatMessage = {
            id: 'sys_' + Date.now(),
            senderId: 'system',
            senderName: 'System',
            senderAvatar: '',
            text: 'Barter proposal accepted! Escrow lock created and prepaid shipping QR label generated.',
            timestamp: 'Just now',
            isSystemNotice: true,
          };
          return {
            ...c,
            statusText: 'Barter Accepted • In Escrow',
            messages: [...c.messages, sysMsg],
          };
        }
        return c;
      })
    );

    showToast('Barter proposal accepted! Escrow lock activated.', 'success');
  };

  const declineBarterOffer = (offerId: string) => {
    setBarterOffers((prev) =>
      prev.map((o) => (o.id === offerId ? { ...o, status: 'declined' } : o))
    );
    showToast('Barter offer declined.', 'info');
  };

  const counterBarterOffer = (offerId: string, message: string) => {
    setBarterOffers((prev) =>
      prev.map((o) => (o.id === offerId ? { ...o, status: 'countered' } : o))
    );

    setConversations((prev) =>
      prev.map((c) => {
        if (c.barterOffer?.id === offerId) {
          const counterMsg: ChatMessage = {
            id: 'cmsg_' + Date.now(),
            senderId: currentUser.id,
            senderName: currentUser.name,
            senderAvatar: currentUser.avatar,
            text: `[Counter-offer Proposal] ${message}`,
            timestamp: 'Just now',
          };
          return {
            ...c,
            statusText: 'Counter-Offer Sent',
            messages: [...c.messages, counterMsg],
          };
        }
        return c;
      })
    );

    showToast('Counter-offer sent to proposer!', 'success');
  };

  const cancelBarterOffer = (offerId: string) => {
    setBarterOffers((prev) =>
      prev.map((o) => (o.id === offerId ? { ...o, status: 'cancelled' } : o))
    );
    showToast('Barter proposal cancelled.', 'info');
  };

  const confirmSwagReceived = (offerId: string) => {
    setBarterOffers((prev) =>
      prev.map((o) => {
        if (o.id === offerId) {
          return { ...o, status: 'completed', escrowStep: 4 };
        }
        return o;
      })
    );
    setCurrentUser((prev) => ({
      ...prev,
      successfulBartersCount: prev.successfulBartersCount + 1,
      karma: prev.karma + 30,
    }));
    showToast('Delivery confirmed! +30 Karma trust points unlocked!', 'success');
  };

  // Giveaways
  const createGiveawayRequest = (
    goodieId: string,
    message: string,
    deliveryPreference: string
  ) => {
    const targetGoodie = goodies.find((g) => g.id === goodieId);
    if (!targetGoodie) return;

    const newReq: GiveawayRequest = {
      id: 'req_' + Date.now(),
      goodieId,
      goodie: targetGoodie,
      requesterId: currentUser.id,
      requester: currentUser,
      message,
      status: 'pending',
      createdAt: new Date().toISOString(),
      deliveryPreference,
    };

    setGiveawayRequests((prev) => [newReq, ...prev]);

    // Update item request count
    setGoodies((prev) =>
      prev.map((g) =>
        g.id === goodieId
          ? { ...g, requestsCount: (g.requestsCount || 0) + 1 }
          : g
      )
    );

    showToast('Your request was submitted to the goodie owner!', 'success');
    closeGiveawayRequestModal();
  };

  const acceptGiveawayRequest = (requestId: string) => {
    let giftedTitle = '';
    setGiveawayRequests((prev) =>
      prev.map((r) => {
        if (r.id === requestId) {
          giftedTitle = r.goodie.title;
          return { ...r, status: 'accepted' };
        }
        return r;
      })
    );

    setCurrentUser((prev) => ({
      ...prev,
      goodiesGivenCount: prev.goodiesGivenCount + 1,
      karma: prev.karma + 50,
    }));

    showToast(`Recipient selected for ${giftedTitle}! +50 Karma earned.`, 'success');
    closeGiveawayReviewModal();
  };

  const declineGiveawayRequest = (requestId: string) => {
    setGiveawayRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'declined' } : r))
    );
    showToast('Request declined.', 'info');
  };

  // Messages
  const sendMessage = (conversationId: string, text: string, attachmentImage?: string) => {
    if (!text.trim() && !attachmentImage) return;

    const newMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      text,
      timestamp: 'Just now',
      attachmentImage,
      attachmentMeta: attachmentImage ? 'swag_attachment.jpg' : undefined,
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === conversationId) {
          return {
            ...c,
            lastMessage: text || 'Sent an attachment',
            lastMessageTime: 'Just now',
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );
  };

  // Notifications
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  // Modals helpers
  const openEditGoodieModal = (goodie: Goodie) => setGoodieToEdit(goodie);
  const closeEditGoodieModal = () => setGoodieToEdit(null);

  const openBarterModal = (goodie: Goodie) => setBarterTargetGoodie(goodie);
  const closeBarterModal = () => setBarterTargetGoodie(null);

  const openGiveawayRequestModal = (goodie: Goodie) => setGiveawayTargetGoodie(goodie);
  const closeGiveawayRequestModal = () => setGiveawayTargetGoodie(null);

  const openGiveawayReviewModal = (goodie: Goodie) => setGiveawayReviewGoodie(goodie);
  const closeGiveawayReviewModal = () => setGiveawayReviewGoodie(null);

  const openReportModal = (target: { title: string; id: string }) => setReportTarget(target);
  const closeReportModal = () => setReportTarget(null);

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        currentView,
        setCurrentView,
        navigateTo,
        selectedGoodieId,
        setSelectedGoodieId,
        selectedTabParam,
        searchQuery,
        setSearchQuery,
        isSearchModalOpen,
        setIsSearchModalOpen,
        currentUser,
        isLoggedIn,
        loginUser,
        signupUser,
        logoutUser,
        updateCurrentUserProfile,
        authModalState,
        openAuthModal,
        closeAuthModal,
        goodies,
        addGoodie,
        updateGoodie,
        deleteGoodie,
        togglePauseGoodie,
        markGoodieCompleted,
        savedGoodieIds,
        toggleSaveGoodie,
        barterOffers,
        createBarterOffer,
        acceptBarterOffer,
        declineBarterOffer,
        counterBarterOffer,
        cancelBarterOffer,
        confirmSwagReceived,
        giveawayRequests,
        createGiveawayRequest,
        acceptGiveawayRequest,
        declineGiveawayRequest,
        conversations,
        activeConversationId,
        setActiveConversationId,
        sendMessage,
        notifications,
        unreadNotificationsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        isAddGoodieModalOpen,
        setIsAddGoodieModalOpen,
        goodieToEdit,
        openEditGoodieModal,
        closeEditGoodieModal,
        barterTargetGoodie,
        openBarterModal,
        closeBarterModal,
        giveawayTargetGoodie,
        openGiveawayRequestModal,
        closeGiveawayRequestModal,
        giveawayReviewGoodie,
        openGiveawayReviewModal,
        closeGiveawayReviewModal,
        reportTarget,
        openReportModal,
        closeReportModal,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
