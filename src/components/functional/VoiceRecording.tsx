'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FaMicrophoneAlt } from 'react-icons/fa';
import { FaRegCircleStop, FaRegTrashCan } from 'react-icons/fa6';
import { SiAudioboom } from 'react-icons/si';

interface RecorderProps {
  handleAudio: (audioBlob: Blob) => void;
}

const Recorder: React.FC<RecorderProps> = ({ handleAudio }) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  useEffect(() => {
    if (!navigator.mediaDevices || !MediaRecorder) {
      return console.error("Browser doesn't support audio recording");
    }

    const initMediaRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          setAudioChunks((prev) => [...prev, event.data]);
        };
      } catch (err) {
        console.error(`The following error occurred: ${err}`);
      }
    };

    initMediaRecording();
  }, []);

  const startRecording = () => {
    mediaRecorderRef.current?.start();
    setIsRecording(true);
    setAudioChunks([]);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const handleSend = () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    console.log('Posting Audio...');
    setAudioChunks([]);
    handleAudio(audioBlob);
  };

  const handleDelete = () => {
    setAudioChunks([]);
  };

  return (
    <>
      {/* Start Recording Button */}
      {!isRecording && !audioChunks.length ? (
        <button onClick={startRecording} disabled={isRecording}>
          <FaMicrophoneAlt className="h-6 w-6 fill-slate-600" />
        </button>
      ) : null}
      {!isRecording && audioChunks.length ? (
        <>
          {/* Send Recording Button */}
          <button onClick={handleSend} disabled={audioChunks.length === 0}>
            <SiAudioboom className="h-6 w-6 fill-blue-600" />
          </button>
          {/* Delete Recording Button */}
          <button onClick={handleDelete}>
            <FaRegTrashCan className="h-6 w-6 fill-red-600" />
          </button>
        </>
      ) : null}
      {/* Stop Recording Button */}
      {isRecording ? (
        <button onClick={stopRecording} disabled={!isRecording}>
          <FaRegCircleStop className="h-6 w-6 fill-red-600" />
        </button>
      ) : null}
    </>
  );
};

export default Recorder;
