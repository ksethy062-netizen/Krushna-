import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { getChatResponse } from '../services/gemini';
import { motion } from 'motion/react';

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Namaste! Main hoon aapka LoanSathi AI. Mujhse kuch bhi poochiye, jaise: "Mera CIBIL score kaise badhega?" ya "Mudra loan kaise le sakte hain?"', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const response = await getChatResponse([...messages, userMessage]);
    const assistantMessage: ChatMessage = { role: 'assistant', content: response || 'Kuch error aaya hai, please try again.', timestamp: Date.now() };
    
    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-10rem)]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4 scrollbar-hide">
        {messages.map((m, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: m.role === 'user' ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-2 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${m.role === 'user' ? 'bg-blue-600' : 'bg-blue-900 text-white'}`}>
                {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-4 rounded-2xl text-xs leading-relaxed ${m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-tl-none shadow-sm'}`}>
                {m.content}
              </div>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="flex gap-2 max-w-[85%]">
              <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">
                <Loader2 size={12} className="animate-spin" /> Thinking...
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="pt-4 mt-auto">
        <div className="flex gap-2 p-1.5 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Kuch puchiye... (e.g. Loan kaise le?)"
            className="flex-1 bg-transparent px-4 py-3 text-xs focus:outline-none font-medium"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-3 rounded-lg transition-all ${!input.trim() || isLoading ? 'bg-slate-100 text-slate-300' : 'bg-blue-900 text-white shadow-md active:scale-95'}`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
