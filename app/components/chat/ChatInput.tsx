import { useState } from 'react';
import ButtonIcon from '../ButtonIcon';
import ButtonAccent from '../ButtonAccent';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-[5px] pt-[10px] border-t border-[#E3E3E3]">
      <ButtonIcon
        icon="/icons/attach.svg"
        onClick={() => console.log('Attach file')}
      />

      <div className="flex-1">
        <input
          type="text"
          placeholder="Шаблон"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-[100%] h-[100%] px-2 p-def border border-[#E3E3E3] rounded-sm font-['Fira_Sans']"
        />
      </div>

      <ButtonAccent
        label="Отправить"
        width="112px"
        height="28px"
        onClick={handleSend}
      />
    </div>
  );
}
