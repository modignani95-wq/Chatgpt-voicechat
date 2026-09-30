/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { TopAppBar } from './components/TopAppBar';
import { PromoShowcase } from './components/PromoShowcase';
import { ComposerBar } from './components/ComposerBar';
import { SoftKeyboard } from './components/SoftKeyboard';
import { VoiceStudySheet } from './components/VoiceStudySheet';
import { AudioWaveformVisualizer } from './components/AudioWaveformVisualizer';
import { ChatConversation } from './components/ChatConversation';
import { StateNavigator } from './components/StateNavigator';
import { FlowGuideBanner } from './components/FlowGuideBanner';
import { AppStateId, AttachmentFile, ChatMessage } from './types';
import { Wifi, Battery, Signal } from 'lucide-react';

const INITIAL_AUTOMATION_QUERY =
  'How do I write a Python Playwright automation script to handle flaky dynamic elements with exponential retry backoff and CI artifact upload?';

const TYPING_SAMPLE_PARTS = [
  'How do I write a Python Playwright',
  ' automation script to handle flaky',
  ' dynamic elements with exponential retry',
  ' backoff and CI artifact upload?',
];

export default function App() {
  // Navigation & State Management
  const [currentState, setCurrentState] = useState<AppStateId>('STATE_1_TYPING');
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(true);
  const [useRealMic, setUseRealMic] = useState<boolean>(false);

  // Composer & Content State
  const [inputText, setInputText] = useState<string>(
    'How do I write a Python Playwright automation script with retry backoff?'
  );
  const [isKeyboardOpen, setIsKeyboardOpen] = useState<boolean>(true);
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(true);
  const [hasDismissedTooltip, setHasDismissedTooltip] = useState<boolean>(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [isVoiceListening, setIsVoiceListening] = useState<boolean>(false);
  const [attachedDoc, setAttachedDoc] = useState<AttachmentFile | null>(null);

  // Chat Conversation State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isGeneratingAiResponse, setIsGeneratingAiResponse] = useState<boolean>(false);

  // Transcription stream tracking
  const streamIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const speechRecognitionRef = useRef<any>(null);

  // Check if text wraps past line 1 in the mobile composer (~30 characters or newline)
  const checkIsPastLine1 = (text: string) => {
    return text.includes('\n') || text.trim().length > 30;
  };

  // Handle typing from real keyboard or soft keyboard
  const handleTextChange = (newVal: string) => {
    const isPastLine1 = checkIsPastLine1(newVal);

    // RULE: If tooltip is currently shown and user continues typing,
    // immediately dismiss tooltip and enter State 2A
    if (tooltipVisible) {
      setTooltipVisible(false);
      setHasDismissedTooltip(true);
      setCurrentState('STATE_2A_DISMISSED');
    } else {
      // If tooltip is NOT shown, but text wraps past line 1 and user hasn't dismissed it yet:
      if (isPastLine1 && !hasDismissedTooltip) {
        setTooltipVisible(true);
        setCurrentState('STATE_1_TYPING');
      } else if (!isPastLine1) {
        // If user deleted back to 1 line, reset dismissal flag so next time it wraps, tooltip will re-appear!
        setHasDismissedTooltip(false);
        setTooltipVisible(false);
      }
    }

    setInputText(newVal);
  };

  // State 2A: User clicks or focuses inside input field to adjust a word -> tooltip dismisses immediately
  const handleInputInteraction = () => {
    if (tooltipVisible) {
      setTooltipVisible(false);
      setHasDismissedTooltip(true);
      setCurrentState('STATE_2A_DISMISSED');
    }
    setIsKeyboardOpen(true);
  };

  // Clean up any streaming intervals or recognition on unmount
  useEffect(() => {
    return () => {
      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
      if (speechRecognitionRef.current) {
        try {
          speechRecognitionRef.current.stop();
        } catch (_) {}
      }
    };
  }, []);

  // --- TRANSCRIPTION LOGIC ---
  const startVoiceTranscription = () => {
    setIsVoiceListening(true);
    setCurrentState('STATE_3_VOICE_LISTENING');
    setIsKeyboardOpen(false);

    // If Real Mic is enabled and SpeechRecognition is available in browser
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (useRealMic && SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          let fullTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            fullTranscript += event.results[i][0].transcript + ' ';
          }
          if (fullTranscript.trim()) {
            setInputText(fullTranscript.trim());
            setCurrentState('STATE_4_LIVE_TRANSCRIBING');
          }
        };

        recognition.onerror = () => {
          // Fallback to simulated speech if mic fails
          fallbackSimulatedStream();
        };

        recognition.start();
        speechRecognitionRef.current = recognition;
        return;
      } catch (err) {
        console.warn('SpeechRecognition failed, falling back to simulated speech stream', err);
      }
    }

    // Default or Fallback: Simulated Speech Streaming
    fallbackSimulatedStream();
  };

  const fallbackSimulatedStream = () => {
    const fullTranscript =
      'I need to optimize our automation scripts for our CI pipeline. How can we implement robust retry loops for async elements, handle unexpected alerts, and capture full trace logs when a test fails?';
    const words = fullTranscript.split(' ');
    let currentIndex = 0;

    // Reset or prep input text for streaming
    setInputText('');

    // State 3: Listening delay before words start pouring in
    setTimeout(() => {
      setCurrentState('STATE_4_LIVE_TRANSCRIBING');

      streamIntervalRef.current = setInterval(() => {
        if (currentIndex < words.length) {
          setInputText((prev) => (prev ? prev + ' ' + words[currentIndex] : words[currentIndex]));
          currentIndex++;
        } else {
          if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
        }
      }, 220);
    }, 900);
  };

  const stopVoiceTranscription = () => {
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
      streamIntervalRef.current = null;
    }
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch (_) {}
      speechRecognitionRef.current = null;
    }

    setIsVoiceListening(false);
    setCurrentState('STATE_5_REVIEW_SEND');
  };

  // --- STATE HANDLERS ---
  const handleSelectState = (stateId: AppStateId) => {
    // Reset background intervals
    if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch (_) {}
    }

    switch (stateId) {
      case 'STATE_1_TYPING':
        setCurrentState('STATE_1_TYPING');
        setInputText('How do I write a Python Playwright automation script with retry backoff?');
        setIsKeyboardOpen(true);
        setHasDismissedTooltip(false);
        setTooltipVisible(true);
        setIsBottomSheetOpen(false);
        setIsVoiceListening(false);
        break;

      case 'STATE_2A_DISMISSED':
        setCurrentState('STATE_2A_DISMISSED');
        setInputText('How do I write a Python Playwright automation script with retry backoff?');
        setIsKeyboardOpen(true);
        setHasDismissedTooltip(true);
        setTooltipVisible(false); // Tooltip dismissed!
        setIsBottomSheetOpen(false);
        setIsVoiceListening(false);
        break;

      case 'STATE_2B_VOICE_SHEET':
        setCurrentState('STATE_2B_VOICE_SHEET');
        setTooltipVisible(false);
        setIsBottomSheetOpen(true); // Bottom sheet open!
        setIsVoiceListening(false);
        break;

      case 'STATE_3_VOICE_LISTENING':
        setIsBottomSheetOpen(false);
        startVoiceTranscription();
        break;

      case 'STATE_4_LIVE_TRANSCRIBING':
        setIsBottomSheetOpen(false);
        setIsVoiceListening(true);
        setIsKeyboardOpen(false);
        setCurrentState('STATE_4_LIVE_TRANSCRIBING');
        setInputText(
          'I need to optimize our automation scripts for our CI pipeline. How can we implement robust retry loops'
        );
        break;

      case 'STATE_5_REVIEW_SEND':
        setIsBottomSheetOpen(false);
        setIsVoiceListening(false);
        setIsKeyboardOpen(false);
        setCurrentState('STATE_5_REVIEW_SEND');
        if (!inputText) {
          setInputText(
            'I need to optimize our automation scripts for our CI pipeline. How can we implement robust retry loops for async elements, handle unexpected alerts, and capture full trace logs when a test fails?'
          );
        }
        break;

      case 'STATE_POSTED_CHAT':
        handleSend();
        break;
    }
  };

  // State 2A: User taps text field to adjust a word -> tooltip dismisses immediately
  const handleFocusInputField = () => {
    if (tooltipVisible) {
      setTooltipVisible(false);
      setCurrentState('STATE_2A_DISMISSED');
    }
    setIsKeyboardOpen(true);
  };

  // State 2B: User taps mic icon -> bottom sheet pops up
  const handleMicClick = () => {
    if (isVoiceListening) {
      stopVoiceTranscription();
      return;
    }
    setTooltipVisible(false);
    setIsBottomSheetOpen(true);
    setCurrentState('STATE_2B_VOICE_SHEET');
  };

  // State 3: From bottom sheet "Ask Directly"
  const handleAskDirectly = () => {
    setIsBottomSheetOpen(false);
    startVoiceTranscription();
  };

  // State 3: From bottom sheet "Upload PDF" confirmation
  const handleConfirmPdf = (doc: AttachmentFile) => {
    setAttachedDoc(doc);
    setIsBottomSheetOpen(false);
    startVoiceTranscription();
  };

  // State 5: Sending message to ChatGPT
  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: inputText,
      timestamp: 'Just now',
      attachment: attachedDoc || undefined,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsKeyboardOpen(false);
    setCurrentState('STATE_POSTED_CHAT');
    setIsGeneratingAiResponse(true);

    // Generate insightful response regarding automation scripts
    setTimeout(() => {
      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: `Here is how to build a resilient automation pipeline for your test scripts:

1. **Exponential Retry Backoff with Jitter**
Instead of static sleep timeouts, configure retry logic that waits progressively:
\`\`\`python
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
def locate_and_interact(page, selector):
    element = page.wait_for_selector(selector, state="visible", timeout=5000)
    element.click()
\`\`\`

2. **Auto-Waiting Locators**
Playwright performs automatic actionability checks (visible, stable, enabled) before clicking. Avoid manual \`time.sleep()\` calls.

3. **CI Artifact Capture**
${
  attachedDoc
    ? `Based on your uploaded study guide (*${attachedDoc.name}*), ensure your \`playwright.config.ts\` captures traces on first retry:
\`trace: 'on-first-retry'\`, \`screenshot: 'only-on-failure'\`.`
    : `Run your tests with \`--tracing on-first-retry\` so failed runs produce inspectable ZIP snapshots with DOM snapshots and network logs.`
}

Would you like me to tailor this for Selenium, Playwright, or Cypress?`,
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsGeneratingAiResponse(false);
    }, 1200);
  };

  // Keyboard character typing simulation for State 1
  const handleSimulateAutomationDoubt = () => {
    setInputText('');
    setHasDismissedTooltip(false);
    setTooltipVisible(false);
    let idx = 0;
    const sample = INITIAL_AUTOMATION_QUERY;
    const interval = setInterval(() => {
      if (idx < sample.length) {
        const nextVal = sample.slice(0, idx + 1);
        setInputText(nextVal);
        if (checkIsPastLine1(nextVal)) {
          setTooltipVisible(true);
          setCurrentState('STATE_1_TYPING');
        }
        idx += 3;
      } else {
        clearInterval(interval);
        setInputText(sample);
        setTooltipVisible(true);
        setCurrentState('STATE_1_TYPING');
      }
    }, 40);
  };

  const handleNextStepInFlow = () => {
    switch (currentState) {
      case 'STATE_1_TYPING':
        handleMicClick();
        break;
      case 'STATE_2A_DISMISSED':
        handleMicClick();
        break;
      case 'STATE_2B_VOICE_SHEET':
        handleAskDirectly();
        break;
      case 'STATE_3_VOICE_LISTENING':
        setCurrentState('STATE_4_LIVE_TRANSCRIBING');
        break;
      case 'STATE_4_LIVE_TRANSCRIBING':
        stopVoiceTranscription();
        break;
      case 'STATE_5_REVIEW_SEND':
        handleSend();
        break;
    }
  };

  const handleReset = () => {
    if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch (_) {}
    }
    setCurrentState('STATE_1_TYPING');
    setInputText('How do I write a Python Playwright automation script with retry backoff?');
    setIsKeyboardOpen(true);
    setHasDismissedTooltip(false);
    setTooltipVisible(true);
    setIsBottomSheetOpen(false);
    setIsVoiceListening(false);
    setAttachedDoc(null);
    setMessages([]);
    setIsGeneratingAiResponse(false);
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col font-sans text-neutral-900 select-none">
      {/* Top Test Bench State Controller */}
      <StateNavigator
        currentState={currentState}
        onSelectState={handleSelectState}
        isPhoneFrame={isPhoneFrame}
        onTogglePhoneFrame={() => setIsPhoneFrame(!isPhoneFrame)}
        isRealMic={useRealMic}
        onToggleMicSource={() => setUseRealMic(!useRealMic)}
        onReset={handleReset}
      />

      {/* Interactive Step Guide Banner */}
      <FlowGuideBanner
        currentState={currentState}
        onNextStep={handleNextStepInFlow}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden">
        {/* Mobile Device Canvas */}
        <div
          className={`relative flex flex-col bg-white overflow-hidden transition-all duration-300 ${
            isPhoneFrame
              ? 'w-full max-w-[412px] h-[860px] max-h-[96vh] rounded-[42px] shadow-2xl ring-1 ring-neutral-700/80 border-8 border-neutral-900'
              : 'w-full max-w-2xl h-[92vh] rounded-2xl shadow-xl border border-neutral-300'
          }`}
        >
          {/* Mobile Hardware Frame Header (Status Bar matching WhatsApp screenshot) */}
          <div className="flex items-center justify-between px-6 pt-3 pb-1 bg-white text-neutral-800 text-[11px] font-semibold tracking-tight z-30 select-none">
            {/* Clock */}
            <span>9:41</span>

            {/* Android Camera Punch-hole on center (phone frame only) */}
            {isPhoneFrame && (
              <div className="w-3 h-3 rounded-full bg-neutral-900 shadow-inner flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-neutral-800" />
              </div>
            )}

            {/* Signal, Wifi, Battery icons */}
            <div className="flex items-center gap-1.5 text-neutral-600">
              <Signal className="w-3 h-3 stroke-[2.5]" />
              <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
              <Battery className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>

          {/* ChatGPT Top Navigation Bar */}
          <TopAppBar
            onOpenMenu={() => {}}
            onNewChat={handleReset}
          />

          {/* Body Area */}
          <div className="flex-1 flex flex-col overflow-y-auto relative custom-scrollbar bg-white">
            {messages.length === 0 ? (
              // Empty State matching WhatsApp Image 1 & 2
              <div className="flex-1 flex flex-col justify-center items-center px-4">
                <PromoShowcase
                  onTryIt={() => {
                    setInputText('Create a modern 3D illustration of an automation robot writing code');
                    setTooltipVisible(true);
                  }}
                />
              </div>
            ) : (
              // Active Conversation
              <ChatConversation
                messages={messages}
                isGeneratingResponse={isGeneratingAiResponse}
              />
            )}
          </div>

          {/* State 3: Live Audio Waveform Visualizer */}
          <AudioWaveformVisualizer
            isListening={isVoiceListening}
            onStop={stopVoiceTranscription}
            attachedDocName={attachedDoc?.name}
            isRealMicActive={useRealMic}
          />

          {/* Bottom Composer Bar */}
          <div className="relative z-20">
            <ComposerBar
              text={inputText}
              onChangeText={handleTextChange}
              onFocusInput={handleInputInteraction}
              onClickInput={handleInputInteraction}
              onMicClick={handleMicClick}
              onSend={handleSend}
              onStopVoice={stopVoiceTranscription}
              isListening={isVoiceListening}
              canSend={inputText.trim().length > 0 && !isVoiceListening}
              tooltipVisible={tooltipVisible}
              onDismissTooltip={() => {
                setTooltipVisible(false);
                setHasDismissedTooltip(true);
                setCurrentState('STATE_2A_DISMISSED');
              }}
              attachedDoc={attachedDoc}
              onRemoveDoc={() => setAttachedDoc(null)}
              onOpenAttachmentMenu={() => setIsBottomSheetOpen(true)}
            />

            {/* Mobile Soft Keyboard (WhatsApp Image 1) */}
            <SoftKeyboard
              isOpen={isKeyboardOpen && !isVoiceListening}
              onKeyPress={(char) => {
                handleTextChange(inputText + char);
              }}
              onBackspace={() => {
                handleTextChange(inputText.slice(0, -1));
              }}
              onEnter={handleSend}
              onSpace={() => {
                handleTextChange(inputText + ' ');
              }}
              onQuickFillAutomationDoubt={handleSimulateAutomationDoubt}
              onDismissKeyboard={() => setIsKeyboardOpen(false)}
            />
          </div>

          {/* Android Home Bar Pill at Bottom */}
          {isPhoneFrame && (
            <div className="w-full bg-[#dbe4ef] pb-1 pt-0.5 flex justify-center">
              <div className="w-28 h-1 bg-slate-600/40 rounded-full" />
            </div>
          )}

          {/* State 2B: Voice Study Bottom Sheet Modal */}
          <VoiceStudySheet
            isOpen={isBottomSheetOpen}
            onClose={() => setIsBottomSheetOpen(false)}
            onAskDirectly={handleAskDirectly}
            onConfirmPdf={handleConfirmPdf}
          />
        </div>
      </main>
    </div>
  );
}
