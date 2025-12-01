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

User: "Who is Telsa CEO?"
Agent: *answers directly* → "Elon Musk is the CEO of Tesla (2008–present)"
```

---

## 🛠️ Prerequisites

### Required Software

Before starting, install these tools:

1. **Node.js (v18 or higher)**
   - Download: https://nodejs.org
   - Verify installation: `node --version`
   - Should show: `v18.0.0` or higher

2. **Git**
   - Download: `npm install git`
   - Verify installation: `git --version`
   - Should show git version

3. **Code Editor**
   - Recommended: [Cursor](https://cursor.com/download)]
   - Alternatives: Cursor, Trae, Qoder, etc

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
| **BrightData** | Pre-built Web Scraping | Reliable data extraction, handles CAPTCHAs |
| **Zeabur** | Hosting | Zero-config deployment, auto-scaling |
| **Node.js** | Runtime | JavaScript on the server |
| **Axios** | HTTP Client | API requests, promise-based |

---

## 🚀 Part 1: Project Setup (20 minutes)

### Step 1: Create Project Directory

Open your terminal and run:

```bash
# Create and navigate to project folder
mkdir web-search-ai-agent
cd web-search-ai-agent
```

### Step 2: Initialize Node.js Project

```bash
# Initialize npm (creates package.json)
npm init -y
```

This creates a `package.json` file with default settings.

### Step 3: Install Dependencies

```bash
# Core dependencies
npm install @langchain/core langchain axios dotenv

# Development dependencies
npm install -D typescript @types/node tsx
```

**What each package does:**
- `@langchain/core`: Base classes for tools and agents
- `langchain`: Main LangChain utilities
- `axios`: HTTP client for API requests
- `dotenv`: Load environment variables from `.env` file
- `typescript`: TypeScript compiler
- `@types/node`: Type definitions for Node.js
- `tsx`: Run TypeScript directly (development only)

### Step 4: Initialize TypeScript

```bash
# Create TypeScript configuration
npx tsc --init
```

### Step 5: Configure TypeScript

Replace the contents of `tsconfig.json` with:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

**Key settings explained:**
- `target: "ES2020"`: Use modern JavaScript features
- `strict: true`: Enable strict type checking (catches bugs early)
- `outDir: "./dist"`: Compiled JavaScript goes here
- `rootDir: "./src"`: Source TypeScript files location

### Step 6: Create Project Structure

```bash
# Create source folder
mkdir src
mkdir toolbox

# Create main files
# Agent.ts - This is the main orchestrator of the application.
# Index.ts - This is the Application Entry Point 
# llm.ts - This is the communication Layer with the Nosana LLM service
# Scraper.ts -  This manages web scraping through the BrightData service:
# Tools.ts - This bridges the gap between LangChain and the web scraper:

touch src/index.ts
touch src/llm.ts
touch src/toolbox/scraper.ts
touch src/tools.ts
touch src/agent.ts

# Create environment file
touch .env

# Create gitignore
touch .gitignore
```

### Step 7: Setup Git Ignore

Add to `.gitignore`:

```
node_modules/
dist/
.env
.DS_Store
*.log
```

**Why ignore these?**
- `node_modules/`: Large folder, can be recreated with `npm install`
- `dist/`: Generated code, not source
- `.env`: Contains secrets (API keys)

### Step 8: Add NPM Scripts

Replace line 5 to 7 `package.json` to the below. 
This allows us to testrun the code without any frontend for now.

```json

  "scripts": {
    "dev": "tsx src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  },
```

**Scripts explained:**
- `npm run dev`: Run TypeScript directly (fast, for development)
- `npm run build`: Compile TypeScript to JavaScript
- `npm start`: Run compiled JavaScript (production)

---

## 🧠 Part 2: Setup Nosana LLM (25 minutes)

Now we'll connect to a self-hosted LLM using Nosana's GPU infrastructure.

### Step 1: Create Nosana Account

1. Visit: https://nosana.io
2. Click "Sign Up" in the top right
3. Complete registration with your email
4. Verify your email address
5. key in the code we sent you

<img width="1468" height="706" alt="Screenshot 2025-11-24 at 5 11 07 PM" src="https://github.com/user-attachments/assets/4e102185-ea40-4978-b681-41089787d6c6" />


### Step 2: Select and deploy your GPU

1. Navigate to the **"Deploy"** section
3. Configure your deployment by clicking on select template
4. Select "GPT-OSS" model
5. Base on this configuration, choose a GPU that has the highest availability, can click deploy model on the right 
<img width="2320" height="1372" alt="image" src="https://github.com/user-attachments/assets/1ac2ef9e-96a9-4093-af3f-84848b40ada9" />

### Step 3: Confirm deployment
1. you will be bought to a **"Deployment Overview"** page, wait for the service to come online
2. click on the Endpoint URL to confirm it's working. (if it doesn't work, repeat step 2.5 and choose a different GPU)
3. if it work you should see the words "Ollama is running" on the next page. 

<img width="1165" height="583" alt="Screenshot 2025-11-24 at 5 21 56 PM" src="https://github.com/user-attachments/assets/bcc5039c-5972-441b-8259-642608295bb1" />


### Step 4: Store Credentials
Add to your `.env` file:
copy the URL where it says "Ollama is running" and replace the dummy url after NOSANA_OLLAMA_URL

```bash
# Nosana Configuration
NOSANA_OLLAMA_URL=https://xxxxx.nosana.network
NOSANA_MODEL=llama3.1:8b
```


### Step 5: Create LLM Client

Create `src/llm.ts`:

```typescript
import axios from 'axios';

export class NosanaLLM {
  private baseUrl: string;
  private model: string;

  constructor(baseUrl: string, model?: string) {
    // Clean up the URL - remove trailing slashes and /api if present
    this.baseUrl = baseUrl.replace(/\/+$/, '').replace(/\/api$/, '');
    // Use environment variable with fallback to provided model or default
    this.model = model || process.env.NOSANA_MODEL || 'ollama:0.12';
  }

  /**
   * Generate a completion using OpenAI-compatible format
   * This is more widely supported than native Ollama format
   */
  async generate(prompt: string): Promise<string> {
    // Use OpenAI-compatible endpoint
    const url = `${this.baseUrl}/v1/chat/completions`;
    
    try {
      const response = await this.makeApiCall(url, {
        model: this.model,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
        stream: false
      });

      // OpenAI format response
      return this.parseResponse(response, 'openai');
      
    } catch (error: any) {
      return this.handleApiError(error, url, () => this.generateNativeOllama(prompt));
    }
  }

  /**
   * Chat with conversation history
   */
  async chat(messages: Array<{ role: string; content: string }>): Promise<string> {
    const url = `${this.baseUrl}/v1/chat/completions`;
    
    try {
      const response = await this.makeApiCall(url, {
        model: this.model,
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
        stream: false
      });

      return this.parseResponse(response, 'openai');
      
    } catch (error: any) {
      return this.handleApiError(error, url, () => this.chatNativeOllama(messages));
    }
  }

  /**
   * Centralized API call method
   */
  private async makeApiCall(url: string, data: any): Promise<any> {
    return await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 60000
    });
  }

  /**
   * Centralized response parsing
   */
  private parseResponse(response: any, format: 'openai' | 'ollama'): string {
    if (format === 'openai') {
      // Defensive check for response structure
      if (response && response.data && response.data.choices && 
          Array.isArray(response.data.choices) && response.data.choices.length > 0 &&
          response.data.choices[0].message && response.data.choices[0].message.content) {
        return response.data.choices[0].message.content;
      }
    } else {
      // Ollama format
      if (response && response.data && response.data.response) {
        return response.data.response;
      }
      if (response && response.data && response.data.message && response.data.message.content) {
        return response.data.message.content;
      }
    }
    
    throw new Error(`Invalid response format: ${JSON.stringify(response.data)}`);
  }

  /**
   * Centralized error handling
   */
  private async handleApiError(error: any, url: string, fallback: () => Promise<string>): Promise<string> {
    if (error.response) {
      // If v1 endpoint doesn't work, try native Ollama
      if (error.response.status === 404 || error.response.status === 405) {
        return await fallback();
      }
      
      throw new Error(`Nosana API Error ${error.response.status}: ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      throw new Error(`No response from Nosana: ${error.message}`);
    } else {
      throw new Error(`Request failed: ${error.message}`);
    }
  }

  /**
   * Fallback: Try native Ollama format
   */
  private async generateNativeOllama(prompt: string): Promise<string> {
    const url = `${this.baseUrl}/api/generate`;
    
    try {
      const response = await this.makeApiCall(url, {
        model: this.model,
        prompt: prompt,
        stream: false
      });

      return this.parseResponse(response, 'ollama');
    } catch (error: any) {
      throw new Error(`Both API formats failed. Check Nosana documentation for correct endpoint.`);
    }
  }

  /**
   * Fallback: Native Ollama chat
   */
  private async chatNativeOllama(messages: Array<{ role: string; content: string }>): Promise<string> {
    const url = `${this.baseUrl}/api/chat`;
    
    try {
      const response = await this.makeApiCall(url, {
        model: this.model,
        messages: messages,
        stream: false
      });

      return this.parseResponse(response, 'ollama');
    } catch (error: any) {
      throw new Error(`Native chat also failed: ${error.message}`);
    }
  }
}
```

**Key concepts:**
- **`generate()`**: Single prompt → single response
- **`chat()`**: Conversation with context/history
- **Error handling**: Try-catch blocks prevent crashes
- **Timeout**: 60 seconds max wait time
- ** temperature**: between 0 to 1. lower for more factual higher for more creative
- ** max_tokens**: max token for output/input. to limit the gpu usage
- ** stream**: token streaming. character by character - this does not work for terminal 


### Add in the below content for  `src/agent.ts`:

```typescript
import { NosanaLLM } from './llm';
// import { WebSearchTool } from './tools';
// import { BrightDataScraper } from './Tools/scraper';

export class WebSearchAgent {
  private llm: NosanaLLM;
  // private searchTool: WebSearchTool;

  constructor(nosanaUrl: string, brightdataToken: string, model?: string) {
    this.llm = new NosanaLLM(nosanaUrl, model);
    // const scraper = new BrightDataScraper(brightdataToken);
    // this.searchTool = new WebSearchTool(scraper);
  }

  async run(userQuery: string): Promise<string> {
    console.log(`\n💭 User Query: ${userQuery}\n`);
    
    // Validate input
    if (!userQuery || typeof userQuery !== 'string' || userQuery.trim().length === 0) {
      console.error('❌ Invalid user query provided to WebSearchAgent:', userQuery);
      return 'Error: Invalid query provided.';
    }

    
    // Always answer directly without search (tools disabled)
    console.log('📝 Answering directly without search (tools disabled)...');
    return await this.llm.generate(userQuery);


//     // Step 1: Determine if we need to search
//     const needsSearch = await this.shouldSearch(userQuery);
//     console.log(`💡 Search needed: ${needsSearch ? 'YES' : 'NO'}`);
    
//     if (!needsSearch) {
//       console.log('📝 Answering directly without search...');
//       return await this.llm.generate(userQuery);
//     }

//     // Step 2: Extract search query
//     console.log('🔍 Determining what to search for...');
//     const searchQuery = await this.extractSearchQuery(userQuery);
//     console.log(`🔑 Extracted search query: "${searchQuery}"`);
    
//     // Validate the extracted search query
//     if (!searchQuery || typeof searchQuery !== 'string' || searchQuery.trim().length === 0) {
//       console.error('❌ Invalid search query extracted:', searchQuery);
//       return 'Error: Could not extract a valid search query.';
//     }
    
//     // Step 3: Perform web search
//     console.log(`🚀 Executing web search...`);
//     const searchResults = await this.searchTool._call(searchQuery.trim());
//     console.log(`🏁 Web search completed`);
    
//     // Log the raw search results for debugging
//     console.log(`📄 Raw search results preview: ${searchResults.substring(0, 100)}...`);
    
//     // Step 4: Generate answer based on search results
//     console.log('🧠 Generating answer from search results...');
//     const finalAnswer = await this.generateAnswer(userQuery, searchResults);
//     return finalAnswer;
//   }

//   private async shouldSearch(query: string): Promise<boolean> {
//     console.log(`📋 Evaluating if search is needed for: "${query}"`);
    
//     const prompt = `Does this question require searching the web for current information? Answer only YES or NO.
    
// Question: ${query}

// Answer:`;

//     const response = await this.llm.generate(prompt);
    
//     const result = response.toLowerCase().includes('yes');
//     console.log(`📊 Evaluation result: ${result ? 'SEARCH REQUIRED' : 'DIRECT ANSWER'}`);
    
//     return result;
//   }

//   private async extractSearchQuery(query: string): Promise<string> {
//     console.log(`📋 Extracting search query from: "${query}"`);
    
//     const prompt = `Extract a concise search query (3-6 words) from this question:

// Question: ${query}

// Search query:`;

//     console.log(`📤 Sending extraction prompt to LLM...`);
//     const response = await this.llm.generate(prompt);
//     console.log(`📥 Received LLM response: "${response}"`);
    
//     const result = response.trim();
//     console.log(`🔑 Final extracted search query: "${result}"`);
    
//     return result;
//   }

//   private async generateAnswer(originalQuery: string, searchResults: string): Promise<string> {
//     console.log(`📋 Generating final answer for: "${originalQuery}"`);
//     console.log(`📎 With search results length: ${searchResults.length} characters`);
    
//     // Check if we have an error message instead of results
//     if (searchResults.startsWith('Error:') || searchResults === 'No results found.') {
//       console.warn('⚠️ Search returned an error or no results');
//       return `I couldn't find information about "${originalQuery}" due to a search error. Please try rephrasing your question.`;
//     }
    
//     const prompt = `Based on the following search results, answer the user's question accurately and concisely.

// User Question: ${originalQuery}

// Search Results:
// ${searchResults}

// Answer:`;

//     const result = await this.llm.chat([
//       { role: 'system', content: 'You are a helpful AI assistant that answers questions based on search results. Be concise and accurate.' },
//       { role: 'user', content: prompt }
//     ]);
    
//     console.log(`📥 Received final answer from LLM (${result.length} characters)`);
    
//     return result;
  }
}
```

### Add in the below content for  `src/index.ts`:

Replace the content in index.ts.
This is the main file that would contols how to run the agent

```typescript
import dotenv from 'dotenv';
import { WebSearchAgent } from './agent';
import * as readline from 'readline';

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function main() {
  const nosanaUrl = process.env.NOSANA_OLLAMA_URL;
  const brightdataToken = process.env.BRIGHTDATA_API_TOKEN;

  if (!nosanaUrl || !brightdataToken) {
    console.error('❌ Missing environment variables! Check your .env file.');
    process.exit(1);
  }

  console.log('🚀 Web Search AI Agent Starting...\n');
  
  const agent = new WebSearchAgent(nosanaUrl, brightdataToken);

  const askQuestion = () => {
    rl.question('\n💬 Ask me anything (or type "exit" to quit): ', async (query) => {
      if (query.toLowerCase() === 'exit') {
        console.log('👋 Goodbye!');
        rl.close();
        return;
      }

      try {
        const answer = await agent.run(query);
        console.log(`\n✅ Answer: ${answer}\n`);
      } catch (error) {
        console.error('❌ Error:', error);
      }

      askQuestion();
    });
  };

  askQuestion();
}

main();
```




### Step 6: Test Your LLM Connection
run `npm run dev` in the terminal 
try asking it questions.

---

## 🌐 Part 3: Setup BrightData Scraper (25 minutes)

Now we'll add web scraping capabilities using BrightData.

### Step 1: Create BrightData Account

1. Visit:   ⁠https://get.brightdata.com/aibuilders10 
2. Click **"Start Free Trial"** or **"Get Started"**
3. Register with your email (business email preferred)

### Step 2: Access Dashboard

1. Log in to: https://brightdata.com/cp
2. Navigate to **"Web Access --> Web Access API --> create API"**
   <img width="1470" height="521" alt="Screenshot 2025-11-24 at 7 26 16 PM" src="https://github.com/user-attachments/assets/65bed564-c111-4f9f-bea9-1562fb63f1b8" />
3. Select **"SERP API"** and create the API
<img width="1363" height="711" alt="Screenshot 2025-11-24 at 7 29 27 PM" src="https://github.com/user-attachments/assets/93b7383a-dd3b-402f-b4b5-92741f057fb9" />

### Step 3:  Store BrightData Credentials
1. Copy the API from the playground 
<img width="1365" height="474" alt="Screenshot 2025-11-24 at 7 32 24 PM" src="https://github.com/user-attachments/assets/5c7cc184-160a-480c-9dc4-f64aece857f8" />

2. Add to your `.env` file:

```bash
# BrightData Configuration
BRIGHTDATA_API_TOKEN= [API here]
```



### Step 6: Create Scraper Class

Create `src/scraper.ts`:

```typescript
import axios from 'axios';

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

export class BrightDataScraper {
  private apiToken: string;
  private baseUrl = 'https://api.brightdata.com';
  private zone: string;

  constructor(apiToken: string, zone: string = 'serp_api1') {
    this.apiToken = apiToken;
    this.zone = zone;
  }

  async searchWeb(query: string, limit: number = 5): Promise<SearchResult[]> {
    try {
      console.log(`🔍 Searching for: "${query}"`);
      
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&hl=en&gl=us`;
      
      const response = await axios.post(
        `${this.baseUrl}/request`,
        {
          zone: this.zone,
          url: searchUrl,
          format: 'json'
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiToken}`,
            'Content-Type': 'application/json'
          },
          params: {
            brd_json: 1
          }
        }
      );

      console.log(`✅ BrightData returned results`);
      
      return this.formatRawResults(response.data);
      
    } catch (error: any) {
      console.error('❌ BrightData Error:', error.response?.status || error.message);
      
      if (error.response?.status === 401) {
        console.error('   Check your BRIGHTDATA_API_TOKEN in .env');
      } else if (error.response?.status === 403) {
        console.error('   Check your zone configuration and permissions');
      }
      
      return [];
    }
  }

  /**
   * Format raw BrightData response
   * We pass raw data to the LLM - it's smart enough to parse it!
   */
  private formatRawResults(data: any): SearchResult[] {
    if (!data) {
      return [];
    }

    // Convert to string for LLM processing
    const dataString = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
    
    // Return as single result containing all data
    return [{
      title: 'Search Results',
      url: 'https://www.google.com',
      snippet: dataString.substring(0, 5000) // Limit to avoid token limits
    }];
  }
}
```

**Why this approach?**
- ✅ Flexible: Works with any BrightData response format
- ✅ Smart: Let the LLM extract what it needs from raw data


## 🛠️ Part 4: Create LangChain Tool (15 minutes)

Now we'll wrap our scraper in a LangChain Tool so the agent can use it.

### Step 1: Create Tool Class

Create `src/tools.ts`:

```typescript
import { Tool } from '@langchain/core/tools';
import { BrightDataScraper } from './scraper';

export class WebSearchTool extends Tool {
  name = 'web_search';
  description = 'Useful for searching the web for current information. Input should be a search query string.';
  
  private scraper: BrightDataScraper;

  constructor(scraper: BrightDataScraper) {
    super();
    this.scraper = scraper;
  }

  async _call(query: string): Promise<string> {
    console.log(`🔍 Searching for: ${query}`);
    
    const results = await this.scraper.searchWeb(query);
    
    if (results.length === 0) {
      return 'No search results found. The web search failed or returned no data.';
    }

    // Return raw data for LLM to parse
    return `Web search results for "${query}":\n\n${results[0].snippet}`;
  }
}
```

**Understanding LangChain Tools:**
- **`name`**: Tool identifier (the AI sees this)
- **`description`**: How the AI decides when to use it
- **`_call()`**: What happens when the tool is invoked
- **`super()`**: Calls parent Tool class constructor

**Why `_call()` with underscore?**
- `_call()`: Internal implementation (we write this)
- `invoke()`: Public method (LangChain provides automatically)

---

## 🤖 Part 5: Build the AI Agent (30 minutes)

This is where everything comes together!

### Step 1: edit the Agent Class 

Remove / comment this in `src/agent.ts`:

```typescript
    // Always answer directly without search (tools disabled) 
    console.log('📝 Answering directly without search (tools disabled)...');
    return await this.llm.generate(userQuery);
```

Add in / uncomment this in `src/agent.ts`:

```typescript
      // Step 1: Determine if we need to search
//     const needsSearch = await this.shouldSearch(userQuery);
//     console.log(`💡 Search needed: ${needsSearch ? 'YES' : 'NO'}`);
    
//     if (!needsSearch) {
//       console.log('📝 Answering directly without search...');
//       return await this.llm.generate(userQuery);
//     }

//     // Step 2: Extract search query
//     console.log('🔍 Determining what to search for...');
//     const searchQuery = await this.extractSearchQuery(userQuery);
//     console.log(`🔑 Extracted search query: "${searchQuery}"`);
    
//     // Validate the extracted search query
//     if (!searchQuery || typeof searchQuery !== 'string' || searchQuery.trim().length === 0) {
//       console.error('❌ Invalid search query extracted:', searchQuery);
//       return 'Error: Could not extract a valid search query.';
//     }
    
//     // Step 3: Perform web search
//     console.log(`🚀 Executing web search...`);
//     const searchResults = await this.searchTool._call(searchQuery.trim());
//     console.log(`🏁 Web search completed`);
    
//     // Log the raw search results for debugging
//     console.log(`📄 Raw search results preview: ${searchResults.substring(0, 100)}...`);
    
//     // Step 4: Generate answer based on search results
//     console.log('🧠 Generating answer from search results...');
//     const finalAnswer = await this.generateAnswer(userQuery, searchResults);
//     return finalAnswer;
//   }

//   private async shouldSearch(query: string): Promise<boolean> {
//     console.log(`📋 Evaluating if search is needed for: "${query}"`);
    
//     const prompt = `Does this question require searching the web for current information? Answer only YES or NO.
    
// Question: ${query}

// Answer:`;

//     const response = await this.llm.generate(prompt);
    
//     const result = response.toLowerCase().includes('yes');
//     console.log(`📊 Evaluation result: ${result ? 'SEARCH REQUIRED' : 'DIRECT ANSWER'}`);
    
//     return result;
//   }

//   private async extractSearchQuery(query: string): Promise<string> {
//     console.log(`📋 Extracting search query from: "${query}"`);
    
//     const prompt = `Extract a concise search query (3-6 words) from this question:

// Question: ${query}

// Search query:`;

//     console.log(`📤 Sending extraction prompt to LLM...`);
//     const response = await this.llm.generate(prompt);
//     console.log(`📥 Received LLM response: "${response}"`);
    
//     const result = response.trim();
//     console.log(`🔑 Final extracted search query: "${result}"`);
    
//     return result;
//   }

//   private async generateAnswer(originalQuery: string, searchResults: string): Promise<string> {
//     console.log(`📋 Generating final answer for: "${originalQuery}"`);
//     console.log(`📎 With search results length: ${searchResults.length} characters`);
    
//     // Check if we have an error message instead of results
//     if (searchResults.startsWith('Error:') || searchResults === 'No results found.') {
//       console.warn('⚠️ Search returned an error or no results');
//       return `I couldn't find information about "${originalQuery}" due to a search error. Please try rephrasing your question.`;
//     }
    
//     const prompt = `Based on the following search results, answer the user's question accurately and concisely.

// User Question: ${originalQuery}

// Search Results:
// ${searchResults}

// Answer:`;

//     const result = await this.llm.chat([
//       { role: 'system', content: 'You are a helpful AI assistant that answers questions based on search results. Be concise and accurate.' },
//       { role: 'user', content: prompt }
//     ]);
    
//     console.log(`📥 Received final answer from LLM (${result.length} characters)`);
    
//     return result;
```



### Step 2: edit the index Class 
add in / uncomment this on line 15 in `src/index.ts`
```
const brightdataToken = process.env.BRIGHTDATA_API_TOKEN;
```


**Agent Flow Explained:**

```
User: "What's the weather in Tokyo?"
         ↓
    shouldSearch() 
    → YES (needs current data)
         ↓
    extractSearchQuery()
    → "Tokyo weather today"
         ↓
    searchTool._call()
    → [web results]
         ↓
    generateAnswer()
    → "Currently 18°C and partly cloudy..."
```

**Why this architecture?**
1. **Modular**: Each method has one job
2. **Testable**: Can test each step independently
3. **Flexible**: Easy to add more tools or change logic
4. **Observable**: Console logs show what's happening

---

### Step 3: run `npm run dev` in terminal to test it out

## Part 6: built a simple UI (5 min)

### Step 1: Wrap your terminal app in a API call

create a simple `server.ts`
```typescript
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { WebSearchAgent } from './agent';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Initialize the agent
const nosanaUrl = process.env.NOSANA_OLLAMA_URL;
const brightdataToken = process.env.BRIGHTDATA_API_TOKEN;

if (!nosanaUrl || !brightdataToken) {
  console.error('❌ Missing environment variables! Check your .env file.');
  process.exit(1);
}

const agent = new WebSearchAgent(nosanaUrl, brightdataToken);

// API endpoint for handling queries
app.post('/api/query', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }
    
    console.log(`Received query: ${query}`);
    
    const answer = await agent.run(query);
    res.json({ answer });
  } catch (error: any) {
    console.error('Error processing query:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Web Search AI Agent Server running on http://localhost:${PORT}`);
});
```

### step 2: create a simple frontend 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web Search AI Agent</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, #1a2a6c, #b21f1f, #1a2a6c);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        
        .container {
            background-color: rgba(255, 255, 255, 0.95);
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            width: 100%;
            max-width: 800px;
            padding: 30px;
            text-align: center;
        }
        
        h1 {
            color: #1a2a6c;
            margin-bottom: 10px;
            font-size: 2.5rem;
        }
        
        .subtitle {
            color: #666;
            margin-bottom: 30px;
            font-size: 1.1rem;
        }
        
        .input-container {
            display: flex;
            gap: 10px;
            margin-bottom: 30px;
        }
        
        #queryInput {
            flex: 1;
            padding: 15px;
            border: 2px solid #ddd;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.3s;
        }
        
        #queryInput:focus {
            outline: none;
            border-color: #1a2a6c;
        }
        
        #submitBtn {
            background: linear-gradient(to right, #1a2a6c, #b21f1f);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 15px 25px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: bold;
            transition: transform 0.2s, opacity 0.2s;
        }
        
        #submitBtn:hover {
            opacity: 0.9;
            transform: translateY(-2px);
        }
        
        #submitBtn:disabled {
            background: #cccccc;
            cursor: not-allowed;
            transform: none;
            opacity: 1;
        }
        
        .loading {
            display: none;
            text-align: center;
            margin: 20px 0;
        }
        
        .spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-left-color: #1a2a6c;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto 15px;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        .result-container {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            text-align: left;
            min-height: 100px;
            display: none;
        }
        
        .result-container h2 {
            color: #1a2a6c;
            margin-bottom: 15px;
            font-size: 1.5rem;
        }
        
        #result {
            line-height: 1.6;
            color: #333;
            white-space: pre-wrap;
        }
        
        .error {
            color: #b21f1f;
            background-color: #ffe6e6;
            border-radius: 8px;
            padding: 15px;
            margin-top: 20px;
            display: none;
        }
        
        .history {
            margin-top: 30px;
            text-align: left;
        }
        
        .history h2 {
            color: #1a2a6c;
            margin-bottom: 15px;
            font-size: 1.5rem;
        }
        
        .history-item {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 10px;
        }
        
        .history-query {
            font-weight: bold;
            color: #1a2a6c;
            margin-bottom: 5px;
        }
        
        .history-answer {
            color: #333;
            line-height: 1.5;
        }
        
        @media (max-width: 600px) {
            .container {
                padding: 20px;
            }
            
            h1 {
                font-size: 2rem;
            }
            
            .input-container {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌐 Web Search AI Agent</h1>
        <p class="subtitle">Ask anything and get real-time answers from the web</p>
        
        <div class="input-container">
            <input type="text" id="queryInput" placeholder="Ask me anything..." autocomplete="off">
            <button id="submitBtn">Ask</button>
        </div>
        
        <div class="loading" id="loading">
            <div class="spinner"></div>
            <p>Searching the web and generating your answer...</p>
        </div>
        
        <div class="error" id="error"></div>
        
        <div class="result-container" id="resultContainer">
            <h2>Answer:</h2>
            <div id="result"></div>
        </div>
        
        <div class="history" id="historyContainer">
            <h2>Recent Queries</h2>
            <div id="historyList"></div>
        </div>
    </div>

    <script>
        const queryInput = document.getElementById('queryInput');
        const submitBtn = document.getElementById('submitBtn');
        const loadingElement = document.getElementById('loading');
        const resultContainer = document.getElementById('resultContainer');
        const resultElement = document.getElementById('result');
        const errorElement = document.getElementById('error');
        const historyList = document.getElementById('historyList');
        const historyContainer = document.getElementById('historyContainer');
        
        // Store query history
        let queryHistory = [];
        
        // Handle form submission
        submitBtn.addEventListener('click', handleSubmit);
        queryInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSubmit();
            }
        });
        
        async function handleSubmit() {
            const query = queryInput.value.trim();
            
            if (!query) {
                showError('Please enter a question');
                return;
            }
            
            // Clear previous results and errors
            hideError();
            resultContainer.style.display = 'none';
            
            // Show loading indicator
            loadingElement.style.display = 'block';
            submitBtn.disabled = true;
            
            try {
                // Send query to the backend
                const response = await fetch('/api/query', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ query })
                });
                
                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.error || 'Failed to get response');
                }
                
                // Display result
                resultElement.textContent = data.answer;
                resultContainer.style.display = 'block';
                
                // Add to history
                addToHistory(query, data.answer);
            } catch (error) {
                console.error('Error:', error);
                showError(error.message || 'An error occurred while processing your request');
            } finally {
                // Hide loading indicator
                loadingElement.style.display = 'none';
                submitBtn.disabled = false;
            }
        }
        
        function showError(message) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        function hideError() {
            errorElement.style.display = 'none';
        }
        
        function addToHistory(query, answer) {
            // Add to beginning of history
            queryHistory.unshift({ query, answer });
            
            // Limit history to 5 items
            if (queryHistory.length > 5) {
                queryHistory.pop();
            }
            
            // Update history display
            updateHistoryDisplay();
        }
        
        function updateHistoryDisplay() {
            if (queryHistory.length === 0) {
                historyContainer.style.display = 'none';
                return;
            }
            
            historyContainer.style.display = 'block';
            historyList.innerHTML = '';
            
            queryHistory.forEach(item => {
                const historyItem = document.createElement('div');
                historyItem.className = 'history-item';
                
                historyItem.innerHTML = `
                    <div class="history-query">${item.query}</div>
                    <div class="history-answer">${item.answer}</div>
                `;
                
                historyList.appendChild(historyItem);
            });
        }
        
        // Initialize
        updateHistoryDisplay();
    </script>
</body>
</html>
```

### step 3: switch npm run dev to frontend

change line 13 on `package.json` 
 ```json
 "dev": "tsx src/index.ts",
```

run `npm run dev` in terminal to test it out

## 🚀 Part 7: Deploy to Zeabur (15 minutes)

Now let's deploy your agent to the cloud!

### Step 1: Create Zeabur Account

### Step 4: Deploy on Zeabur

1. Go to https://dash.zeabur.com
2. Click **"New Project"**
3. Choose **"Deploy from Git"**
4. Select your repository: `web-search-ai-agent`
5. Zeabur auto-detects the Dockerfile ✨
6. Click **"Deploy"**



### Step 8: Access Your Agent

Your agent is now live! Zeabur provides a URL like:
```
https://web-search-ai-agent-xxxxx.zeabur.app
```

**Note**: For CLI agents, you'd typically access via SSH or convert to an API (see bonus section below).

---
