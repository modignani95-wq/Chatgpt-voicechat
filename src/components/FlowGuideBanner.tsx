import React from 'react';
import { AppStateId } from '../types';
import { Info, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';

interface FlowGuideBannerProps {
  currentState: AppStateId;
  onNextStep?: () => void;
}

export const FlowGuideBanner: React.FC<FlowGuideBannerProps> = ({
  currentState,
  onNextStep,
}) => {
  const getBannerInfo = () => {
    switch (currentState) {
      case 'STATE_1_TYPING':
        return {
          title: 'State 1: Typing at Desk / Commute',
          desc: 'Text wraps past line 1. Tooltip is shown over the mic: "Typing a long doubt? Tap to use Voice".',
          nextHint: 'Click input field or keep typing to auto-dismiss (State 2A), or tap mic (State 2B)',
          color: 'from-blue-600 to-indigo-600',
        };
      case 'STATE_2A_DISMISSED':
        return {
          title: 'State 2A: Dismissal Path',
          desc: 'User clicked inside the text box or kept typing. The tooltip automatically dismissed immediately, leaving typing uninterrupted.',
          nextHint: 'Tap mic icon to test Voice Study Path (State 2B)',
          color: 'from-slate-700 to-slate-800',
        };
      case 'STATE_2B_VOICE_SHEET':
        return {
          title: 'State 2B: Voice Click Path',
          desc: 'User tapped the mic icon. Bottom sheet opened: "Start Voice Study: [Upload PDF] or [Ask Directly]".',
          nextHint: 'Click "Ask Directly" or select a PDF study guide',
          color: 'from-indigo-600 to-violet-600',
        };
      case 'STATE_3_VOICE_LISTENING':
        return {
          title: 'State 3: Voice Listening & Waveform',
          desc: 'Keyboard collapsed, audio waveform pulses dynamically, and voice listening started.',
          nextHint: 'Spoken words will now stream live into composer',
          color: 'from-blue-600 to-cyan-600',
        };
      case 'STATE_4_LIVE_TRANSCRIBING':
        return {
          title: 'State 4: Live Streamed Transcribing',
          desc: 'Spoken doubt about automation scripts streams in real-time into composer text box.',
          nextHint: 'Tap "Stop Voice" to enter Review & Send (State 5)',
          color: 'from-cyan-600 to-emerald-600',
        };
      case 'STATE_5_REVIEW_SEND':
        return {
          title: 'State 5: Review & Send',
          desc: 'Voice stopped. Draft remains editable in text field! Tap Send (↑) to post to ChatGPT.',
          nextHint: 'Edit text if needed, then tap Send button',
          color: 'from-emerald-600 to-teal-700',
        };
      case 'STATE_POSTED_CHAT':
        return {
          title: 'Question Posted',
          desc: 'Doubt and study material posted to ChatGPT conversation with AI analysis.',
          nextHint: 'Tap New Chat to repeat the flow',
          color: 'from-neutral-800 to-neutral-900',
        };
    }
  };

  const info = getBannerInfo();

  return (
    <div className="w-full bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white px-3 py-2 border-b border-neutral-700/60 shadow-xs select-none">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
        <div className="flex items-start gap-2 min-w-0">
          <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold text-white tracking-tight">
                {info.title}
              </span>
            </div>
            <p className="text-[11px] text-neutral-300 leading-tight truncate sm:whitespace-normal">
              {info.desc}
            </p>
          </div>
        </div>

        {onNextStep && currentState !== 'STATE_POSTED_CHAT' && (
          <button
            onClick={onNextStep}
            className="shrink-0 flex items-center gap-1 px-2.5 py-1 bg-white/10 hover:bg-white/20 active:scale-95 text-neutral-100 rounded-lg text-[11px] font-medium transition-all cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};
