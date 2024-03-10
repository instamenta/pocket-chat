'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useUserContext } from '@/lib/context/UserContext';
import Peer from 'peerjs';
import { FaMicrophoneLines } from 'react-icons/fa6';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { IoReloadSharp, IoSendSharp } from 'react-icons/io5';
import { ImPhoneHangUp } from 'react-icons/im';
import {
  useWebSocket,
  wsJoinLive,
  wsSendLiveMessage,
} from '@/lib/context/WebsocketContext';
import {
  I_LeaveLiveRequest,
  T_LiveMessagePopulated,
  T_LiveMessageResponse,
} from '@/lib/types';
import { socket_events } from '@/lib/types/enumerations';
import { listLiveMessages } from '@/lib/queries/live';
import Navbar from '@/components/Navbar/Navbar';

const LiveHost = ({ params: { id: liveId } }: { params: { id: string } }) => {
  const { user } = useUserContext();

  const { webSocket: ws, emitter, connectWebSocket } = useWebSocket();
  const [messages, setMessages] = useState<
    Array<T_LiveMessageResponse | T_LiveMessagePopulated>
  >([]);
  const [message, setMessage] = useState<string>('');
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<Peer | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  function joinLive(): void | NodeJS.Timeout {
    if (!ws || !ws.readyState) return setTimeout(joinLive, 1000);
    wsJoinLive({ ws, liveId });
  }

  useEffect(() => {
    if (!emitter) return;

    emitter.on(socket_events.LIVE_MESSAGE, (data: T_LiveMessageResponse) =>
      setMessages((prev) => [data, ...prev]),
    );

    return () => {
      emitter.off(socket_events.LIVE_MESSAGE, () => {});
    };
  }, [emitter]);

  useEffect(() => {
    const peer = new Peer(liveId, {
      host: 'localhost',
      port: 3004,
      path: '/peerjs',
    });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        peer.on('call', (call) => {
          console.log("ANSWER")
          call.answer(stream);

          peer.call(call.peer, stream);
        });
      })
      .catch((error) => console.error('Failed to get local stream', error));

    peer.on('error', (err) => console.error(err));

    peer.on('error', (err) => {
      console.error(err);
      alert(`An error occurred: ${err.message}`);
    });

    peer.on('open', (id) => console.log(`Broadcaster ID: ${id}`));

    peer.on('disconnected', () =>
      console.log('Connection lost. Please reconnect.'),
    );

    peerRef.current = peer;

    if (!ws) {
      console.error('No Websocket Connection');
      connectWebSocket();
    } else {
      joinLive();
    }

    listLiveMessages(liveId).then(setMessages);

    return () => {
      if (peerRef.current) {
        peerRef.current.destroy();
        peerRef.current = null;
        console.log('Component unmounted, peer connection closed');
      }
      if (ws && ws.readyState) {
        const request: I_LeaveLiveRequest = {
          type: socket_events.LEAVE_LIVE,
          liveId: liveId,
        };
        ws.send(JSON.stringify(request));
      }
    };
  }, []);

  const handleMessage = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): Promise<void> => {
    event.preventDefault();

    wsSendLiveMessage({
      ws,
      liveId: liveId,
      content: message,
      sender: user.id,
    });
  };

  return (
    <>
      <Navbar />
      <section className="absolute top-16 z-10 w-full">
        <div className="flex h-full w-full justify-between py-2 pl-4 pr-2">
          <button className="rounded-full  bg-slate-800 px-1">
            <IoReloadSharp className="size-8 fill-white text-white" />
          </button>
          <button className="rounded-full bg-red-600 p-1">
            <ImPhoneHangUp className="size-8 -translate-y-0.5 fill-white" />
          </button>
        </div>
      </section>
      <section className="flex min-h-screen flex-col items-center justify-center bg-gray-200">
        <video
          controls={true}
          controlsList="nodownload "
          className="h-full w-full"
          playsInline
          ref={localVideoRef}
          autoPlay
        ></video>
      </section>
      <section className="absolute bottom-4 w-full px-4">
        <div
          ref={chatContainerRef}
          className="mb-4 flex h-48 flex-col-reverse overflow-y-auto rounded-3xl bg-slate-800 bg-opacity-15 py-2 pl-4 pr-2 md:h-32 lg:h-40"
        >
          {messages.map((message) => (
            <div key={message.message_id} className="max-w-[60%]">
              <span>{message.content}</span>
            </div>
          ))}
        </div>

        <div className="flex h-full w-full justify-between gap-4 rounded-3xl bg-slate-800 py-2 pl-4 pr-2">
          <div className="flex gap-4">
            <button className="rounded-full  p-1">
              <FaMicrophoneLines className="size-6 fill-white transition-all hover:fill-white" />
            </button>
            <button className="aspect-square rounded-full">
              <BsFillCameraVideoFill className="size-6 fill-white transition-all hover:fill-white" />
            </button>
          </div>

          <div className="flex gap-2 pr-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              className="w-full rounded-2xl px-4"
            />
            {/* Send Message Icon */}
            <button
              className="rounded-full transition-all hover:bg-blue-300  hover:fill-white"
              type="submit"
              onClick={handleMessage}
            >
              <IoSendSharp className="size-6 fill-white" />
              <span className="sr-only">Send message</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default LiveHost;
