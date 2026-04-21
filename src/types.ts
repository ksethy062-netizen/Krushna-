export type Tab = 'home' | 'tools' | 'learn' | 'profile' | 'chat';

export interface DailyTip {
  id: string;
  title: string;
  description: string;
  category: 'savings' | 'loan' | 'investment' | 'credit';
}

export interface GovScheme {
  id: string;
  name: string;
  description: string;
  eligibility: string;
  link: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
