const API_URL = 'http://localhost:3002/api'
  , USER_ENDPOINT = API_URL + '/user'
  , SIGN_IN = new URL(USER_ENDPOINT + '/sign-in')
  , SIGN_UP = new URL(USER_ENDPOINT + '/sign-up')
;

const REST = {
  API_URL,
  USER_ENDPOINT,
  SIGN_IN,
  SIGN_UP
};

const JWT = {
  TOKEN_NAME: 'X-Authorization-Token'
};

const Variables = { REST, JWT };

export { REST };

export default Variables;

