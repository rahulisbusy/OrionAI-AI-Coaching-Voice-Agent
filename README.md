# 🌌 OrionAI

OrionAI is a cutting-edge conversational AI assistant that brings together real-time voice transcription, intelligent responses, and natural-sounding voice output — all packed into a sleek Next.js app.

## 🚀 Features

- 🎙️ **Real-Time Speech Recognition** — Powered by [Deepgram](https://deepgram.com/), OrionAI listens and transcribes speech in real-time.
- 🧠 **Conversational Intelligence** — Responds intelligently to queries using [Google Gemini](https://deepmind.google/technologies/gemini/).
- 🔊 **Natural Voice Output** — Converts AI responses into lifelike speech using [ElevenLabs](https://www.elevenlabs.io/).
- ⚡ **Fast, Responsive UI** — Built with Next.js and Tailwind CSS for a modern, responsive user experience.
- 🌐 **Streaming Architecture** — No delay between voice input and AI response.
- 🧩 **Modular & Extensible** — Easy to integrate more LLMs, voice engines, or features.

## 🛠️ Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS  
- **Speech-to-Text:** Deepgram SDK (WebSocket streaming)  
- **AI Engine:** Google Gemini API  
- **Text-to-Speech:** ElevenLabs API  
- **State Management:** React Hooks + Context API  
- **Deployment:** Vercel / Custom server (optional)

## 📸 Demo

> _Coming soon: Live demo and walkthrough video._

## 🧰 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/orionai.git
cd orionai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env.local` file in the root and add:

```env
NEXT_PUBLIC_DEEPGRAM_API_KEY=your_deepgram_key
GEMINI_API_KEY=your_google_gemini_key
ELEVENLABS_API_KEY=your_elevenlabs_key
ELEVENLABS_VOICE_ID=your_elevenlabs_voice_id
```

### 4. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the app in action.

## 🧪 How It Works

1. **User speaks** → microphone stream is transcribed live via Deepgram WebSocket.  
2. **Transcript is sent to Gemini** → the AI generates a smart response.  
3. **AI response is converted to speech** → via ElevenLabs’ lifelike voice synthesis.  
4. **Result is streamed back** to the user for a real-time, voice-powered interaction.

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🧩 Future Features

- 🎯 Voice personalization and user memory  
- 🔄 Multi-turn conversation support  
- 🖼️ Vision and image input (Gemini Pro Vision)  
- 📱 Mobile PWA support  
- 🔐 Auth + persistent chat history  

## 🤝 Contributing

Pull requests are welcome! Please open an issue first to discuss what you would like to change or add.

## 📄 License

MIT License. See [`LICENSE`](./LICENSE) for details.

---

Made with 💙 by [Pritam Chakraborty](https://github.com/rahulisbusy)
