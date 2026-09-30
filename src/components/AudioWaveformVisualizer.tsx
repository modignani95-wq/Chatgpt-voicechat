import React, { useEffect, useState, useRef } from 'react';
import { Square, Mic, MicOff, Volume2 } from 'lucide-react';

interface AudioWaveformVisualizerProps {
  isListening: boolean;
  onStop: () => void;
  attachedDocName?: string;
  isRealMicActive?: boolean;
}

export const AudioWaveformVisualizer: React.FC<AudioWaveformVisualizerProps> = ({
  isListening,
  onStop,
  attachedDocName,
  isRealMicActive = false,
}) => {
  // Waveform bars amplitudes (16 bars)
  const [barHeights, setBarHeights] = useState<number[]>([
    20, 35, 60, 45, 80, 95, 70, 50, 85, 90, 65, 40, 55, 30, 20, 15,
  ]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isListening) return;

    let tick = 0;
    const updateWave = () => {
      tick += 0.12;
      setBarHeights((prev) =>
        prev.map((_, i) => {
          // Dynamic organic pulsing calculation
          const wave1 = Math.sin(tick * 1.5 + i * 0.45);
          const wave2 = Math.cos(tick * 0.8 - i * 0.3);
          const noise = (Math.random() - 0.5) * 20;
          const height = Math.min(95, Math.max(15, 45 + wave1 * 30 + wave2 * 18 + noise));
          return Math.round(height);
        })
      );
      animationFrameRef.current = requestAnimationFrame(updateWave);
    };

    animationFrameRef.current = requestAnimationFrame(updateWave);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isListening]);

  if (!isListening) return null;

  return (
    <div className="w-full bg-gradient-to-b from-blue-50/60 to-white border-t border-blue-100/80 px-4 py-3 flex flex-col items-center select-none animate-in fade-in slide-in-from-bottom duration-200">
      {/* Top Status & PDF tag */}
      <div className="flex items-center justify-between w-full mb-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
          </span>
          <span className="text-xs font-semibold text-blue-900 tracking-tight">
            {isRealMicActive ? 'Live Microphone Active' : 'Voice Mode: Listening'}
          </span>
        </div>

        {attachedDocName && (
          <span className="text-[11px] font-medium text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-300/60 truncate max-w-[170px]">
            📄 {attachedDocName}
          </span>
        )}
      </div>

      {/* Pulsing Dynamic Multi-Bar Waveform */}
      <div className="w-full h-12 flex items-center justify-center gap-1.5 px-2">
        {barHeights.map((height, idx) => {
          // Blue gradient shades for waveform bars
          const isCenter = idx >= 5 && idx <= 10;
          return (
            <div
              key={idx}
              className="w-1.5 rounded-full transition-all duration-75"
              style={{
                height: `${height}%`,
                backgroundColor: isCenter ? '#2563eb' : '#60a5fa',
                opacity: 0.5 + (height / 100) * 0.5,
              }}
            />
          );
        })}
      </div>

      {/* Guidance and Stop Action Button */}
      <div className="flex items-center justify-between w-full mt-2.5 pt-2 border-t border-blue-100/50">
        <p className="text-[11px] text-neutral-500">
          Words are transcribing in real time into composer
        </p>

        <button
          onClick={onStop}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 active:scale-95 text-white rounded-full text-xs font-semibold shadow-sm transition-all cursor-pointer"
        >
          <Square className="w-3 h-3 fill-white text-white" />
          <span>Stop Voice</span>
        </button>
      </div>
    </div>
  );
};
