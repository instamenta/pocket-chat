import React from 'react';
import { I_UserSchema, T_VideoCallInviteResponse } from '@/lib/types';
import useUser from '@/lib/store';
import { getUserByUsername } from '@/lib/queries/user';
import { socket_url } from '@/lib/variables';
import { blob_to_json } from '@/lib/utilities';
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
  username: string,
  callback?: (value: React.SetStateAction<I_UserSchema | null>) => void,
) {
  const d = await getUserByUsername(username);
  if (!d) {
    console.error(`Failed to get recipient with username ${username}`);
    return null;
  }
  if (callback) callback(d);
  return d;
}

export function useSocket<T>(
  ref: React.MutableRefObject<WebSocket | null>,
  callback?: (arg0: MessageEvent) => unknown,
) {
  const socket = new WebSocket(socket_url);
  ref.current = socket;
  socket.onopen = () => onOpen();
  socket.onerror = (error) => onError(error);
  socket.onmessage = (event: MessageEvent) => {
    blob_to_json<T>(event.data, (data) => {
      if (!data) {
        console.log('No data returned from Web Socket', data);
        return null;
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if ('type' in data) {
        if (data.type === 'message') {
          return data;
        } else if (data.type === 'video-call-invite') {
          return data;
        } else {
          console.error('Response type from socket not implemented', data);
        }
      } else {
        console.error('Type is missing from data', data);
        return null;
      }
    });
    if (callback) {
      callback(event);
    }
  };

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
