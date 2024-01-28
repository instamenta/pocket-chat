export interface I_UserSchema {
  id: string;
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  picture: string;
  created_at: string; // Timestamp in ISO 8601 format
  updated_at: string; // Timestamp in ISO 8601 format
  last_active_at: string; // Timestamp in ISO 8601 format
}

type T_FriendRequestData = {
  id: string;
  first_name: string;
  last_name: string;
  picture: string;
  username: string;
  request_date: string;
  request_type: 'sent' | 'received';
};
