import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `
You are LoanSathi, a friendly financial assistant for Indian users.
Your goal is to help users understand loans, improve CIBIL scores, and find financial schemes.
Speak in "Hinglish" (a mix of Hindi and English) which is natural for modern Indian users.
For example: "Aapka CIBIL score improve karne ke liye timely digital payments zaroori hain."

Guidelines:
1. Be encouraging and simple. Avoid heavy financial jargon or explain it if used.
2. Focus on: Personal Loans, Home Loans, Mudra Loans, CIBIL, EMI, and Savings.
3. If asked about eligibility, ask for their age, income, and job type politely.
4. Always provide accurate info based on general Indian banking standards.
5. Do not give specific financial legal advice, just general guidance.
`;

export async function getChatResponse(messages: ChatMessage[]) {
  try {
    const chat = ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: messages.map(m => ({ 
        role: m.role === 'assistant' ? 'model' : 'user', 
        parts: [{ text: m.content }] 
      })),
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    const response = await chat;
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Maaf kijiye, abhi thoda connection issue hai. Please try again later!";
  }
}
