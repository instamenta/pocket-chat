'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import { FaAddressBook } from 'react-icons/fa';
import { MdGroups, MdLiveTv, MdMore } from 'react-icons/md';
import { RiLiveFill } from 'react-icons/ri';
import Link from 'next/link';
import { SiYoutubeshorts } from 'react-icons/si';
import QuickPost from '@/components/modals/QuickPost';
import PublicationSlider from '@/components/modals/PublicationSlider';
import StorySlider from '@/components/modals/StorySlider';
import { getRecommendations } from '@/lib/queries/publication';

const Feed = () => {
  const [description, setDescription] = useState<string>('');

  return (
    <>
      <Navbar />

      <QuickPost description={description} setDescription={setDescription} />

      {/* Story Section */}
      <StorySlider />

      {/* Decoration's Section */}
      <section className="scrollbar-sm flex w-full flex-row gap-3 overflow-x-auto bg-slate-100 px-2 pb-2.5 pt-2 text-center font-semibold shadow-inner">
        <Link
          href="/feed/short"
          className="flex flex-row gap-1.5 rounded-2xl border-t border-t-slate-200 bg-white px-4 py-1.5 drop-shadow-lg"
        >
          <SiYoutubeshorts className="size-6 fill-red-500" />
          <span>Shorts</span>
        </Link>

        <Link
          href="/live"
          className="flex flex-row gap-1.5 rounded-2xl border-t border-t-slate-200 bg-white px-4 py-1.5 drop-shadow-lg"
        >
          <RiLiveFill className="size-6 fill-pink-600" />
          <span>Live</span>
        </Link>
        <Link
          href="/group"
          className="flex flex-row gap-1.5 rounded-2xl border-t border-t-slate-200 bg-white px-4 py-1.5 drop-shadow-lg"
        >
          <MdGroups className="size-6 fill-blue-600" />
          <span>Group</span>
        </Link>

        <div className="flex flex-row gap-1.5 rounded-2xl border-t border-t-slate-200 bg-white px-4 py-1.5 drop-shadow-lg">
          <MdLiveTv className="size-6 fill-red-600" />
          <span>Room</span>
        </div>
        <div className="flex flex-row gap-1.5 rounded-2xl border-t border-t-slate-200 bg-white px-4 py-1.5 drop-shadow-lg">
          <FaAddressBook className="size-6 fill-green-600 py-0.5" />
          <span>People</span>
        </div>
        <div className="flex flex-row gap-1.5 rounded-2xl border-t border-t-slate-200 bg-white px-4 py-1.5 drop-shadow-lg">
          <MdMore className="size-6 fill-yellow-900" />
          <span>More</span>
        </div>
      </section>

      {/* Publications Container */}
      <section className="w-full bg-slate-200 pt-2 shadow-inner">
        {/* Each Publication */}
        <PublicationSlider dataPromise={getRecommendations()} />
      </section>
    </>
  );
};

export default Feed;
