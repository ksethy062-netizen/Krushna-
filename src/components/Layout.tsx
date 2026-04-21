import React from 'react';
import { Home, Pocket as Tool, GraduationCap, User, MessageCircle, Sun, Moon } from 'lucide-react';
import { Tab } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export default function Layout({ children, activeTab, onTabChange, isDarkMode, toggleTheme }: LayoutProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'tools', label: 'Tools', icon: Tool },
    { id: 'chat', label: 'Sathi', icon: MessageCircle, highlight: true },
    { id: 'learn', label: 'Learn', icon: GraduationCap },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans ${isDarkMode ? 'dark' : ''} text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-950`}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-blue-900 dark:bg-slate-900 border-b border-blue-800 dark:border-slate-800">
        <div className="max-w-md mx-auto px-6 h-14 flex items-center justify-between">
          <h1 className="text-xl font-display font-black text-white">
            Loan<span className="text-blue-300">Sathi</span>
          </h1>
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-blue-800 dark:hover:bg-slate-800 transition-colors"
          >
            {isDarkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-white" />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-14 pb-20 max-w-md mx-auto w-full px-5 bg-white dark:bg-slate-900 shadow-xl overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="h-full pt-6"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 pb-safe">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            if (tab.highlight) {
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id as Tab)}
                  className="-mt-10 flex flex-col items-center group z-50"
                >
                  <div className={`p-4 rounded-2xl shadow-xl transition-all active:scale-90 ${isActive ? 'bg-blue-900 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                    <Icon size={24} />
                  </div>
                  <span className={`text-[10px] mt-1 font-bold ${isActive ? 'text-blue-800 dark:text-blue-400' : 'text-slate-400'}`}>
                    {tab.label}
                  </span>
                </button>
              );
            }

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id as Tab)}
                className="flex flex-col items-center justify-center py-1 flex-1 relative"
              >
                <div className={`transition-colors duration-200 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 hover:text-slate-600'}`}>
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={`text-[10px] mt-1 font-bold transition-colors ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
