import { HttpMethod } from '@/lib/index';

const api_url = 'http://localhost:3002/api';
const user_endpoint = `${api_url}/user`;
const story_endpoint = `${api_url}/story`;
const short_endpoint = `${api_url}/short`;
const friend_endpoint = `${api_url}/friend`;
const message_endpoint = `${api_url}/message`;
const comment_endpoint = `${api_url}/comment`;
const publication_endpoint = `${api_url}/publication`;
const notification_endpoint = `${api_url}/notification`;

export const socket_url = 'ws://localhost:3003';

type T_rest = {
  url: URL;
  method: HttpMethod;
};

type T_rest_build = {
  url: (sth: string) => URL;
  method: HttpMethod;
};

export const USERS = {
  sign_in: {
    url: new URL(`${user_endpoint}/sign-in`),
    method: 'POST',
  } as T_rest,
  sign_up: {
    url: new URL(`${user_endpoint}/sign-up`),
    method: 'POST',
  } as T_rest,
  list_users: {
    url: new URL(`${user_endpoint}/`),
    method: 'GET',
  } as T_rest,
  auth_user: {
    url: new URL(`${user_endpoint}/auth`),
    method: 'GET',
  } as T_rest,
  update_profile_public_information: {
    url: new URL(`${user_endpoint}/`),
    method: 'PUT',
  } as T_rest,
  update_profile_picture: {
    url: new URL(`${user_endpoint}/picture`),
    method: 'PUT',
  } as T_rest,
  update_bio: {
    url: new URL(`${user_endpoint}/bio`),
    method: 'PUT',
  } as T_rest,
};

export const USERS_DYNAMIC = {
  get_user_by_id: {
    url: (id: string) => new URL(`${user_endpoint}/${id}`),
    method: 'GET',
  } as T_rest_build,
  get_user_by_username: {
    url: (username: string) => new URL(`${user_endpoint}/username/${username}`),
    method: 'GET',
  } as T_rest_build,
};

export const FRIENDS = {
  list_friend_requests: {
    url: new URL(`${friend_endpoint}/`),
    method: 'GET',
  } as T_rest,
  list_friend_requests_only: {
    url: new URL(`${friend_endpoint}/requests`),
    method: 'GET',
  } as T_rest,
  list_friend_sent_only: {
    url: new URL(`${friend_endpoint}/sent`),
    method: 'GET',
  } as T_rest,
  list_friend_recommendations: {
    url: new URL(`${friend_endpoint}/recommendations`),
    method: 'GET',
  } as T_rest,
};

export const FRIENDS_DYNAMIC = {
  list_friends_by_user_id: {
    url: (id: string) => new URL(`${friend_endpoint}/${id}`),
    method: 'GET',
  } as T_rest_build,
  get_by_id: {
    url: (id: string) => new URL(`${friend_endpoint}/one/${id}`),
    method: 'GET',
  } as T_rest_build,
  send_friend_request: {
    url: (id: string) => new URL(`${friend_endpoint}/${id}`),
    method: 'POST',
  } as T_rest_build,
  delete_friend_request: {
    url: (id: string) => new URL(`${friend_endpoint}/${id}`),
    method: 'DELETE',
  } as T_rest_build,
  accept_friend_request: {
    url: (id: string) => new URL(`${friend_endpoint}/${id}/accept`),
    method: 'PUT',
  } as T_rest_build,
  decline_friend_request: {
    url: (id: string) => new URL(`${friend_endpoint}/${id}/decline`),
    method: 'PUT',
  } as T_rest_build,
  get_by_sender_and_recipient: {
    url: (user1: string, user2: string) =>
      new URL(`${friend_endpoint}/${user1}/${user2}`),
    method: 'GET',
  } as {
    url: (user1: string, user2: string) => URL;
    method: HttpMethod;
  },
};

export const MESSAGES = {
  send_message: {
    url: new URL(`${message_endpoint}/`),
    method: 'POST',
  } as T_rest,
};

export const MESSAGES_DYNAMIC = {
  list_messages_by_friendship: {
    url: (id: string) => new URL(`${message_endpoint}/${id}`),
    method: 'GET',
  } as T_rest_build,
  list_messages_by_users: {
    url: (user1: string, user2: string) =>
      new URL(`${message_endpoint}/${user1}/${user2}`),
    method: 'GET',
  } as {
    url: (user1: string, user2: string) => URL;
    method: HttpMethod;
  },
};

export const PUBLICATIONS = {
  list_publications: {
    url: new URL(`${publication_endpoint}/`),
    method: 'GET',
  } as T_rest,
  get_recommendations: {
    url: new URL(`${publication_endpoint}/recommendations`),
    method: 'GET',
  } as T_rest,
  create_publication: {
    url: new URL(`${publication_endpoint}/`),
    method: 'POST',
  } as T_rest,
};

export const PUBLICATIONS_DYNAMIC = {
  get_publication_by_id: {
    url: (id: string) => new URL(`${publication_endpoint}/${id}`),
    method: 'GET',
  } as T_rest_build,
  get_publications_by_user_id: {
    url: (userId: string) => new URL(`${publication_endpoint}/user/${userId}`),
    method: 'GET',
  } as T_rest_build,
  update_publication: {
    url: (id: string) => new URL(`${publication_endpoint}/${id}`),
    method: 'PUT',
  } as T_rest_build,
  like_publication: {
    url: (id: string) => new URL(`${publication_endpoint}/${id}/like`),
    method: 'PUT',
  } as T_rest_build,
};

export const COMMENTS = {};

export const COMMENTS_DYNAMIC = {
  list_comments_by_publication: {
    url: (id: string) => new URL(`${comment_endpoint}/${id}`),
    method: 'GET',
  } as T_rest_build,
  create_comment: {
    url: (id: string) => new URL(`${comment_endpoint}/${id}`),
    method: 'POST',
  } as T_rest_build,
  delete_comment: {
    url: (id: string) => new URL(`${comment_endpoint}/${id}`),
    method: 'DELETE',
  } as T_rest_build,
  like_comment: {
    url: (id: string) => new URL(`${comment_endpoint}/${id}/like`),
    method: 'PUT',
  } as T_rest_build,
};

export const STORY = {
  create_story: {
    url: new URL(`${story_endpoint}/`),
    method: 'POST',
  } as T_rest,
  list_stories: {
    url: new URL(`${story_endpoint}/`),
    method: 'GET',
  } as T_rest,
  list_feed_stories: {
    url: new URL(`${story_endpoint}/feed`),
    method: 'GET',
  } as T_rest,
};

export const STORY_DYNAMIC = {
  list_friend_stories_by_id: {
    url: (username: string) => new URL(`${story_endpoint}/${username}`),
    method: 'GET',
  } as T_rest_build,
};

export const NOTIFICATION = {
  create_notification: {
    url: new URL(`${notification_endpoint}/`),
    method: 'POST',
  } as T_rest,
  mark_all_notifications_as_seen: {
    url: new URL(`${notification_endpoint}/`),
    method: 'PUT',
  } as T_rest,
};

export const NOTIFICATION_DYNAMIC = {
  mark_notification_as_seen: {
    url: (id: string) => new URL(`${notification_endpoint}/${id}`),
    method: 'PUT',
  } as T_rest_build,
  list_notifications: {
    url: (filter: string) =>
      new URL(`${notification_endpoint}/?filter=${filter}`),
    method: 'GET',
  } as T_rest_build,
};

export const SHORT = {
  create_short: {
    url: new URL(`${short_endpoint}/`),
    method: 'POST',
  } as T_rest,
  list_shorts: {
    url: new URL(`${short_endpoint}/`),
    method: 'GET',
  } as T_rest,
};

export const SHORT_DYNAMIC = {
  list_shorts_by_user_id: {
    url: (id: string) => new URL(`${short_endpoint}/${id}`),
    method: 'GET',
  } as T_rest_build,
};

export const JWT = { token_name: 'X-Authorization-Token' };
