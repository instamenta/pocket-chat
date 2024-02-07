import { HttpMethod } from '@/lib/index';

const api_url = 'http://localhost:3002/api';
const user_endpoint = `${api_url}/user`;
const friend_endpoint = `${api_url}/friend`;
const message_endpoint = `${api_url}/message`;
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

export const JWT = { token_name: 'X-Authorization-Token' };
