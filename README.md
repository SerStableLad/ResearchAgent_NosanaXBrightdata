# 🤖 Web Search AI Agent Workshop

Build and deploy your own AI-powered web search agent using self-hosted LLMs, web scraping, and modern TypeScript!

## 📚 What You'll Learn

### Core Concepts
- **AI Agent Architecture**: Understanding how autonomous AI agents work and make decisions
- **LangChain Framework**: Building with one of the most popular AI orchestration frameworks
- **Self-Hosted LLMs**: Running your own AI models without relying on OpenAI/Anthropic
- **Web Scraping**: Extracting real-time data from the internet programmatically
- **TypeScript Development**: Building type-safe, production-ready applications
- **Cloud Deployment**: Deploying serverless applications with zero DevOps

### Technical Skills
- Setting up a TypeScript project from scratch
- Integrating multiple APIs (Nosana, BrightData)
- Creating custom LangChain tools
- Building conversational AI agents
- Implementing error handling and retry logic
- Containerizing applications with Docker
- Deploying to cloud platforms (Zeabur)

### Tools & Technologies
- **LangChain**: AI orchestration and agent framework
- **Nosana**: Decentralized GPU network for running LLMs
- **BrightData**: Enterprise web scraping and data collection
- **Zeabur**: Modern deployment platform (PaaS)
- **TypeScript**: Type-safe JavaScript development
- **Node.js**: JavaScript runtime environment

---

## 🎯 Project Overview

This workshop guides you through building a **Web Search AI Agent** that:

1. ✅ Accepts natural language questions
2. ✅ Determines if web search is needed
3. ✅ Scrapes real-time data from the internet
4. ✅ Generates intelligent answers using self-hosted LLMs
5. ✅ Runs entirely on your own infrastructure

**Example Interactions:**
```
User: "What's the weather in Tokyo today?"
Agent: *searches web* → "Currently 18°C and partly cloudy in Tokyo..."

User: "Who won the latest NBA championship?"
Agent: *searches web* → "The Denver Nuggets won the 2023 NBA Championship..."

User: "What is TypeScript?"
Agent: *answers directly* → "TypeScript is a strongly typed programming language..."
```

---

## 🔑 API Keys & Account Setup

### 1. Nosana (Self-Hosted LLM)

**What it does:** Provides GPU infrastructure to run LLM models like Llama, Mistral, etc.

**Getting Your API Key:**

1. **Create Account**
   - Visit: https://nosana.io
   - Click "Sign Up" (top right)
   - Verify your email

2. **Access Dashboard**
   - Log in to https://nosana.io/dashboard
   - Navigate to the "Products" or "API" section

3. **Activate Ollama API**
   - Look for "Ollama API" or "LLM API"
   - Click "Activate" or "Enable"
   - You'll receive an endpoint URL (looks like: `https://xxxxx.nosana.network`)

4. **Choose Your Model**
   - Default: `ollama:0.12`
   - Alternatives: `mistral`, `llama2`, `codellama`
   - Note the model name exactly as shown

5. **Save Your Credentials**
   ```
   NOSANA_OLLAMA_URL=https://xxxxx.nosana.network
   NOSANA_MODEL=ollama:0.12
   ```

**Cost:** Free tier available, pay-as-you-go for more usage

**Documentation:** https://docs.nosana.io

---

### 2. BrightData (Web Scraping)

**What it does:** Provides enterprise-grade web scraping with proxy rotation and CAPTCHA handling.

**Getting Your API Key:**

1. **Create Account**
   - Visit: https://brightdata.com
   - Click "Start Free Trial" or "Get Started"
   - Complete registration (requires business email)

2. **Verify Account**
   - Check your email for verification link
   - Complete account setup wizard

3. **Access Dashboard**
   - Log in to https://brightdata.com/cp
   - You'll see the main control panel

4. **Create API Token**
   - Navigate to: **Settings** → **API Tokens** (left sidebar)
   - Or go directly to: https://brightdata.com/cp/api_tokens
   - Click "**Create API Token**" or "**Add Token**"

5. **Configure Token Permissions**
   - **Name**: `web-search-agent` (or any name you prefer)
   - **Permissions**: Enable "**Scraping API**" or "**Web Scraper**"
   - Optional: Set expiration date
   - Click "**Create**"

6. **Copy Your Token**
   - Token format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
   - ⚠️ **IMPORTANT**: Copy immediately - it won't be shown again!
   - Store securely in your `.env` file

7. **Save Your Credentials**
   ```
   BRIGHTDATA_API_TOKEN=your-token-here
   ```

**Cost:** Free trial (limited requests), then pay-per-use

**Documentation:** https://docs.brightdata.com

---

### 3. Zeabur (Deployment Platform)

**What it does:** Deploys your application with automatic scaling and zero configuration.

**Getting Started:**

1. **Create Account**
   - Visit: https://zeabur.com
   - Click "Start for Free"
   - Sign up with GitHub (recommended) or email

2. **Connect GitHub**
   - Authorize Zeabur to access your repositories
   - You'll use this to deploy your code

3. **No API Key Needed!**
   - Zeabur works through their dashboard
   - Deployment is done via Git integration
   - We'll configure this during the workshop

**Cost:** Free tier available (generous limits)

**Documentation:** https://zeabur.com/docs

---

## 🛠️ Prerequisites

### Required Software

1. **Node.js (v18 or higher)**
   - Download: https://nodejs.org
   - Verify: `node --version`

2. **Git**
   - Download: https://git-scm.com
   - Verify: `git --version`

3. **Code Editor**
   - Recommended: [VS Code](https://code.visualstudio.com)
   - Alternatives: WebStorm, Cursor, Sublime Text

4. **Terminal/Command Line**
   - macOS/Linux: Built-in Terminal
   - Windows: PowerShell, Git Bash, or WSL

### Required Accounts

- [ ] Nosana account with Ollama API activated
- [ ] BrightData account with API token
- [ ] Zeabur account (GitHub connected)
- [ ] GitHub account (for deployment)

### Recommended Knowledge

- ✅ Basic JavaScript/TypeScript syntax
- ✅ Using npm and package.json
- ✅ Running terminal commands
- ❌ No ML/AI experience required
- ❌ No DevOps experience required

---

## 📦 Tech Stack

| Technology | Purpose | Why We Use It |
|------------|---------|---------------|
| **TypeScript** | Programming Language | Type safety, better DX, fewer bugs |
| **LangChain** | AI Framework | Agent orchestration, tool management |
| **Nosana** | LLM Infrastructure | Self-hosted models, cost-effective |
| **BrightData** | Web Scraping | Reliable data extraction, handles CAPTCHAs |
| **Zeabur** | Hosting | Zero-config deployment, auto-scaling |
| **Node.js** | Runtime | JavaScript on the server |
| **Axios** | HTTP Client | API requests, promise-based |
| **Express** | Web Framework | REST API (bonus section) |

---

## 🚀 Quick Start

### 1. Clone or Create Project

```bash
# Create new directory
mkdir web-search-ai-agent
cd web-search-ai-agent

# Initialize npm
npm init -y
```

### 2. Install Dependencies

```bash
# Core dependencies
npm install @langchain/core @langchain/community langchain axios dotenv

# Development dependencies
npm install -D typescript @types/node tsx
```

### 3. Set Up Environment Variables

Create `.env` file:

```bash
# Nosana Configuration
NOSANA_OLLAMA_URL=https://xxxxx.nosana.network
NOSANA_MODEL=ollama:0.12

# BrightData Configuration
BRIGHTDATA_API_TOKEN=your-brightdata-token-here

# Optional: Server Configuration
PORT=3000
```

⚠️ **Never commit `.env` to Git!** Add it to `.gitignore`

### 4. Follow Workshop Guide

The complete step-by-step guide will walk you through:
- Setting up TypeScript
- Creating the LLM client
- Building the web scraper
- Assembling the AI agent
- Testing locally
- Deploying to production

---

## 📁 Project Structure

```
web-search-ai-agent/
├── src/
│   ├── index.ts          # Main entry point (CLI)
│   ├── server.ts         # Express API server (bonus)
│   ├── agent.ts          # AI Agent logic
│   ├── llm.ts            # Nosana LLM client
│   ├── scraper.ts        # BrightData scraper
│   └── tools.ts          # LangChain tools
├── dist/                 # Compiled JavaScript (auto-generated)
├── node_modules/         # Dependencies (auto-generated)
├── .env                  # Environment variables (DO NOT COMMIT)
├── .gitignore           # Git ignore rules
├── Dockerfile           # Container configuration
├── package.json         # Project metadata
├── tsconfig.json        # TypeScript configuration
└── README.md            # This file
```

---

## 🧪 Testing Your Agent

### Local Testing

```bash
# Run in development mode
npm run dev

# Try these questions:
# 1. "What's the weather in Tokyo today?"
# 2. "Who won the latest NBA championship?"
# 3. "What is TypeScript?" (no search needed)
# 4. "Tell me about recent AI developments"
```

### API Testing (Bonus Section)

```bash
# Start server
npm run dev

# Test with curl
curl -X POST http://localhost:3000/api/query \
  -H "Content-Type: application/json" \
  -d '{"query": "What is the capital of France?"}'
```

---

## 📚 Learning Resources

### Official Documentation
- **LangChain**: https://docs.langchain.com/oss/javascript/langchain/overview
- **BrightData**: https://docs.brightdata.com/api-reference/rest-api/scraper/crawl-api
- **Nosana**: https://docs.nosana.io
- **Zeabur**: https://zeabur.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs


## 🎯 Learning Goals

By the end of this workshop, you will be able to:

- [ ] Set up a TypeScript project from scratch
- [ ] Integrate external APIs securely
- [ ] Build custom LangChain tools
- [ ] Create an autonomous AI agent
- [ ] Deploy applications to the cloud
- [ ] Debug common integration issues
- [ ] Extend the agent with new capabilities

---

## 🚀 Next Steps

After completing this workshop, try:

1. **Add More Tools**
   - Calculator tool for math problems
   - Weather API for current conditions
   - Database lookup for internal data

2. **Improve the Agent**
   - Add conversation memory
   - Implement streaming responses
   - Create multi-step reasoning

3. **Build a Frontend**
   - React chat interface
   - Next.js web application
   - Mobile app with React Native

4. **Production Enhancements**
   - Add authentication
   - Implement rate limiting
   - Set up monitoring and logging
   - Create unit tests

---

## 🤝 Contributing

Found a bug? Have suggestions? Contributions welcome!

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

MIT License - feel free to use this code for your own projects!

---

## 🎉 Acknowledgments

Built with:
- ❤️ by AI builders 
- 🧠 powered by Nosana's decentralized GPUs
- 🌐 data from BrightData's web scraping
- ⚡ orchestrated by LangChain
- 🚀 deployed on Zeabur


## AI Builders shameless plug
- https://theaibuilders.dev/
- https://luma.com/theaibuildersdev

---

**Ready to build your AI agent? Let's go! 🚀**
