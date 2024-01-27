export function extractAuthToken() {
  const data = document.cookie
    .split('; ')
    .find((c) => c.startsWith('X-Authorization-Token='))
  ;

  return data ? data.slice('X-Authorization-Token=X-Authorization-Token%'.length) : null;
}

export function removeAuthToken() {
  document.cookie = 'X-Authorization-Token=; expires='
    + new Date(0).toUTCString() + '; path=/';
}

type T_request_body_builder = {
  method?: HttpMethod;
  body?: object | object[] | string | null;
  auth?: boolean;
};

type HttpMethod =
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
                              auth = false
                            }: T_request_body_builder): RequestInit {
  const init: RequestInit = { method, credentials: 'include' };

  let token: string | null = null;

  if (auth) token = extractAuthToken();

  if (auth && !token) throw new Error('UNAUTHORIZED requestBodyBuilder():');

  const _headers: HeadersInit = { 'Content-Type': 'application/json' };

  if (auth && token) _headers['X-Authorization-Token'] = token;

  console.log(token);

  init.headers = _headers;
  if (body) init.body = JSON.stringify(body);

  return init;
}
