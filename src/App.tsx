import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import Tools from './components/Tools';
import Learn from './components/Learn';
import Chat from './components/Chat';
import Profile from './components/Profile';
import Onboarding from './components/Onboarding';
import { Tab } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load persistence
  useEffect(() => {
    const onboarded = localStorage.getItem('loanSathiOnboarded');
    if (onboarded) setShowOnboarding(false);

    const savedTheme = localStorage.getItem('loanSathiTheme');
    if (savedTheme === 'dark') setIsDarkMode(true);
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('loanSathiOnboarded', 'true');
    setShowOnboarding(false);
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('loanSathiTheme', newTheme ? 'dark' : 'light');
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Home />;
      case 'tools': return <Tools />;
      case 'learn': return <Learn />;
      case 'chat': return <Chat />;
      case 'profile': return <Profile />;
      default: return <Home />;
    }
  };

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <Layout 
      activeTab={activeTab} 
      onTabChange={setActiveTab} 
      isDarkMode={isDarkMode} 
      toggleTheme={toggleTheme}
    >
      {renderContent()}
    </Layout>
  );
}
