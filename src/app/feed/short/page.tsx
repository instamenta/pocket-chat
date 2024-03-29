'use client';

import React, { useEffect, useRef, useState } from 'react';
import { I_ShortPopulated } from '@/lib/types';
import { listShorts } from '@/lib/queries/short';
import { FaShare } from 'react-icons/fa6';
import Link from 'next/link';
import DropdownMenu from '@/components/Navbar/DropdownMenu';
import { GrDislike, GrLike } from 'react-icons/gr';
import { MdOutlineInsertComment } from 'react-icons/md';
import { IoShareSocialSharp } from 'react-icons/io5';
import { GoSearch } from 'react-icons/go';
import { BsChevronLeft } from 'react-icons/bs';
import Sidebar from '@/components/Sidebar/Sidebar';
import ActionSidebar from '@/components/Short/ActionSidebar';

export default function ShortsPage() {
  const [shorts, setShorts] = useState<I_ShortPopulated[]>([]);
  const [shortIndex, setShortIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [videoProgress, setVideoProgress] = useState(
    shorts.map(() => ({ currentTime: 0, duration: 1 }))
  );

  const [isCooldownActive, setIsCooldownActive] = useState(false);
  const cooldownDuration = 500; //? MS

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
      currentVideo.play().catch((error) => console.error('Error playing video:', error));
    }
    containerRef.current?.children[shortIndex]?.scrollIntoView({ behavior: 'smooth' });
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
    pauseAllExceptCurrent(shortIndex);
    containerRef.current?.children[shortIndex]?.scrollIntoView({ behavior: 'smooth' });
  }, [shortIndex]);


  const handleTouchEnd = () => {
    if (!startPoint || !endPoint) return;

    const distanceMoved = Math.sqrt(
      Math.pow(endPoint.x - startPoint.x, 2) +
      Math.pow(endPoint.y - startPoint.y, 2)
    );

    let newIndex = null;

    if (distanceMoved < 20) {
      const videoElement = videoRefs.current[shortIndex];

      if (videoElement) videoElement.paused
        ? videoElement.play().then()
        : videoElement.pause();
    } else {
      if (startPoint.y - endPoint.y > 50) {
        newIndex = Math.min(shortIndex + 1, shorts.length - 1);
      } else if (endPoint.y - startPoint.y > 50) {
        newIndex = Math.max(shortIndex - 1, 0);
      }
      if (newIndex !== null) setShortIndex(newIndex);
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
      (event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        const { currentTime, duration } = event.target as unknown as {
          currentTime: number;
          duration: number;
        };
        setVideoProgress((prevProgress) => {
          const newProgress = [...prevProgress];
          newProgress[index] = { currentTime, duration };
          return newProgress;
        });
      };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (isCooldownActive) return;

    const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX);

    if (isVerticalScroll) {
      //? Activate
      setIsCooldownActive(true);

      //? Deactivate cooldown after duration
      setTimeout(() => setIsCooldownActive(false), cooldownDuration);

      let newIndex = null;

      if (e.deltaY > 0) {
        //? on Scrolling down
        newIndex = Math.min(shortIndex + 1, shorts.length - 1);
      } else if (e.deltaY < 0) {
        //? on Scrolling up
        newIndex = Math.max(shortIndex - 1, 0);
      }
      if (newIndex !== null) setShortIndex(newIndex);
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
        {shorts.map((short, index) => (
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
                      videoProgress[index]?.currentTime && videoProgress[index]?.duration
                        ? (videoProgress[index].currentTime / videoProgress[index].duration) * 100
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

            <ActionSidebar short={short} setShort={setShorts} index={shortIndex} />

            <video
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
