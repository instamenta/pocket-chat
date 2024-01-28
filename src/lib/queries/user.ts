import { USERS } from '@/lib/variables';
import { initRequest } from '@/lib';
import { I_UserSchema } from '@/lib/types';

export const acceptFriendRequest = async () =>
  fetch(
    USERS.auth_user.url,
    initRequest({
      method: USERS.auth_user.method,
      auth: true
    })
  ).then(async (response): Promise<I_UserSchema | void> => {
    if (!response || !response.ok) {
      return console.error(
        `Failed to accept friend request Status: ${response?.status}`,
        response
      );
    }
    return response.json();
  });