import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { SearchModal } from './components/common/SearchModal';
import { AuthModal } from './components/modals/AuthModal';
import { AddEditGoodieModal } from './components/modals/AddEditGoodieModal';
import { BarterOfferModal } from './components/modals/BarterOfferModal';
import { GiveawayRequestModal } from './components/modals/GiveawayRequestModal';
import { GiveawayReviewModal } from './components/modals/GiveawayReviewModal';
import { ReportModal } from './components/modals/ReportModal';

// Views
import { LandingView } from './components/views/LandingView';
import { ExploreView } from './components/views/ExploreView';
import { GoodieDetailView } from './components/views/GoodieDetailView';
import { MyGoodiesView } from './components/views/MyGoodiesView';
import { MyBartersView } from './components/views/MyBartersView';
import { MyGiveawaysView } from './components/views/MyGiveawaysView';
import { MessagesView } from './components/views/MessagesView';
import { ProfileView } from './components/views/ProfileView';
import { SettingsView } from './components/views/SettingsView';
import { HowItWorksView } from './components/views/HowItWorksView';

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <main className="w-full flex-1 pt-16 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-colors">
      {currentView === 'landing' && <LandingView />}
      {currentView === 'explore' && <ExploreView />}
      {currentView === 'goodie-detail' && <GoodieDetailView />}
      {currentView === 'my-goodies' && <MyGoodiesView />}
      {currentView === 'my-barters' && <MyBartersView />}
      {currentView === 'my-giveaways' && <MyGiveawaysView />}
      {currentView === 'messages' && <MessagesView />}
      {currentView === 'profile' && <ProfileView />}
      {currentView === 'settings' && <SettingsView />}
      {currentView === 'how-it-works' && <HowItWorksView />}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
        <Header />
        <MainContent />
        <Footer />

        {/* Global Modals & Notifications */}
        <SearchModal />
        <AuthModal />
        <AddEditGoodieModal />
        <BarterOfferModal />
        <GiveawayRequestModal />
        <GiveawayReviewModal />
        <ReportModal />
        <ToastContainer />
      </div>
    </AppProvider>
  );
}
