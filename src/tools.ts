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
      return 'No results found.';
    }

    let output = `Found ${results.length} results:\n\n`;
    results.forEach((result, index) => {
      output += `${index + 1}. ${result.title}\n`;
      output += `   URL: ${result.url}\n`;
      output += `   ${result.snippet}\n\n`;
    });

    return output;
  }
}