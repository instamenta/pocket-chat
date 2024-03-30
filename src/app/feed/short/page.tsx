'use client';

import React, { useEffect, useRef, useState } from 'react';
import { I_ShortPopulated } from '@/lib/types';
import { listShorts } from '@/lib/queries/short';
import Link from 'next/link';
import DropdownMenu from '@/components/Navbar/DropdownMenu';
import { GoSearch } from 'react-icons/go';
import { BsChevronLeft } from 'react-icons/bs';
import Sidebar from '@/components/Sidebar/Sidebar';
import ActionSidebar from '@/components/Short/ActionSidebar';

export default function ShortsPage() {
  const ON_SCROLL_COOLDOWN_DURATION = 500; //? MS

  const [shortsList, setShortsList] = useState<I_ShortPopulated[]>([]);
  const [currentShortIndex, setCurrentShortIndex] = useState<number>(0);
  const [videoBarProgress, setVideoBarProgress] = useState(
    shortsList.map(() => ({ currentTime: 0, duration: 1 }))
  );
  const [isVideoScrollOnCooldown, setIsVideoScrollOnCooldown] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);


  useEffect(() => {
    const fetchShorts = async () => {
      const data: I_ShortPopulated[] = await listShorts();
      setShortsList(data);
      videoRefs.current = data.map(() => null);
    };
    fetchShorts().then();
  }, []);

  useEffect(() => {
    const currentVideoRef: HTMLVideoElement | null = videoRefs.current[currentShortIndex];
    if (currentVideoRef) {
      currentVideoRef.play().catch((error) => console.error('Error playing video:', error));
    }
    containerRef.current?.children[currentShortIndex]?.scrollIntoView({ behavior: 'smooth' });
  }, [currentShortIndex]);

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
        root: null, //? Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.5 //? Trigger when 50% of the video is visible
      }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [shortsList]);

  type T_XY_Point = { x: number; y: number } | null;

  const [startPoint, setStartPoint] = useState<T_XY_Point>(null);
  const [endPoint, setEndPoint] = useState<T_XY_Point>(null);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement | HTMLVideoElement>) => {
    if (event.target !== event.currentTarget) return;
    setStartPoint({ x: event.touches[0].clientX, y: event.touches[0].clientY });
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement | HTMLVideoElement>) => {
    if (event.target !== event.currentTarget) return;
    setEndPoint({ x: event.touches[0].clientX, y: event.touches[0].clientY });
  };

  const pauseAllExceptCurrent = (currentIndex: number) => {
    videoRefs.current.forEach((video, index) => {
      if (index === currentIndex) {
        video?.play().catch((error) => console.error('Error playing video:', error));
      } else {
        video?.pause();
      }
    });
  };

  useEffect(() => {
    pauseAllExceptCurrent(currentShortIndex);
    containerRef.current?.children[currentShortIndex]?.scrollIntoView({ behavior: 'smooth' });
  }, [currentShortIndex]);


  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement | HTMLVideoElement>) => {
    if (event.target !== event.currentTarget) return;
    if (!startPoint || !endPoint) return;

    const distanceMoved = Math.sqrt(
      Math.pow(endPoint.x - startPoint.x, 2) +
      Math.pow(endPoint.y - startPoint.y, 2)
    );

    let newIndex = null;

    if (distanceMoved < 20) {
      const videoElement = videoRefs.current[currentShortIndex];

      if (videoElement) videoElement.paused
        ? videoElement.play().then()
        : videoElement.pause();
    } else {
      if (startPoint.y - endPoint.y > 50) {
        newIndex = Math.min(currentShortIndex + 1, shortsList.length - 1);
      } else if (endPoint.y - startPoint.y > 50) {
        newIndex = Math.max(currentShortIndex - 1, 0);
      }
      if (newIndex !== null) setCurrentShortIndex(newIndex);
    }

    setStartPoint(null);
    setEndPoint(null);
  };


  const handlePause = (
    event: React.MouseEvent<HTMLVideoElement, MouseEvent>
  ) => {
    const videoElement = event.currentTarget;
    videoElement.paused ? videoElement.play() : videoElement.pause();
  };

  const handleTimeUpdate =
    (index: number) =>
      (event: React.SyntheticEvent<HTMLDivElement | HTMLVideoElement, Event>) => {
        const { currentTime, duration } = event.target as unknown as {
          currentTime: number;
          duration: number;
        };
        setVideoBarProgress((prevVideoProgress) => {
          const newVideoProgress = [...prevVideoProgress];
          newVideoProgress[index] = { currentTime, duration };
          return newVideoProgress;
        });
      };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement | HTMLVideoElement>) => {
    if (event.target !== event.currentTarget) return;
    if (isVideoScrollOnCooldown) return;

    const isVerticalScroll = Math.abs(event.deltaY) > Math.abs(event.deltaX);

    if (isVerticalScroll) {
      //? Activate
      setIsVideoScrollOnCooldown(true);

      //? Deactivate cooldown after duration
      setTimeout(() => setIsVideoScrollOnCooldown(false), ON_SCROLL_COOLDOWN_DURATION);

      let newIndex = null;

      if (event.deltaY > 0) {
        //? on Scrolling down
        newIndex = Math.min(currentShortIndex + 1, shortsList.length - 1);
      } else if (event.deltaY < 0) {
        //? on Scrolling up
        newIndex = Math.max(currentShortIndex - 1, 0);
      }
      if (newIndex !== null) setCurrentShortIndex(newIndex);
    }
  };

  return (
    <>
      <nav className="absolute left-0 right-0 z-20 flex w-full justify-between p-4 md:mx-auto md:w-[768px]">
        <Sidebar emptySpace={false} />
        <Link href="/feed">
          <BsChevronLeft className="my-auto size-8 fill-white" />
        </Link>
        <div className="flex content-center gap-3">
          <GoSearch className="my-auto size-8 fill-white" />
          <DropdownMenu />
        </div>
      </nav>
      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        className="white-to-transparent-bottom-gradient flex h-screen flex-col items-center overflow-hidden"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        {shortsList.map((short, index) => (
          <article
            key={short.id}
            className="relative h-screen w-screen object-contain"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="absolute bottom-0 left-0 right-0 z-30 flex justify-center">
              <div className="h-1 w-full max-w-xl bg-slate-300 mx-auto">
                <div
                  className="h-full bg-red-600"
                  style={{
                    width: `${
                      videoBarProgress[index]?.currentTime && videoBarProgress[index]?.duration
                        ? (videoBarProgress[index].currentTime / videoBarProgress[index].duration) * 100
                        : 0
                    }%`
                  }}
                ></div>
              </div>
            </div>


            <section
              className="absolute bottom-0 mb-4 flex flex-col p-4 text-xl md:left-32 md:mx-auto md:w-[768px] lg:left-64 xl:left-96">
              <div className="flex gap-3">
                <img
                  src={short.user_picture}
                  className="mt-2 size-8 rounded-full outline outline-2 outline-blue-600"
                  alt="user picture"
                />
                <div className="flex flex-col">
                  <span className="mb-2 pt-3 text-sm text-white">
                    @{short.username}
                  </span>
                  <p className="w-4/5 text-wrap text-sm text-gray-300">
                    {short.description}
                  </p>
                </div>
              </div>
              <div></div>
            </section>

            <ActionSidebar short={short} setShortsList={setShortsList} shortIndex={currentShortIndex} />

            <video
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onWheel={handleWheel}

              ref={(el) => (videoRefs.current[index] = el)}
              data-index={index}
              loop
              playsInline
              className="h-screen mx-auto w-full object-contain md:max-w-xl"
              onClick={handlePause}
              onTimeUpdate={handleTimeUpdate(index)}
            >
              <source
                src={'http://localhost:3005/video/' + short.video_url}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </article>
        ))}
      </div>
    </>
  );
}
