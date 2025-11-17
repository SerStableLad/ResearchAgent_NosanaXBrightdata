import dotenv from 'dotenv';
import { WebSearchAgent } from './agent';
import * as readline from 'readline';

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function main() {
  const nosanaUrl = process.env.NOSANA_OLLAMA_URL;
  const brightdataToken = process.env.BRIGHTDATA_API_TOKEN;

  if (!nosanaUrl || !brightdataToken) {
    console.error('❌ Missing environment variables! Check your .env file.');
    process.exit(1);
  }

  console.log('🚀 Web Search AI Agent Starting...\n');
  
  const agent = new WebSearchAgent(nosanaUrl, brightdataToken);

  const askQuestion = () => {
    rl.question('\n💬 Ask me anything (or type "exit" to quit): ', async (query) => {
      if (query.toLowerCase() === 'exit') {
        console.log('👋 Goodbye!');
        rl.close();
        return;
      }

      try {
        const answer = await agent.run(query);
        console.log(`\n✅ Answer: ${answer}\n`);
      } catch (error) {
        console.error('❌ Error:', error);
      }

      askQuestion();
    });
  };

  askQuestion();
}

main();