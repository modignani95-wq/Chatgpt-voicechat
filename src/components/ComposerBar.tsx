import React, { useRef, useEffect } from 'react';
import { Plus, Mic, ArrowUp, Square, FileText, X } from 'lucide-react';
import { AttachmentFile } from '../types';
import { VoiceTooltip } from './VoiceTooltip';

interface ComposerBarProps {
  text: string;
  onChangeText: (val: string) => void;
  onFocusInput: () => void;
  onClickInput?: () => void;
  onMicClick: () => void;
  onSend: () => void;
  onStopVoice?: () => void;
  isListening: boolean;
  canSend: boolean;
  tooltipVisible: boolean;
  onDismissTooltip: () => void;
  attachedDoc: AttachmentFile | null;
  onRemoveDoc: () => void;
  onOpenAttachmentMenu?: () => void;
}

export const ComposerBar: React.FC<ComposerBarProps> = ({
  text,
  onChangeText,
  onFocusInput,
  onClickInput,
  onMicClick,
  onSend,
  onStopVoice,
  isListening,
  canSend,
  tooltipVisible,
  onDismissTooltip,
  attachedDoc,
  onRemoveDoc,
  onOpenAttachmentMenu,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const nextHeight = Math.min(textareaRef.current.scrollHeight, 120);
      textareaRef.current.style.height = `${Math.max(nextHeight, 24)}px`;
    }
  }, [text]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (canSend) {
        onSend();
      }
    }
  };

  return (
    <div className="relative px-3 py-2 bg-white/95 backdrop-blur-md border-t border-neutral-100">
      {/* Tooltip positioned above the mic button */}
      <VoiceTooltip
        visible={tooltipVisible && !isListening}
        onDismiss={onDismissTooltip}
        onTriggerVoice={onMicClick}
      />

      {/* Main Composer Pill Input Box */}
      <div
        onClick={onClickInput}
        className="flex flex-col bg-neutral-100/90 rounded-3xl border border-neutral-200/80 p-1.5 transition-all focus-within:bg-white focus-within:border-neutral-300 focus-within:shadow-sm"
      >
        {/* Attached Document Pill (if present) */}
        {attachedDoc && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 mb-1.5 ml-2 mt-1 bg-white border border-neutral-200 rounded-full w-fit max-w-[90%] shadow-2xs">
            <FileText className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="text-xs font-medium text-neutral-800 truncate">
              {attachedDoc.name}
            </span>
            <span className="text-[10px] text-neutral-400 shrink-0">
              ({attachedDoc.size})
            </span>
            <button
              onClick={onRemoveDoc}
              aria-label="Remove attached document"
              className="text-neutral-400 hover:text-neutral-700 p-0.5 ml-1 rounded-full cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        <div className="flex items-end gap-1.5 px-1">
          {/* Plus Action Button */}
          <button
            onClick={onOpenAttachmentMenu}
            aria-label="Attach file or action"
            className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60 active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            <Plus className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Text Area */}
          <div className="flex-1 py-1 px-1">
            <textarea
              ref={textareaRef}
              rows={1}
              value={text}
              onChange={(e) => onChangeText(e.target.value)}
              onFocus={onFocusInput}
              onClick={onClickInput}
              onKeyDown={handleKeyDown}
              placeholder={isListening ? "Listening to your voice..." : "Ask ChatGPT"}
              className={`w-full bg-transparent text-neutral-900 placeholder:text-neutral-400 text-[15px] leading-relaxed resize-none focus:outline-none custom-scrollbar ${
                isListening ? 'font-medium text-blue-900' : ''
              }`}
            />
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-1 shrink-0 pb-0.5">
            {/* Microphone Icon Button (Triggers State 2B Bottom Sheet) */}
            <button
              onClick={onMicClick}
              title="Voice Study / Dictation"
              aria-label="Use voice input"
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                isListening
                  ? 'text-blue-600 bg-blue-100/80 scale-105'
                  : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-200/60 active:scale-95'
              }`}
            >
              <Mic className="w-5 h-5" />
            </button>

            {/* Dynamic Secondary Action: Voice Mode Orb / Stop / Send */}
            {isListening ? (
              // Stop Voice Button
              <button
                onClick={onStopVoice}
                aria-label="Stop recording"
                className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white flex items-center justify-center shadow-sm active:scale-90 transition-transform cursor-pointer"
              >
                <Square className="w-3.5 h-3.5 fill-white" />
              </button>
            ) : canSend ? (
              // Send Button (Black/Blue circle with Up Arrow)
              <button
                onClick={onSend}
                aria-label="Send message"
                className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white flex items-center justify-center shadow-md active:scale-90 transition-transform cursor-pointer"
              >
                <ArrowUp className="w-5 h-5 stroke-[2.5]" />
              </button>
            ) : (
              // ChatGPT Blue Voice Mode Waveform Icon (As shown in WhatsApp Image 1 & 2)
              <button
                onClick={onMicClick}
                aria-label="ChatGPT Voice Mode"
                className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                {/* 4 vertical waveform lines */}
                <div className="flex items-center justify-center gap-[2.5px] h-3.5">
                  <span className="w-[2px] h-2 bg-white rounded-full" />
                  <span className="w-[2px] h-3.5 bg-white rounded-full" />
                  <span className="w-[2px] h-2.5 bg-white rounded-full" />
                  <span className="w-[2px] h-1.5 bg-white rounded-full" />
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
