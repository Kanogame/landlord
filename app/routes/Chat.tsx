import { useEffect } from 'react';
import ChatSidebar from '../components/chat/ChatSidebar';
import ChatWindow from '../components/chat/ChatWindow';
import DesktopWidth from '~/blocks/DesktopWidth';
import { useDesktop } from '~/hooks/useDesktop';
import { useAuth } from '~/hooks/useAuth';
import { useChat } from '~/hooks/useChat';
import ButtonAccent from '~/components/ButtonAccent';
import type { Route } from './+types/Chat';
import { useNavigate } from 'react-router';
import { archiveChat } from '~/lib/chatApi';

export default function Chat({ params }: Route.ComponentProps) {
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
    loadMessages,
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
      if (selectedChatId) {
        loadMessages(selectedChatId, 1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAuthenticated, loadChats]);

  const handleBackToSidebar = () => {
    navigate('/chat');
  };

  const handleArchive = async (chatId: number, isArchived: boolean) => {
    try {
      const result = await archiveChat({
        chatId: chatId,
        isArchived: isArchived,
      });

      if (result.success) {
        loadChats(); // Refresh chat list
      }
    } catch (error) {
      console.error('Failed to archive chat:', error);
    }
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

  // Chat detail view (when chatId is present)
  if (chatId) {
    return (
      <DesktopWidth isDesktop={isDesktop}>
        <div className="flex flex-1 gap-[20px] min-h-0">
          {isDesktop && (
            <div className="flex-[3_1]">
              <ChatSidebar
                chats={chats}
                onChatUpdate={loadChats}
                onArchive={handleArchive}
              />
            </div>
          )}
          <div className={isDesktop ? 'flex-[9_1] min-h-0' : 'flex-1 min-h-0'}>
            <ChatWindow
              messages={selectedChatMessages}
              chat={selectedChat}
              onChatUpdate={loadChats}
              onBack={handleBackToSidebar}
              onMessageSend={message => {
                loadMessages(selectedChatId ?? -1, 1);
                sendChatMessage(selectedChatId ?? -1, message);
              }}
            />
          </div>
        </div>
      </DesktopWidth>
    );
  }

  // Chat list view (when no chatId)
  return (
    <DesktopWidth isDesktop={isDesktop}>
      <div className="flex items-start gap-[20px]">
        <div className={isDesktop ? 'flex-[3_1]' : 'flex-1'}>
          <ChatSidebar
            chats={chats}
            onChatUpdate={loadChats}
            onArchive={handleArchive}
          />
        </div>
        {isDesktop && (
          <div className="flex-[9_1] flex items-center justify-center">
            <div className="h4-light">Выберите чат для начала общения</div>
          </div>
        )}
      </div>
    </DesktopWidth>
  );
}
