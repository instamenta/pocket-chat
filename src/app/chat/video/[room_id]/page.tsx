'use client';

import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import useUser from '@/lib/store';
import { getUserByUsername } from '@/lib/queries/user';
import { I_UserSchema } from '@/lib/types';
import { useRecipient, useUserData } from '@/lib/hooks';

type PeerInstance = Peer | null;

const VideoChat = ({
  params: { room_id },
}: {
  params: { room_id: string };
}) => {
  const [myId, setMyId] = useState<string>('');
  const [peerId, setPeerId] = useState<string>('');
  const [user, setUser] = useState<I_UserSchema | null>(null);
  const [recipient, setRecipient] = useState<I_UserSchema | null>(null);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<PeerInstance>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {

      Promise.all([
        useUserData(setUser),
        useRecipient(username)
      ])

      void (async function initialize() {
        const userData = await useUser
          .getState()
          .getUser()
          .then((d) => {
            setUser(d);
            return d;
          });
        if (!userData) return console.log('User not found');

        const recipientData = await getUserByUsername(username);
        if (!recipientData) {
          console.error(`Failed to get recipient with username ${username}`);
          throw new Error(`Failed to get recipient with username ${username}`);
        }
        setRecipient(recipientData);

        const peer = new Peer(userData.id, {
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
              call.answer(stream);
              call.on('stream', (remoteStream) => {
                if (remoteVideoRef.current) {
                  remoteVideoRef.current.srcObject = remoteStream;
                }
              });
            });
          });

        peer.on('open', (id) => {
          setMyId(id);
          callPeer(recipientData.id);
        });

        peer.on('error', (err) => {
          console.error(err);
          alert(`An error occurred: ${err.message}`);
        });

        peer.on('disconnected', () =>
          console.log('Connection lost. Please reconnect.'),
        );

        peerRef.current = peer;
      })();
    }
  }, []);

  const callPeer = (peerIdToCall?: string) => {
    const idToCall = peerIdToCall || peerId;
    const call = peerRef.current?.call(idToCall, localVideoRef.current?.srcObject);

    call?.on('stream', (remoteStream) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
    });

    call?.on('error', (err) => {
      console.error(err);
      alert(`An error occurred during the call: ${err.message}`);
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-200 p-4">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">Video Chat</h1>
      <div className="mb-4 flex gap-4">
        <video
          className="w-1/2 rounded-lg"
          playsInline
          muted
          ref={localVideoRef}
          autoPlay
        ></video>
        <video
          className="w-1/2 rounded-lg"
          playsInline
          ref={remoteVideoRef}
          autoPlay
        ></video>
      </div>
      <div>
        <input
          className="mr-2 rounded-md border-2 border-gray-300 p-2"
          type="text"
          placeholder="Enter peer ID..."
          value={peerId}
          onChange={(e) => setPeerId(e.target.value)}
        />
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={callPeer}
        >
          Call
        </button>
      </div>
      <p className="mt-4">
        My ID: <span className="font-semibold">{myId}</span>
      </p>
    </div>
  );
};

export default VideoChat;
