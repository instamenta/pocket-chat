'use client';

import React, { useEffect, useRef, useState } from 'react';
import { T_FeedStory } from '@/lib/types';
import { listStories } from '@/lib/queries/story';
import { useRouter } from 'next/navigation';
import { CiSquarePlus } from 'react-icons/ci';
import { TfiGallery } from 'react-icons/tfi';

const StoryFeed = () => {
  const router = useRouter();
  const [groupedStories, setGroupedStories] = useState<
    Record<string, T_FeedStory[]>
  >({});
  const [currentStoryUserIndex, setCurrentStoryUserIndex] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    listStories().then((stories) => {
      if (stories) {
        const grouped = stories.reduce(
          (acc: Record<string, T_FeedStory[]>, story) => {
            (acc[story.username] = acc[story.username] || []).push(story);
            return acc;
          },
          {},
        );
        setGroupedStories(grouped);
      }
    });
  }, []);

  useEffect(() => {
    if (!isPaused) {
      setProgress(0);
      const increment = 100 / (20 * 5);
      intervalRef.current = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress < 100) {
            return prevProgress + increment;
          }
          clearInterval(intervalRef.current);
          return prevProgress;
        });
      }, 20);

      return () => clearInterval(intervalRef.current);
    }
  }, [currentStoryIndex, currentStoryUserIndex, isPaused]);

  useEffect(() => {
    if (progress >= 100) {
      advanceStory();
    }
  }, [progress]);

  const advanceStory = () => {
    const usernames = Object.keys(groupedStories);
    const currentUserStories =
      groupedStories[usernames[currentStoryUserIndex]] || [];

    if (currentStoryIndex < currentUserStories.length - 1) {
      setCurrentStoryIndex((prevIndex) => prevIndex + 1);
    } else if (currentStoryUserIndex + 1 < usernames.length) {
      setCurrentStoryUserIndex((prevIndex) => prevIndex + 1);
      setCurrentStoryIndex(0);
    } else {
      router.push('/feed');
    }
  };

  const handleInteractionStart = () => {
    setIsPaused(true);
    clearInterval(intervalRef.current);
  };

  const handleInteractionEnd = () => {
    setIsPaused(false);
  };

  const usernames = Object.keys(groupedStories);
  const currentUserStories =
    groupedStories[usernames[currentStoryUserIndex]] || [];

  if (!currentUserStories.length) {
    return <div>Loading stories...</div>;
  }

  return (
    <div
      className="flex h-screen w-full flex-col items-center justify-center"
      onMouseDown={handleInteractionStart}
      onMouseUp={handleInteractionEnd}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
    >
      <div className="absolute top-0 z-10 flex w-full justify-center gap-2 bg-slate-100 drop-shadow-2xl pb-0.5 px-2">
        {currentUserStories.map((_, index) => (
          <div key={index} className="w-full rounded-xl overflow-hidden bg-gray-600 ">
            <div
              className={`h-2 ${
                index === currentStoryIndex ? 'bg-blue-600' : 'bg-gray-400'
              }`}
              style={{
                width: `${index === currentStoryIndex ? progress + '%' : '100%'}`,
              }}
            />
          </div>
        ))}
      </div>
      {currentUserStories.map((story, index) =>
        index === currentStoryIndex ? (
          <div key={story.id} className="h-full w-full">
            <img
              src={story.image_url}
              alt="story"
              className="h-full w-full object-cover"
            />
          </div>
        ) : null,
      )}
      <div className="absolute bottom-0 z-10 flex flex-row bg-white w-full justify-center">
        <CiSquarePlus className="my-auto h-12 w-12 fill-blue-600 transition-all hover:scale-110" />
        <textarea
          id="editor"
          rows={1}
          // value={description}
          // onChange={(event) => setDescription(event.target.value)}
          className="block w-full border-0 bg-white px-2 pt-3 text-sm text-gray-800 outline-none focus:ring-0"
          placeholder="Share your experience with everybody."
          required
        ></textarea>
        <TfiGallery className="my-auto h-10 w-12 rounded-xl fill-green-600 px-1 transition-all hover:scale-110 hover:bg-slate-200 hover:fill-green-700 " />

      </div>
    </div>
  );
};

export default StoryFeed;
