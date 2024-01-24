const API_URL = 'http://localhost:3002/api'
  , USER_ENDPOINT = API_URL + '/user'
  , SIGN_IN = new URL(USER_ENDPOINT + '/sign-in')
  , SIGN_UP = new URL(USER_ENDPOINT + '/sign-up')
  , LIST_USERS = new URL(USER_ENDPOINT + '/list')
  , LIST_FRIEND_REQUESTS = new URL(USER_ENDPOINT + '/friends/')
  , SEND_FRIEND_REQUEST = (id: string) => new URL(USER_ENDPOINT + '/friends/' + id)
;

const REST = {
  API_URL,
  USER_ENDPOINT,
  SIGN_IN,
  SIGN_UP,
  LIST_USERS,
  LIST_FRIEND_REQUESTS,
  SEND_FRIEND_REQUEST
};

const JWT = { TOKEN_NAME: 'X-Authorization-Token' };

const Variables = { REST, JWT };

export { REST };

export default Variables;

