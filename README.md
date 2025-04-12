<<<<<<< HEAD
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
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>> 817db7b (Initial commit from Create Next App)
