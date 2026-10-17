import React, { useState, useEffect, forwardRef } from 'react';
import { introManager } from '@/lib/introState';

interface ChatbotLauncherProps {
  onClick: () => void;
  isOpen: boolean;
}

export const ChatbotLauncher = forwardRef<HTMLButtonElement, ChatbotLauncherProps>(
  ({ onClick, isOpen }, ref) => {
    const [isVisible, setIsVisible] = useState(() => introManager.isDone());

    useEffect(() => {
      if (introManager.isDone()) {
        setIsVisible(true);
        return;
      }
      const unsubscribe = introManager.subscribe((state) => {
        if (state === 'done') {
          setIsVisible(true);
        }
      });
      return unsubscribe;
    }, []);

    if (!isVisible || isOpen) {
      return null;
    }

    return (
      <div
        className="fixed bottom-[calc(var(--ticker-h)+20px)] right-4 sm:right-6 z-[95] pointer-events-auto"
        style={{
          // Chamfered tile clip-path
          clipPath: 'none',
        }}
      >
        {/* Soft 6s expanding pulse ring */}
        <div
          className="absolute inset-0 rounded-2xl border border-white/40 pointer-events-none animate-[ping_6s_cubic-bezier(0,0,0.2,1)_infinite]"
          aria-hidden="true"
        />

        {/* Tooltip on hover/focus */}
        <div
          role="tooltip"
          className="absolute -top-10 right-0 sm:right-1/2 sm:translate-x-1/2 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 pointer-events-none transition-all duration-200 ease-out translate-y-1 group-hover:translate-y-0 group-focus-visible:translate-y-0 px-3 py-1 rounded-full bg-[#0a0c10]/95 border border-white/20 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.8)] text-white text-[11px] font-mono tracking-widest uppercase whitespace-nowrap z-10"
        >
          Ask FLUX AI
        </div>

        {/* Launcher Button */}
        <button
          ref={ref}
          onClick={onClick}
          aria-label="Open FLUX AI Chatbot"
          aria-haspopup="dialog"
          className="group relative w-[60px] h-[60px] rounded-2xl bg-[#080b12] border-2 border-white/35 flex items-center justify-center shadow-[0_0_24px_rgba(255,255,255,0.22)] hover:shadow-[0_0_36px_rgba(255,255,255,0.45)] hover:-translate-y-1.5 hover:-rotate-3 active:scale-95 transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          style={{
            clipPath:
              'polygon(12px 0%, calc(100% - 12px) 0%, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0% calc(100% - 12px), 0% 12px)',
          }}
        >
          {/* Inner subtle chamfer edge glow */}
          <div
            className="absolute inset-[1px] rounded-2xl border border-white/20 pointer-events-none"
            style={{
              clipPath:
                'polygon(11px 0%, calc(100% - 11px) 0%, 100% 11px, 100% calc(100% - 11px), calc(100% - 11px) 100%, 11px 100%, 0% calc(100% - 11px), 0% 11px)',
            }}
          />

          {/* Mini Robot Visor with glowing "^ ^" eyes */}
          <div className="relative w-11 h-7 rounded-full bg-[#030508] border border-white/40 flex items-center justify-center shadow-[0_0_12px_rgba(103,232,249,0.35)] overflow-hidden">
            {/* Subtle visor gloss reflection */}
            <div className="absolute top-0.5 inset-x-2 h-1 rounded-full bg-white/40 blur-[0.5px]" />

            {/* Glowing "^ ^" SVG eyes */}
            <svg
              viewBox="0 0 40 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-4 drop-shadow-[0_0_6px_#ffffff] drop-shadow-[0_0_12px_#38bdf8]"
            >
              <path
                d="M 7 14 Q 13 2 19 14"
                stroke="#ffffff"
                strokeWidth="3.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 21 14 Q 27 2 33 14"
                stroke="#ffffff"
                strokeWidth="3.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
      </div>
    );
  }
);

ChatbotLauncher.displayName = 'ChatbotLauncher';

export default ChatbotLauncher;

