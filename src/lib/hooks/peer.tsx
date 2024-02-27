'use client';

import React from 'react';
import Peer from 'peerjs';

export function usePeer(
  id: string,
  peerRef: React.MutableRefObject<Peer | null>,
  videoRef: React.RefObject<HTMLVideoElement>,
  remoteRef: React.RefObject<HTMLVideoElement>,
) {
  if (typeof window === 'undefined' && typeof navigator === 'undefined') {
    return;
  }
  const peer = new Peer(id, {
    host: 'localhost',
    port: 3004,
    path: '/peerjs',
  });

  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      peer.on('call', (call) => {
        call.answer(stream);
        call.on('stream', (remoteStream) => {
          if (remoteRef.current) {
            remoteRef.current.srcObject = remoteStream;
          }
        });
      });
    });

  peer.on('error', (err) => {
    console.error(err);
    alert(`An error occurred: ${err.message}`);
  });

  peer.on('disconnected', () =>
    console.log('Connection lost. Please reconnect.'),
  );

  peerRef.current = peer;
  return peer;
}
