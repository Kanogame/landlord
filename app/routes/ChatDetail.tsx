import { useEffect } from 'react';
import ChatSidebar from '../components/chat/ChatSidebar';
import ChatWindow from '../components/chat/ChatWindow';
import DesktopWidth from '~/blocks/DesktopWidth';
import { useDesktop } from '~/hooks/useDesktop';
import { useAuth } from '~/hooks/useAuth';
import { useChat } from '~/hooks/useChat';
import ButtonAccent from '~/components/ButtonAccent';
import type { Route } from './+types/ChatDetail';
import { useNavigate } from 'react-router';
import { sendMessage } from '~/lib/chatApi';

export default function ChatDetail({ params }: Route.ComponentProps) {
  const navigate = useNavigate();
  const {
    chats,
    selectedChat,
    selectedChatId,
    selectedChatMessages,
    error,
    loadChats,
    selectChat,
    sendChatMessage,
  } = useChat();

  const { isAuthenticated } = useAuth();
  const isDesktop = useDesktop();
  const chatId = params.id ? parseInt(params.id) : null;

  // Select chat when route changes
  useEffect(() => {
    if (chatId && chatId > 0) {
      selectChat(chatId);
    }
  }, [chatId]);

  // Set up polling for chat updates
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      loadChats();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAuthenticated, loadChats]);

  const handleBackToSidebar = () => {
    navigate('/chat');
  };

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
      <div className="flex items-start gap-[20px] h-[100%]">
        {isDesktop && (
          <div className="flex-[3_1]">
            <ChatSidebar chats={chats} onChatUpdate={loadChats} />
          </div>
        )}
        <div className={isDesktop ? 'flex-[9_1]' : 'w-[100%]'}>
          <ChatWindow
            messages={selectedChatMessages}
            chat={selectedChat}
            onChatUpdate={loadChats}
            onBack={handleBackToSidebar}
            onMessageSend={message => {
              sendChatMessage(selectedChatId ?? -1, message);
            }}
          />
        </div>
      </div>
    </DesktopWidth>
  );
}
