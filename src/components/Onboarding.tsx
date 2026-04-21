import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, TrendingUp, HelpCircle, ArrowRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Loans ko Samjho",
      description: "Easy language mein loans, interest rates, aur bank documents ke baare mein jaaniye.",
      icon: <ShieldCheck size={60} className="text-blue-900" />,
      color: "bg-blue-50"
    },
    {
      title: "CIBIL Score Sudharo",
      description: "Step-by-step tips se apna credit score maintain karein aur future plans secure karein.",
      icon: <TrendingUp size={60} className="text-emerald-600" />,
      color: "bg-emerald-50"
    },
    {
      title: "AI Sathi se Baat",
      description: "Hamaara smart AI Sathi aapke har financial sawal ka jawab Hinglish mein dega.",
      icon: <HelpCircle size={60} className="text-blue-600" />,
      color: "bg-blue-50"
    }
  ];

  const next = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex flex-col bg-white dark:bg-slate-900 overflow-hidden`}>
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center"
          >
            <div className={`p-10 rounded-[40px] mb-8 ${steps[step].color} dark:bg-slate-800`}>
              {steps[step].icon}
            </div>
            <h2 className="text-3xl font-bold mb-4 tracking-tight text-slate-900 dark:text-white">{steps[step].title}</h2>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs text-sm font-medium">{steps[step].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-10 flex flex-col items-center gap-6">
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-blue-900' : 'w-2 bg-slate-200 dark:bg-slate-700'}`} />
          ))}
        </div>
        
        <button 
          onClick={next}
          className="w-full py-4 bg-blue-900 text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 text-sm shadow-xl shadow-blue-900/20 active:scale-95 transition-transform"
        >
          {step === steps.length - 1 ? 'Shuru Karein' : 'Next'}
          <ArrowRight size={18} />
        </button>

        {step < steps.length - 1 && (
          <button onClick={onComplete} className="text-slate-400 text-sm font-medium">Skip Intro</button>
        )}
      </div>
    </div>
  );
}
