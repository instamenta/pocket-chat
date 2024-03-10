'use client';

import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { I_UserSchema } from '@/lib/types';
import { useRecipient } from '@/lib/hooks';
import { getFriendshipById } from '@/lib/queries/friend';
import { usePeer } from '@/lib/hooks/peer';
import { useUserContext } from '@/lib/context/UserContext';
import { useRouter } from 'next/navigation';
import { FaMicrophoneAltSlash } from 'react-icons/fa';
import { FaMicrophoneLines } from 'react-icons/fa6';
import {
  BsFillCameraVideoFill,
  BsFillCameraVideoOffFill,
} from 'react-icons/bs';
import { ImPhoneHangUp } from 'react-icons/im';
import { IoReloadSharp } from 'react-icons/io5';
import LoadingSpinner from '@/components/LoadingSpinner';

const VideoChat = ({
  params: { room_id },
}: {
  params: { room_id: string };
}) => {
  const { user } = useUserContext();
  const router = useRouter();

  const [callActive, setCallActive] = useState<boolean>(false);
  const [audioMuted, setAudioMuted] = useState<boolean>(false);
  const [videoPaused, setVideoPaused] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [__, setMyId] = useState<string>('');
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

  const callPeer = (customId?: string) => {
    console.log('calling peer');

    const id = customId ?? recipient!.id;
    const call = peerRef.current?.call(
      id,
      localVideoRef.current?.srcObject as MediaStream,
    );

    if (!call) return console.error('failed to get Peer call');

    const onStream = (stream: MediaStream) => {
      console.log('ON STREAM');

      if (remoteVideoRef.current) {
        remoteVideoRef.current!.srcObject = stream;
        setCallActive(true);
      } else {
        setTimeout(onStream, 1000, stream);
      }
    };

    call.on('stream', (stream) => {
      onStream(stream);
    });

    call.on('error', (error) => {
      console.error(error);
      callPeer(id);
    });
  };

  const toggleMuteAudio = () => {
    const stream = localVideoRef.current?.srcObject as MediaStream;
    stream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setAudioMuted(!audioMuted);
  };

  const toggleVideo = () => {
    const stream = localVideoRef.current?.srcObject as MediaStream;
    stream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setVideoPaused(!videoPaused);
  };

  const closeCall = () => {
    peerRef.current?.destroy();
    peerRef.current = null;
    router.push('./chat');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-200">
      <div className="flex w-full flex-grow flex-col">
        <div className="aspect-square w-full flex-grow outline outline-1">
          <video
            controls={true}
            controlsList="nodownload "
            className="aspect-square h-full w-full object-cover"
            playsInline
            ref={localVideoRef}
            autoPlay
          ></video>
        </div>
        <div className="aspect-square w-full flex-grow outline outline-1">
          <video
            controls={true}
            controlsList="nodownload "
            className={`aspect-square h-full w-full object-cover ${callActive ? 'visible' : 'hidden'}`}
            playsInline
            ref={remoteVideoRef}
            autoPlay
          ></video>
          {/* ON NO VIDEO */}
          <div
            className={`flex h-full w-full flex-col  content-center justify-center bg-slate-700 text-white ${callActive ? 'hidden' : 'visible'}`}
          >
            <div className="w-full px-20">
              <img
                src={recipient?.picture}
                alt={'User Pic'}
                className="aspect-square w-full rounded-full"
              />
            </div>
            <div className="py-4">
              <LoadingSpinner />
            </div>
            <span className="text-center text-xl capitalize">
              Waiting for{' '}
              <strong>
                {recipient?.first_name + ' ' + recipient?.last_name}
              </strong>
            </span>
          </div>
        </div>
      </div>

      <div className="h-full w-full flex-row bg-black px-12 py-2 font-bold text-white">
        <div className="flex h-full w-full justify-between rounded-3xl bg-slate-800 py-2 pl-4 pr-2">
          <button className="rounded-full  p-1" onClick={toggleMuteAudio}>
            {audioMuted ? (
              <FaMicrophoneLines className="size-6 fill-white transition-all hover:fill-white" />
            ) : (
              <FaMicrophoneAltSlash className="fill-red size-6 transition-all hover:fill-white" />
            )}
          </button>
          <button className="aspect-square rounded-full" onClick={toggleVideo}>
            {videoPaused ? (
              <BsFillCameraVideoFill className="size-6 fill-white transition-all hover:fill-white" />
            ) : (
              <BsFillCameraVideoOffFill className="fill-red size-6 transition-all hover:fill-white" />
            )}
          </button>
          <button className="rounded-full  px-1" onClick={() => callPeer}>
            <IoReloadSharp className="size-6 fill-white" />
          </button>
          <button className="rounded-full bg-red-600 p-1" onClick={closeCall}>
            <ImPhoneHangUp className="size-6 fill-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoChat;
