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