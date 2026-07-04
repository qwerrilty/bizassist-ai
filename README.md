# BizAssist AI

AI-powered admin assistant for Australian small businesses.

## Project Structure
```
src/
  components/     Shared UI components (Sidebar, Topbar, ToolCard, FormField, OutputBox)
  pages/          One file per tool (InvoiceChaser, JobAdWriter, etc.)
  hooks/          useGenerate.js — handles all AI API calls
  utils/          constants.js, buildPrompt.js
  styles/         global.css
api/
  generate.js     Vercel serverless route — holds ANTHROPIC_API_KEY server-side
```

## Deploy to Vercel
1. Push repo to GitHub
2. Import to Vercel
3. Add environment variable: `ANTHROPIC_API_KEY`
4. Deploy

## Local Dev
```bash
npm install
npm run dev
```
For local API calls, create `.env.local`:
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```
