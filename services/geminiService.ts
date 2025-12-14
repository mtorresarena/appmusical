import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMusicTrivia = async (topic: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Escribe una curiosidad divertida y educativa muy breve (máximo 40 palabras) para niños sobre: ${topic}. El tono debe ser alegre y motivador.`,
    });
    return response.text || "No se pudo generar la curiosidad.";
  } catch (error) {
    console.error("Error fetching trivia:", error);
    return "¡Ups! El maestro de música está tomando un descanso. Intenta luego.";
  }
};