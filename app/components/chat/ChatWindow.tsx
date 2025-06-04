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
import {
  formatMessageDate,
  formatMessageTime,
  shouldShowDate,
} from '~/lib/chatUtils';

interface ChatWindowProps {
  chat: Chat | null;
  messages: ChatMessage[];
  onChatUpdate: () => void;
  onBack: () => void;
  onMessageSend: (message: string) => void;
  onArchive: (chatId: number, isArchived: boolean) => void;
}

export default function ChatWindow({
  messages,
  chat,
  onChatUpdate,
  onBack,
  onMessageSend,
  onArchive,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useDesktop();

  return (
    <Block label="" isDesktop={isDesktop}>
      <div className="flex flex-col h-full min-h-0">
        {chat != null && (
          <>
            <div className="flex-shrink-0">
              <ChatHeader
                chat={chat}
                onArchive={() => {
                  onArchive(chat.id, !chat.isArchived);
                }}
                onBack={onBack}
              />
            </div>

            <div
              ref={messagesContainerRef}
              className="flex-1 min-h-0 overflow-y-auto py-[16px] px-2"
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

            {!chat.isArchived && (
              <div className="flex-shrink-0">
                <ChatInput onSendMessage={onMessageSend} />
              </div>
            )}
          </>
        )}
      </div>
    </Block>
  );
}
