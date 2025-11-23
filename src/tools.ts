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
    console.log(`📡 Initiating search request...`);
    const results = await this.scraper.searchWeb(query);
    console.log(`📨 Search request completed`);
    
    // Handle raw JSON response
    if (!results || Object.keys(results).length === 0) {
      console.log(`📭 No results found for query: "${query}"`);
      console.log(`❓ This could be due to:`);
      console.log(`   • The search query returning no results from Google`);
      console.log(`   • Issues with the BrightData API configuration`);
      console.log(`   • Network connectivity issues`);
      return 'No results found.';
    }

    console.log(`📬 Received raw results for query: "${query}"`);
    
    // Return the raw JSON as a string
    try {
      const jsonString = JSON.stringify(results, null, 2);
      console.log(`📤 Returning raw JSON results (${jsonString.length} characters)`);
      return jsonString;
    } catch (error) {
      console.error('❌ Failed to stringify raw results:', error);
      return 'Error processing results.';
    }
  }
}