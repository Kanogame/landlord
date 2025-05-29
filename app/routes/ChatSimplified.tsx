import { useEffect, useState } from 'react';
import ChatSidebar from '../components/chat/ChatSidebar';
import ChatWindow from '../components/chat/ChatWindow';
import DesktopWidth from '~/blocks/DesktopWidth';
import { useDesktop } from '~/hooks/useDesktop';
import { useAuth } from '~/hooks/useAuth';
import { useChat } from '~/hooks/useChat';
import ButtonAccent from '~/components/ButtonAccent';
import type { Route } from './+types/ChatSimplified';

export default function ChatSimplified({ params }: Route.ComponentProps) {
  const {
    chats,
    selectedChatId,
    selectedChat,
    selectedChatMessages,
    error,
    loadChats,
    selectChat,
  } = useChat();

  if (params?.id != null && +params?.id > 0 && selectedChatId != +params.id) {
    selectChat(+params.id);
    loadChats();
  }

  const [mobileSidePage, setMobileSidePage] = useState(false);

  const { isAuthenticated } = useAuth();
  const isDesktop = useDesktop();

  // Set up polling for chat updates
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      loadChats();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAuthenticated, loadChats]);

  if (!isAuthenticated) {
    return (
      <DesktopWidth isDesktop={isDesktop}>
        <div className="flex items-center justify-center p-8">
          <div className="h3-light">
            Пожалуйста, войдите в систему для доступа к чатам
          </div>
        </div>
      </DesktopWidth>
    );
  }

  if (error && chats.length === 0) {
    return (
      <DesktopWidth isDesktop={isDesktop}>
        <div className="flex flex-col items-center justify-center p-8 gap-4">
          <div className="text-red-500">{error}</div>
          <ButtonAccent onClick={loadChats} label="Попробовать снова" />
        </div>
      </DesktopWidth>
    );
  }

  return (
    <DesktopWidth isDesktop={isDesktop}>
      <div className="flex items-start gap-[20px] w-[100%]">
        {(isDesktop || mobileSidePage) && (
          <div className="flex-[3_1]">
            <ChatSidebar
              chats={chats}
              selectedChatId={selectedChatId}
              onChatSelect={ch => {
                selectChat(ch);
              }}
              onChatUpdate={loadChats}
            />
          </div>
        )}
        {(isDesktop || !mobileSidePage) && (
          <div className="flex-[9_1]">
            <ChatWindow
              messages={selectedChatMessages}
              chat={selectedChat}
              onChatUpdate={loadChats}
              onBack={() => setMobileSidePage(true)}
            />
          </div>
        )}
      </div>
    </DesktopWidth>
  );
}
