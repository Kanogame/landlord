import { useState } from 'react';
import Block from '../Block';
import ButtonIcon from '../ButtonIcon';
import ChatEntry from './ChatEntry';
import { chatListData } from './chatData';
import { useDesktop } from '~/hooks/useDesktop';
import iconSearch from '~/media/icons/icon-search.svg';

interface ChatSidebarProps {
  selectedChatId: string;
  onChatSelect: (chatId: string) => void;
}

export default function ChatSidebar({
  selectedChatId,
  onChatSelect,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showInactiveChats, setShowInactiveChats] = useState(false);
  const isDesktop = useDesktop();

  const filteredChats = chatListData.filter(chat => {
    const matchesSearch =
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.adTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = showInactiveChats || chat.isActive;
    return matchesSearch && matchesFilter;
  });

  return (
    <Block label="Сообщения" isDesktop={isDesktop}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-[5px]">
          <div className="w-[100%]">
            <input
              type="text"
              placeholder="Шаблон"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full h-7 px-2 text-xs border border-neutral-300 rounded-sm font-['Fira_Sans']"
            />
          </div>
        </div>

        <div className="flex items-center gap-[5px]">
          <input
            type="checkbox"
            id="showInactive"
            checked={showInactiveChats}
            onChange={e => setShowInactiveChats(e.target.checked)}
            className="w-3 h-3 rounded-sm"
          />
          <label
            htmlFor="showInactive"
            className="text-zinc-800 text-xs font-normal font-['Fira_Sans'] cursor-pointer"
          >
            Показывать неативные чаты
          </label>
        </div>

        <div className="flex flex-col">
          {filteredChats.map(chat => (
            <ChatEntry
              key={chat.id}
              chat={chat}
              isSelected={selectedChatId === chat.id}
              onClick={() => onChatSelect(chat.id)}
            />
          ))}
        </div>
      </div>
    </Block>
  );
}
