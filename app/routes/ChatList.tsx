import { useEffect } from 'react';
import ChatSidebar from '../components/chat/ChatSidebar';
import DesktopWidth from '~/blocks/DesktopWidth';
import { useDesktop } from '~/hooks/useDesktop';
import { useAuth } from '~/hooks/useAuth';
import { useChat } from '~/hooks/useChat';
import ButtonAccent from '~/components/ButtonAccent';

export default function ChatList() {
  const { chats, error, loadChats } = useChat();

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
      <div className="flex items-start gap-[20px]">
        <div className={isDesktop ? 'flex-[3_1]' : 'flex-1'}>
          <ChatSidebar chats={chats} onChatUpdate={loadChats} />
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
