import { NosanaLLM } from './llm';
import { WebSearchTool } from './tools';
import { BrightDataScraper } from './scraper';

export class WebSearchAgent {
  private llm: NosanaLLM;
  private searchTool: WebSearchTool;

  constructor(nosanaUrl: string, brightdataToken: string, model?: string) {
    this.llm = new NosanaLLM(nosanaUrl, model);
    const scraper = new BrightDataScraper(brightdataToken);
    this.searchTool = new WebSearchTool(scraper);
  }

  async run(userQuery: string): Promise<string> {
    console.log(`\n💭 User Query: ${userQuery}\n`);
    
    // Validate input
    if (!userQuery || typeof userQuery !== 'string' || userQuery.trim().length === 0) {
      console.error('❌ Invalid user query provided to WebSearchAgent:', userQuery);
      return 'Error: Invalid query provided.';
    }

    // Step 1: Determine if we need to search
    const needsSearch = await this.shouldSearch(userQuery);
    console.log(`💡 Search needed: ${needsSearch ? 'YES' : 'NO'}`);
    
    if (!needsSearch) {
      console.log('📝 Answering directly without search...');
      return await this.llm.generate(userQuery);
    }

    // Step 2: Extract search query
    console.log('🔍 Determining what to search for...');
    const searchQuery = await this.extractSearchQuery(userQuery);
    console.log(`🔑 Extracted search query: "${searchQuery}"`);
    
    // Validate the extracted search query
    if (!searchQuery || typeof searchQuery !== 'string' || searchQuery.trim().length === 0) {
      console.error('❌ Invalid search query extracted:', searchQuery);
      return 'Error: Could not extract a valid search query.';
    }
    
    // Step 3: Perform web search
    console.log(`🚀 Executing web search...`);
    const searchResults = await this.searchTool._call(searchQuery.trim());
    console.log(`🏁 Web search completed`);
    
    // Log the raw search results for debugging
    console.log(`📄 Raw search results preview: ${searchResults.substring(0, 100)}...`);
    
    // Step 4: Generate answer based on search results
    console.log('🧠 Generating answer from search results...');
    const finalAnswer = await this.generateAnswer(userQuery, searchResults);
    return finalAnswer;
  }

  private async shouldSearch(query: string): Promise<boolean> {
    console.log(`📋 Evaluating if search is needed for: "${query}"`);
    
    const prompt = `Does this question require searching the web for current information? Answer only YES or NO.
    
Question: ${query}

Answer:`;

    const response = await this.llm.generate(prompt);
    
    const result = response.toLowerCase().includes('yes');
    console.log(`📊 Evaluation result: ${result ? 'SEARCH REQUIRED' : 'DIRECT ANSWER'}`);
    
    return result;
  }

  private async extractSearchQuery(query: string): Promise<string> {
    console.log(`📋 Extracting search query from: "${query}"`);
    
    const prompt = `Extract a concise search query (3-6 words) from this question:

Question: ${query}

Search query:`;

    console.log(`📤 Sending extraction prompt to LLM...`);
    const response = await this.llm.generate(prompt);
    console.log(`📥 Received LLM response: "${response}"`);
    
    const result = response.trim();
    console.log(`🔑 Final extracted search query: "${result}"`);
    
    return result;
  }

  private async generateAnswer(originalQuery: string, searchResults: string): Promise<string> {
    console.log(`📋 Generating final answer for: "${originalQuery}"`);
    console.log(`📎 With search results length: ${searchResults.length} characters`);
    
    // Check if we have an error message instead of results
    if (searchResults.startsWith('Error:') || searchResults === 'No results found.') {
      console.warn('⚠️ Search returned an error or no results');
      return `I couldn't find information about "${originalQuery}" due to a search error. Please try rephrasing your question.`;
    }
    
    const prompt = `Based on the following search results, answer the user's question accurately and concisely.

User Question: ${originalQuery}

Search Results:
${searchResults}

Answer:`;

    const result = await this.llm.chat([
      { role: 'system', content: 'You are a helpful AI assistant that answers questions based on search results. Be concise and accurate.' },
      { role: 'user', content: prompt }
    ]);
    
    console.log(`📥 Received final answer from LLM (${result.length} characters)`);
    
    return result;
  }
}