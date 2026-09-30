import React, { useState } from 'react';
import { ArrowUp, Delete, Smile, CornerDownLeft, Sparkles } from 'lucide-react';

interface SoftKeyboardProps {
  isOpen: boolean;
  onKeyPress: (char: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
  onSpace: () => void;
  onQuickFillAutomationDoubt?: () => void;
  onDismissKeyboard?: () => void;
}

export const SoftKeyboard: React.FC<SoftKeyboardProps> = ({
  isOpen,
  onKeyPress,
  onBackspace,
  onEnter,
  onSpace,
  onQuickFillAutomationDoubt,
  onDismissKeyboard,
}) => {
  const [isShiftActive, setIsShiftActive] = useState(false);

  if (!isOpen) return null;

  const row1 = [
    { key: 'q', num: '1' },
    { key: 'w', num: '2' },
    { key: 'e', num: '3' },
    { key: 'r', num: '4' },
    { key: 't', num: '5' },
    { key: 'y', num: '6' },
    { key: 'u', num: '7' },
    { key: 'i', num: '8' },
    { key: 'o', num: '9' },
    { key: 'p', num: '0' },
  ];

  const row2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  const row3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

  const handleKeyClick = (char: string) => {
    onKeyPress(isShiftActive ? char.toUpperCase() : char);
    if (isShiftActive) setIsShiftActive(false);
  };

  return (
    <div className="w-full bg-[#dbe4ef] border-t border-slate-300 pt-1 pb-4 px-1 select-none animate-in slide-in-from-bottom duration-200">
      {/* Quick Helper Suggestion Toolbar on top of keyboard */}
      <div className="flex items-center justify-between px-2 py-1 mb-1 text-[11px] text-slate-600 bg-white/70 rounded-lg mx-1 shadow-2xs">
        <span className="font-medium text-slate-500">Keyboard Active</span>
        <div className="flex items-center gap-1.5">
          {onQuickFillAutomationDoubt && (
            <button
              onClick={onQuickFillAutomationDoubt}
              title="Type automation script doubt"
              className="flex items-center gap-1 px-2 py-0.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium text-[10px] active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-2.5 h-2.5" />
              <span>Simulate Doubt</span>
            </button>
          )}
          {onDismissKeyboard && (
            <button
              onClick={onDismissKeyboard}
              className="text-[10px] text-slate-500 hover:text-slate-800 underline ml-1 cursor-pointer"
            >
              Hide
            </button>
          )}
        </div>
      </div>

      {/* Row 1 (QWERTY with numbers on top) */}
      <div className="flex justify-center gap-1 mb-1.5">
        {row1.map(({ key, num }) => (
          <button
            key={key}
            onClick={() => handleKeyClick(key)}
            className="flex-1 h-[42px] max-w-[36px] bg-white rounded-md shadow-xs active:bg-slate-200 flex flex-col items-center justify-center relative font-medium text-[15px] text-slate-800 cursor-pointer transition-colors"
          >
            <span className="text-[8px] text-slate-400 absolute top-0.5 right-1 leading-none font-mono">
              {num}
            </span>
            <span className="mt-1">{isShiftActive ? key.toUpperCase() : key.toUpperCase()}</span>
          </button>
        ))}
      </div>

      {/* Row 2 (ASDFGHJKL) */}
      <div className="flex justify-center gap-1 mb-1.5 px-3">
        {row2.map((key) => (
          <button
            key={key}
            onClick={() => handleKeyClick(key)}
            className="flex-1 h-[42px] max-w-[36px] bg-white rounded-md shadow-xs active:bg-slate-200 flex items-center justify-center font-medium text-[15px] text-slate-800 cursor-pointer transition-colors"
          >
            {isShiftActive ? key.toUpperCase() : key.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Row 3 (Shift, ZXCVBNM, Backspace) */}
      <div className="flex justify-between gap-1 mb-1.5">
        {/* Shift Key */}
        <button
          onClick={() => setIsShiftActive(!isShiftActive)}
          className={`w-[42px] h-[42px] rounded-md shadow-xs flex items-center justify-center cursor-pointer transition-colors ${
            isShiftActive ? 'bg-blue-500 text-white' : 'bg-[#c5d3e6] text-slate-700 active:bg-slate-300'
          }`}
        >
          <ArrowUp className="w-4 h-4 stroke-[2.5]" />
        </button>

        <div className="flex flex-1 justify-center gap-1 px-1">
          {row3.map((key) => (
            <button
              key={key}
              onClick={() => handleKeyClick(key)}
              className="flex-1 h-[42px] max-w-[36px] bg-white rounded-md shadow-xs active:bg-slate-200 flex items-center justify-center font-medium text-[15px] text-slate-800 cursor-pointer transition-colors"
            >
              {isShiftActive ? key.toUpperCase() : key.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Backspace Key */}
        <button
          onClick={onBackspace}
          className="w-[42px] h-[42px] bg-[#c5d3e6] rounded-md shadow-xs active:bg-slate-300 flex items-center justify-center text-slate-700 cursor-pointer transition-colors"
        >
          <div className="w-5 h-4 border border-slate-700 rounded-sm relative flex items-center justify-center">
            <span className="text-[10px] font-bold">×</span>
          </div>
        </button>
      </div>

      {/* Row 4 (?123, comma, emoji, Spacebar, period, Enter) */}
      <div className="flex justify-between items-center gap-1.5 px-0.5">
        {/* ?123 */}
        <button
          onClick={() => handleKeyClick('?')}
          className="w-[44px] h-[40px] bg-[#c5d3e6] rounded-md shadow-xs active:bg-slate-300 font-medium text-xs text-slate-800 flex items-center justify-center cursor-pointer"
        >
          ?123
        </button>

        {/* Comma */}
        <button
          onClick={() => onKeyPress(',')}
          className="w-[32px] h-[40px] bg-[#c5d3e6] rounded-md shadow-xs active:bg-slate-300 font-bold text-sm text-slate-800 flex items-center justify-center cursor-pointer"
        >
          ,
        </button>

        {/* Emoji Icon */}
        <button
          onClick={() => onKeyPress('😊')}
          className="w-[32px] h-[40px] bg-[#c5d3e6] rounded-md shadow-xs active:bg-slate-300 text-slate-700 flex items-center justify-center cursor-pointer"
        >
          <Smile className="w-4 h-4" />
        </button>

        {/* Spacebar */}
        <button
          onClick={onSpace}
          className="flex-1 h-[40px] bg-white rounded-md shadow-xs active:bg-slate-200 flex items-center justify-center text-xs text-slate-400 font-medium cursor-pointer"
        >
          space
        </button>

        {/* Period */}
        <button
          onClick={() => onKeyPress('.')}
          className="w-[32px] h-[40px] bg-[#c5d3e6] rounded-md shadow-xs active:bg-slate-300 font-bold text-sm text-slate-800 flex items-center justify-center cursor-pointer"
        >
          .
        </button>

        {/* Blue Return/Enter Key */}
        <button
          onClick={onEnter}
          className="w-[44px] h-[40px] bg-[#c5d3e6] active:bg-blue-300 rounded-md shadow-xs flex items-center justify-center text-slate-800 cursor-pointer"
        >
          <CornerDownLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
