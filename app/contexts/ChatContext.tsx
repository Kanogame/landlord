import React, { createContext, useContext, ReactNode } from 'react';
import { useChat } from '~/hooks/useChat';
import type { Chat, ChatMessage } from '~/lib/chat';

interface ChatContextType {
  chats: Chat[];
  selectedChat: Chat | null;
  selectedChatId: number | null;
  selectedChatMessages: ChatMessage[];
  loading: boolean;
  error: string | null;
  loadChats: () => Promise<void>;
  loadMessages: (chatId: number, page?: number) => Promise<void>;
  sendChatMessage: (chatId: number, content: string) => Promise<ChatMessage | undefined>;
  markAsRead: (chatId: number) => Promise<void>;
  selectChat: (chatId: number | null) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const chatState = useChat();

  return (
    <ChatContext.Provider value={chatState}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}