import React, { useEffect } from 'react';

export default function ChatbotWidget() {
  const apiUrl =
    (import.meta.env.NEXT_PUBLIC_CHATBOT_API_URL as string | undefined) ||
    (import.meta.env.VITE_CHATBOT_API_URL as string | undefined);
  const siteKey =
    (import.meta.env.NEXT_PUBLIC_CHATBOT_SITE_KEY as string | undefined) ||
    (import.meta.env.VITE_CHATBOT_SITE_KEY as string | undefined);

  useEffect(() => {
    if (!apiUrl || !siteKey) return;
    if (typeof window === 'undefined') return;

    if (customElements.get('ai-website-assistant')) return;

    const existingScript = document.querySelector('script[data-ai-assistant]');
    if (existingScript) return;

    const script = document.createElement('script');
    script.src = '/widget/ai-website-assistant.iife.js';
    script.async = true;
    script.setAttribute('data-ai-assistant', 'true');
    document.body.appendChild(script);
  }, [apiUrl, siteKey]);

  if (!apiUrl || !siteKey) {
    return null;
  }

  return (
    <ai-website-assistant
      api-url={apiUrl}
      site-key={siteKey}
    />
  );
}
