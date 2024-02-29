'use client';

import React, { useEffect, useState } from 'react';
import { listGroupsByUser } from '@/lib/queries/group';
import { I_Group } from '@/lib/types';
import Navbar from '@/components/Navbar/Navbar';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useUserContext } from '@/lib/context/UserContext';
import Link from 'next/link';

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
      <section className="px-4 pt-4">
        <h1 className="text-xl font-semibold text-slate-700">
          Suggested for you
        </h1>
        <h2 className="text-lg font-semibold text-slate-400">
          Groups you might be interested in.
        </h2>
      </section>
      <section className="mt-6 flex w-full flex-col gap-5 px-4">
        {groups.map((group, index) => (
          <>
            <article
              key={index}
              className="w-full rounded-xl border border-slate-300 shadow-xl"
            >
              <div className="relative w-full overflow-hidden shadow-inner">
                <div className="flex px-8 align-middle">
                  <img
                    src={group.image_url}
                    className="size-40 overflow-hidden object-scale-down"
                    alt="Group Photo"
                  />

                  <div className="my-auto flex h-full w-full flex-col justify-between pl-6 pt-4">
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

                    <div className="min-h-8 w-full ">
                      <p>{group.description}</p>
                    </div>
                  </div>
                </div>

                <IoCloseCircleOutline
                  className="absolute right-1 top-1 size-10 fill-slate-500"
                  style={{ opacity: '30%' }}
                />
              </div>
              <div className="flex flex-col px-4 pb-4">
                <Link
                  href={`/group/${group.id}`}
                  className="w-full px-8 text-center rounded-md bg-blue-200 py-1 font-semibold text-blue-600 shadow-inner "
                >
                  View Group
                </Link>
              </div>
            </article>
            <div className="border-t border-t-gray-200" />
          </>
        ))}
      </section>
    </>
  );
}
