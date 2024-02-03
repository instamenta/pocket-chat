'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { JWT } from '@/lib/variables';
import { HttpMethod } from '@/lib';

export async function extractAuthToken() {
  const cookieStore = cookies();
  return (cookieStore.get(JWT.token_name)?.value as string) ?? null;
}

export async function remoteAuthToken() {
  cookies().delete(JWT.token_name);
  redirect('/redirect');
}

export async function action() {}

// TODO IMPLEMENT

type T_request_body_builder = {
  method?: HttpMethod;
  body?: object | object[] | string | null;
  auth?: boolean;
};

export async function initActionRequest({
  method = 'GET',
  body = null,
  auth = false,
}: T_request_body_builder): Promise<RequestInit> {
  const init: RequestInit = { method, credentials: 'include' };

  let token: string | null = null;

  if (auth) token = await extractAuthToken();

  if (auth && !token) throw new Error('UNAUTHORIZED requestBodyBuilder():');

  const _headers: HeadersInit = { 'Content-Type': 'application/json' };

  if (auth && token) {
    _headers[JWT.token_name] = token;
    _headers['Cookie'] = `${JWT.token_name}=${token}`;
  }

  init.headers = _headers;
  if (body) init.body = JSON.stringify(body);

  init.cache = 'no-store';

  return init;
}
