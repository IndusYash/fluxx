import React, { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { useChatStore } from './chatbot/useChatStore';
import ChatbotLauncher from './chatbot/ChatbotLauncher';
import ChatbotPanel from './chatbot/ChatbotPanel';

export default function ChatbotWidget() {
  const {
    messages,
    isOpen,
    isMinimized,
    isLoading,
    hasInteracted,
    hasError,
    robotMood,
    setIsTypingInput,
    sendMessage,
    retryLastMessage,
    openChat,
    minimizeChat,
    closeChat,
  } = useChatStore();

  const [isPanelMounted, setIsPanelMounted] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Synchronize mounting with open state
  useEffect(() => {
    if (isOpen) {
      setIsPanelMounted(true);
    }
  }, [isOpen]);

  // Handle open animation when panel mounts
  useEffect(() => {
    if (!isPanelMounted || !panelRef.current) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      gsap.set(panelRef.current, { scale: 1, opacity: 1 });
      return;
    }

    if (tlRef.current) {
      tlRef.current.kill();
    }

    const tl = gsap.timeline();
    tlRef.current = tl;

    // 1. Panel morphs / scales in from bottom-right (scale 0.6 to 1, back.out ease, 0.45s)
    tl.fromTo(
      panelRef.current,
      { scale: 0.6, opacity: 0, transformOrigin: 'bottom right' },
      { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.2)' }
    );

    // 2. Robot pops up from behind panel's top-right edge (scale 0 to 1 with overshoot, 0.4s)
    const robotWrapper = panelRef.current.querySelector('.chat-robot-container');
    if (robotWrapper) {
      tl.fromTo(
        robotWrapper,
        { scale: 0, y: 40, opacity: 0, transformOrigin: 'bottom center' },
        { scale: 1, y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.8)' },
        '-=0.2'
      );
    }

    // 3. Greeting bubble & chips stagger in
    const bubbles = panelRef.current.querySelectorAll('.chat-greeting-bubble');
    if (bubbles.length > 0) {
      tl.fromTo(
        bubbles,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
        '-=0.15'
      );
    }

    const chips = panelRef.current.querySelectorAll('.chat-quick-chip');
    if (chips.length > 0) {
      tl.fromTo(
        chips,
        { opacity: 0, y: 10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.06, duration: 0.3, ease: 'back.out(1.2)' },
        '-=0.2'
      );
    }
  }, [isPanelMounted]);

  // Close / Minimize animation sequence
  const animateOut = useCallback(
    (onCompleteAction: () => void) => {
      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReduced || !panelRef.current) {
        setIsPanelMounted(false);
        onCompleteAction();
        launcherRef.current?.focus();
        return;
      }

      if (tlRef.current) {
        tlRef.current.kill();
      }

      const tl = gsap.timeline({
        onComplete: () => {
          setIsPanelMounted(false);
          onCompleteAction();
          // Restore focus to launcher button
          setTimeout(() => {
            launcherRef.current?.focus();
          }, 50);
        },
      });
      tlRef.current = tl;

      // 1. Robot sinks into pedestal first (0.25s)
      const robotWrapper = panelRef.current.querySelector('.chat-robot-container');
      if (robotWrapper) {
        tl.to(robotWrapper, {
          scale: 0,
          y: 35,
          opacity: 0,
          duration: 0.25,
          ease: 'power2.in',
        });
      }

      // 2. Panel collapses back into the launcher
      tl.to(
        panelRef.current,
        {
          scale: 0.6,
          opacity: 0,
          transformOrigin: 'bottom right',
          duration: 0.3,
          ease: 'power2.in',
        },
        '-=0.08'
      );
    },
    []
  );

  const handleMinimize = useCallback(() => {
    animateOut(() => {
      minimizeChat();
    });
  }, [animateOut, minimizeChat]);

  const handleClose = useCallback(() => {
    animateOut(() => {
      closeChat();
    });
  }, [animateOut, closeChat]);

  // Keyboard shortcut: Escape closes / minimizes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPanelMounted) {
        e.preventDefault();
        handleMinimize();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPanelMounted, handleMinimize]);

  return (
    <>
      {/* Closed State: Floating Launcher Tile */}
      <ChatbotLauncher
        ref={launcherRef}
        onClick={openChat}
        isOpen={isPanelMounted}
      />

      {/* Open State: Floating Chatbot Panel */}
      {isPanelMounted && (
        <ChatbotPanel
          ref={panelRef}
          messages={messages}
          isLoading={isLoading}
          hasInteracted={hasInteracted}
          hasError={hasError}
          robotMood={robotMood}
          onSendMessage={sendMessage}
          onRetry={retryLastMessage}
          onMinimize={handleMinimize}
          onClose={handleClose}
          onTypingInput={setIsTypingInput}
        />
      )}
    </>
  );
}
