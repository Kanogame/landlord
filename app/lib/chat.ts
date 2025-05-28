export interface ChatMessage {
  id: number;
  senderId: number;
  senderName: string;
  content: string;
  sentDate: string;
  isRead: boolean;
  isOwnMessage: boolean;
}

export interface Chat {
  id: number;
  otherUserId: number;
  otherUserName: string;
  propertyId: number;
  propertyAddress: string;
  createdDate: string;
  updatedDate: string;
  isArchived: boolean;
  unreadCount: number;
  lastMessage?: ChatMessage;
}

export interface ChatListResponse {
  success: boolean;
  chats: Chat[];
}

export interface ChatMessagesResponse {
  success: boolean;
  messages: ChatMessage[];
}

export interface SendMessageResponse {
  success: boolean;
  message: ChatMessage;
}

export interface CreateChatRequest {
  otherUserId: number;
  propertyId: number;
}

export interface SendMessageRequest {
  chatId: number;
  content: string;
}

export interface ArchiveChatRequest {
  chatId: number;
  isArchived: boolean;
}

export interface MarkReadRequest {
  chatId: number;
}