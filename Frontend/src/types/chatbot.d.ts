import * as React from 'react';

export interface AIWebsiteAssistantAttributes extends React.HTMLAttributes<HTMLElement> {
  'api-url'?: string;
  'site-key'?: string;
  title?: string;
  subtitle?: string;
  theme?: 'light' | 'dark' | string;
  'suggested-prompts'?: string;
  position?: 'bottom-left' | 'bottom-right' | string;
  'accent-color'?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ai-website-assistant': React.DetailedHTMLProps<AIWebsiteAssistantAttributes, HTMLElement>;
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'ai-website-assistant': React.DetailedHTMLProps<AIWebsiteAssistantAttributes, HTMLElement>;
    }
  }
}
