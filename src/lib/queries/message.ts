import { MESSAGES, MESSAGES_DYNAMIC } from '@/lib/variables';
import { initRequest } from '@/lib';
import { I_Message, T_Conversations } from '@/lib/types';
import { handleResponseList } from '@/lib/utilities';

export const listMessagesByUsers = async (user1: string, user2: string) =>
  fetch(
    MESSAGES_DYNAMIC.list_messages_by_users.url(user1, user2),
    initRequest({
      method: MESSAGES_DYNAMIC.list_messages_by_users.method,
      auth: true,
    }),
  ).then((r) => handleResponseList<I_Message>(r));

export const listConversations = async () =>
  fetch(
    MESSAGES.list_conversations.url,
    initRequest({
      method: MESSAGES.list_conversations.method,
      auth: true,
    }),
  ).then((r) => handleResponseList<T_Conversations>(r));
