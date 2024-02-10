export interface I_UserSchema {
  id: string
  username: string
  email: string
  password: string
  first_name: string
  last_name: string
  picture: string
  created_at: string // Timestamp in ISO 8601 format
  updated_at: string // Timestamp in ISO 8601 format
  last_active_at: string // Timestamp in ISO 8601 format
}

type T_FriendRequestData = {
  id: string
  first_name: string
  last_name: string
  picture: string
  username: string
  request_date: string
  request_type: 'sent' | 'received'
}

export interface I_Message {
  id: string,
  content: string,
  type: string,
  message_status: 'seen' | 'sent' | 'pending',
  updated_at: string,
  created_at: string,
  edited: boolean,
  sender_id: string,
  recipient_id: string,
  friendship_id: string,
}

export type T_MessageResponse = {
  type: string,
  date: string,
  sender: string,
  content: string,
  recipient: string,
  messageId: string,
  friendship: string,
}


export interface I_Friendship {
  id: string,
  created_at: string,
  sender_id: string,
  recipient_id: string,
  friendship_status: 'accepted' | 'pending'
}

export interface T_VideoCallInviteResponse {
  type: string,
  room_id: string,
  sender_id: string,
  recipient_id: string,
  date: string,
}

export interface T_Comment {
  id: string
  content: string
  created_at: string
  publication_id: string
  user_id: string
}

export interface T_PopulatedComment {
  id: string,
  content: string,
  created_at: string,
  publication_id: string,
  user_id: string,
  username: string,
  picture: string,
  liked_by_user: boolean
}

export enum E_PublicationStatus {
  Draft = 'draft',
  Published = 'published'
}

export interface I_Publication {
  id: string
  created_at: string
  updated_at: string
  publication_status: E_PublicationStatus
  images: string[]
  description: string
  publisher_id: string
  likes_count: number
  comments_count: number
  publisher: string
}

export interface I_Recommendation {
  id: string
  created_at: string
  updated_at: string
  publication_status: E_PublicationStatus
  images: string[]
  description: string
  publisher_id: string
  likes_count: number
  comments_count: number
  publisher: string
  username: string
  picture: string
  liked_by_user: boolean
  first_name: string
  last_name: string
}