import { useState, useEffect, useCallback, useRef } from 'react';
import type { ChatMessage, RobotMood } from './types';
import { chatClient } from './chatClient';

const STORAGE_KEY = 'flux_ai_chat_session_v1';

export const INITIAL_GREETING: ChatMessage = {
  id: 'greeting',
  role: 'assistant',
  content: "Hi! I'm FLUX AI 👋 Your assistant for the FLUX tech club at MMMUT Gorakhpur. Ask me about events, hackathons, faculty, or how to join.",
  timestamp: formatTime(),
  status: 'sent',
};

export function formatTime(d = new Date()): string {
  try {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  } catch {
    return '11:00 AM';
  }
}

export function useChatStore() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window === 'undefined') return [INITIAL_GREETING];
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore parsing error
    }
    return [INITIAL_GREETING];
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTypingInput, setIsTypingInput] = useState(false);
  const [robotMood, setRobotMood] = useState<RobotMood>('idle');
  const [hasError, setHasError] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Sync to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // storage quota or disabled
    }
  }, [messages]);

  // Synchronize robot mood with loading / typing states
  useEffect(() => {
    if (isLoading) {
      setRobotMood('thinking');
    } else if (isTypingInput) {
      setRobotMood('typing');
    } else {
      setRobotMood('idle');
    }
  }, [isLoading, isTypingInput]);

  const sendMessage = useCallback(async (content: string) => {
    const trimmed = content.trim();
    if (!trimmed || isLoading) return;

    setHasError(false);

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: formatTime(),
      status: 'sent',
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setIsLoading(true);
    setRobotMood('thinking');

    // Create placeholder for bot reply
    const botMessageId = `bot-${Date.now()}`;
    const botPlaceholder: ChatMessage = {
      id: botMessageId,
      role: 'assistant',
      content: '',
      timestamp: formatTime(),
      status: 'sending',
    };

    setMessages([...nextMessages, botPlaceholder]);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      await chatClient.send(
        nextMessages,
        (chunk) => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === botMessageId
                ? { ...m, content: (m.content || '') + chunk }
                : m
            )
          );
        },
        abortControllerRef.current.signal
      );

      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMessageId
            ? { ...m, status: 'sent' }
            : m
        )
      );

      // Trigger happy mood and bounce on reply arrival
      setRobotMood('happy');
      setTimeout(() => {
        setRobotMood('idle');
      }, 2500);
    } catch (err: any) {
      if (err.name === 'AbortError') return;
      console.error('Failed to get bot reply:', err);
      setHasError(true);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMessageId
            ? {
                ...m,
                content:
                  "I encountered an issue connecting to my knowledge base. Please try again.",
                status: 'error',
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  const retryLastMessage = useCallback(() => {
    // Find the last user message
    const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
    if (lastUserMsg) {
      // Remove any errored assistant messages after it
      setMessages((prev) => {
        const idx = prev.findIndex((m) => m.id === lastUserMsg.id);
        return prev.slice(0, idx);
      });
      sendMessage(lastUserMsg.content);
    }
  }, [messages, sendMessage]);

  const clearHistory = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setMessages([INITIAL_GREETING]);
    setHasError(false);
    setIsLoading(false);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const openChat = useCallback(() => {
    setIsMinimized(false);
    setIsOpen(true);
  }, []);

  const minimizeChat = useCallback(() => {
    setIsMinimized(true);
    setIsOpen(false);
  }, []);

  const closeChat = useCallback(() => {
    clearHistory();
    setIsMinimized(false);
    setIsOpen(false);
  }, [clearHistory]);

  const hasInteracted = messages.length > 1;

  return {
    messages,
    isOpen,
    isMinimized,
    isLoading,
    isTypingInput,
    robotMood,
    hasError,
    hasInteracted,
    setIsTypingInput,
    setRobotMood,
    sendMessage,
    retryLastMessage,
    clearHistory,
    openChat,
    minimizeChat,
    closeChat,
    setIsOpen,
  };
}
