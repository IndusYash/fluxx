import type { ChatMessage } from './types';
import { findKnowledgeAnswer } from './knowledge';

export interface ChatClientOptions {
  apiUrl?: string;
}

export class ChatClient {
  private apiUrl: string | undefined;

  constructor(options?: ChatClientOptions) {
    this.apiUrl =
      options?.apiUrl ||
      (import.meta.env.VITE_CHAT_API_URL as string | undefined) ||
      (import.meta.env.VITE_CHATBOT_API_URL as string | undefined);
  }

  /**
   * Send chat messages to the backend or use local site knowledge base.
   * Supports optional onChunk callback for token-by-token streaming.
   */
  async send(
    messages: ChatMessage[],
    onChunk?: (chunk: string) => void,
    signal?: AbortSignal
  ): Promise<string> {
    const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
    const query = lastUserMsg?.content || '';

    // If external API URL is configured, POST to it
    if (this.apiUrl) {
      try {
        const response = await fetch(this.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: messages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
          signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
        }

        // Support Server-Sent Events / Streaming response
        if (response.body && onChunk) {
          const reader = response.body.getReader();
          const decoder = new TextDecoder('utf-8');
          let fullText = '';

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            fullText += chunk;
            onChunk(chunk);
          }
          return fullText;
        }

        const data = await response.json();
        const reply = (data.reply || data.content || data.message || '') as string;
        if (onChunk && reply) {
          onChunk(reply);
        }
        return reply;
      } catch (err: any) {
        if (signal?.aborted) {
          throw err;
        }
        console.warn('Chatbot external API error, falling back to local knowledge engine:', err.message);
        // Fall back to knowledge base on network failure
      }
    }

    // Default: Mock knowledge adapter answering from site's compiled data
    const answer = findKnowledgeAnswer(query);

    // Simulate realistic token streaming
    if (onChunk) {
      const words = answer.split(' ');
      let accumulated = '';
      for (let i = 0; i < words.length; i++) {
        if (signal?.aborted) break;
        const piece = i === 0 ? words[i] : ' ' + words[i];
        accumulated += piece;
        onChunk(piece);
        // Realistic micro-delay between word bursts
        await new Promise((r) => setTimeout(r, Math.min(22, 400 / words.length)));
      }
      return accumulated;
    }

    // Brief simulated delay if no streaming handler provided
    await new Promise((r) => setTimeout(r, 350));
    return answer;
  }
}

export const chatClient = new ChatClient();
