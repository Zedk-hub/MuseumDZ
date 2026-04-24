import { GoogleGenAI } from "@google/genai";
import { museums } from "../data/museums";
import { eras } from "../data/eras";

// Safe initialization function
let genAI: GoogleGenAI | null = null;

const getGenAI = () => {
  // Try to find the API key in multiple common locations
  const apiKey = process.env.GEMINI_API_KEY || 
                 (import.meta as any).env?.VITE_GEMINI_API_KEY || 
                 (window as any).GEMINI_API_KEY;

  if (!apiKey || apiKey === "undefined" || apiKey === "null" || apiKey === "") {
    console.warn("Heritage AI: GEMINI_API_KEY is missing or invalid.");
    return null;
  }

  if (!genAI) {
    try {
      genAI = new GoogleGenAI({ apiKey });
    } catch (e) {
      console.error("Heritage AI: Failed to initialize GoogleGenAI", e);
      return null;
    }
  }
  return genAI;
};

const SYSTEM_INSTRUCTION = `
You are the "Heritage AI Guide" for the Algerian Heritage National Portal. 
You are an expert in Algerian history and culture.
Your goal is to provide accurate, engaging, and professional information about Algerian museums, artifacts, and historical eras based strictly on the provided data.

CONTEXT DATA:
Available Museums: ${JSON.stringify(museums.map(m => ({ 
  name: m.name, 
  id: m.id,
  wilaya: m.wilaya, 
  category: m.category, 
  period: m.period,
  description: m.description 
})))}

Historical Eras of Algeria: ${JSON.stringify(eras.map(e => ({
  title: e.title,
  year: e.year,
  description: e.description
})))}

STRICT RULES:
1. ONLY answer questions related to Algerian heritage, museums, and the history mentioned in the context.
2. If a user asks something outside this scope (e.g., general knowledge, other countries, unrelated topics), politely redirect them: "I am specialized only in Algerian heritage and the museums on this platform. How can I help you discover Algeria's treasures?"
3. Answer in the language the user uses (Arabic, French, or English).
4. Be respectful, scholarly, and passionate about Algerian culture.
5. If the user asks about a museum not in the list, you can say: "I don't have detailed records for that specific museum yet in our national registry, but here are some related collections...".
6. Keep responses relatively concise but informative.
7. Use Markdown for formatting (bolding, lists).
`;

export const chatWithHeritageAI = async (message: string, history: any[] = []) => {
  try {
    const ai = getGenAI();
    if (!ai) {
      return "The Heritage AI Guide is currently unconfigured. Please ensure the API key is set.";
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "An error occurred while communicating with the Heritage AI. Please try again later.";
  }
};
