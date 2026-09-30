import React, { useState, useRef } from 'react';
import { FileText, Mic, Upload, Check, ChevronRight, X } from 'lucide-react';
import { AttachmentFile } from '../types';

interface VoiceStudySheetProps {
  isOpen: boolean;
  onClose: () => void;
  onAskDirectly: () => void;
  onConfirmPdf: (file: AttachmentFile) => void;
}

const DEFAULT_SAMPLE_DOC: AttachmentFile = {
  id: 'doc-1',
  name: 'Automation_Scripts_CI_CD.pdf',
  size: '1.4 MB',
  pages: 8,
  type: 'pdf',
  summary: 'Playwright & Selenium test automation pipelines with retry backoff',
};

export const VoiceStudySheet: React.FC<VoiceStudySheetProps> = ({
  isOpen,
  onClose,
  onAskDirectly,
  onConfirmPdf,
}) => {
  const [selectedDoc, setSelectedDoc] = useState<AttachmentFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const customDoc: AttachmentFile = {
        id: `upload-${Date.now()}`,
        name: file.name,
        size: `${(file.size / 1024).toFixed(0)} KB`,
        pages: Math.max(1, Math.round(file.size / 40000)),
        type: 'pdf',
        summary: 'Uploaded user document for voice study',
      };
      setSelectedDoc(customDoc);
      onConfirmPdf(customDoc);
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center pointer-events-auto">
      {/* Dimmed backdrop scoped inside the phone */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-neutral-900/40 backdrop-blur-[2px] transition-opacity duration-200"
      />

      {/* Compact Native Mobile Action Sheet */}
      <div className="relative w-full bg-white rounded-t-[26px] shadow-2xl px-4 pt-2.5 pb-5 z-10 animate-in slide-in-from-bottom duration-200 select-none border-t border-neutral-200/60">
        {/* Mobile Grab Handle */}
        <div className="w-9 h-1 bg-neutral-300 rounded-full mx-auto mb-3" />

        {/* Compact Sheet Header */}
        <div className="flex items-center justify-between px-1 mb-3">
          <div>
            <h3 className="text-[16px] font-bold text-neutral-900 tracking-tight leading-tight">
              Start Voice Study
            </h3>
            <p className="text-[11px] text-neutral-500">
              Select an option to begin voice dictation
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 active:scale-95 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Action Rows */}
        <div className="space-y-2">
          {/* Option 1: Ask Directly */}
          <button
            onClick={onAskDirectly}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-neutral-50 hover:bg-blue-50/60 active:scale-[0.98] border border-neutral-200/80 hover:border-blue-300 transition-all text-left cursor-pointer group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/30 group-hover:scale-105 transition-transform">
                <Mic className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[14px] font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors">
                    Ask Directly
                  </span>
                  <span className="text-[10px] font-medium text-blue-600 bg-blue-100/80 px-1.5 py-0.2 rounded-full">
                    Instant
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 truncate">
                  Speak doubt freely into the waveform
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-blue-500 shrink-0 ml-1 transition-colors" />
          </button>

          {/* Option 2: Upload PDF */}
          <div className="rounded-2xl bg-neutral-50 border border-neutral-200/80 p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-rose-500/30">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[14px] font-semibold text-neutral-900 block leading-snug">
                    Upload PDF
                  </span>
                  <p className="text-[11px] text-neutral-500 truncate">
                    Attach study guide or notes
                  </p>
                </div>
              </div>

              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1 text-xs font-semibold bg-white border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-100 active:scale-95 transition-all flex items-center gap-1 shrink-0 cursor-pointer shadow-2xs"
              >
                <Upload className="w-3 h-3 text-neutral-500" />
                <span>Browse</span>
              </button>
            </div>

            {/* Quick One-Tap Sample PDF Chip */}
            <div className="pt-2 border-t border-neutral-200/60 flex items-center justify-between">
              <button
                onClick={() => onConfirmPdf(DEFAULT_SAMPLE_DOC)}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-white hover:bg-rose-50/60 active:scale-[0.98] border border-neutral-200 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2 truncate pr-2">
                  <FileText className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span className="text-[11px] font-medium text-neutral-800 truncate group-hover:text-rose-600">
                    Use {DEFAULT_SAMPLE_DOC.name}
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-md shrink-0">
                  Select
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Cancel Button */}
        <button
          onClick={onClose}
          className="w-full mt-2.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 active:scale-98 text-neutral-600 font-semibold text-xs transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
