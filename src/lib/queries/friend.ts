import { FRIENDS, FRIENDS_DYNAMIC } from '@/variables';
import { initRequest } from '@/lib';

export const listFriendRecommendations = () => fetch(
  FRIENDS.list_friend_recommendations.url as URL,
  initRequest({
    method: FRIENDS.list_friend_recommendations.method,
    auth: true
  })
).then(async (response: Response) => {
    if (!response.ok) {
      return console.log('HTTP ERROR', response.status, response);
    }
    return await response.json();
  }
);

export const listFriendRequests = () => fetch(
  FRIENDS.list_friend_requests.url as URL,
  initRequest({
    method: FRIENDS.list_friend_requests.method,
    auth: true
  })
).then(async (response: Response) => {
    if (!response.ok) {
      return console.log('HTTP ERROR', response.status, response);
    }
    return await response.json();
  }
);

export type T_friendRequestLists = {
  id: string,
  first_name: string,
  last_name: string,
  picture: string,
  username: string,
  request_date: string,
}



export const deleteFriendRequest = async (id: string) => fetch(
  FRIENDS_DYNAMIC.delete_friend_request.url(id),
  initRequest({
    method: FRIENDS_DYNAMIC.delete_friend_request.method,
    auth: true
  })
).then((response) => {
  if (!response || !response.ok) {
    return console.error(
      `Failed to send request Status: ${response?.status}`,
      response
    );
  }
});

export const sendFriendRequest = async (id: string) => fetch(
  FRIENDS_DYNAMIC.send_friend_request.url(id),
  initRequest({
    method: FRIENDS_DYNAMIC.send_friend_request.method,
    auth: true
  })
).then((response) => {
  if (!response || !response.ok) {
    return console.error(
      `Failed to send request Status: ${response?.status}`,
      response
    );
  }
});

export const acceptFriendRequest = async (id: string) => fetch(
  FRIENDS_DYNAMIC.accept_friend_request.url(id),
  initRequest({
    method: FRIENDS_DYNAMIC.accept_friend_request.method,
    auth: true
  })
).then((response) => {
  if (!response || !response.ok) {
    return console.error(
      `Failed to accept friend request Status: ${response?.status}`,
      response
    );
  }
});

export const declineFriendRequest = async (id: string) => fetch(
  FRIENDS_DYNAMIC.decline_friend_request.url(id),
  initRequest({
    method: FRIENDS_DYNAMIC.decline_friend_request.method,
    auth: true
  })
).then((response) => {
  if (!response || !response.ok) {
    return console.error(
      `Failed to decline friend request Status: ${response?.status}`,
      response
    );
  }
});