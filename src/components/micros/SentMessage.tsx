import React, { useEffect, useRef, useState } from 'react';
import { I_Message } from '@/lib/types';
import { FaPause, FaPlay } from 'react-icons/fa';
import WaveSurfer from 'wavesurfer.js';

const SentMessage = ({ message }: { message: I_Message }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (message.files?.length && waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#ffffff',
        progressColor: '#a2a5c2',
        cursorColor: 'transparent',
        barWidth: 3,
        barRadius: 3,
        height: 64,
        normalize: true,
        backend: 'MediaElement',
      });

      wavesurfer.current.load(
        `http://localhost:3005/audio/${message.files[0]}`,
      );

      wavesurfer.current.on('ready', () => setIsPlaying(false));
    }

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, [message.files]);

  const togglePlayback = () => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="mb-3 self-end" style={{ maxWidth: '70%' }}>
      {/* Content Container*/}
      <div
        data-popover={message.created_at}
        className="rounded-2xl rounded-br-none bg-blue-600 px-4 pb-3 pt-2 font-medium text-white drop-shadow-xl"
      >
        {/* Text */}
        <span className="break-words">{message.content}</span>

        {/* Voice */}
        {message.files?.length ? (
          <div className="flex w-full gap-3">
            <button onClick={togglePlayback} className="text-white">
              {isPlaying ? (
                <FaPause className="size-5" />
              ) : (
                <FaPlay className="size-5" />
              )}
            </button>
            <div ref={waveformRef} className="w-full min-w-[200px]" />
          </div>
        ) : null}
        {/* Images */}
        {message.images?.length ? (
          <div
            className={`grid ${message.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}
          >
            {message.images.map((img, index) => (
              <img
                src={img}
                key={index}
                alt={'pic send'}
                className="h-auto w-full"
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SentMessage;
