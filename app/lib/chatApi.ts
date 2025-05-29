import { Post, Get } from './api';
import type {
  ChatListResponse,
  ChatMessagesResponse,
  SendMessageResponse,
  CreateChatRequest,
  SendMessageRequest,
  ArchiveChatRequest,
  MarkReadRequest,
} from './chat';

export async function getChatList(
  includeArchived: boolean = false
): Promise<ChatListResponse> {
  return await Get<ChatListResponse>(
    `api/Chat/list?includeArchived=${includeArchived}`
  );
}

export async function getChatMessages(
  chatId: number,
  page: number = 1,
  pageSize: number = 50
): Promise<ChatMessagesResponse> {
  return await Get<ChatMessagesResponse>(
    `api/Chat/${chatId}/messages?page=${page}&pageSize=${pageSize}`
  );
}

export async function sendMessage(
  request: SendMessageRequest
): Promise<SendMessageResponse> {
  return await Post<SendMessageResponse>('api/Chat/send-message', request);
}

export async function createChat(
  request: CreateChatRequest
): Promise<{ success: boolean; chatId: number }> {
  return await Post<{ success: boolean; chatId: number }>(
    'api/Chat/create',
    request
  );
}

export async function archiveChat(
  request: ArchiveChatRequest
): Promise<{ success: boolean }> {
  return await Post<{ success: boolean }>('api/Chat/archive', request);
}

export async function markMessagesAsRead(
  request: MarkReadRequest
): Promise<{ success: boolean }> {
  return await Post<{ success: boolean }>('api/Chat/mark-read', request);
}
