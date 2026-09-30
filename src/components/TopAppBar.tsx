import React from 'react';
import { Edit3, Sparkles } from 'lucide-react';

interface TopAppBarProps {
  onOpenMenu?: () => void;
  onNewChat?: () => void;
  activeModel?: string;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  onOpenMenu,
  onNewChat,
  activeModel = 'ChatGPT',
}) => {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-white/95 backdrop-blur-md border-b border-neutral-100 select-none">
      {/* Left Menu Button: Two horizontal bars inside a circle button */}
      <button
        onClick={onOpenMenu}
        aria-label="Open sidebar menu"
        className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-800 hover:bg-neutral-100 active:scale-90 transition-transform cursor-pointer"
      >
        <div className="flex flex-col gap-1.5 w-4 items-start">
          <span className="h-[2px] w-4 bg-neutral-800 rounded-full" />
          <span className="h-[2px] w-2.5 bg-neutral-800 rounded-full" />
        </div>
      </button>

      {/* Center Model Indicator */}
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-neutral-800 font-semibold text-[15px] tracking-tight">
        <span>{activeModel}</span>
        <span className="text-[11px] font-medium text-neutral-400">4o</span>
      </div>

      {/* Right New Chat / Compose Button */}
      <button
        onClick={onNewChat}
        aria-label="Start new chat"
        className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-800 hover:bg-neutral-100 active:scale-90 transition-transform cursor-pointer"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-neutral-700"
        >
          {/* Speech bubble with pencil or edit shape */}
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </button>
    </header>
  );
};
