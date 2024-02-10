import { MESSAGES_DYNAMIC } from '@/lib/variables';
import { initRequest } from '@/lib';
import { I_Message } from '@/lib/types';

export const listMessagesByUsers = async (user1: string, user2: string) =>
  fetch(
    MESSAGES_DYNAMIC.list_messages_by_users.url(user1, user2),
    initRequest({
      method: MESSAGES_DYNAMIC.list_messages_by_users.method,
      auth: true,
    }),
  ).then(async (res): Promise<I_Message[]> => {
    if (!res || !res.ok) {
      console.log('HTTP Error', res?.statusText);
      return [];
    }
    return res.json();
  });
