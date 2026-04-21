import React from 'react';
import { DAILY_TIPS } from '../constants';
import { Sparkles, ArrowRight, TrendingUp, ShieldCheck, Briefcase, BellRing } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Section */}
      <section className="-mx-5 -mt-6 p-6 bg-blue-900 text-white rounded-b-[40px] shadow-lg">
        <h2 className="text-2xl font-bold leading-tight">
          Namaste, Rahul! 👋 <br />
          <p className="text-blue-100 text-sm font-normal mt-1 italic">Aaj aapka CIBIL score 740 hai.</p>
        </h2>
      </section>

      {/* Main Feature Card - Gradient */}
      <motion.section 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="card-gradient rounded-3xl p-6 text-white shadow-xl shadow-blue-900/20"
      >
        <h3 className="text-lg font-bold mb-1">Loan Eligibility Check</h3>
        <p className="text-xs text-blue-50/80 leading-relaxed mb-4">
          Sirf 2 minute mein jaaniye aapko kitna loan mil sakta hai.
        </p>
        <button className="bg-white text-blue-900 px-6 py-2 rounded-xl text-xs font-black shadow-lg shadow-black/10 active:scale-95 transition-transform hover:bg-blue-50">
          CHECK NOW
        </button>
      </motion.section>

      {/* Daily Tip Card - Refined White Card */}
      <section className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Daily Tip</span>
          <Sparkles className="text-blue-500" size={16} />
        </div>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Credit card bill humesha <span className="text-blue-600 dark:text-blue-400 font-bold">due date</span> se pehle bharein to avoid penalty.
        </p>
      </section>

      {/* Quick Actions Grid */}
      <section>
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 px-1 uppercase tracking-wider">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <QuickActionButton 
            icon={<TrendingUp className="text-blue-600" />} 
            label="CIBIL Tracker" 
            sublabel="Score badhayein"
          />
          <QuickActionButton 
            icon={<ShieldCheck className="text-emerald-600" />} 
            label="Best Loans" 
            sublabel="Lower Interest"
          />
          <QuickActionButton 
            icon={<Briefcase className="text-orange-600" />} 
            label="Gov Schemes" 
            sublabel="Modi Ji ki Yojna"
          />
          <QuickActionButton 
            icon={<BellRing className="text-indigo-600" />} 
            label="Alerts" 
            sublabel="Paisa bachaon"
          />
        </div>
      </section>

      {/* Recent Updates / News */}
      <section>
        <div className="flex justify-between items-center mb-4 px-1">
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400">Zaroori Updates</h3>
          <button className="text-[10px] font-black text-blue-600 uppercase">See All</button>
        </div>
        <div className="space-y-3">
          <UpdateCard 
            title="GST Rules change ho rahe hain" 
            time="2h ago"
            tag="Business"
          />
          <UpdateCard 
            title="SBI Interest rates kam hue" 
            time="5h ago"
            tag="Loans"
          />
        </div>
      </section>
    </div>
  );
}

function QuickActionButton({ icon, label, sublabel }: { icon: React.ReactNode, label: string, sublabel: string }) {
  return (
    <button className="flex flex-col items-start p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-md transition-shadow text-left active:scale-95 transition-transform">
      <div className="mb-3 p-2 bg-slate-50 dark:bg-slate-800 rounded-xl">
        {icon}
      </div>
      <span className="font-bold text-sm block">{label}</span>
      <span className="text-[10px] text-slate-500">{sublabel}</span>
    </button>
  );
}

function UpdateCard({ title, time, tag }: { title: string, time: string, tag: string }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 uppercase tracking-tight">{tag}</span>
          <span className="text-[10px] text-slate-400">{time}</span>
        </div>
        <h4 className="text-sm font-medium">{title}</h4>
      </div>
      <ArrowRight size={16} className="text-slate-300" />
    </div>
  );
}
