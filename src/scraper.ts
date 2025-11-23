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

  async searchWeb(query: string, limit: number = 5): Promise<any> {
    try {
      console.log(`🔍 Initiating web search for query: "${query}"`);
      console.log(`📍 Using zone: ${this.zone}`);
      
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&hl=en&gl=us`;
      console.log(`🌐 Search URL: ${searchUrl}`);
      
      const requestBody = {
        zone: this.zone,
        url: searchUrl,
        format: 'json',
        data_format: 'parsed_light'
      };
      
      console.log(`📦 Request body: ${JSON.stringify(requestBody, null, 2)}`);
      
      console.log(`📡 Sending request to BrightData API...`);
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
      
      console.log(`✅ Request sent successfully to BrightData API`);
      console.log(`📥 Received response with status: ${response.status}`);

      // Check if response has data
      if (!response.data) {
        console.log(`🔴 Response data is null or undefined`);
        return {};
      }
      
      // Return the body directly as JSON without any parsing
      if (response.data && response.data.body) {
        console.log('📦 Returning raw body directly');
        return response.data.body;
      }
      
      // If no body exists, return the entire response data
      console.log('📦 Returning entire response data');
      return response.data;
    } catch (error: any) {
      console.error('❌ BrightData Scraper Error:');
      console.error(`   Status: ${error.response?.status || 'N/A'}`);
      console.error(`   Message: ${error.message}`);
      
      if (error.response?.data) {
        console.error(`   Response Data: ${JSON.stringify(error.response.data, null, 2)}`);
        
        // Specific error diagnostics
        if (error.response.status === 404) {
          console.error('🚨 404 Error: This might indicate an incorrect endpoint or missing zone configuration');
        } else if (error.response.status === 401) {
          console.error('🚨 401 Error: This indicates an authentication problem with the API token');
        } else if (error.response.status === 403) {
          console.error('🚨 403 Error: This indicates the API token is valid but lacks permissions for the requested resource');
        }
      }
      
      return {};
    }
  }

}
