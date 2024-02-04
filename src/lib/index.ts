'use client';

import { JWT } from '@/lib/variables';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';

export function extractAuthToken() {
  return Cookie.get(JWT.token_name) ?? null;
}

export function removeAuthToken() {
  document.cookie =
    `${JWT.token_name}=; expires=` + new Date(0).toUTCString() + '; path=/';
}

type T_request_body_builder = {
  method?: HttpMethod;
  body?: object | object[] | string | null;
  auth?: boolean;
};

export type HttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'OPTIONS'
  | 'HEAD'
  | 'CONNECT'
  | 'TRACE';

export function initRequest({
  method = 'GET',
  body = null,
  auth = false,
}: T_request_body_builder): RequestInit {
  const init: RequestInit = {
    method,
    credentials: 'include',
    cache: 'no-store',
  };

  let token: string | null = null;

  if (auth) token = extractAuthToken();

  if (auth && !token) {
    const router = useRouter();
    router.push('/auth');
  }

  const _headers: HeadersInit = { 'Content-Type': 'application/json' };

  if (auth && token) _headers[JWT.token_name] = token;

  init.headers = _headers;
  if (body) init.body = JSON.stringify(body);

  return init;
}
