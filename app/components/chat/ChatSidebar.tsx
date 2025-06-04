import { useState } from 'react';
import Block from '../Block';
import ChatEntry from './ChatEntry';
import { useDesktop } from '~/hooks/useDesktop';
import { Input } from '../ui/input';
import type { Chat } from '~/lib/chat';
import { sortChatsByLastUpdate, getTotalUnreadCount } from '~/lib/chatUtils';
import { Link, useNavigate, useParams } from 'react-router';

interface ChatSidebarProps {
  chats: Chat[];
  onChatUpdate: () => void;
  onArchive: (chatId: number, isArchived: boolean) => void;
}

export default function ChatSidebar({ chats, onArchive }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showArchivedChats, setShowArchivedChats] = useState(false);
  const navigate = useNavigate();
  const isDesktop = useDesktop();
  const params = useParams();
  const selectedChatId = params.id ? parseInt(params.id) : null;

  const filteredChats = chats.filter(chat => {
    const matchesSearch =
      chat.otherUserName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = showArchivedChats || !chat.isArchived;
    return matchesSearch && matchesFilter;
  });

  const sortedChats = sortChatsByLastUpdate(filteredChats);
  const totalUnreadCount = getTotalUnreadCount(
    chats.filter(chat => !chat.isArchived)
  );

  return (
    <Block
      label={`Сообщения${totalUnreadCount > 0 ? ` (${totalUnreadCount})` : ''}`}
      isDesktop={isDesktop}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-[5px]">
          <div className="w-[100%]">
            <Input
              type="text"
              placeholder="Поиск по чатам..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full p-def"
            />
          </div>
        </div>

        <div className="flex items-center gap-[5px]">
          <Input
            type="checkbox"
            checked={showArchivedChats}
            onChange={e => setShowArchivedChats(e.target.checked)}
            className="w-3 h-3 rounded-sm"
          />
          <label className="p-def">Показывать архивные чаты</label>
        </div>

        <div className="flex flex-col max-h-[500px] overflow-y-auto">
          {sortedChats.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              {chats.length === 0 ? 'Нет чатов' : 'Чаты не найдены'}
            </div>
          ) : (
            sortedChats.map(chat => (
              <ChatEntry
                key={chat.id}
                chat={chat}
                isSelected={selectedChatId === chat.id}
                onClick={() => navigate(`/chat/${chat.id}`)}
                onArchive={() => onArchive(chat.id, !chat.isArchived)}
              />
            ))
          )}
        </div>
      </div>
    </Block>
  );
}
