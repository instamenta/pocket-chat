import { initActionRequest } from '@/lib/actions/actions';
import { FRIENDS } from '@/variables';
import { T_friendRequestLists } from '@/lib/queries/friend';

export const listFriendRequestsOnly = async () => fetch(
  FRIENDS.list_friend_requests_only.url as URL,
  await initActionRequest({
    method: FRIENDS.list_friend_requests_only.method,
    auth: true
  })
).then(async (response: Response): Promise<T_friendRequestLists[]> => {
    if (!response.ok) {
      console.log('HTTP ERROR', response.status, response);
      return [];
    }
    return await response.json();
  }
);

export const listFriendSentOnly = async () => fetch(
  FRIENDS.list_friend_sent_only.url as URL,
  await initActionRequest({
    method: FRIENDS.list_friend_sent_only.method,
    auth: true
  })
).then(async (response: Response): Promise<T_friendRequestLists[]> => {
    if (!response.ok) {
      console.log('HTTP ERROR', response.status, response);
      return [];
    }
    return await response.json();
  }
);

export const listFriendRecommendations = async () => fetch(
  FRIENDS.list_friend_recommendations.url as URL,
  await initActionRequest({
    method: FRIENDS.list_friend_recommendations.method,
    auth: true
  })
).then(async (response: Response): Promise<T_friendRequestLists[]> => {
    if (!response.ok) {
      console.log('HTTP ERROR', response.status, response);
      return [];
    }
    return await response.json();
  }
);
