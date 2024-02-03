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

export interface I_Message {
  id: string,
  content: string,
  message_status: 'seen' | 'sent' | 'pending',
  updated_at: string,
  created_at: string,
  edited: boolean,
  sender_id: string,
  recipient_id: string,
  friendship_id: string,
}

export type T_MessageResponse = {
  date: string,
  sender: string,
  content: string,
  recipient: string,
  messageId: string,
  friendship: string,
}
