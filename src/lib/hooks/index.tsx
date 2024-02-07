import React from 'react';
import { I_UserSchema, T_VideoCallInviteResponse } from '@/lib/types';
import useUser from '@/lib/store';
import { getUserById, getUserByUsername } from '@/lib/queries/user';
import { socket_url } from '@/lib/variables';
import { toast } from 'react-toastify';
import VideoChatInvitation, {
  toast_config,
} from '@/components/toast/VideoChatInvitation';

export async function useUserData(
  callback?: (value: React.SetStateAction<I_UserSchema | null>) => void,
) {
  try {
    const d = await useUser.getState().getUser();
    if (callback) callback(d);
    return d;
  } catch (error) {
    console.error('Failed to get user data', error);
    return null;
  }
}

export async function useRecipient(
  filter: string,
  type: 'username' | 'id',
  callback?: (value: React.SetStateAction<I_UserSchema | null>) => void,
) {
  let d: void | I_UserSchema;
  if (type === 'username') {
    d = await getUserByUsername(filter);
  } else {
    d = await getUserById(filter);
  }
  if (!d) {
    console.error(`Failed to get recipient by ${type}: ${filter}`);
    return null;
  }
  if (callback) callback(d);
  return d;
}

export function useSocket(ref: React.MutableRefObject<WebSocket | null>) {
  const socket = new WebSocket(socket_url);
  socket.onopen = () => onOpen();
  socket.onerror = (error) => onError(error);
  ref.current = socket;
  return socket;
}

export const useCallNotification = (callData: T_VideoCallInviteResponse) => {
  toast((t) => <VideoChatInvitation {...t} data={callData} />, toast_config);
};

function onError(error: unknown) {
  console.error('WebSocket Error:', error);
}

function onOpen() {
  console.log('Connected to socket');
}
