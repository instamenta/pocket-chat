'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import { listLives } from '@/lib/queries/live';
import { T_LivePopulated } from '@/lib/types';
import { CgMediaLive } from 'react-icons/cg';
import Link from 'next/link';
import { MdLiveTv } from 'react-icons/md';

const ListLives = () => {
  const [lives, setLives] = useState<T_LivePopulated[]>([]);

  useEffect(() => {
    listLives().then((d) => {
      setLives(d);
      console.log(d);
    });
  }, []);

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-slate-100 px-4 pt-4 shadow-inner">
        {lives.map((live, index) => (
          <article key={index} className="w-full rounded-2xl bg-white p-4">
            <div className="flex w-full justify-between">
              <img
                src={live.user_picture}
                alt="profile pic"
                className="size-12 rounded-full border-2 border-white outline outline-4 outline-pink-600 "
              />
              <div className="flex w-full flex-col justify-start px-4">
                <span className="text-lg font-semibold capitalize">
                  {live.first_name + ' ' + live.last_name}
                </span>
                <span className="text-slate-600">@{live.username}</span>
              </div>
              <div className="flex gap-1 text-lg font-semibold text-pink-600">
                <span>Live</span>
                <CgMediaLive className="size-7 fill-pink-600" />
              </div>
            </div>
            <div className="pt-4">
              <Link href={`/live/${live.id}`}>
                <img
                  className="w-full rounded-xl object-contain"
                  src={
                    'https://static.wikia.nocookie.net/misterbeast/images/7/73/Donating_%2410%2C000_To_Random_Twitch_Streamers/revision/latest?cb=20201004174050'
                  }
                  alt="thumbnail"
                />
              </Link>
            </div>
            <div className="pb-2 pt-4">
              <Link
                href={`/live/${live.id}`}
                className="flex w-full justify-center gap-1 rounded-xl bg-pink-600 py-1 text-lg font-semibold text-white outline outline-4 outline-pink-600
                transition-all hover:bg-white hover:text-pink-600"
              >
                <MdLiveTv className="size-6 fill-white" /> Watch
              </Link>
            </div>
          </article>
        ))}
      </section>
    </>
  );
};

export default ListLives;
