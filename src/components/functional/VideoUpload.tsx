'use client';

import React, { DragEvent, useState } from 'react';
import { toast } from 'react-toastify';

interface UploadStatus {
  progress: number;
  status: 'idle' | 'uploading' | 'success' | 'error';
}

interface VideoUploadProps {
  onUploadSuccess: (filename: string) => void;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [framePreviewUrl, setFramePreviewUrl] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
    progress: 0,
    status: 'idle',
  });

  const captureFrame = (file: File) => {
    const url = URL.createObjectURL(file);
    const videoElement = document.createElement('video');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    videoElement.src = url;
    videoElement.load();
    videoElement.addEventListener('loadeddata', () => {
      videoElement.currentTime = 1; // Try to capture a frame at 1 second
    });

    videoElement.addEventListener('seeked', () => {
      if (context) {
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const frameUrl = canvas.toDataURL('image/jpeg');
        setFramePreviewUrl(frameUrl); // Set the captured frame URL for preview
      }
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      captureFrame(file);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      setSelectedFile(file);
      captureFrame(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return toast(() => (
        <div className="text-center font-semibold">Select Upload Video</div>
      ));
    }

    const formData = new FormData();
    formData.append('video', selectedFile);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3005/upload', true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        setUploadStatus({ progress, status: 'uploading' });
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        setUploadStatus({ progress: 100, status: 'success' });
        toast(() => (
          <div className="bg-green-200 outline outline-2 outline-green-600">
            <p className="m-auto text-center font-bold">
              Successfully uploaded video.
            </p>
          </div>
        ));
        if (onUploadSuccess) onUploadSuccess(response.filename);
      } else {
        setUploadStatus({ progress: 0, status: 'error' });
        toast(() => (
          <div className="bg-red-400 outline outline-2 outline-red-600">
            <p className="m-auto text-center font-bold">
              Failed to upload video.
            </p>
          </div>
        ));
      }
    };

    xhr.onerror = () => {
      setUploadStatus({ progress: 0, status: 'error' });
      toast(() => (
        <div className="outline outline-2 outline-red-600">
          <p className="m-auto text-center font-bold">
            Failed to upload video.
          </p>
        </div>
      ));
    };

    xhr.send(formData);
  };

  return (
    <section className="px-10 py-4" style={{ height: '50vh' }}>
      <div
        className="flex h-full w-full flex-col items-center justify-center bg-transparent transition-all hover:bg-slate-100"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <label
          htmlFor="dropzone-file"
          className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300"
        >
          {framePreviewUrl && uploadStatus.status !== 'uploading' && (
            <img
              src={framePreviewUrl}
              alt="Frame preview"
              className="aspect-video h-1/3"
            />
          )}
          <svg
            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            MP4 (MAX. 4080x2080px)
          </p>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="video/*"
          />
          <button
            className="mt-4 rounded border-2 bg-slate-400 px-4 py-2 font-bold text-white transition-all
            hover:border-black hover:bg-transparent hover:text-black"
            onClick={handleUpload}
          >
            Upload Video
          </button>
          {uploadStatus.status === 'uploading' && (
            <>
              <span className="pt-4 italic">{`Uploading ${uploadStatus.progress.toFixed(0)}%`}</span>
              <div className="w-5/6 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="progress-bar h-3.5 bg-blue-600 p-1.5 text-center text-xs font-medium leading-none text-blue-100"
                  style={{ width: `${uploadStatus.progress}%` }}
                ></div>
              </div>
            </>
          )}
        </label>
      </div>
    </section>
  );
};

export default VideoUpload;
