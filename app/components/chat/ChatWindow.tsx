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
  chat: Chat | null;
  messages: ChatMessage[];
  onChatUpdate: () => void;
  onBack: () => void;
}

export default function ChatWindow({
  messages,
  chat,
  onChatUpdate,
  onBack,
}: ChatWindowProps) {
  const [sending, setSending] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useDesktop();

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
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

  return (
    <Block label="" isDesktop={isDesktop}>
      <div className="flex flex-col h-[600px]">
        {chat != null && (
          <>
            <ChatHeader
              chat={chat}
              onChatUpdate={onChatUpdate}
              onBack={onBack}
            />

            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-auto py-[16px] px-2"
            >
              {messages.map((message, index) => {
                const previousMessage =
                  index > 0 ? messages[index - 1] : undefined;
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

            <ChatInput onSendMessage={() => {}} disabled={sending} />
          </>
        )}
      </div>
    </Block>
  );
}
