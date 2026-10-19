import React, { useRef, useEffect, useState, forwardRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Sparkles,
  Send,
  Minimize2,
  X,
  Calendar,
  Compass,
  Search,
  Info,
  RotateCcw,
} from 'lucide-react';
import type { ChatMessage, QuickChip, RobotMood } from './types';
import { QUICK_CHIPS } from './knowledge';
import RobotContainer from './RobotContainer';

interface ChatbotPanelProps {
  messages: ChatMessage[];
  isLoading: boolean;
  hasInteracted: boolean;
  hasError: boolean;
  robotMood: RobotMood;
  onSendMessage: (content: string) => void;
  onRetry: () => void;
  onMinimize: () => void;
  onClose: () => void;
  onTypingInput: (isTyping: boolean) => void;
}

/**
 * Cleans response markdown to ensure raw start '**' never flashes on screen,
 * especially during token streaming or at the start of bullet list items.
 */
function cleanMarkdown(content: string): string {
  if (!content) return '';
  // 1. Remove leading '**' from start of bullet points (e.g. "- **Title:**" -> "- Title:")
  let cleaned = content.replace(/^([ \t]*[-*]\s*)\*\*([^*]+)\*\*(:?)/gm, '$1$2$3');
  // 2. Remove standalone starting '**' if a line begins with '**'
  cleaned = cleaned.replace(/^([ \t]*)\*\*([^*]+)\*\*(:?)/gm, '$1$2$3');
  // 3. Auto-close any unclosed '**' so raw asterisks never flash during streaming
  const asterisksMatch = cleaned.match(/\*\*/g);
  if (asterisksMatch && asterisksMatch.length % 2 !== 0) {
    cleaned = cleaned + '**';
  }
  return cleaned;
}

export const ChatbotPanel = forwardRef<HTMLDivElement, ChatbotPanelProps>(
  (
    {
      messages,
      isLoading,
      hasInteracted,
      hasError,
      robotMood,
      onSendMessage,
      onRetry,
      onMinimize,
      onClose,
      onTypingInput,
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom on message change or loading state
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    // Focus input on mount
    useEffect(() => {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setInputValue(val);
      onTypingInput(val.trim().length > 0);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    };

    const handleSubmit = () => {
      const trimmed = inputValue.trim();
      if (!trimmed || isLoading) return;
      onSendMessage(trimmed);
      setInputValue('');
      onTypingInput(false);
    };

    const handleChipClick = (prompt: string) => {
      if (isLoading) return;
      onSendMessage(prompt);
    };

    const renderChipIcon = (name: QuickChip['iconName']) => {
      const iconClass = 'w-3.5 h-3.5 text-white/70 flex-shrink-0';
      switch (name) {
        case 'calendar':
          return <Calendar className={iconClass} />;
        case 'compass':
          return <Compass className={iconClass} />;
        case 'search':
          return <Search className={iconClass} />;
        case 'info':
        default:
          return <Info className={iconClass} />;
      }
    };

    return (
      <div
        ref={ref}
        role="dialog"
        aria-label="FLUX AI Chatbot"
        aria-modal="true"
        className="fixed bottom-[calc(var(--ticker-h)+16px)] right-3 sm:right-6 z-[95] w-[calc(100vw-24px)] sm:w-[370px] h-[500px] max-h-[72svh] flex flex-col pointer-events-auto select-none"
        style={{
          transformOrigin: 'bottom right',
        }}
      >
        {/* ========================================================
            3D Robot Floating on Top-Right Corner of the Panel
            Pedestal rests on top edge. Canvas overflows above panel.
           ======================================================== */}
        <div
          className="chat-robot-container absolute -top-[65px] sm:-top-[72px] right-2 sm:right-4 z-30 pointer-events-none"
          aria-hidden="true"
        >
          <RobotContainer mood={robotMood} />
        </div>

        {/* ========================================================
            Panel Main Shell Container
            Dark glass (rgba(10,12,16,0.78)), blur 18px, 1px border white 14%
            Chamfered bottom-left corner and right-edge mechanical tab
           ======================================================== */}
        <div
          className="relative w-full h-full rounded-[28px] bg-[#07090e]/96 sm:bg-[#06080d]/95 backdrop-blur-[32px] border border-white/30 shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(255,255,255,0.12)] flex flex-col overflow-hidden"
          style={{
            clipPath:
              'polygon(-2px -2px, calc(100% + 4px) -2px, calc(100% + 4px) calc(100% + 4px), 48px calc(100% + 4px), -2px calc(100% - 38px))',
          }}
        >
          {/* Glowing Edge Light Strips (Cool white blur glow) */}
          {/* Top-Left Curved Rim Accent */}
          <div
            className="absolute top-0 left-0 w-24 h-24 pointer-events-none z-20"
            aria-hidden="true"
          >
            <svg viewBox="0 0 96 96" fill="none" className="w-full h-full">
              <path
                d="M 0 28 C 0 12 12 0 28 0 L 76 0"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="drop-shadow-[0_0_8px_#ffffff]"
              />
            </svg>
          </div>

          {/* Right Edge Glowing Light Strip (Cool white glow matching mockup) */}
          <div
            className="absolute top-16 bottom-16 right-0 w-[2px] bg-gradient-to-b from-transparent via-white to-transparent shadow-[0_0_8px_#ffffff,0_0_16px_rgba(255,255,255,0.6)] pointer-events-none z-20"
            aria-hidden="true"
          />

          {/* Right Edge Mechanical Tab Accent */}
          <div
            className="absolute right-0 top-[48%] -translate-y-1/2 w-[3px] h-12 bg-white/90 rounded-l-full shadow-[0_0_10px_#ffffff] pointer-events-none z-20"
            aria-hidden="true"
          />

          {/* Bottom-Left Chamfer Glowing Accent */}
          <div
            className="absolute bottom-0 left-0 w-20 h-20 pointer-events-none z-20"
            aria-hidden="true"
          >
            <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
              <path
                d="M 48 80 L 0 42"
                stroke="#ffffff"
                strokeWidth="2.8"
                strokeLinecap="round"
                className="drop-shadow-[0_0_8px_#ffffff]"
              />
            </svg>
          </div>

          {/* Robot Pedestal Top-Edge Glowing Arc Socket */}
          <div
            className="absolute -top-1 right-7 sm:right-8 w-20 sm:w-24 h-3 rounded-full bg-cyan-400/25 blur-[3px] pointer-events-none z-10"
            aria-hidden="true"
          />

          {/* ========================================================
              HEADER
              Logo Tile, FLUX AI, Online Dot, Minimize (-) and Close (X)
              Buttons kept clear of the robot pedestal (pedestal at right-4..28)
             ======================================================== */}
          <header className="relative z-20 flex items-center justify-between px-4 pt-3.5 pb-3 border-b border-white/12 bg-[#07090e]/85">
            {/* Left: Logo Tile + Title + Status */}
            <div className="flex items-center gap-2.5">
              {/* Rounded Flux Logo Tile */}
              <div className="w-8 h-8 rounded-xl bg-black border border-white/30 flex items-center justify-center p-1.5 shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                <img src="/logo.svg" alt="FLUX" className="w-full h-full object-contain" />
              </div>

              {/* Title & Online Indicator */}
              <div className="flex flex-col">
                <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.2em] text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]">
                  FLUX AI
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                  <span className="font-mono text-[10px] tracking-wider text-neutral-400">
                    Online
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Header Buttons (Placed safely to the left of the pedestal area) */}
            <div className="flex items-center gap-1.5 pr-32 sm:pr-36 z-30">
              <button
                type="button"
                onClick={onMinimize}
                aria-label="Minimize chat"
                className="w-7 h-7 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 hover:border-white/40 flex items-center justify-center text-white/80 hover:text-white transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
              >
                <span className="w-3 h-0.5 bg-white/80 rounded-full" />
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close chat"
                className="w-7 h-7 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 hover:border-white/40 flex items-center justify-center text-white/80 hover:text-white transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
              >
                <X className="w-3.5 h-3.5 text-white/80" />
              </button>
            </div>
          </header>

          {/* ========================================================
              MESSAGES BODY AREA
              Lenis conflict isolated with data-lenis-prevent & contain
             ======================================================== */}
          <div
            data-lenis-prevent
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4 no-scrollbar"
            style={{ overscrollBehavior: 'contain' }}
            aria-live="polite"
          >
            {messages.map((message) => {
              const isUser = message.role === 'user';

              return (
                <div
                  key={message.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
                >
                  <div className={`flex items-start gap-2.5 max-w-[88%] ${isUser ? 'flex-row-reverse' : ''}`}>
                    {/* Bot Avatar Icon */}
                    {!isUser && (
                      <div className="w-7 h-7 rounded-lg bg-black border border-white/20 flex items-center justify-center p-1.5 flex-shrink-0 shadow-sm mt-0.5">
                        <img src="/logo.svg" alt="FLUX" className="w-full h-full object-contain" />
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div
                      className={`relative rounded-2xl px-4 py-3 text-xs sm:text-[13px] leading-relaxed backdrop-blur-md transition-all ${
                        isUser
                          ? 'bg-white/[0.22] border border-white/35 text-white rounded-tr-sm shadow-md font-medium'
                          : 'chat-greeting-bubble bg-[#111520]/95 border border-white/18 text-white rounded-tl-sm shadow-lg'
                      }`}
                    >
                      {isUser ? (
                        <div className="whitespace-pre-wrap break-words">{message.content}</div>
                      ) : (
                        <div className="chat-markdown-content break-words text-neutral-100">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              p: ({ children }) => (
                                <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
                              ),
                              strong: ({ children }) => (
                                <strong className="font-semibold text-white">{children}</strong>
                              ),
                              em: ({ children }) => (
                                <em className="italic text-neutral-200">{children}</em>
                              ),
                              ul: ({ children }) => (
                                <ul className="space-y-1.5 my-2 list-none pl-0">{children}</ul>
                              ),
                              ol: ({ children }) => (
                                <ol className="space-y-1.5 my-2 list-decimal pl-4">{children}</ol>
                              ),
                              li: ({ children }) => (
                                <li className="flex items-start gap-2 text-neutral-200">
                                  <span className="text-white/60 select-none mt-0.5 text-[9px]">✦</span>
                                  <span className="flex-1 leading-relaxed">{children}</span>
                                </li>
                              ),
                              h1: ({ children }) => (
                                <h1 className="text-sm font-bold text-white mt-2.5 mb-1">{children}</h1>
                              ),
                              h2: ({ children }) => (
                                <h2 className="text-xs sm:text-sm font-bold text-white mt-2 mb-1">{children}</h2>
                              ),
                              h3: ({ children }) => (
                                <h3 className="text-xs sm:text-sm font-semibold text-white mt-2 mb-1">{children}</h3>
                              ),
                              code: ({ children }) => (
                                <code className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[11px] text-white">
                                  {children}
                                </code>
                              ),
                              a: ({ href, children }) => (
                                <a
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-white underline underline-offset-2 decoration-white/40 hover:decoration-white transition-colors"
                                >
                                  {children}
                                </a>
                              ),
                            }}
                          >
                            {cleanMarkdown(message.content)}
                          </ReactMarkdown>
                        </div>
                      )}

                      {/* Error Retry Option */}
                      {message.status === 'error' && (
                        <button
                          type="button"
                          onClick={onRetry}
                          className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 border border-white/20 text-[11px] text-white font-mono transition-all"
                        >
                          <RotateCcw className="w-3 h-3 text-white" />
                          Retry
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Timestamp */}
                  <span
                    className={`text-[10px] font-mono text-neutral-400 tracking-wider ${
                      isUser ? 'mr-1' : 'ml-10'
                    }`}
                  >
                    {message.timestamp}
                  </span>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2.5 max-w-[88%]">
                <div className="w-7 h-7 rounded-lg bg-black border border-white/20 flex items-center justify-center p-1.5 flex-shrink-0 shadow-sm mt-0.5">
                  <img src="/logo.svg" alt="FLUX" className="w-full h-full object-contain" />
                </div>
                <div className="rounded-2xl rounded-tl-sm px-4 py-3 bg-[#111520]/95 border border-white/18 flex items-center gap-1.5 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" />
                </div>
              </div>
            )}

            {/* Initial 2x2 Quick Chips (When no messages sent yet) */}
            {!hasInteracted && (
              <div className="pt-2 pb-1">
                <div className="grid grid-cols-2 gap-2">
                  {QUICK_CHIPS.map((chip) => (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => handleChipClick(chip.prompt)}
                      className="chat-quick-chip group flex items-center gap-2 p-2.5 rounded-xl bg-[#111520]/90 hover:bg-[#192030] border border-white/15 hover:border-white/35 text-left transition-all duration-200 hover:shadow-[0_0_14px_rgba(255,255,255,0.18)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
                    >
                      <div className="p-1 rounded-md bg-white/10 border border-white/20 group-hover:border-white/35 transition-colors">
                        {renderChipIcon(chip.iconName)}
                      </div>
                      <span className="text-xs text-white/90 group-hover:text-white font-medium">
                        {chip.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ========================================================
              COLLAPSED CHIPS ROW (After user starts chatting)
             ======================================================== */}
          {hasInteracted && (
            <div
              data-lenis-prevent
              className="flex items-center gap-1.5 px-4 py-1.5 overflow-x-auto no-scrollbar border-t border-white/[0.08] bg-[#07090e]/80"
            >
              {QUICK_CHIPS.map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => handleChipClick(chip.prompt)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111520]/90 hover:bg-white/15 border border-white/15 hover:border-white/35 text-[11px] text-white/90 hover:text-white whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
                >
                  {renderChipIcon(chip.iconName)}
                  <span>{chip.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* ========================================================
              INPUT BAR (Pill Container matching mockup)
             ======================================================== */}
          <footer className="p-3 sm:p-4 border-t border-white/12 bg-[#07090e]">
            <div className="relative flex items-center rounded-full bg-[#0d121c] border border-white/20 px-3.5 py-2 transition-all duration-200 focus-within:border-white/50 focus-within:ring-2 focus-within:ring-white/30 focus-within:shadow-[0_0_20px_rgba(255,255,255,0.22)]">
              {/* Sparkle Icon */}
              <Sparkles className="w-4 h-4 text-white/60 flex-shrink-0 ml-1" />

              {/* Message Input */}
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                disabled={isLoading}
                className="bg-transparent text-xs sm:text-sm text-white placeholder-white/45 focus:outline-none flex-1 px-3 py-1 disabled:opacity-50"
                aria-label="Message FLUX AI"
              />

              {/* Round White Send Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!inputValue.trim() || isLoading}
                aria-label="Send message"
                className="w-8 h-8 rounded-full bg-white hover:bg-neutral-200 active:scale-95 disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:bg-white flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(255,255,255,0.35)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Send className="w-3.5 h-3.5 text-black translate-x-[0.5px]" />
              </button>
            </div>
          </footer>
        </div>
      </div>
    );
  }
);

ChatbotPanel.displayName = 'ChatbotPanel';

export default ChatbotPanel;
