import { Injectable } from '@angular/core';
import Groq from 'groq-sdk';
import { environment } from './environment'; // Adjust path if necessary
import { ChatCompletion } from 'groq-sdk';
interface ChatCompletion {
  choices: { message: { content: string } }[];
}

@Injectable({
  providedIn: 'root',
})
export class GroqService {
  private groq = new Groq({ apiKey: environment.GROQ_API_KEY });

  constructor() {}

  async getChatCompletion(): Promise<string> {
    try {
      const chatCompletion: ChatCompletion = await this.groq.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: 'Explain the importance of fast language models',
          },
        ],
        model: 'llama3-8b-8192',
      });
      return chatCompletion.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Error fetching chat completion:', error);
      return 'An error occurred while fetching chat completion.';
    }
  }
}
