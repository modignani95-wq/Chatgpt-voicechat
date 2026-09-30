import React from 'react';
import { AppStateId } from '../types';
import { Smartphone, Monitor, RefreshCw, Mic, Volume2, CheckCircle2, ChevronRight } from 'lucide-react';

interface StateNavigatorProps {
  currentState: AppStateId;
  onSelectState: (state: AppStateId) => void;
  isPhoneFrame: boolean;
  onTogglePhoneFrame: () => void;
  isRealMic: boolean;
  onToggleMicSource: () => void;
  onReset: () => void;
}

const FLOW_STEPS: { id: AppStateId; label: string; badge: string; desc: string }[] = [
  {
    id: 'STATE_1_TYPING',
    label: 'State 1: Typing',
    badge: 'State 1',
    desc: 'Types automation script query. When wrapping past line 1, tooltip appears over mic.',
  },
  {
    id: 'STATE_2A_DISMISSED',
    label: 'State 2A: Dismissal',
    badge: 'State 2A',
    desc: 'Tap text field to edit word; tooltip dismisses without interrupting.',
  },
  {
    id: 'STATE_2B_VOICE_SHEET',
    label: 'State 2B: Voice Click',
    badge: 'State 2B',
    desc: 'Tap mic icon; bottom sheet offers [Upload PDF] or [Ask Directly].',
  },
  {
    id: 'STATE_3_VOICE_LISTENING',
    label: 'State 3: Listening',
    badge: 'State 3',
    desc: 'Keyboard collapses, waveform visualizer pulses, listening starts.',
  },
  {
    id: 'STATE_4_LIVE_TRANSCRIBING',
    label: 'State 4: Streaming',
    badge: 'State 4',
    desc: 'Words stream into the composer text box in real time.',
  },
  {
    id: 'STATE_5_REVIEW_SEND',
    label: 'State 5: Review & Send',
    badge: 'State 5',
    desc: 'Tap Stop. Draft remains editable; tap Send to post question.',
  },
];

export const StateNavigator: React.FC<StateNavigatorProps> = ({
  currentState,
  onSelectState,
  isPhoneFrame,
  onTogglePhoneFrame,
  isRealMic,
  onToggleMicSource,
  onReset,
}) => {
  return (
    <aside aria-label="Tester Controls" className="w-full bg-neutral-900 text-white border-b border-neutral-800 px-4 py-2.5 shadow-md">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        {/* Left: Branding & Step Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 custom-scrollbar">
          <span className="font-semibold text-neutral-300 whitespace-nowrap mr-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Voice Flow States:
          </span>

          <div className="flex items-center gap-1.5 shrink-0">
            {FLOW_STEPS.map((step) => {
              const isActive = currentState === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => onSelectState(step.id)}
                  title={step.desc}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
                  }`}
                >
                  <span>{step.badge}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Controls & Toggles */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Mic Mode Selector */}
          <button
            onClick={onToggleMicSource}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-medium transition-colors cursor-pointer ${
              isRealMic
                ? 'bg-emerald-950/80 border-emerald-600 text-emerald-300'
                : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700'
            }`}
            title={isRealMic ? 'Using hardware microphone' : 'Using automatic simulated voice dictation'}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>{isRealMic ? 'Hardware Mic' : 'Simulated Voice'}</span>
          </button>

          {/* Phone Frame Toggle */}
          <button
            onClick={onTogglePhoneFrame}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-300 hover:bg-neutral-700 cursor-pointer"
            title="Toggle between phone frame and full screen"
          >
            {isPhoneFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Expanded</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Phone Frame</span>
              </>
            )}
          </button>

          {/* Reset Demo Button */}
          <button
            onClick={onReset}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-300 hover:bg-neutral-700 hover:text-white cursor-pointer"
            title="Reset flow to starting state"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
