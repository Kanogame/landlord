import { useState } from 'react';
import ButtonIcon from '../ButtonIcon';
import ButtonAccent from '../ButtonAccent';
import { Input } from '../ui/input';
import IconAttach from '~/media/icons/icon-attach.svg';
import { useDesktop } from '~/hooks/useDesktop';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({
  onSendMessage,
  disabled = false,
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const isDesktop = useDesktop();

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !disabled) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-[5px] pt-[10px] border-t border-[#E3E3E3]">
      <ButtonIcon
        icon={IconAttach}
        onClick={() => console.log('Attach file')}
        disabled={disabled}
      />

      <div className="flex-1">
        <Input
          type="text"
          placeholder={disabled ? 'Отправка...' : 'Введите сообщение...'}
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={disabled}
          className="w-[100%] h-[30px] p-def"
        />
      </div>

      {isDesktop && (
        <ButtonAccent
          label={disabled ? 'Отправка...' : 'Отправить'}
          width="112px"
          height="28px"
          onClick={handleSend}
          disabled={disabled || !message.trim()}
        />
      )}
    </div>
  );
}
