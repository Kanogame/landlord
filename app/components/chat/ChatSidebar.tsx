import { useState } from 'react';
import Block from '../Block';
import ChatEntry from './ChatEntry';
import ButtonAccent from '../ButtonAccent';
import { useDesktop } from '~/hooks/useDesktop';
import { Input } from '../ui/input';
import type { Chat } from '~/lib/chat';
import { sortChatsByLastUpdate, getTotalUnreadCount } from '~/lib/chatUtils';

interface ChatSidebarProps {
  chats: Chat[];
  selectedChatId: number | null;
  onChatSelect: (chatId: number) => void;
  onChatUpdate: () => void;
}

export default function ChatSidebar({
  chats,
  selectedChatId,
  onChatSelect,
  onChatUpdate,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showArchivedChats, setShowArchivedChats] = useState(false);
  const isDesktop = useDesktop();

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
            id="showArchived"
            checked={showArchivedChats}
            onChange={e => setShowArchivedChats(e.target.checked)}
            className="w-3 h-3 rounded-sm"
          />
          <label
            htmlFor="showArchived"
            className="text-zinc-800 text-xs font-normal font-['Fira_Sans'] cursor-pointer"
          >
            Показывать архивные чаты
          </label>
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
                onClick={() => onChatSelect(chat.id)}
              />
            ))
          )}
        </div>
      </div>
    </Block>
  );
}
