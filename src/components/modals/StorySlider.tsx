import React, { useEffect, useState } from 'react';
import { T_FeedStory } from '@/lib/types';
import { listFeedStories } from '@/lib/queries/story';
import { AiFillPlusCircle } from 'react-icons/ai';
import Link from 'next/link';
import { useUserContext } from '@/lib/context/UserContext';

const StorySlider = () => {
  const { user } = useUserContext();

  const [stories, setStories] = useState<T_FeedStory[]>([]);
  useEffect(() => {
    listFeedStories().then((d) => setStories(d ?? []));
  }, []);

  return (
    <div className="drop-shadow-md">
      <section
        className="scrollbar-none flex h-56 w-full flex-row gap-2.5 overflow-x-auto bg-slate-100 px-2 py-4 text-center font-semibold shadow-inner">
        {/* First Element*/}
        <div
          className="aspect-phone-portrait relative rounded-2xl border-2 border-white bg-slate-300 outline outline-blue-600">
          <img
            className="h-3/5 w-full overflow-hidden rounded-t-2xl"
            src={user?.picture}
            alt="profile-pic"
          />
          <AiFillPlusCircle
            className="absolute bottom-0 left-1/2 z-50 mb-9 h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform
          rounded-full bg-white text-blue-600"
          />
          <div className="absolute bottom-0 left-0 flex h-2/5 w-full overflow-hidden rounded-b-2xl bg-white py-1">
              <span className="w-full self-end text-nowrap text-center text-sm text-gray-600">
                Create Story
              </span>
          </div>
        </div>
        {/* Each Story */}
        {stories.map((story, index) => (
          <Link
            href="/feed/story"
            className="aspect-phone-portrait relative rounded-2xl border-2 border-white bg-slate-300 outline outline-blue-600"
            key={index}
          >
            <div
              className="absolute left-2 top-2 z-50 h-8 w-8 rounded-full bg-slate-500 outline outline-2 outline-white">
              <img
                src={story.user_picture}
                alt="profile-pic"
                className="h-full w-full overflow-hidden rounded-full"
              />
            </div>
            <img
              className="absolute left-0 top-0 h-full w-full rounded-2xl"
              src={story.image_url}
              alt="story-image"
            />
            <div
              className="absolute bottom-0 left-0 w-full overflow-hidden rounded-b-2xl bg-gradient-to-b from-transparent to-black px-2 py-1">
                <span className="block truncate text-xs text-white">
                  {story.first_name + ' ' + story.last_name}
                </span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default StorySlider;