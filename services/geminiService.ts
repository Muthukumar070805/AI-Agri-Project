
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = "gemini-2.5-flash";

const fileToGenerativePart = (base64Data: string, mimeType: string) => {
  return {
    inlineData: {
      data: base64Data.split(',')[1],
      mimeType
    },
  };
};

const handleApiError = (error: unknown, context: 'text' | 'visual' | 'schemes'): Error => {
    console.error(`Error calling Gemini API for ${context}:`, error);

    let errorMessage = "An unexpected error occurred.";
    if (error instanceof Error && error.message) {
        const msg = error.message.toLowerCase();
        if (msg.includes('api key')) {
            errorMessage = "The application is not configured correctly. Please contact support.";
        } else if (msg.includes('safety')) {
            errorMessage = "The request was blocked for safety reasons. Please adjust your query.";
        } else if (msg.includes('quota')) {
            errorMessage = "The service is temporarily unavailable due to high demand. Please try again later.";
        } else if (msg.includes('network') || msg.includes('fetch')) {
             errorMessage = "A network error occurred. Please check your internet connection.";
        } else {
            switch (context) {
                case 'text':
                    errorMessage = "The AI advisor failed to respond. Please try asking again.";
                    break;
                case 'visual':
                    errorMessage = "The image could not be analyzed. Please try again with a clear, well-lit image.";
                    break;
                case 'schemes':
                    errorMessage = "Could not search for schemes at this time. Please try again later.";
                    break;
                default:
                    errorMessage = "An unexpected error occurred. Please try again.";
            }
        }
    }
    
    return new Error(errorMessage);
};

export const generateTextAdvisory = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: `You are 'ഡിജിറ്റൽ കൃഷി ഓഫീസർ' (Digital Krishi Officer), an expert AI agricultural advisor for farmers in Kerala, India. Your goal is to provide clear, actionable, and concise advice in simple Malayalam. Keep your answers brief and to the point, ideally in 2-3 short sentences or a small list. Your tone should be helpful, respectful, and encouraging. Even if the user asks in English, you must respond in Malayalam.`,
      },
    });
    return response.text;
  } catch (error) {
    throw handleApiError(error, 'text');
  }
};

export const generateVisualAdvisory = async (prompt: string, imageBase64: string, mimeType: string): Promise<string> => {
  try {
    const imagePart = fileToGenerativePart(imageBase64, mimeType);
    const textPart = { text: prompt };

    const response = await ai.models.generateContent({
      model,
      contents: { parts: [imagePart, textPart] },
      config: {
        systemInstruction: `You are 'ഡിജിറ്റൽ കൃഷി ഓഫീസർ' (Digital Krishi Officer), an expert AI agricultural advisor that helps farmers in Kerala, India by analyzing images of their crops. Identify potential diseases, pests, or nutrient deficiencies visible in the image. Provide a concise, step-by-step advisory in simple Malayalam on how to manage the issue. Keep the explanation for each step very brief. Your tone should be helpful and reassuring. Even if the user asks in English, you must respond in Malayalam.`,
      },
    });
    return response.text;
  } catch (error) {
    throw handleApiError(error, 'visual');
  }
};

export const generateSchemesAdvisory = async (location: string, crops: string): Promise<string> => {
  try {
    const prompt = `Find government schemes available for a farmer growing ${crops} in ${location}, Kerala.`;
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: `You are an expert on Indian agricultural government schemes, focusing on Kerala. Provide clear, accurate, and concise information about relevant schemes based on a farmer's location and crops. Respond in simple English. List the most relevant schemes and briefly explain their benefits. Format your response as plain text, without using any markdown (no asterisks for bolding or lists).`,
      },
    });
    return response.text;
  } catch (error) {
    throw handleApiError(error, 'schemes');
  }
};
