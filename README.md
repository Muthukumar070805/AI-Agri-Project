

# 🌾 AI-agri — Digital Krishi Officer (Kerala)

> A lightweight experimental web app bringing **Generative AI to smallholder farmers in Kerala** 🇮🇳.\
> The “Digital Krishi Officer” (ഡിജിറ്റൽ കൃഷി ഓഫീസർ) interacts in **Malayalam**, offering instant crop care guidance, image-based disease detection, and localized scheme suggestions — all through a simple and practical web interface.

🔗 **Demo:** \
📁 **Repo:** Core frontend project built with React + Vite + TypeScript

---

## ✨ Key Features

* 💬 **Natural-language crop advisories** — Farmers can ask questions in Malayalam and receive short, numbered, practical responses from the digital officer persona (“ഡിജിറ്റൽ കൃഷി ഓഫീസർ”).
* 📸 **Visual crop diagnosis** — Upload crop photos to get concise, step-by-step guidance in Malayalam about possible diseases, pests, or nutrient issues.
* 🧾 **Government scheme lookup** — Find relevant Kerala government schemes by location and crop type, returned in clear English summaries.
* 🧠 **Safety-aware error handling** — Maps technical API errors to friendly messages (e.g., poor network, quota exceeded, or restricted content).
* 🌐 **Localization-first design** — Malayalam prioritized for inclusivity and real-world usability.

---

## 💡 Why It Matters

Agriculture advice is often English-centric and long-form — not ideal for Kerala’s farmers.
**AI-agri** bridges that gap by being:

* 🗣️ **Local-language first**,
* ⚡ **Quick and action-oriented**,
* 🧩 **Lightweight & reproducible**, running directly on the web without heavy backends.

This makes it accessible even in low-connectivity rural settings, while still powered by cutting-edge generative AI.

---

## 🛠 Tech Stack

| Layer                | Technology                                                                                                                                                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**         | Vite ⚡ + React + TypeScript                                                                                                                                                                                               |
| **UI Components**    | Modular structure: `Header`, `Sidebar`, `QueryInput`, `AdvisoryCard`, `PeerQA`, `WelcomeScreen`, `HelplineBanner`, etc.                                                                                                   |
| **AI Service Layer** | `geminiService.ts` — wraps **Google Gemini SDK** with custom prompt templates                                                                                                                                             |
| **Core Functions**   | `generateTextAdvisory(prompt)` — text Q&A in Malayalam  <br> `generateVisualAdvisory(prompt, imageBase64, mimeType)` — image + text analysis  <br> `generateSchemesAdvisory(location, crops)` — scheme lookups in English |
| **Styling**          | CSS Modules / Tailwind (optional)                                                                                                                                                                                         |
| **Config**           | `.env.local` stores Gemini API key securely (see setup)                                                                                                                                                                   |

---

## 📂 Project Structure

```
.
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── QueryInput.tsx
│   │   ├── AdvisoryCard.tsx
│   │   └── ...
│   ├── services/
│   │   └── geminiService.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
├── package.json
└── .env.local        # contains your Gemini API key (never commit)
```

---

## 🔒 Environment Setup

Create a `.env.local` file in the root directory with your Gemini API key.

> ⚠️ The code currently references `process.env.API_KEY`.
> You can rename it to `GEMINI_API_KEY` or adjust `geminiService.ts` accordingly.

Example:

```text
API_KEY=your_gemini_api_key_here
```

---

## ⚙️ How to Run (PowerShell or Terminal)

1. **Install dependencies**

   ```bash
   npm install
   ```
2. **Create `.env.local`** as shown above.
3. **Start the dev server**

   ```bash
   npm run dev
   ```
4. Open the local URL (usually `http://localhost:5173`) to test the app.

---

## 🧠 Security & Caveats

* 🚫 No backend key store — keep your **Gemini API key private**.
* 🤖 Generative models may **hallucinate** — validate outputs with domain experts.
* 🧩 Add rate limiting, caching, and safety layers before production.
* 🧱 For live deployments, consider server-side proxying to protect keys.

---

## 📈 Roadmap

* 🔄 Integrate live weather & soil data for adaptive responses.
* 🌍 Add multilingual support for Tamil, Kannada, and Hindi.
* 📊 Introduce “Farmer Feedback Loop” to retrain model prompts.
* 📱 Offline-first mode (PWA).
* 🧩 Add custom fine-tuned model for disease detection.

---

## 📜 Notes

> ⚙️ **Environment variable clarity:**\
> The README mentions `GEMINI_API_KEY`, but the current code uses `process.env.API_KEY`.\
> To prevent confusion for contributors, align both names in code and docs.

---

## 🤝 Contributing

Pull requests are welcome!\
If you’d like to test Malayalam model responses, add local scheme datasets, or help validate agricultural prompts — DM me or open an issue. 🌱

---

## 👤 Author

**Muthukumar**\
📍 Student | AI Enthusiast | Problem Solver \
🔗 GitHub: [Muthukumar070805](https://github.com/Muthukumar070805)\
🔗 LinkedIn: [Muthukumar M](https://www.linkedin.com/in/muthukumar-m-a40882276/)

---

