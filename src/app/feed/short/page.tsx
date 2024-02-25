'use client';

import React, { useEffect, useRef, useState } from 'react';
import { I_ShortPopulated } from '@/lib/types';
import { listShorts } from '@/lib/queries/short';

export default function ShortsPage() {
  const [shorts, setShorts] = useState<I_ShortPopulated[]>([]);
  const [shortIndex, setShortIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  useEffect(() => {
    const fetchShorts = async () => {
      const data: I_ShortPopulated[] = await listShorts();
      setShorts(data);
      videoRefs.current = data.map(() => null);
    };
    fetchShorts().then();
  }, []);

  useEffect(() => {
    const currentVideo: HTMLVideoElement | null = videoRefs.current[shortIndex];
    if (currentVideo) {
      currentVideo
        .play()
        .catch((error) => console.error('Error playing video:', error));
    }
    containerRef.current?.children[shortIndex]?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [shortIndex]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = entry.target.getAttribute('data-index');
          if (!index) return;
          if (!entry.isIntersecting) {
            videoRefs.current[+index]?.pause();
          } else {
            videoRefs.current[+index]?.play().then();
          }
        });
      },
      {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.5, // Trigger when 50% of the video is visible
      },
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [shorts]);

  type T_XY_Point = { x: number; y: number } | null;

  const [startPoint, setStartPoint] = useState<T_XY_Point>(null);
  const [endPoint, setEndPoint] = useState<T_XY_Point>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartPoint({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setEndPoint({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchEnd = () => {
    if (!startPoint || !endPoint) return;
    const distanceMoved = Math.sqrt(
      Math.pow(endPoint.x - startPoint.x, 2) +
        Math.pow(endPoint.y - startPoint.y, 2),
    );
    if (distanceMoved < 20) {
      const videoElement = videoRefs.current[shortIndex];
      if (videoElement) {
        if (videoElement.paused) videoElement.play();
        else videoElement.pause();
      }
    } else {
      if (startPoint.y - endPoint.y > 50)
        setShortIndex((prev) => Math.min(prev + 1, shorts.length - 1));
      else if (endPoint.y - startPoint.y > 50)
        setShortIndex((prev) => Math.max(prev - 1, 0));
    }
    setStartPoint(null);
    setEndPoint(null);
  };

  const handlePause = (
    event: React.MouseEvent<HTMLVideoElement, MouseEvent>,
  ) => {
    const videoElement = event.currentTarget;
    videoElement.paused ? videoElement.play() : videoElement.pause();
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="flex h-screen flex-col items-center overflow-hidden"
      style={{ scrollSnapType: 'y mandatory' }}
    >
      {shorts.map((short, index) => (
        <div
          key={short.id}
          className="h-screen w-screen object-contain"
          style={{ scrollSnapAlign: 'start' }}
        >
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            data-index={index}
            className="h-screen w-screen bg-gray-950 object-contain"
            onClick={handlePause}
          >
            <source
              src={'http://localhost:3005/video/' + short.video_url}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>
  );
}
