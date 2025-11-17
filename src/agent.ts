import { NosanaLLM } from './llm';
import { WebSearchTool } from './tools';
import { BrightDataScraper } from './scraper';

export class WebSearchAgent {
  private llm: NosanaLLM;
  private searchTool: WebSearchTool;

  constructor(nosanaUrl: string, brightdataToken: string) {
    this.llm = new NosanaLLM(nosanaUrl);
    const scraper = new BrightDataScraper(brightdataToken);
    this.searchTool = new WebSearchTool(scraper);
  }

  async run(userQuery: string): Promise<string> {
    console.log(`\n💭 User Query: ${userQuery}\n`);

    // Step 1: Determine if we need to search
    const needsSearch = await this.shouldSearch(userQuery);
    
    if (!needsSearch) {
      console.log('📝 Answering directly without search...');
      return await this.llm.generate(userQuery);
    }

    // Step 2: Extract search query
    console.log('🤔 Determining what to search for...');
    const searchQuery = await this.extractSearchQuery(userQuery);
    
    // Step 3: Perform web search
    const searchResults = await this.searchTool._call(searchQuery);
    
    // Step 4: Generate answer based on search results
    console.log('🧠 Generating answer from search results...');
    const finalAnswer = await this.generateAnswer(userQuery, searchResults);
    
    return finalAnswer;
  }

  private async shouldSearch(query: string): Promise<boolean> {
    const prompt = `Does this question require searching the web for current information? Answer only YES or NO.
    
Question: ${query}

Answer:`;

    const response = await this.llm.generate(prompt);
    return response.toLowerCase().includes('yes');
  }

  private async extractSearchQuery(query: string): Promise<string> {
    const prompt = `Extract a concise search query (3-6 words) from this question:

Question: ${query}

Search query:`;

    const response = await this.llm.generate(prompt);
    return response.trim();
  }

  private async generateAnswer(originalQuery: string, searchResults: string): Promise<string> {
    const prompt = `Based on the following search results, answer the user's question accurately and concisely.

User Question: ${originalQuery}

Search Results:
${searchResults}

Answer:`;

    return await this.llm.chat([
      { role: 'system', content: 'You are a helpful AI assistant that answers questions based on search results. Be concise and accurate.' },
      { role: 'user', content: prompt }
    ]);
  }
}