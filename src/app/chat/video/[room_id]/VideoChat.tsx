'use client';

import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { I_UserSchema } from '@/lib/types';
import { useRecipient, useUserData } from '@/lib/hooks';
import { getFriendshipById } from '@/lib/queries/friend';
import { usePeer } from '@/lib/hooks/peer';

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
      getFriendshipById(room_id).then(async (friendship) => {
        if (!friendship) {
          return console.error('Friendship not found', friendship);
        }
        const userData = await useUserData(setUser);
        if (!userData) {
          return console.error('Failed to get user data');
        }

        const recipient_id =
          friendship.sender_id === userData.id
            ? friendship.recipient_id
            : friendship.sender_id;

        const recipientData = await useRecipient(
          recipient_id,
          'id',
          setRecipient,
        );
        if (!recipientData) {
          return console.error('Failed to get recipient or user data');
        }

        if (peerRef.current) {
          return console.log('Peer already initiated');
        }
        const peer = usePeer(
          userData.id,
          peerRef,
          localVideoRef,
          remoteVideoRef,
        );

        peer?.on('open', (id) => {
          console.log(`calling peer ${recipient_id} my id ${id}`);
          setMyId(id);
          callPeer(recipientData!.id);
        });
      });
    }

    return () => {
      if (peerRef.current) {
        peerRef.current.destroy();
        peerRef.current = null;
        console.log('Component unmounted, peer connection closed');
      }
    };
  }, []);

  // event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  const callPeer = (customId?: string) => {
    const id = customId ?? recipient!.id;

    console.log('calling peer');

    const call = peerRef.current?.call(
      id,
      localVideoRef.current?.srcObject as MediaStream,
    );

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
          onClick={() => callPeer()}
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
