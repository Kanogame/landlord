import { useState, useEffect, useRef } from 'react';
import Block from '../Block';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import { useDesktop } from '~/hooks/useDesktop';
import {
  getChatMessages,
  sendMessage,
  markMessagesAsRead,
} from '~/lib/chatApi';
import type { Chat, ChatMessage } from '~/lib/chat';
import ButtonAccent from '../ButtonAccent';
import type { label } from 'motion/react-client';

interface ChatWindowProps {
  chatId: number | null;
  onChatUpdate: () => void;
  onBack: () => void;
}

export default function ChatWindow({
  chatId,
  onChatUpdate,
  onBack,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useDesktop();

  // Load messages when chatId changes
  useEffect(() => {
    if (chatId) {
      setMessages([]);
      setCurrentPage(1);
      setHasMoreMessages(true);
      loadMessages(1, true);
      markAsRead();
    } else {
      setMessages([]);
    }
  }, [chatId]);

  // Set up polling for new messages
  useEffect(() => {
    if (!chatId) return;

    const interval = setInterval(() => {
      loadMessages(1, false, true); // Load latest messages only
    }, 3000); // Poll every 3 seconds for new messages

    return () => clearInterval(interval);
  }, [chatId]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async (
    page: number = 1,
    replace: boolean = false,
    pollMode: boolean = false
  ) => {
    if (!chatId) return;

    try {
      if (!pollMode) setLoading(true);

      const response = await getChatMessages(chatId, page, 50);
      if (response.success) {
        if (replace) {
          setMessages(response.messages);
        } else if (pollMode) {
          // In poll mode, only add new messages
          setMessages(prev => {
            const existingIds = new Set(prev.map(m => m.id));
            const newMessages = response.messages.filter(
              m => !existingIds.has(m.id)
            );
            return [...prev, ...newMessages];
          });
        } else {
          // Load more messages (pagination)
          setMessages(prev => [...response.messages, ...prev]);
        }

        setHasMoreMessages(response.messages.length === 50);
        setCurrentPage(page);
      }
      setError(null);
    } catch (err) {
      if (!pollMode) {
        setError('Failed to load messages');
        console.error('Error loading messages:', err);
      }
    } finally {
      if (!pollMode) setLoading(false);
    }
  };

  const loadMoreMessages = () => {
    if (hasMoreMessages && !loading) {
      loadMessages(currentPage + 1, false);
    }
  };

  const markAsRead = async () => {
    if (!chatId) return;

    try {
      await markMessagesAsRead({ chatId });
      onChatUpdate(); // Update chat list to reflect read status
    } catch (err) {
      console.error('Error marking messages as read:', err);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!chatId || !content.trim() || sending) return;

    try {
      setSending(true);
      const response = await sendMessage({ chatId, content: content.trim() });

      if (response.success) {
        // Add the new message to the list
        setMessages(prev => [...prev, response.message]);
        onChatUpdate(); // Update chat list
        scrollToBottom();
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget;

    // Load more messages when scrolled to top
    if (scrollTop === 0 && hasMoreMessages && !loading) {
      loadMoreMessages();
    }
  };

  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatMessageDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 0) {
      return 'Сегодня';
    } else if (diffInDays === 1) {
      return 'Вчера';
    } else {
      return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    }
  };

  const shouldShowDate = (
    currentMessage: ChatMessage,
    previousMessage?: ChatMessage
  ) => {
    if (!previousMessage) return true;

    const currentDate = new Date(currentMessage.sentDate).toDateString();
    const previousDate = new Date(previousMessage.sentDate).toDateString();

    return currentDate !== previousDate;
  };

  if (!chatId) {
    return (
      <Block label="Чат" isDesktop={isDesktop}>
        <div className="flex items-center justify-center text-gray-500 h-64">
          Выберите чат для начала общения
        </div>
      </Block>
    );
  }

  if (loading) {
    return (
      <Block label="" isDesktop={isDesktop}>
        <div className="flex items-center justify-center text-gray-500 h-64">
          Загрузка сообщений...
        </div>
      </Block>
    );
  }

  if (error) {
    return (
      <Block label="" isDesktop={isDesktop}>
        <div className="flex flex-col items-center justify-center text-red-500 h-64 gap-4">
          <div>{error}</div>
          <ButtonAccent
            onClick={() => loadMessages(1, true)}
            label="Попробовать снова"
          />
        </div>
      </Block>
    );
  }

  // Create a mock chat object for the header from the first message
  const mockChat =
    messages.length > 0
      ? {
          id: chatId,
          otherUserId: messages.find(m => !m.isOwnMessage)?.senderId || 0,
          otherUserName:
            messages.find(m => !m.isOwnMessage)?.senderName || 'Unknown User',
          propertyId: 0, // We don't have this info from messages
          propertyAddress: 'Property Address', // We don't have this info from messages
          createdDate: '',
          updatedDate: '',
          isArchived: false,
          unreadCount: 0,
        }
      : null;

  return (
    <Block label="" isDesktop={isDesktop}>
      <div className="flex flex-col h-[600px]">
        {mockChat && (
          <ChatHeader
            chat={mockChat}
            onChatUpdate={onChatUpdate}
            onBack={onBack}
          />
        )}

        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-auto py-[16px] px-2"
          onScroll={handleScroll}
        >
          {messages.map((message, index) => {
            const previousMessage = index > 0 ? messages[index - 1] : undefined;
            const showDate = shouldShowDate(message, previousMessage);

            return (
              <div key={message.id} className="py-[5px]">
                {showDate && (
                  <div className="flex justify-center mb-4">
                    <span className="p-light bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {formatMessageDate(message.sentDate)}
                    </span>
                  </div>
                )}

                <MessageBubble
                  message={{
                    id: message.id.toString(),
                    senderId: message.isOwnMessage
                      ? 'me'
                      : message.senderId.toString(),
                    senderAvatar: 'https://placehold.co/36x36',
                    text: message.content,
                    time: formatMessageTime(message.sentDate),
                    showDate: false,
                  }}
                />
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>

        <ChatInput onSendMessage={handleSendMessage} disabled={sending} />
      </div>
    </Block>
  );
}
