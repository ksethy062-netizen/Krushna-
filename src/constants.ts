import { DailyTip, GovScheme } from "./types";

export const DAILY_TIPS: DailyTip[] = [
  {
    id: "1",
    title: "On-time Payment Matters",
    description: "Apne EMIs aur credit card bills humesha due date se pehle bhariye. Yeh CIBIL score badhane ka sabse fast tareeka hai.",
    category: "credit"
  },
  {
    id: "2",
    title: "Mudra Loan Benefit",
    description: "Chote business ke liye Mudra Loan ek badhiya option hai. Bina security ke 10 lakh tak ka loan mil sakta hai.",
    category: "loan"
  },
  {
    id: "3",
    title: "Emergency Fund",
    description: "Kam se kam 6 mahine ka kharcha ek separate account mein rakhein. Isse mushkil waqt mein loan lene ki zarurat nahi padegi.",
    category: "savings"
  }
];

export const GOV_SCHEMES: GovScheme[] = [
  {
    id: "pmay",
    name: "PM Awas Yojana (PMAY)",
    description: "Apna ghar banane ke liye subsidy milti hai.",
    eligibility: "Lower and Middle Income Groups (LIG/MIG)",
    link: "https://pmay-urban.gov.in/"
  },
  {
    id: "mudra",
    name: "Mudra Loan Scheme",
    description: "Micro-units ke development aur refinance ke liye.",
    eligibility: "Small business owners, Startups",
    link: "https://www.mudra.org.in/"
  },
  {
    id: "standup",
    name: "Stand-Up India Selection",
    description: "SC/ST aur Women entrepreneurs ke liye 10L - 1Cr loan.",
    eligibility: "Women, SC/ST community",
    link: "https://www.standupmitra.in/"
  }
];
