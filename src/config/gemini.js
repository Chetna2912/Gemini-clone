// const apiKey = "AIzaSyD-cQZPGNwnbeKPRF7Ua4Cw4YMJMphC4Wg";

// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({ apiKey: "AIzaSyD-cQZPGNwnbeKPRF7Ua4Cw4YMJMphC4Wg" });

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: "Explain how AI works in a few words",
//   });
//   console.log(response.text);
// }
// main();




import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai" ;

// const MODEL_NAME = 'gemini-1.0-pro';
const MODEL_NAME = 'gemini-2.5-flash';
const API_key = "AIzaSyD-cQZPGNwnbeKPRF7Ua4Cw4YMJMphC4Wg";

async function runChat(prompt){
  const genAI = new GoogleGenerativeAI(API_key);
  const model = genAI.getGenerativeModel({model : MODEL_NAME});

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    }
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history:[
    ],
  });

  const result = await chat.sendMessage(prompt);
  const response = result.response;
  console.log(response.text());
  return response.text();
  

}

export default runChat;

