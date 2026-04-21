import React, { useState } from 'react';
import { Calculator, CheckCircle2, UserCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function Tools() {
  const [activeTool, setActiveTool] = useState<'emi' | 'eligibility'>('emi');

  return (
    <div className="space-y-6">
      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
        <button 
          onClick={() => setActiveTool('emi')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${activeTool === 'emi' ? 'bg-white dark:bg-slate-700 shadow-sm text-brand-primary dark:text-white' : 'text-slate-500'}`}
        >
          <Calculator size={18} /> EMI Calc
        </button>
        <button 
          onClick={() => setActiveTool('eligibility')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${activeTool === 'eligibility' ? 'bg-white dark:bg-slate-700 shadow-sm text-brand-primary dark:text-white' : 'text-slate-500'}`}
        >
          <UserCheck size={18} /> Eligibility
        </button>
      </div>

      {activeTool === 'emi' ? <EMICalculator /> : <EligibilityChecker />}
    </div>
  );
}

function EMICalculator() {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(5);

  const calculateEMI = () => {
    const r = rate / 12 / 100;
    const n = tenure * 12;
    const emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return isNaN(emi) ? 0 : Math.round(emi);
  };

  const emi = calculateEMI();
  const totalPayment = emi * tenure * 12;
  const totalInterest = totalPayment - amount;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest mb-6">EMI Calculator</h3>
        
        <div className="space-y-6">
          <SliderInput label="Loan Amount" value={amount} min={10000} max={10000000} step={10000} unit="₹" onChange={setAmount} color="bg-blue-600" />
          <SliderInput label="Interest Rate" value={rate} min={1} max={25} step={0.1} unit="%" onChange={setRate} color="bg-emerald-500" />
          <SliderInput label="Tenure (Years)" value={tenure} min={1} max={30} step={1} unit="Y" onChange={setTenure} color="bg-amber-500" />
        </div>

        <div className="mt-8 pt-6 border-t border-dashed border-slate-200 dark:border-slate-800 text-center">
          <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Monthly EMI</p>
          <p className="text-3xl font-black text-blue-900 dark:text-blue-400">₹{emi.toLocaleString('en-IN')}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-black">Total Interest</span>
          <p className="font-bold text-sm">₹{totalInterest.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-black">Total Payment</span>
          <p className="font-bold text-sm">₹{totalPayment.toLocaleString('en-IN')}</p>
        </div>
      </div>
    </div>
  );
}

function SliderInput({ label, value, min, max, step, unit, onChange, color }: any) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center text-[10px] uppercase font-black tracking-wider px-0.5">
        <label className="text-slate-500">{label}</label>
        <span className="text-slate-900 dark:text-slate-100">
          {unit === '₹' ? `₹${value.toLocaleString('en-IN')}` : `${value}${unit}`}
        </span>
      </div>
      <div className="relative h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <motion.div 
          className={`absolute left-0 top-0 h-full ${color}`} 
          style={{ width: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
        <input 
          type="range" 
          min={min} 
          max={max} 
          step={step} 
          value={value} 
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
}

function EligibilityChecker() {
  const [step, setStep] = useState(0);
  const questions = [
    { q: "Aapki Age kitni hai?", options: ["Under 21", "21-55", "Above 55"] },
    { q: "Aapka Monthly Salary kitna hai?", options: ["Less than 15k", "15k - 40k", "Above 40k"] },
    { q: "Job Type kya hai?", options: ["Salaried", "Self-Employed", "Business"] }
  ];

  const [answers, setAnswers] = useState<string[]>([]);

  const handleNext = (val: string) => {
    const newAnswers = [...answers, val];
    setAnswers(newAnswers);
    setStep(step + 1);
  };

  if (step >= questions.length) {
    const isEligible = !answers.includes("Under 21") && !answers.includes("Less than 15k");
    
    return (
      <div className="text-center space-y-6 pt-10 animate-in zoom-in duration-500">
        <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center ${isEligible ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-red-100 dark:bg-red-900/30 text-red-600'}`}>
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-2xl font-display font-bold">
          {isEligible ? "Mubarak ho! 🎉" : "Thoda mushkil hai... 😅"}
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          {isEligible 
            ? "Aap loan ke liye eligible lag rahe hain. Hamare AI Sathi se baat karke best plans dhundho." 
            : "Filhaal aapke criteria match nahi ho rahe. CIBIL improve karne ke tips dekhein."}
        </p>
        <button 
          onClick={() => { setStep(0); setAnswers([]); }}
          className="px-8 py-3 bg-brand-primary text-white rounded-2xl font-bold"
        >
          Check Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-6">
      <div className="flex gap-2">
        {questions.map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-brand-primary' : 'bg-slate-200 dark:bg-slate-800'}`} />
        ))}
      </div>
      <h3 className="text-xl font-display font-bold">{questions[step].q}</h3>
      <div className="space-y-3">
        {questions[step].options.map((opt) => (
          <button 
            key={opt}
            onClick={() => handleNext(opt)}
            className="w-full p-4 text-left border-2 border-slate-100 dark:border-slate-800 rounded-2xl hover:border-brand-primary hover:bg-brand-primary/5 transition-all font-medium"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
