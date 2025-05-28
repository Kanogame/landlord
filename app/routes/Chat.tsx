import { useState, useEffect } from 'react';
import Block from '../components/Block';
import ChatSidebar from '../components/chat/ChatSidebar';
import ChatWindow from '../components/chat/ChatWindow';
import DesktopWidth from '~/blocks/DesktopWidth';
import { useDesktop } from '~/hooks/useDesktop';
import { useAuth } from '~/hooks/useAuth';
import { useNotifications } from '~/hooks/useNotifications';
import { getChatList } from '~/lib/chatApi';
import type { Chat } from '~/lib/chat';
import { getTotalUnreadCount } from '~/lib/chatUtils';

// Main chat page component that combines sidebar and chat window
export default function Chat() {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previousUnreadCount, setPreviousUnreadCount] = useState(0);
  const { isAuthenticated } = useAuth();
  const { showChatNotification, requestPermission } = useNotifications();
  const isDesktop = useDesktop();

  // Request notification permission on mount
  useEffect(() => {
    requestPermission();
  }, []);

  // Fetch chats on component mount
  useEffect(() => {
    if (isAuthenticated) {
      loadChats();
    }
  }, [isAuthenticated]);

  // Set up polling for chat updates
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      loadChats();
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  // Check for new messages and show notifications
  useEffect(() => {
    const currentUnreadCount = getTotalUnreadCount(chats);
    
    if (currentUnreadCount > previousUnreadCount && previousUnreadCount > 0) {
      // Find chats with new messages
      chats.forEach(chat => {
        if (chat.unreadCount > 0 && chat.lastMessage && chat.id !== selectedChatId) {
          showChatNotification(
            chat.otherUserName,
            chat.lastMessage.content,
            chat.id
          );
        }
      });
    }
    
    setPreviousUnreadCount(currentUnreadCount);
  }, [chats, selectedChatId, previousUnreadCount, showChatNotification]);

  const loadChats = async () => {
    try {
      const response = await getChatList(false);
      if (response.success) {
        setChats(response.chats);
        // If no chat is selected and we have chats, select the first one
        if (!selectedChatId && response.chats.length > 0) {
          setSelectedChatId(response.chats[0].id);
        }
      }
      setError(null);
    } catch (err) {
      setError('Failed to load chats');
      console.error('Error loading chats:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChatSelect = (chatId: number) => {
    setSelectedChatId(chatId);
  };

  const handleChatUpdate = () => {
    // Refresh chats when a message is sent or other updates occur
    loadChats();
  };

  if (!isAuthenticated) {
    return (
      <DesktopWidth isDesktop={isDesktop}>
        <div className="flex items-center justify-center p-8">
          <div className="text-gray-500">
            Пожалуйста, войдите в систему для доступа к чатам
          </div>
        </div>
      </DesktopWidth>
    );
  }

  if (loading) {
    return (
      <DesktopWidth isDesktop={isDesktop}>
        <div className="flex items-center justify-center p-8">
          <div className="text-gray-500">Загрузка чатов...</div>
        </div>
      </DesktopWidth>
    );
  }

  if (error) {
    return (
      <DesktopWidth isDesktop={isDesktop}>
        <div className="flex flex-col items-center justify-center p-8 gap-4">
          <div className="text-red-500">{error}</div>
          <button 
            onClick={loadChats}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Попробовать снова
          </button>
        </div>
      </DesktopWidth>
    );
  }

  return (
    <DesktopWidth isDesktop={isDesktop}>
      <div className="flex items-start gap-[20px] w-[100%]">
        <div className="flex-[3_1]">
          <ChatSidebar
            chats={chats}
            selectedChatId={selectedChatId}
            onChatSelect={handleChatSelect}
            onChatUpdate={handleChatUpdate}
          />
        </div>
        <div className="flex-[9_1]">
          <ChatWindow 
            chatId={selectedChatId} 
            onChatUpdate={handleChatUpdate}
          />
        </div>
      </div>
    </DesktopWidth>
  );
}