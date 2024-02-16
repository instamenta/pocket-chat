'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { socket_url } from '@/lib/variables';
import { T_VideoCallInviteResponse } from '@/lib/types';
import { toast } from 'react-toastify';
import VideoChatInvitation, {
  toast_config,
} from '@/components/toast/VideoChatInvitation';

const WebSocketContext = createContext<WebSocket | null>(null);

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

  const connectWebSocket = useCallback(() => {
    const ws = new WebSocket(socket_url);

    ws.onopen = () => console.log('Connected to socket');
    ws.onclose = (event: CloseEvent) => {
      console.error('WebSocket Disconnected', event.reason);
      //* Reconnection Logic TODO improve
      setTimeout(connectWebSocket, 1000);
    };

    ws.onerror = (error: Event) => console.error('WebSocket Error:', error);

    setWebSocket(ws);
  }, []);

  useEffect(() => {
    connectWebSocket();
    return () => {
      webSocket?.close();
    };
  }, [connectWebSocket]);

  return (
    <WebSocketContext.Provider value={webSocket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export function useCallNotification(callData: T_VideoCallInviteResponse) {
  toast((t) => <VideoChatInvitation {...t} data={callData} />, toast_config);
}
