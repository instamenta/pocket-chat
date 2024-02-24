'use client';

import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { I_UserSchema } from '@/lib/types';
import { useRecipient } from '@/lib/hooks';
import { getFriendshipById } from '@/lib/queries/friend';
import { usePeer } from '@/lib/hooks/peer';
import { useUserContext } from '@/lib/context/UserContext';

const VideoChat = ({
  params: { room_id },
}: {
  params: { room_id: string };
}) => {
  const { user } = useUserContext();

  const [myId, setMyId] = useState<string>('');
  const [recipient, setRecipient] = useState<I_UserSchema | null>(null);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<Peer | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      getFriendshipById(room_id).then(async (friendship) => {
        if (!friendship)
          return console.error('Friendship not found', friendship);

        const recipient_id =
          friendship.sender_id === user.id
            ? friendship.recipient_id
            : friendship.sender_id;

        const recipientData = await useRecipient(
          recipient_id,
          'id',
          setRecipient,
        );

        if (!recipientData)
          return console.error('Failed to get recipient or user data');
        if (peerRef.current) return console.log('Peer already initiated');

        const peer = usePeer(user.id, peerRef, localVideoRef, remoteVideoRef);
        if (!peer) {
          return console.log('Failed to create Peer connection');
        }

        peer.on('open', (id) => {
          setMyId(id);
          callPeer(recipientData.id);
          setTimeout(() => callPeer(recipientData!.id), 1_000);
        });

        peer.on('disconnected', () => {
          console.log('Attempting to reconnect to peer');
          peer.reconnect();
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
    console.log('calling peer');

    const id = customId ?? recipient!.id;
    const call = peerRef.current?.call(
      id,
      localVideoRef.current?.srcObject as MediaStream,
    );

    if (!call) return console.error('failed to get Peer call');

    call.on('stream', (remoteStream) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
    });

    call.on('error', (error) => {
      console.error(error);
      callPeer(id);
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-200">
      <div className="flex w-full flex-grow flex-col">
        <div className="h-1/2 w-full flex-grow outline outline-1">
          <video
            controls={true}
            controlsList='nodownload '
            className="h-full w-full object-cover"
            playsInline
            ref={localVideoRef}
            autoPlay
          ></video>
        </div>
        <div className="h-1/2 w-full flex-grow outline outline-1">
          <video
            controls={true}
            controlsList='nodownload '
            className="h-full w-full object-cover"
            playsInline
            ref={remoteVideoRef}
            autoPlay
          ></video>
        </div>
      </div>

      <button
        className="my-2 w-full justify-center rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={() => callPeer()}
      >
        Call
      </button>
    </div>
  );
};

export default VideoChat;
