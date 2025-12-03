import { GoogleGenAI, Chat, Content, Part } from "@google/genai";
import { SYSTEM_INSTRUCTION, ModelType } from "../types";

let chatSession: Chat | null = null;
let currentModel: string | null = null;
let genAI: GoogleGenAI | null = null;

const getGenAI = (): GoogleGenAI => {
  if (!genAI) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API_KEY environment variable is not set.");
    }
    genAI = new GoogleGenAI({ apiKey });
  }
  return genAI;
};

export const initializeChat = (model: string) => {
  const ai = getGenAI();
  chatSession = ai.chats.create({
    model: model,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.4, // Lower temperature for more precise medical info
    },
  });
  currentModel = model;
};

export const resetSession = () => {
  chatSession = null;
  currentModel = null;
};

export const sendMessageToGemini = async (
  text: string, 
  base64Images: string[] = [], 
  modelId: string = ModelType.FLASH
): Promise<string> => {
  
  // Re-initialize if the model changed or session doesn't exist
  if (!chatSession || currentModel !== modelId) {
    initializeChat(modelId);
  }

  if (!chatSession) {
    throw new Error("Failed to initialize chat session.");
  }

  try {
    let messagePayload: string | Part[] | Content;

    if (base64Images.length > 0) {
      const parts: Part[] = [];
      
      // Add images
      base64Images.forEach(img => {
        parts.push({
          inlineData: {
            mimeType: 'image/jpeg',
            data: img
          }
        });
      });

      // Add text
      if (text) {
        parts.push({ text });
      }

      messagePayload = parts;
    } else {
      messagePayload = text;
    }

    const response = await chatSession.sendMessage({
      message: messagePayload
    });

    return response.text || "Ответ не был сгенерирован.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};