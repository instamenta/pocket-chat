'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { JWT, socket_url } from '@/lib/variables';
import { I_Message, T_VideoCallInviteResponse } from '@/lib/types';
import { toast } from 'react-toastify';
import VideoChatInvitation, {
  toast_config,
} from '@/components/toast/VideoChatInvitation';
import Cookie from 'js-cookie';
import { blob_to_json } from '@/lib/utilities';

import mitt, { Emitter } from 'mitt';

type MittEvents = {
  message: I_Message;
  'video-call-invite': T_VideoCallInviteResponse;
};

type WebSocketContextType = {
  webSocket: WebSocket | null;
  emitter: Emitter<MittEvents> | null;
};

const WebSocketContext = createContext<WebSocketContextType>({
  webSocket: null,
  emitter: null,
});

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const [emitter, setEmitter] = useState<Emitter<MittEvents> | null>(null);

  const connectWebSocket = () => {
    if (!Cookie.get(JWT.token_name)) return;

    const ws = new WebSocket(socket_url);
    const emitter = mitt<MittEvents>();

    ws.onopen = () => console.log('Connected to socket');
    ws.onclose = (event: CloseEvent) => {
      console.error('WebSocket Disconnected', event.reason);
      setTimeout(connectWebSocket, 1000);
    };

    ws.onerror = (error: Event) => {
      console.error('WebSocket Error:', error);
    };

    ws.onmessage = (event: MessageEvent) => {
      blob_to_json<I_Message | T_VideoCallInviteResponse>(
        event.data,
        (data) => {
          if (!data) return console.log('Fail :///');
          console.log(`Emitting event ${data.type}`);
          switch (data.type) {
            case 'message':
              emitter.emit('message', data as I_Message);
              break;
            case 'video-call-invite':
              useCallNotification(data as T_VideoCallInviteResponse);
              emitter.emit(
                'video-call-invite',
                data as T_VideoCallInviteResponse,
              );
              break;
            default:
              console.error('Response type from socket not implemented', data);
          }
        },
      );
    };

    setWebSocket(ws);
    setEmitter(emitter);
  };

  useEffect(() => {
    connectWebSocket();
    return () => {
      webSocket?.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ webSocket, emitter }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export function useCallNotification(callData: T_VideoCallInviteResponse) {
  toast((t) => <VideoChatInvitation {...t} data={callData} />, toast_config);
}
