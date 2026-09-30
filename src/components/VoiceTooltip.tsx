import React from 'react';
import { Mic, X } from 'lucide-react';

interface VoiceTooltipProps {
  visible: boolean;
  onDismiss?: () => void;
  onTriggerVoice?: () => void;
}

export const VoiceTooltip: React.FC<VoiceTooltipProps> = ({
  visible,
  onDismiss,
  onTriggerVoice,
}) => {
  if (!visible) return null;

  return (
    <div
      role="tooltip"
      aria-live="polite"
      className="absolute -top-12 right-12 z-30 flex flex-col items-end pointer-events-auto transition-all duration-200 transform translate-y-0 opacity-100 animate-in fade-in slide-in-from-bottom-2"
    >
      {/* Tooltip Bubble */}
      <div
        onClick={onTriggerVoice}
        className="flex items-center gap-2 px-3 py-1.5 bg-neutral-900 text-white rounded-xl shadow-xl border border-neutral-700/60 text-xs font-medium cursor-pointer active:scale-95 transition-transform hover:bg-neutral-800"
      >
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        <span className="whitespace-nowrap select-none">
          Typing a long doubt? <strong className="text-blue-300 font-semibold underline decoration-blue-400/60 underline-offset-2">Tap to use Voice</strong>
        </span>
        {onDismiss && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDismiss();
            }}
            aria-label="Dismiss voice tip"
            className="text-neutral-400 hover:text-white p-0.5 rounded transition-colors ml-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Downward Pointer Notch aimed straight toward the Mic icon */}
      <div className="w-3 h-1.5 mr-3 overflow-hidden relative">
        <div className="w-2.5 h-2.5 bg-neutral-900 border-r border-b border-neutral-700/60 transform rotate-45 -translate-y-1.5 mx-auto shadow-sm" />
      </div>
    </div>
  );
};
