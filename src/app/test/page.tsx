'use client';

import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { FaMicrophoneAlt, FaPause, FaPlay } from 'react-icons/fa';
import { FaRegCircleStop } from 'react-icons/fa6';

const TestingPage: React.FC = () => {
  const [audioURL, setAudioURL] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    if (!navigator.mediaDevices || !MediaRecorder) {
      return console.error('Browser dont support audio recording');
    }

    // Initialize WaveSurfer for the waveform visualization
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#D9DCFF',
        progressColor: '#4353FF',
        cursorColor: 'transparent',
        barWidth: 2,
        barRadius: 3,
        // responsive: true,
        height: 64,
        normalize: true,
        backend: 'MediaElement',
      });

      wavesurfer.current.on('ready', () => {
        setIsPlaying(false); // Ready to play after loading new audio source
      });
    }

    const initMediaRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        mediaRecorder.current = new MediaRecorder(stream);
        const chunks: BlobPart[] = [];

        mediaRecorder.current.ondataavailable = (e) => {
          chunks.push(e.data);
        };

        mediaRecorder.current.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
          const newAudioURL = URL.createObjectURL(blob);
          setAudioURL(newAudioURL);
          console.log('Recorder stopped');
          wavesurfer.current?.load(newAudioURL);
        };
      } catch (err) {
        console.error(`The following error occurred: ${err}`);
      }
    };

    initMediaRecording();
  }, []);

  const startRecording = () => {
    mediaRecorder.current?.start();
    setIsRecording(true);
    console.log('Recorder started');
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setIsRecording(false);
    console.log('Recorder stopped');
  };

  const togglePlayback = () => {
    wavesurfer.current?.playPause();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="flex space-x-2">
        <button
          onClick={startRecording}
          disabled={isRecording}
          className={`rounded-full p-2 ${isRecording ? 'cursor-not-allowed bg-red-600' : 'bg-blue-500 hover:bg-blue-700'}`}
        >
          <FaMicrophoneAlt className="h-6 w-6" />
        </button>
        <button
          onClick={stopRecording}
          disabled={!isRecording}
          className={`rounded-full p-2 ${!isRecording ? 'cursor-not-allowed bg-gray-200' : 'bg-red-500 hover:bg-red-700'}`}
        >
          <FaRegCircleStop className="h-6 w-6" />
        </button>
        <button
          onClick={togglePlayback}
          disabled={!audioURL}
          className={`rounded-full p-2 ${isPlaying ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'}`}
        >
          {isPlaying ? (
            <FaPause className="h-6 w-6" />
          ) : (
            <FaPlay className="h-6 w-6" />
          )}
        </button>
      </div>
      <div ref={waveformRef} className="w-full" style={{ height: '64px' }} />
      {audioURL && (
        <article className="min-w-[300px] rounded-lg bg-white p-4 shadow-lg">
          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm text-gray-600">Recording</p>
            <button
              onClick={() => {
                setAudioURL('');
                wavesurfer.current?.empty();
              }}
              className="rounded bg-red-500 px-2 py-1 text-xs text-white transition-colors hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </article>
      )}
    </div>
  );
};

export default TestingPage;
