````markdown
# 🧠 Smart Task Manager AI Assistance

A smart and minimal task management system powered by Google Gemini AI.

🌐 **Live Site**: https://smart-task-manager-ai-chi.vercel.app/  
📁 **GitHub Repo**: https://github.com/Shoyas/smart-task-manager-ai  
📧 **Email**: md.nasiruddin4067@gmail.com  
💼 **LinkedIn**: https://www.linkedin.com/in/md-nasir-uddin4067  
📱 **WhatsApp**: +8801740209884

---

## ✨ Features

- ✅ Add / Edit / Delete tasks with title, description, due date, and status
- 📌 Filter tasks by **Pending** or **Completed**
- 📅 Built-in calendar date picker for due dates
- 🧠 **"Suggest Subtasks"** button powered by **Google Gemini AI**
  - Example: `Prepare for job interview` → `Research company's tech stack, Practice challenges, Plan interview outfit`
- 🎯 Sample tasks available with one-click AI-generated subtasks
- 💡 Simple and clean UI, optimized for both mobile and desktop

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **AI Integration**: Google Gemini API
- **Components**: Shadcn UI + Lucide React Icons
- **LocalStorage**: Store all information.
- **Date Handling**: date-fns

---

## 🚀 Getting Started (Run Locally)

Follow these steps to run the project on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/Shoyas/smart-task-manager-ai.git
cd smart-task-manager-ai
````

### 2. Install Dependencies

Using `pnpm`:

```bash
pnpm install
```

Or with `npm`:

```bash
npm install
```

Or with `yarn`:

```bash
yarn install
```

### 3. Set Up Environment Variables

Create a `.env.example` file in the root directory and add your Google Gemini API key:

```
GOOGLE_API_KEY=your_google_gemini_api_key_here
```

👉 You can get your free Gemini API key from: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

Alternatively, copy the template file:

```bash
cp .env.example .env.local
```

### 4. Start the Development Server

```bash
pnpm dev
```

Or:

```bash
npm run dev
# or
yarn dev
```

Then visit: [http://localhost:3000](http://localhost:3000)

---

## 📂 Environment Variables

Here’s the required environment variable to run the app:

```
GOOGLE_API_KEY=your_google_gemini_api_key_here
```

> Keep your API key safe and never push it to GitHub.

---

## 📋 Example Use Case

**Task:** `Launch product campaign`
**AI Suggested Subtasks:**

* Define audience
* Create content plan
* Schedule announcements
* Monitor performance
* Adjust based on feedback

---

## 🧪 Sample Tasks with AI Suggestions

Click on "Load Sample Tasks" to try out the app with pre-filled data and explore AI-generated subtasks without writing anything!

---

## ⚠️ Known Issues / Challenges

* 🔧 **Subtask Actions**: Currently, subtasks suggested by AI are static. You cannot mark them as completed individually. This is a planned future improvement.
* 🧠 Rate limits may apply on free Gemini API usage depending on your API key.

---

## 📁 Project Structure

```
/app
  /api/gemini      → Gemini AI integration route
  /tasks           → Task management UI and logic
/components        → Reusable UI components (buttons, modals, etc.)
/lib               → Utility functions (e.g., subtask suggestions)
/styles            → Global styles and Tailwind config
```

---

## 📝 .env.example

```env
# Google Gemini API Key
GOOGLE_API_KEY=your_google_gemini_api_key_here
```

---

## 🤝 Acknowledgements

* [Google Gemini AI](https://aistudio.google.com/)
* [Next.js](https://nextjs.org/)
* [Radix UI](https://www.radix-ui.com/)
* [Lucide Icons](https://lucide.dev/)
* [Tailwind CSS](https://tailwindcss.com/)

## 📄 License

This project is open-source and available for learning, demo, and educational purposes.

---

Built with ❤️ by [Md. Nasir Uddin](https://www.linkedin.com/in/md-nasir-uddin4067)

```
```
