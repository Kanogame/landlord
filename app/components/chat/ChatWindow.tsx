import Block from '../Block';
import ButtonIcon from '../ButtonIcon';
import ButtonEmpty from '../ButtonEmpty';
import ButtonAccent from '../ButtonAccent';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import { chatListData, messagesData } from './chatData';
import { useDesktop } from '~/hooks/useDesktop';

interface ChatWindowProps {
  chatId: string;
}

export default function ChatWindow({ chatId }: ChatWindowProps) {
  const selectedChat = chatListData.find(chat => chat.id === chatId);
  const messages = messagesData[chatId] || [];
  const isDesktop = useDesktop();

  if (!selectedChat) {
    return (
      <Block label="Чат" isDesktop={isDesktop}>
        <div className="flex items-center justify-center text-gray-500">
          Выберите чат для начала общения
        </div>
      </Block>
    );
  }

  return (
    <Block label="" isDesktop={isDesktop}>
      <div className="flex flex-col h-max-[100vh] ">
        <ChatHeader chat={selectedChat} />

        <div className="overflow-auto py-[16px]">
          {messages.map(m => (
            <div key={m.id} className="py-[5px]">
              {m.showDate && (
                <div className="flex justify-center">
                  <span className="p-light">{m.date}</span>
                </div>
              )}

              <MessageBubble message={m} />
            </div>
          ))}
        </div>

        <ChatInput onSendMessage={text => console.log('Send:', text)} />
      </div>
    </Block>
  );
}
