import type { ChatMessage } from './types';
import { findKnowledgeAnswer, classifyQuery, OFF_TOPIC_RESPONSE } from './knowledge';

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
   * Strictly enforces that non-FLUX queries are rejected.
   */
  async send(
    messages: ChatMessage[],
    onChunk?: (chunk: string) => void,
    signal?: AbortSignal
  ): Promise<string> {
    const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
    const query = lastUserMsg?.content || '';

    // Guardrail: Intercept off-topic queries immediately
    const category = classifyQuery(query);
    if (category === 'OFF_TOPIC') {
      const answer = OFF_TOPIC_RESPONSE;
      if (onChunk) {
        const words = answer.split(' ');
        let accumulated = '';
        for (let i = 0; i < words.length; i++) {
          if (signal?.aborted) break;
          const piece = i === 0 ? words[i] : ' ' + words[i];
          accumulated += piece;
          onChunk(piece);
          await new Promise((r) => setTimeout(r, Math.min(20, 350 / words.length)));
        }
        return accumulated;
      }
      await new Promise((r) => setTimeout(r, 200));
      return answer;
    }

    // If external API URL is configured, POST to it with strict system instructions
    if (this.apiUrl) {
      try {
        const response = await fetch(this.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [
              {
                role: 'system',
                content:
                  'You are FLUX AI, the official assistant for FLUX (Future Leaders of Unbound Xperiments), the research and innovation society at MMMUT Gorakhpur. You must ONLY answer queries directly related to FLUX society, its events (Ideathon, ByteBrawl, Hacktoberfest, ATAL FDP, bootcamps), student wings (AI/ML, Dev, CP, Design, Media, Operations), recruitment/inductions, faculty mentors (Prof. Anupama Kaushik Sharma, CSED), and initiatives (She Leads). If the user asks about ANY topic unrelated to FLUX, you must strictly refuse to answer and state that you are specifically designed to assist with FLUX-related inquiries at MMMUT Gorakhpur.',
              },
              ...messages.map((m) => ({
                role: m.role,
                content: m.content,
              })),
            ],
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
