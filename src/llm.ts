import axios from 'axios';

export class NosanaLLM {
  private baseUrl: string;
  private model: string;

  constructor(baseUrl: string, model?: string) {
    // Clean up the URL - remove trailing slashes and /api if present
    this.baseUrl = baseUrl.replace(/\/+$/, '').replace(/\/api$/, '');
    this.model = model || String(process.env.NOSANA_MODEL);
    
    console.log(`🔗 Connecting to: ${this.baseUrl}`);
    console.log(`🤖 Using model: ${this.model}`);
  }

  /**
   * Generate a completion using OpenAI-compatible format
   * This is more widely supported than native Ollama format
   */
  async generate(prompt: string): Promise<string> {
    // Use OpenAI-compatible endpoint
    const url = `${this.baseUrl}/v1/chat/completions`;
    
    console.log(`📤 POST ${url}`);
    
    try {
      const response = await axios.post(
        url,
        {
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
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 60000
        }
      );

      // OpenAI format response
      return response.data.choices[0].message.content;
      
    } catch (error: any) {
      if (error.response) {
        console.error('❌ Server Error Details:', {
          status: error.response.status,
          statusText: error.response.statusText,
          url: url,
          data: JSON.stringify(error.response.data, null, 2)
        });
        
        // If v1 endpoint doesn't work, try native Ollama
        if (error.response.status === 404 || error.response.status === 405) {
          console.log('⚠️  OpenAI endpoint failed, trying native Ollama format...');
          return await this.generateNativeOllama(prompt);
        }
        
        throw new Error(`Nosana API Error ${error.response.status}: ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        console.error('❌ No Response from server');
        throw new Error(`No response from Nosana: ${error.message}`);
      } else {
        console.error('❌ Request setup error:', error.message);
        throw new Error(`Request failed: ${error.message}`);
      }
    }
  }

  /**
   * Fallback: Try native Ollama format
   */
  private async generateNativeOllama(prompt: string): Promise<string> {
    const url = `${this.baseUrl}/api/generate`;
    
    console.log(`📤 Trying native Ollama: POST ${url}`);
    
    try {
      const response = await axios.post(
        url,
        {
          model: this.model,
          prompt: prompt,
          stream: false
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 60000
        }
      );

      return response.data.response;
    } catch (error: any) {
      console.error('❌ Native Ollama also failed:', error.message);
      throw new Error(`Both API formats failed. Check Nosana documentation for correct endpoint.`);
    }
  }

  /**
   * Chat with conversation history
   */
  async chat(messages: Array<{ role: string; content: string }>): Promise<string> {
    const url = `${this.baseUrl}/v1/chat/completions`;
    
    console.log(`📤 POST ${url}`);
    
    try {
      const response = await axios.post(
        url,
        {
          model: this.model,
          messages: messages,
          temperature: 0.7,
          max_tokens: 1000,
          stream: false
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 60000
        }
      );

      return response.data.choices[0].message.content;
      
    } catch (error: any) {
      if (error.response) {
        console.error('❌ Chat Error:', {
          status: error.response.status,
          data: JSON.stringify(error.response.data, null, 2)
        });
        
        // Try native Ollama chat endpoint as fallback
        if (error.response.status === 404 || error.response.status === 405) {
          console.log('⚠️  Trying native Ollama chat...');
          return await this.chatNativeOllama(messages);
        }
        
        throw new Error(`Chat API Error: ${JSON.stringify(error.response.data)}`);
      }
      throw new Error(`Chat request failed: ${error.message}`);
    }
  }

  /**
   * Fallback: Native Ollama chat
   */
  private async chatNativeOllama(messages: Array<{ role: string; content: string }>): Promise<string> {
    const url = `${this.baseUrl}/api/chat`;
    
    try {
      const response = await axios.post(
        url,
        {
          model: this.model,
          messages: messages,
          stream: false
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 60000
        }
      );

      return response.data.message.content;
    } catch (error: any) {
      throw new Error(`Native chat also failed: ${error.message}`);
    }
  }

  /**
   * Test connection to verify API is working
   */
  async testConnection(): Promise<boolean> {
    console.log('🧪 Testing Nosana connection...\n');
    
    // Try OpenAI-compatible endpoint first
    try {
      console.log('1️⃣ Testing OpenAI-compatible endpoint...');
      const url = `${this.baseUrl}/v1/models`;
      const response = await axios.get(url, { timeout: 10000 });
      console.log('✅ OpenAI endpoint working!');
      console.log('📋 Available models:', response.data);
      return true;
    } catch (error: any) {
      console.log('⚠️  OpenAI endpoint not available');
    }
    
    // Try native Ollama endpoint
    try {
      console.log('2️⃣ Testing native Ollama endpoint...');
      const url = `${this.baseUrl}/api/tags`;
      const response = await axios.get(url, { timeout: 10000 });
      console.log('✅ Native Ollama endpoint working!');
      console.log('📋 Available models:', response.data);
      return true;
    } catch (error: any) {
      console.log('❌ Native Ollama endpoint failed');
    }
    
    // Try a simple generation test
    try {
      console.log('3️⃣ Testing direct generation...');
      const result = await this.generate('Say "OK" if you can hear me');
      console.log('✅ Generation test successful!');
      console.log('📝 Response:', result.substring(0, 100));
      return true;
    } catch (error: any) {
      console.error('❌ All connection tests failed');
      console.error('Error:', error.message);
      return false;
    }
  }
}