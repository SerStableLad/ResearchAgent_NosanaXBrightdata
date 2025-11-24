import axios from 'axios';

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

interface BrightDataResponse {
  results?: Array<any>;
  data?: Array<any>;
  [key: string]: any;
}

export class BrightDataScraper {
  private apiToken: string;
  private baseUrl = 'https://api.brightdata.com';
  private zone: string;

  constructor(apiToken: string, zone: string = 'serp_api1') {
    this.apiToken = apiToken;
    this.zone = zone;
  }

  async searchWeb(query: string): Promise<any> {
    try {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&hl=en&gl=us`;
      
      const requestBody = {
        zone: this.zone,
        url: searchUrl,
        format: 'json',
        data_format: 'parsed_light'
      };
      
      const response = await axios.post(
        `${this.baseUrl}/request`,
        requestBody,
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

      // Check if response has data
      if (!response.data) {
        return {};
      }
      
      // Return the body directly as JSON without any parsing
      if (response.data && response.data.body) {
        return response.data.body;
      }
      
      // If no body exists, return the entire response data
      return response.data;
    } catch (error: any) {
      console.error('BrightData Scraper Error:', error.message);
      
      if (error.response?.status) {
        console.error(`Status: ${error.response.status}`);
      }
      
      if (error.response?.data) {
        console.error(`Response Data: ${JSON.stringify(error.response.data)}`);
      }
      
      return {};
    }
  }
}