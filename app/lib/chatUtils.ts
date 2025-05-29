import type { Chat, ChatMessage } from './chat';

export function sortChatsByLastUpdate(chats: Chat[]): Chat[] {
  return [...chats].sort((a, b) => {
    const dateA = new Date(a.updatedDate).getTime();
    const dateB = new Date(b.updatedDate).getTime();
    return dateB - dateA; // Most recent first
  });
}

export function getTotalUnreadCount(chats: Chat[]): number {
  return chats.reduce((total, chat) => total + chat.unreadCount, 0);
}

export function formatLastMessageTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

  if (diffInHours < 1) {
    const diffInMinutes = Math.floor(diffInHours * 60);
    return diffInMinutes <= 1 ? 'только что' : `${diffInMinutes} мин назад`;
  } else if (diffInHours < 24) {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  } else if (diffInHours < 48) {
    return 'Вчера';
  } else {
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
    });
  }
}

export function truncateMessage(
  message: string,
  maxLength: number = 50
): string {
  if (message.length <= maxLength) return message;
  return message.substring(0, maxLength) + '...';
}

export function groupMessagesByDate(messages: ChatMessage[]): Array<{
  date: string;
  messages: ChatMessage[];
}> {
  const groups: { [key: string]: ChatMessage[] } = {};

  messages.forEach(message => {
    const date = new Date(message.sentDate).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
  });

  return Object.entries(groups).map(([date, messages]) => ({
    date,
    messages: messages.sort(
      (a, b) => new Date(a.sentDate).getTime() - new Date(b.sentDate).getTime()
    ),
  }));
}

export function isMessageFromToday(dateString: string): boolean {
  const messageDate = new Date(dateString);
  const today = new Date();

  return messageDate.toDateString() === today.toDateString();
}

export function isMessageFromYesterday(dateString: string): boolean {
  const messageDate = new Date(dateString);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return messageDate.toDateString() === yesterday.toDateString();
}
