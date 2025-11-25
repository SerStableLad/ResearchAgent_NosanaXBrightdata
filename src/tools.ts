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
    console.log(`📡 Initiating search request for query: "${query}"`);
    
    // Validate input query
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      console.error('❌ Invalid search query provided to WebSearchTool:', query);
      return 'Error: Invalid search query provided.';
    }
    
    const trimmedQuery = query.trim();
    const results = await this.scraper.searchWeb(trimmedQuery);
    console.log(`📨 Search request completed for query: "${trimmedQuery}"`);
    
    // Handle raw JSON response
    if (!results || Object.keys(results).length === 0) {
      console.warn('⚠️ No results found for query:', trimmedQuery);
      return 'No results found.';
    }

    console.log(`📬 Received raw results for query: "${trimmedQuery}"`);
    
    // Return the raw JSON as a string
    try {
      return JSON.stringify(results, null, 2);
    } catch (error) {
      console.error('❌ Failed to stringify raw results:', error);
      return 'Error processing results.';
    }
  }
}