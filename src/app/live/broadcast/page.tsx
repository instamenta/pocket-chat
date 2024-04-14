'use client';

import React, { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import SimplePeer from 'simple-peer';

const Broadcast: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  const [socket, setSocket] = useState<Socket | null>(null);
  const [recipientId, setRecipientId] = useState<string>(''); // Store the recipient ID

  useEffect(() => {
    initialize().then();
  }, []);

  const initialize = async () => {
    const socket = io('http://localhost:3006');
    setSocket(socket);

    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

    if (videoRef.current && audioRef.current) {
      videoRef.current.srcObject = stream;
      audioRef.current.srcObject = stream;
    }

    const peer = new SimplePeer({ initiator: true, trickle: false, stream });

    peer.on('signal', data => {
      socket.emit('offer', data);
      console.log('[Peer] - Offer');
    });

    socket.on('answer', answer => {
      peer.signal(answer);
      console.log('[Peer] - Signal');
    });
  };


  return (
    <div>
      <video ref={videoRef} autoPlay></video>
      <audio ref={audioRef} autoPlay muted></audio>
    </div>
  );
};

export default Broadcast;
