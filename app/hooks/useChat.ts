import { useState, useEffect, useCallback } from 'react';
import { getChatList, getChatMessages, sendMessage, markMessagesAsRead } from '~/lib/chatApi';
import type { Chat, ChatMessage } from '~/lib/chat';
import { useAuth } from './useAuth';

export function useChat() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [messages, setMessages] = useState<{ [chatId: number]: ChatMessage[] }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  // Load chats
  const loadChats = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      const response = await getChatList(false);
      if (response.success) {
        setChats(response.chats);
      }
      setError(null);
    } catch (err) {
      setError('Failed to load chats');
      console.error('Error loading chats:', err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Load messages for a specific chat
  const loadMessages = useCallback(async (chatId: number, page: number = 1) => {
    try {
      const response = await getChatMessages(chatId, page, 50);
      if (response.success) {
        setMessages(prev => ({
          ...prev,
          [chatId]: page === 1 ? response.messages : [...(prev[chatId] || []), ...response.messages]
        }));
      }
    } catch (err) {
      console.error('Error loading messages:', err);
    }
  }, []);

  // Send a message
  const sendChatMessage = useCallback(async (chatId: number, content: string) => {
    try {
      const response = await sendMessage({ chatId, content });
      if (response.success) {
        setMessages(prev => ({
          ...prev,
          [chatId]: [...(prev[chatId] || []), response.message]
        }));
        // Refresh chats to update last message
        loadChats();
        return response.message;
      }
    } catch (err) {
      console.error('Error sending message:', err);
      throw err;
    }
  }, [loadChats]);

  // Mark messages as read
  const markAsRead = useCallback(async (chatId: number) => {
    try {
      await markMessagesAsRead({ chatId });
      // Update local state
      setChats(prev => prev.map(chat => 
        chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
      ));
    } catch (err) {
      console.error('Error marking messages as read:', err);
    }
  }, []);

  // Select a chat
  const selectChat = useCallback((chatId: number | null) => {
    setSelectedChatId(chatId);
    if (chatId && !messages[chatId]) {
      loadMessages(chatId);
    }
    if (chatId) {
      markAsRead(chatId);
    }
  }, [messages, loadMessages, markAsRead]);

  // Get messages for selected chat
  const selectedChatMessages = selectedChatId ? messages[selectedChatId] || [] : [];
  const selectedChat = chats.find(chat => chat.id === selectedChatId) || null;

  // Auto-load chats on mount
  useEffect(() => {
    if (isAuthenticated) {
      loadChats();
    }
  }, [isAuthenticated, loadChats]);

  return {
    chats,
    selectedChat,
    selectedChatId,
    selectedChatMessages,
    loading,
    error,
    loadChats,
    loadMessages,
    sendChatMessage,
    markAsRead,
    selectChat,
  };
}

