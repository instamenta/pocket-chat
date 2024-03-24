import { FRIENDS, FRIENDS_DYNAMIC } from '@/lib/variables';
import { initRequest } from '@/lib';
import { I_Friendship, I_UserSchema } from '../types';
import { initActionRequest } from '@/lib/actions/actions';
import { handleResponseList, handleResponseVoid } from '@/lib/utilities';

export const listFriendRecommendations = () =>
  fetch(
    FRIENDS.list_friend_recommendations.url as URL,
    initRequest({
      method: FRIENDS.list_friend_recommendations.method,
      auth: true,
    }),
  ).then(async (response: Response) => {
    if (!response.ok) {
      return console.log('HTTP ERROR', response.status, response);
    }
    return await response.json();
  });

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

export const listFriendRequests = () =>
  fetch(
    FRIENDS.list_friend_requests.url as URL,
    initRequest({
      method: FRIENDS.list_friend_requests.method,
      auth: true,
    }),
  ).then((r) => handleResponseList<I_UserSchema>(r));

export type T_friendRequestLists = {
  id: string;
  first_name: string;
  last_name: string;
  picture: string;
  username: string;
  request_date: string;
};

export const deleteFriendRequest = async (id: string) =>
  fetch(
    FRIENDS_DYNAMIC.delete_friend_request.url(id),
    initRequest({
      method: FRIENDS_DYNAMIC.delete_friend_request.method,
      auth: true,
    }),
  ).then(handleResponseVoid);

export const sendFriendRequest = async (id: string) =>
  fetch(
    FRIENDS_DYNAMIC.send_friend_request.url(id),
    initRequest({
      method: FRIENDS_DYNAMIC.send_friend_request.method,
      auth: true,
    }),
  ).then(handleResponseVoid);

export const acceptFriendRequest = async (id: string) =>
  fetch(
    FRIENDS_DYNAMIC.accept_friend_request.url(id),
    initRequest({
      method: FRIENDS_DYNAMIC.accept_friend_request.method,
      auth: true,
    }),
  ).then(handleResponseVoid);

export const declineFriendRequest = async (id: string) =>
  fetch(
    FRIENDS_DYNAMIC.decline_friend_request.url(id),
    initRequest({
      method: FRIENDS_DYNAMIC.decline_friend_request.method,
      auth: true,
    }),
  ).then(handleResponseVoid);

export const listFriendsByUserId = (id: string) =>
  fetch(
    FRIENDS_DYNAMIC.list_friends_by_user_id.url(id),
    initRequest({
      method: FRIENDS_DYNAMIC.list_friends_by_user_id.method,
      auth: true,
    }),
  ).then((r) => handleResponseList<I_UserSchema>(r));

export const getBySenderAndRecipient = (user1: string, user2: string) =>
  fetch(
    FRIENDS_DYNAMIC.get_by_sender_and_recipient.url(user1, user2),
    initRequest({
      method: FRIENDS_DYNAMIC.get_by_sender_and_recipient.method,
      auth: true,
    }),
  ).then(async (response: Response): Promise<I_Friendship | null> => {
    if (!response.ok) {
      console.log('HTTP ERROR', response.status, response);
      return null;
    }
    return await response.json();
  });

export const getFriendshipById = (id: string) =>
  fetch(
    FRIENDS_DYNAMIC.get_by_id.url(id),
    initRequest({
      method: FRIENDS_DYNAMIC.get_by_id.method,
      auth: true,
    }),
  ).then(async (response: Response): Promise<I_Friendship | null> => {
    if (!response.ok) {
      console.log('HTTP ERROR', response.status, response);
      return null;
    }
    return await response.json();
  });
