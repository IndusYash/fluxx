import type { LucideIcon } from 'lucide-react';

export type MessageRole = 'user' | 'assistant' | 'system';
export type MessageStatus = 'sending' | 'sent' | 'error';
export type RobotMood = 'idle' | 'typing' | 'thinking' | 'happy' | 'wave' | 'blink';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  status?: MessageStatus;
}

export interface QuickChip {
  id: string;
  label: string;
  iconName: 'calendar' | 'compass' | 'search' | 'info';
  prompt: string;
}

export interface KnowledgeItem {
  id: string;
  keywords: string[];
  title: string;
  answer: string;
}

