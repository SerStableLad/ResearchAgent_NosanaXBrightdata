import axios from 'axios';

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

export class BrightDataScraper {
  private apiToken: string;
  private baseUrl = 'https://api.brightdata.com/datasets/v3';

  constructor(apiToken: string) {
    this.apiToken = apiToken;
  }

  async searchWeb(query: string, limit: number = 5): Promise<SearchResult[]> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/trigger`,
        [{
          url: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
          country: 'us',
          limit: limit
        }],
        {
          headers: {
            'Authorization': `Bearer ${this.apiToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const snapshotId = response.data.snapshot_id;
      
      // Wait for results (poll the API)
      await this.sleep(5000); // Give it 5 seconds
      
      const results = await this.getResults(snapshotId);
      return this.parseResults(results);
    } catch (error) {
      console.error('BrightData Scraper Error:', error);
      return [];
    }
  }

  private async getResults(snapshotId: string): Promise<any> {
    const response = await axios.get(
      `${this.baseUrl}/snapshot/${snapshotId}`,
      {
        headers: {
          'Authorization': `Bearer ${this.apiToken}`
        }
      }
    );
    return response.data;
  }

  private parseResults(data: any): SearchResult[] {
    if (!data || !Array.isArray(data)) return [];
    
    return data.slice(0, 5).map((item: any) => ({
      title: item.title || 'No title',
      url: item.url || '',
      snippet: item.description || item.snippet || 'No description available'
    }));
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}