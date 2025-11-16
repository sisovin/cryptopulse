
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY is not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const analyzeCryptoWithGemini = async (cryptoName: string): Promise<string> => {
  if (!API_KEY) {
    return "API Key not configured. Please set up your environment variables.";
  }
  try {
    const prompt = `Provide a detailed but concise market analysis for ${cryptoName}. Cover the following points in separate paragraphs with markdown formatting:
- **Recent Performance:** Briefly summarize its price action over the last month.
- **Potential Catalysts:** What upcoming events or developments could positively impact its price?
- **Identified Risks:** What are the major risks or challenges this cryptocurrency faces?
- **Overall Outlook:** Give a neutral, balanced outlook for the next 3-6 months.

The analysis should be easy to understand for an intermediate crypto investor.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "An error occurred while fetching analysis from Gemini. Please check the console for more details.";
  }
};
