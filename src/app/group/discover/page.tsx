'use client';

import React, { useEffect, useState } from 'react';
import { I_Group } from '@/lib/types';
import { joinGroup, listGroups } from '@/lib/queries/group';
import Navbar from '@/components/Navbar/Navbar';
import { IoCloseCircleOutline } from 'react-icons/io5';

interface I_GroupExtended extends I_Group {
  joinRequested?: boolean;
}

export default function GroupsDiscover() {
  const [groups, setGroups] = useState<I_GroupExtended[]>([]);

  useEffect(() => {
    listGroups().then((d) =>
      setGroups(d.map((g) => ({ ...g, joinRequested: false }))),
    );
  }, []);

  const handleJoin = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
  ) => {
    await joinGroup(id);
    setGroups(
      groups.map((g) => (g.id === id ? { ...g, joinRequested: true } : g)),
    );
  };

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
              key={group.id}
              className="w-full rounded-xl border border-slate-300 shadow-xl"
            >
              <div className="relative w-full overflow-hidden border-b border-b-slate-200 shadow-inner">
                <img
                  src={group.image_url}
                  className="h-44 w-full overflow-hidden object-scale-down"
                  alt="Group Photo"
                />
                <IoCloseCircleOutline
                  className="absolute right-1 top-1 size-10 fill-slate-500"
                  style={{ opacity: '30%' }}
                />
              </div>
              <div className="flex flex-col p-4">
                <span className="font-semibold">{group.name}</span>

                <div className="flex gap-4">
                  <span className="text-slate-500">
                    {group.members_count} member
                    {group.members_count > 1 ? 's' : ''}
                  </span>
                  <strong>•</strong>
                  <span className="text-slate-500">
                    {(Math.random() * 100).toFixed(0)} publications
                  </span>
                </div>

                <div className="min-h-8 w-full py-2  pb-4">
                  <p>{group.description}</p>
                </div>

                <button
                  onClick={(e) => handleJoin(e, group.id)}
                  className="w-full rounded-md bg-gray-200 py-1 font-semibold shadow-inner outline outline-1 outline-slate-300"
                  disabled={group.joinRequested}
                >
                  {group.joinRequested ? 'Request Sent' : 'Join Group'}
                </button>
              </div>
            </article>
            <div className="border-t border-t-gray-200" />
          </>
        ))}
      </section>
    </>
  );
}
