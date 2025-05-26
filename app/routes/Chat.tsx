import { use, useState } from 'react';
import Block from '../components/Block';
import ButtonIcon from '../components/ButtonIcon';
import ButtonEmpty from '../components/ButtonEmpty';
import ButtonAccent from '../components/ButtonAccent';
import ChatSidebar from '../components/chat/ChatSidebar';
import ChatWindow from '../components/chat/ChatWindow';
import DesktopWidth from '~/blocks/DesktopWidth';
import { useMediaQuery } from 'react-responsive';
import { useDesktop } from '~/hooks/useDesktop';

// Main chat page component that combines sidebar and chat window
export default function Chat() {
  const [selectedChatId, setSelectedChatId] = useState<string>('1');
  const isDesktop = useDesktop();

  return (
    <DesktopWidth isDesktop={isDesktop}>
      <div className="flex items-start gap-[20px] w-[100%]">
        <div className="flex-[3_1]">
          <ChatSidebar
            selectedChatId={selectedChatId}
            onChatSelect={setSelectedChatId}
          />
        </div>
        <div className="flex-[9_1]">
          <ChatWindow chatId={selectedChatId} />
        </div>
      </div>
    </DesktopWidth>
  );
}
