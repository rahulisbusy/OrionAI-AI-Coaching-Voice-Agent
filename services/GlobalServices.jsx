import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { CoachingOptions } from "./Options";
import { ElevenLabsClient } from "elevenlabs";

// ✅ Environment variable for API Key
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const ttsClient = new ElevenLabsClient({
    apiKey: process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY,
});


export const getToken = async () => {
  const result = await axios.get('/api/getToken');
  return result.data;
};

export const AIModel = async (topic, coachingOption,coachingExpert, lastTwomsg) => {
    try {
        const option = CoachingOptions.find(item => item.name === coachingOption);
        let prompt = option.prompt.replace('{user_topic}', topic);
        prompt=prompt.replace('{assistant_name}', coachingExpert);
        const formattedMessages = [
            { role: "model", parts: [{ text: prompt }] },
            ...lastTwomsg.map(msg => ({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }]
            }))
        ];

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const result = await model.generateContent({ contents: formattedMessages });
        const response = await result.response;
        const text = await response.text();

        return {
            role: "assistant",
            content: text
        };

    } catch (error) {
        console.error("AIModel error:", error);
        return {
            role: "assistant",
            content: "⚠️ Error calling the AI model. Try again later."
        };
    }
};
export const Feedbackgenerator = async (coachingOption, conversation) => {
  try {
    const option = CoachingOptions.find(item => item.name === coachingOption);
    const prompt = option?.summeryPrompt;

    console.log("Prompt for feedback:", prompt);

    if (!prompt) {
      return { role: "assistant", content: "⚠️ No valid prompt found." };
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // even better than 2.0 for context

    // Format the conversation nicely
    const conversationText = conversation
      .map(msg => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
      .join("\n");

    const finalPrompt = `${prompt}\n\nHere is the full conversation:\n${conversationText}\n\nNow please generate the feedback as requested.`;

    console.log("📤 Final Prompt Sent to Gemini:\n", finalPrompt);

    const result = await model.generateContent(finalPrompt);

    const response = result?.response;
    if (!response) {
      console.error("❌ No response from Gemini.");
      return { role: "assistant", content: "⚠️ No response from Gemini." };
    }

    const text = await response.text();
    console.log("✅ Gemini Response Text:", text);

    return {
      role: "assistant",
      content: text || "⚠️ Gemini did not return any content.",
    };

  } catch (error) {
    console.error("❌ Gemini error:", error);
    return {
      role: "assistant",
      content: "⚠️ Failed to generate feedback due to an error.",
    };
  }
};




export const speakText = async (text,voice) => {
    try {
      // Get the audio response as a Blob directly from ElevenLabs API
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}`, {
        method: "POST",
        headers: {
          "xi-api-key": process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          output_format: "mp3_44100_128",
        }),
      });
  
      if (!response.ok) {
        throw new Error(`TTS API Error: ${response.status} ${response.statusText}`);
      }
  
      const blob = await response.blob();
  
      // Check MIME type just in case
      if (blob.type !== "audio/mpeg") {
        throw new Error(`Unsupported audio format returned: ${blob.type}`);
      }
  
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
  
      // Ensure user has interacted with the page before playing
      await audio.play();
    } catch (error) {
      console.error("TTS Error:", error);
    }
  };
  


