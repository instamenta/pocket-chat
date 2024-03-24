import { initActionRequest } from '@/lib/actions/actions';
import { FRIENDS } from '@/lib/variables';
import { T_friendRequestLists } from '@/lib/queries/friend';
import { handleResponseList } from '@/lib/utilities';

export const listFriendRequestsOnly = async () =>
  fetch(
    FRIENDS.list_friend_requests_only.url as URL,
    await initActionRequest({
      method: FRIENDS.list_friend_requests_only.method,
      auth: true,
    }),
  ).then((r) => handleResponseList<T_friendRequestLists>(r));

export const listFriendSentOnly = async () =>
  fetch(
    FRIENDS.list_friend_sent_only.url as URL,
    await initActionRequest({
      method: FRIENDS.list_friend_sent_only.method,
      auth: true,
    }),
  ).then((r) => handleResponseList<T_friendRequestLists>(r));

export const listFriendRecommendations = async () =>
  fetch(
    FRIENDS.list_friend_recommendations.url as URL,
    await initActionRequest({
      method: FRIENDS.list_friend_recommendations.method,
      auth: true,
    }),
  ).then((r) => handleResponseList<T_friendRequestLists>(r));
