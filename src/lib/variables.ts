import { HttpMethod } from '@/lib/index';

const API_URL = 'http://localhost:3002/api';

const endpoints = {
  user: `${API_URL}/user`,
  story: `${API_URL}/story`,
  group: `${API_URL}/group`,
  short: `${API_URL}/short`,
  friend: `${API_URL}/friend`,
  message: `${API_URL}/message`,
  comment: `${API_URL}/comment`,
  publication: `${API_URL}/publication`,
  notification: `${API_URL}/notification`,
};

export const socket_url = 'ws://localhost:3003';

type T_Rest = {
  url: URL;
  method: HttpMethod;
};

type T_Rest1Param = {
  url: (sth: string) => URL;
  method: HttpMethod;
};

type T_Rest2Param = {
  url: (id1: string, id2: string) => URL;
  method: HttpMethod;
};

export const USERS = {
  sign_in: {
    url: new URL(`${endpoints.user}/sign-in`),
    method: 'POST',
  } as T_Rest,
  sign_up: {
    url: new URL(`${endpoints.user}/sign-up`),
    method: 'POST',
  } as T_Rest,
  list_users: {
    url: new URL(`${endpoints.user}/`),
    method: 'GET',
  } as T_Rest,
  auth_user: {
    url: new URL(`${endpoints.user}/auth`),
    method: 'GET',
  } as T_Rest,
  update_profile_public_information: {
    url: new URL(`${endpoints.user}/`),
    method: 'PUT',
  } as T_Rest,
  update_profile_picture: {
    url: new URL(`${endpoints.user}/picture`),
    method: 'PUT',
  } as T_Rest,
  update_bio: {
    url: new URL(`${endpoints.user}/bio`),
    method: 'PUT',
  } as T_Rest,
};

export const USERS_DYNAMIC = {
  get_user_by_id: {
    url: (id: string) => new URL(`${endpoints.user}/${id}`),
    method: 'GET',
  } as T_Rest1Param,
  get_user_by_username: {
    url: (username: string) =>
      new URL(`${endpoints.user}/username/${username}`),
    method: 'GET',
  } as T_Rest1Param,
};

export const FRIENDS = {
  list_friend_requests: {
    url: new URL(`${endpoints.friend}/`),
    method: 'GET',
  } as T_Rest,
  list_friend_requests_only: {
    url: new URL(`${endpoints.friend}/requests`),
    method: 'GET',
  } as T_Rest,
  list_friend_sent_only: {
    url: new URL(`${endpoints.friend}/sent`),
    method: 'GET',
  } as T_Rest,
  list_friend_recommendations: {
    url: new URL(`${endpoints.friend}/recommendations`),
    method: 'GET',
  } as T_Rest,
};

export const FRIENDS_DYNAMIC = {
  list_friends_by_user_id: {
    url: (id: string) => new URL(`${endpoints.friend}/${id}`),
    method: 'GET',
  } as T_Rest1Param,
  get_by_id: {
    url: (id: string) => new URL(`${endpoints.friend}/one/${id}`),
    method: 'GET',
  } as T_Rest1Param,
  send_friend_request: {
    url: (id: string) => new URL(`${endpoints.friend}/${id}`),
    method: 'POST',
  } as T_Rest1Param,
  delete_friend_request: {
    url: (id: string) => new URL(`${endpoints.friend}/${id}`),
    method: 'DELETE',
  } as T_Rest1Param,
  accept_friend_request: {
    url: (id: string) => new URL(`${endpoints.friend}/${id}/accept`),
    method: 'PUT',
  } as T_Rest1Param,
  decline_friend_request: {
    url: (id: string) => new URL(`${endpoints.friend}/${id}/decline`),
    method: 'PUT',
  } as T_Rest1Param,
  get_by_sender_and_recipient: {
    url: (user1: string, user2: string) =>
      new URL(`${endpoints.friend}/${user1}/${user2}`),
    method: 'GET',
  } as T_Rest2Param,
};

export const MESSAGES = {
  send_message: {
    url: new URL(`${endpoints.message}/`),
    method: 'POST',
  } as T_Rest,
};

export const MESSAGES_DYNAMIC = {
  list_messages_by_friendship: {
    url: (id: string) => new URL(`${endpoints.message}/${id}`),
    method: 'GET',
  } as T_Rest1Param,
  list_messages_by_users: {
    url: (user1: string, user2: string) =>
      new URL(`${endpoints.message}/${user1}/${user2}`),
    method: 'GET',
  } as {
    url: (user1: string, user2: string) => URL;
    method: HttpMethod;
  },
};

export const PUBLICATIONS = {
  list_publications: {
    url: new URL(`${endpoints.publication}/`),
    method: 'GET',
  } as T_Rest,
  get_recommendations: {
    url: new URL(`${endpoints.publication}/recommendations`),
    method: 'GET',
  } as T_Rest,
  create_publication: {
    url: new URL(`${endpoints.publication}/`),
    method: 'POST',
  } as T_Rest,
};

export const PUBLICATIONS_DYNAMIC = {
  get_publication_by_id: {
    url: (id: string) => new URL(`${endpoints.publication}/${id}`),
    method: 'GET',
  } as T_Rest1Param,
  get_publications_by_user_id: {
    url: (userId: string) => new URL(`${endpoints.publication}/user/${userId}`),
    method: 'GET',
  } as T_Rest1Param,
  update_publication: {
    url: (id: string) => new URL(`${endpoints.publication}/${id}`),
    method: 'PUT',
  } as T_Rest1Param,
  like_publication: {
    url: (id: string) => new URL(`${endpoints.publication}/${id}/like`),
    method: 'PUT',
  } as T_Rest1Param,
};

export const COMMENTS = {};

export const COMMENTS_DYNAMIC = {
  list_comments_by_publication: {
    url: (id: string) => new URL(`${endpoints.comment}/${id}`),
    method: 'GET',
  } as T_Rest1Param,
  create_comment: {
    url: (id: string) => new URL(`${endpoints.comment}/${id}`),
    method: 'POST',
  } as T_Rest1Param,
  delete_comment: {
    url: (id: string) => new URL(`${endpoints.comment}/${id}`),
    method: 'DELETE',
  } as T_Rest1Param,
  like_comment: {
    url: (id: string) => new URL(`${endpoints.comment}/${id}/like`),
    method: 'PUT',
  } as T_Rest1Param,
};

export const STORY = {
  create_story: {
    url: new URL(`${endpoints.story}/`),
    method: 'POST',
  } as T_Rest,
  list_stories: {
    url: new URL(`${endpoints.story}/`),
    method: 'GET',
  } as T_Rest,
  list_feed_stories: {
    url: new URL(`${endpoints.story}/feed`),
    method: 'GET',
  } as T_Rest,
};

export const STORY_DYNAMIC = {
  list_friend_stories_by_id: {
    url: (username: string) => new URL(`${endpoints.story}/${username}`),
    method: 'GET',
  } as T_Rest1Param,
};

export const NOTIFICATION = {
  create_notification: {
    url: new URL(`${endpoints.notification}/`),
    method: 'POST',
  } as T_Rest,
  mark_all_notifications_as_seen: {
    url: new URL(`${endpoints.notification}/`),
    method: 'PUT',
  } as T_Rest,
};

export const NOTIFICATION_DYNAMIC = {
  mark_notification_as_seen: {
    url: (id: string) => new URL(`${endpoints.notification}/${id}`),
    method: 'PUT',
  } as T_Rest1Param,
  list_notifications: {
    url: (filter: string) =>
      new URL(`${endpoints.notification}/?filter=${filter}`),
    method: 'GET',
  } as T_Rest1Param,
};

export const SHORT = {
  create_short: {
    url: new URL(`${endpoints.short}/`),
    method: 'POST',
  } as T_Rest,
  list_shorts: {
    url: new URL(`${endpoints.short}/`),
    method: 'GET',
  } as T_Rest,
};

export const SHORT_DYNAMIC = {
  list_shorts_by_user_id: {
    url: (id: string) => new URL(`${endpoints.short}/${id}`),
    method: 'GET',
  } as T_Rest1Param,
};

export const GROUP = {
  list_groups: {
    url: new URL(`${endpoints.group}/`),
    method: 'GET',
  } as T_Rest,
  create_group: {
    url: new URL(`${endpoints.group}/`),
    method: 'POST',
  } as T_Rest,
  create_publication: {
    url: new URL(`${endpoints.group}/`),
    method: 'POST',
  } as T_Rest,
};

export const GROUP_DYNAMIC = {
  list_groups_by_user: {
    url: (id: string) => new URL(`${endpoints.group}/list/${id}`),
    method: 'GET',
  } as T_Rest1Param,
  list_members_by_group_id: {
    url: (id: string) => new URL(`${endpoints.group}/member/${id}`),
    method: 'GET',
  } as T_Rest1Param,
  get_group_by_id: {
    url: (id: string) => new URL(`${endpoints.group}/${id}`),
    method: 'GET',
  } as T_Rest1Param,
  join_group: {
    url: (id: string) => new URL(`${endpoints.group}/join/${id}`),
    method: 'PUT',
  } as T_Rest1Param,
  leave_group: {
    url: (id: string) => new URL(`${endpoints.group}/leave/${id}`),
    method: 'PUT',
  } as T_Rest1Param,
  change_role: {
    url: (id1: string, id2: string) =>
      new URL(`${endpoints.group}/${id1}/${id2}`),
    method: 'PUT',
  } as T_Rest2Param,
  remove_group: {
    url: (id: string) => new URL(`${endpoints.group}/${id}`),
    method: 'DELETE',
  } as T_Rest1Param,
  remove_member: {
    url: (id1: string, id2: string) =>
      new URL(`${endpoints.group}/${id1}/${id2}`),
    method: 'DELETE',
  } as T_Rest2Param,
  list_publications: {
    url: (id) => new URL(`${endpoints.group}/post/${id}`),
    method: 'GET',
  } as T_Rest1Param,
};

export const JWT = { token_name: 'X-Authorization-Token' };
