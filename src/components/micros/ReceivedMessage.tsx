import React, { useEffect, useRef, useState } from 'react';
import { I_Message, I_UserSchema } from '@/lib/types';
import WaveSurfer from 'wavesurfer.js';
import { FaPause, FaPlay } from 'react-icons/fa';

const ReceivedMessage = ({
  message,
  recipient,
}: {
  message: I_Message;
  recipient: I_UserSchema | null;
}) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (message.files?.length && waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#0053ff',
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
      wavesurfer.current.on('finish', () => setIsPlaying(false));
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
    <div
      className={`flex self-start transition-all ${toggle ? 'mb-6' : 'mb-3'}`}
      style={{ maxWidth: '70%' }}
    >
      <div className="aspect-h-1 -ml-4 mr-2 aspect-square h-8 w-8 self-end">
        <img
          alt="pic"
          src={recipient?.picture ?? ''}
          className="aspect-square h-8 w-8 overflow-hidden rounded-full"
        />
      </div>
      <div className="relative mb-3 self-start">
        {/* Content Container */}
        <div
          onClick={() => setToggle((prev) => prev)}
          className={`rounded-2xl rounded-bl-none border-t border-gray-200 px-4 pb-3 pt-2 drop-shadow-xl transition-all ${
            toggle ? 'bg-slate-300' : 'bg-white '
          }`}
        >
          {/* Text */}
          <span className="break-words">{message.content}</span>
          {/* Voice */}
          {message.files?.length ? (
            <div className="flex w-full gap-3 ">
              <button onClick={togglePlayback} className="text-white">
                {isPlaying ? <FaPause className="size-5 fill-blue-600" /> : <FaPlay className="size-5 fill-blue-600" />}
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
        <div
          className={`absolute rounded-full text-sm font-light transition-all ${
            toggle ? 'text-gray-500' : ' hidden text-white'
          }`}
          style={{ left: '5px', bottom: '-21px' }}
        >
          {new Date(message.created_at)
            .toLocaleDateString()
            .replaceAll('/', '.')}
        </div>
      </div>
    </div>
  );
};

export default ReceivedMessage;
