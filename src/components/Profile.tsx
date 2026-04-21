import React from 'react';
import { Settings, Bell, Shield, CreditCard, ChevronRight, LogOut, Award } from 'lucide-react';

export default function Profile() {
  return (
    <div className="space-y-8 pb-10">
      {/* Profile Header */}
      <div className="flex flex-col items-center pt-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-xl overflow-hidden">
            <img src="https://picsum.photos/seed/user/200" referrerPolicy="no-referrer" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 p-1.5 bg-brand-primary text-white rounded-full border-2 border-white dark:border-slate-900 shadow-lg">
            < Award size={14} />
          </div>
        </div>
        <h3 className="mt-4 text-xl font-display font-bold">Raja Babu</h3>
        <p className="text-slate-500 text-xs">Joined April 2024</p>
      </div>

      {/* Credit Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-4 rounded-3xl text-white shadow-lg shadow-indigo-500/20">
          <span className="text-[10px] uppercase font-bold text-white/70 tracking-widest">Saving Tips</span>
          <p className="text-2xl font-display font-bold mt-1">12</p>
        </div>
        <div className="bg-gradient-to-br from-brand-accent to-emerald-600 p-4 rounded-3xl text-white shadow-lg shadow-emerald-500/20">
          <span className="text-[10px] uppercase font-bold text-white/70 tracking-widest">Eligibility Score</span>
          <p className="text-2xl font-display font-bold mt-1">Good</p>
        </div>
      </div>

      {/* Settings List */}
      <div className="space-y-2">
        <h4 className="px-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Account Settings</h4>
        <ProfileItem icon={<Bell size={18} />} label="Notifications" />
        <ProfileItem icon={<Shield size={18} />} label="Security" />
        <ProfileItem icon={<CreditCard size={18} />} label="My Documents" count={3} />
        <ProfileItem icon={<Settings size={18} />} label="App Preferences" />
      </div>

      <div className="pt-4">
        <button className="w-full flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/10 text-red-600 rounded-2xl font-bold text-sm">
          <span>Logout</span>
          <LogOut size={18} />
        </button>
      </div>
    </div>
  );
}

function ProfileItem({ icon, label, count }: any) {
  return (
    <button className="w-full flex items-center gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
      <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-500 group-hover:text-brand-primary group-hover:bg-brand-primary/5 transition-colors">
        {icon}
      </div>
      <span className="flex-1 text-left font-medium">{label}</span>
      {count && <span className="bg-brand-primary text-white text-[10px] px-2 py-0.5 rounded-full">{count}</span>}
      <ChevronRight size={18} className="text-slate-300" />
    </button>
  );
}
