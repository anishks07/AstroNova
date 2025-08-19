# 🚀 AstroNova Quick Start Guide

Get your AI Astrologer running in 5 minutes!

## Prerequisites
- Node.js 16+ 
- npm or yarn

## 🎯 Quick Setup

### 1. Frontend Setup (2 minutes)
```bash
git clone https://github.com/anishks07/AstroNova.git
cd AstroNova
npm install
cp .env.example .env
npm run dev
```
✅ Frontend running at `http://localhost:8081`

### 2. AI Backend Setup (3 minutes)

#### Option A: n8n Cloud (Recommended)
1. Sign up at [n8n.cloud](https://n8n.cloud) 
2. Import `astronova.json` workflow
3. Get webhook URL and update `.env`
4. Configure API keys (Groq, Gemini)

#### Option B: Local n8n
```bash
npm install n8n -g
n8n start
```
1. Open `http://localhost:5678`
2. Import `astronova.json` 
3. Configure API credentials
4. Activate workflow
5. Update `.env` with webhook URL

### 3. Required API Keys
- **Groq**: [console.groq.com](https://console.groq.com) (Free tier available)
- **Gemini**: [makersuite.google.com](https://makersuite.google.com) (Free tier available)

### 4. Test Your Setup
```bash
# Update .env with your webhook URL
VITE_AI_BACKEND_URL=http://localhost:5678/webhook/ai-astrologer

# Restart frontend
npm run dev
```

Visit `http://localhost:8081`, fill birth details, and chat with your AI astrologer! ✨

## 🆘 Need Help?
- Check the full [README.md](README.md) for detailed setup
- Ensure n8n workflow is active
- Verify API credentials are configured
- Check browser console for debug messages

**May the stars guide your setup!** 🌟
