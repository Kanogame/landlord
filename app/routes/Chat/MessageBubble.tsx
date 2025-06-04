import Avatar from '../../components/chat/Avatar';
import type { MessageData } from '../../components/chat/chatData';

interface MessageBubbleProps {
  message: MessageData;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isOwn = message.senderId === 'me';

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} gap-3`}>
      {!isOwn && <Avatar avatar={message.senderAvatar} size={40} />}

      <div
        className={`max-w-md ${
          isOwn ? 'items-end' : 'items-start'
        } flex flex-col gap-1`}
      >
        <div
          className={`p-[6px] rounded-[8px] flex flex-col ${
            isOwn ? 'bg-[#F3E7E7]' : 'bg-[#EFEFEF]'
          }`}
        >
          <div className="p-def w-max-[700px]">{message.text}</div>
          {message.image && (
            <img
              src={message.image}
              alt="Message attachment"
              className="max-w-full h-auto rounded-sm"
            />
          )}

          <div className="hint self-end pt-[1px]">{message.time}</div>
        </div>
      </div>

      {isOwn && <Avatar avatar={message.senderAvatar} size={40} />}
    </div>
  );
}
