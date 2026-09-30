import React, { useState } from 'react';
import { Copy, Check, ThumbsUp, ThumbsDown, Sparkles, FileText, Bot } from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatConversationProps {
  messages: ChatMessage[];
  isGeneratingResponse?: boolean;
}

export const ChatConversation: React.FC<ChatConversationProps> = ({
  messages,
  isGeneratingResponse = false,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 custom-scrollbar select-text">
      {messages.map((msg) => {
        const isUser = msg.sender === 'user';

        return (
          <div
            key={msg.id}
            className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-200`}
          >
            {/* Attachment preview if user message has doc */}
            {isUser && msg.attachment && (
              <div className="flex items-center gap-2 mb-1.5 px-3 py-1.5 bg-neutral-100 border border-neutral-200 rounded-2xl max-w-[85%] text-xs shadow-2xs">
                <FileText className="w-4 h-4 text-rose-500 shrink-0" />
                <div className="truncate text-left">
                  <p className="font-semibold text-neutral-800 truncate">
                    {msg.attachment.name}
                  </p>
                  <p className="text-[10px] text-neutral-400">
                    PDF Study Guide · {msg.attachment.size}
                  </p>
                </div>
              </div>
            )}

            {/* Bubble */}
            <div
              className={`max-w-[85%] px-4 py-3 rounded-3xl text-[14px] leading-relaxed ${
                isUser
                  ? 'bg-neutral-100 text-neutral-900 rounded-br-md font-normal'
                  : 'bg-transparent text-neutral-900 pr-2 pl-0'
              }`}
            >
              {!isUser && (
                <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold text-neutral-800">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white text-[10px]">
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <span>ChatGPT</span>
                </div>
              )}

              {/* Message text with basic paragraph formatting */}
              <div className="space-y-2 whitespace-pre-wrap">
                {msg.text}
              </div>

              {/* Assistant Message Actions */}
              {!isUser && (
                <div className="flex items-center gap-2 mt-3 pt-2 text-neutral-400">
                  <button
                    onClick={() => handleCopy(msg.text, msg.id)}
                    aria-label="Copy response"
                    className="p-1 hover:text-neutral-700 rounded transition-colors cursor-pointer"
                  >
                    {copiedId === msg.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    aria-label="Helpful"
                    className="p-1 hover:text-neutral-700 rounded transition-colors cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    aria-label="Not helpful"
                    className="p-1 hover:text-neutral-700 rounded transition-colors cursor-pointer"
                  >
                    <ThumbsDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {isGeneratingResponse && (
        <div className="flex items-center gap-2 text-neutral-500 text-xs py-2 pl-2">
          <div className="w-2 h-2 rounded-full bg-neutral-400 animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-neutral-400 animate-pulse delay-100" />
          <div className="w-2 h-2 rounded-full bg-neutral-400 animate-pulse delay-200" />
          <span className="text-[12px] font-medium text-neutral-400 ml-1">
            Analyzing automation scripts...
          </span>
        </div>
      )}
    </div>
  );
};
