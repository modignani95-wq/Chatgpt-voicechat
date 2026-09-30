export type AppStateId =
  | 'STATE_1_TYPING'
  | 'STATE_2A_DISMISSED'
  | 'STATE_2B_VOICE_SHEET'
  | 'STATE_3_VOICE_LISTENING'
  | 'STATE_4_LIVE_TRANSCRIBING'
  | 'STATE_5_REVIEW_SEND'
  | 'STATE_POSTED_CHAT';

export interface AttachmentFile {
  id: string;
  name: string;
  size: string;
  pages?: number;
  type: 'pdf';
  summary?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  attachment?: AttachmentFile;
}

export interface StateDefinition {
  id: AppStateId;
  label: string;
  title: string;
  description: string;
  actionHint: string;
}
