'use client';

import React, { useEffect, useState } from 'react';
import { listGroupsByUser } from '@/lib/queries/group';
import { I_Group } from '@/lib/types';
import Navbar from '@/components/Navbar/Navbar';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useUserContext } from '@/lib/context/UserContext';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar/Sidebar';

export default function GroupList() {
  const [groups, setGroups] = useState<I_Group[]>([]);
  const { user } = useUserContext();

  useEffect(() => {
    if (!user) return;
    listGroupsByUser(user.id).then(setGroups);
  }, [user]);

  return (
    <>
      <Navbar />
      <Sidebar />
      <section className="px-4 pt-4  lg:mx-auto lg:w-[1020px]">
        <h2 className="text-xl font-semibold text-slate-700 md:text-2xl">
          Your Groups
        </h2>
        <h3 className="text-lg font-semibold text-slate-400 md:text-xl">
          Groups you might be interested in.
        </h3>
      </section>
      <section className="mt-6 grid w-full grid-cols-1 gap-5 px-4  md:grid-cols-2 lg:mx-auto lg:w-[1020px]">
        {groups.map((group, index) => (
          <>
            <article
              key={index}
              className="flex w-full flex-col justify-between rounded-xl border border-slate-300 shadow-xl"
            >
              <div className="relative flex w-full flex-col justify-between overflow-hidden shadow-inner">
                <div className="flex px-8 align-middle">
                  <img
                    src={group.image_url}
                    className="size-40 overflow-hidden object-scale-down md:size-48 xl:size-52"
                    alt="Group Photo"
                  />

                  <div className="my-auto flex flex-col pl-6 pt-4 md:text-lg">
                    <span className="font-semibold">{group.name}</span>

                    <div className="flex flex-col text-nowrap  pt-4">
                      <span className="text-slate-500">
                        <strong>{group.members_count}</strong> member
                        {group.members_count > 1 ? 's' : ''}
                      </span>
                      <span className="text-slate-500">
                        <strong>{(Math.random() * 100).toFixed(0)}</strong>{' '}
                        publications
                      </span>
                    </div>

                    {group.description !== '' ? (
                      <div className="min-h-8 w-full py-4 font-light text-slate-700">
                        <p>{group.description}</p>
                      </div>
                    ) : null}
                  </div>
                </div>

                <IoCloseCircleOutline
                  className="absolute right-1 top-1 size-10 fill-slate-500"
                  style={{ opacity: '30%' }}
                />
              </div>

              {/* Button */}
              <div className="flex flex-col px-4 pb-4 md:text-lg">
                <Link
                  href={`/group/${group.id}`}
                  className="w-full rounded-md bg-blue-200 px-8 py-1 text-center font-semibold text-blue-600 shadow-inner "
                >
                  View Group
                </Link>
              </div>
            </article>
            <div className="block border-t border-t-gray-200 md:hidden" />
          </>
        ))}
        <section className="col-span-1 mt-10 flex w-full justify-center md:col-span-2">
          <Link
            href="/group/discover"
            className="mx-auto w-60 rounded-xl border-2 border-black bg-slate-300 py-4 text-center text-lg font-semibold shadow-2xl transition-all hover:bg-white md:w-80 md:text-xl xl:w-96"
          >
            Discover More
          </Link>
        </section>
      </section>
    </>
  );
}
