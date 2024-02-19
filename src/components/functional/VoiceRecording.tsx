import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import MicrophonePlugin from 'wavesurfer.js/src/plugin/microphone.js'; // Adjust the import path based on your setup

const VoiceRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (WaveSurfer && MicrophonePlugin) {
      wavesurferRef.current = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'violet',
        progressColor: 'purple',
        cursorColor: 'transparent',
        interact: false,
        audioRate: 1,
        plugins: [
          MicrophonePlugin.create(), // Initialize the microphone plugin
        ],
      });
    }

    return () => {
      wavesurferRef.current?.destroy();
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      // Check if microphone plugin is initialized
      if (wavesurferRef.current && 'microphone' in wavesurferRef.current) {
        wavesurferRef.current.microphone.start();
        setIsRecording(true);
      } else {
        console.error('Microphone plugin is not initialized');
      }

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        // Handle the audio chunks
      };

      mediaRecorder.start();
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Failed to start recording. Please check your microphone permissions.');
    }
  };

  const stopRecording = () => {
    wavesurferRef.current?.microphone.stop();
    setIsRecording(false);
    // Handle stopping of the recording and processing of audio data
  };

  return (
    <div>
      <div id="waveform" style={{ width: '100%', height: '100px' }}></div>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  );
};

export default VoiceRecorder;
