import React, { useState } from 'react';
import { GOV_SCHEMES } from '../constants';
import { ExternalLink, FileText, Info, Award, GraduationCap } from 'lucide-react';

export default function Learn() {
  const [activeTab, setActiveTab] = useState<'schemes' | 'cibil' | 'templates'>('schemes');

  return (
    <div className="space-y-6">
      {/* Sub Tabs */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        <TabButton active={activeTab === 'schemes'} onClick={() => setActiveTab('schemes')} label="Gov Schemes" />
        <TabButton active={activeTab === 'cibil'} onClick={() => setActiveTab('cibil')} label="CIBIL Tips" />
        <TabButton active={activeTab === 'templates'} onClick={() => setActiveTab('templates')} label="Templates" />
      </div>

      <div className="space-y-4">
        {activeTab === 'schemes' && (
          <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
            {GOV_SCHEMES.map((scheme) => (
              <div key={scheme.id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-brand-primary dark:text-brand-secondary">{scheme.name}</h4>
                  <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                    <ExternalLink size={16} />
                  </a>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{scheme.description}</p>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
                  <Info size={12} /> Eligibility: {scheme.eligibility}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'cibil' && (
          <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
            <CibilTipCard 
              index="01" 
              title="Time par Pay karein" 
              text="Humesha apne bills credit date se pehle bharein. Ek bhi late payment aapka score gira sakta hai." 
            />
            <CibilTipCard 
              index="02" 
              title="Multiple Applications se bachein" 
              text="Baar-baar loan apply karne se 'Hard Inquiry' badhti hai. It's better to research first, then apply once." 
            />
            <CibilTipCard 
              index="03" 
              title="Credit Limit ka dhyan rakhein" 
              text="Apni total credit limit ka sirf 30% hi use karein. Isse bank ko lagta hai ki aap responsible user hain." 
            />
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="grid grid-cols-1 gap-4 animate-in slide-in-from-bottom-4 duration-300">
            <TemplateCard title="Loan Request Letter" description="Bank ko loan request karne ke liye read-to-use draft." />
            <TemplateCard title="EMI Moratorium Request" description="Mushkil waqt mein loan ki kisht delay karne ki request." />
            <TemplateCard title="NOC Request Letter" description="Loan close hone ke baad No Objection Certificate ke liye." />
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`px-6 py-2 rounded-xl whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-all ${active ? 'bg-blue-900 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}
    >
      {label}
    </button>
  );
}

function CibilTipCard({ index, title, text }: any) {
  const isFirst = index === "01";
  return (
    <div className={`flex flex-col p-5 bg-white dark:bg-slate-900 border-l-4 rounded-r-2xl shadow-sm ${isFirst ? 'border-l-blue-600' : 'border-l-slate-200 opacity-80'}`}>
      <span className={`text-[10px] font-black uppercase mb-1 ${isFirst ? 'text-blue-600' : 'text-slate-400'}`}>Step {index}</span>
      <div>
        <h5 className="font-bold mb-1 text-sm">{title}</h5>
        <p className="text-[10px] leading-relaxed text-slate-500">{text}</p>
      </div>
    </div>
  );
}

function TemplateCard({ title, description }: any) {
  return (
    <div className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm hover:border-blue-600 transition-all">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 group-hover:text-blue-600">
            <FileText size={18} />
          </div>
          <div>
            <h5 className="text-xs font-bold">{title}</h5>
            <p className="text-[9px] text-slate-400">Bank Template</p>
          </div>
        </div>
        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
          <Award size={16} />
        </button>
      </div>
      <p className="text-[10px] text-slate-500 mb-3 leading-relaxed">{description}</p>
      <button className="w-full py-2 bg-slate-50 dark:bg-slate-800 group-hover:bg-blue-900 group-hover:text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">
        Copy Draft
      </button>
    </div>
  );
}
