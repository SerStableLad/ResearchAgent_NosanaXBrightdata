import axios from 'axios';

export class NosanaLLM {
  private baseUrl: string;
  private model: string;

  constructor(baseUrl: string, model: string = 'llama3.1:8b') {
    this.baseUrl = baseUrl;
    this.model = model;
  }

  async generate(prompt: string): Promise<string> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/generate`, {
        model: this.model,
        prompt: prompt,
        stream: false
      });

      return response.data.response;
    } catch (error) {
      throw new Error(`Nosana LLM Error: ${error}`);
    }
  }

  async chat(messages: Array<{ role: string; content: string }>): Promise<string> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/chat`, {
        model: this.model,
        messages: messages,
        stream: false
      });

      return response.data.message.content;
    } catch (error) {
      throw new Error(`Nosana Chat Error: ${error}`);
    }
  }
}