'use client';

import React, { useEffect, useState } from 'react';
import { getGroupById } from '@/lib/queries/group';
import { I_Group } from '@/lib/types';
import Navbar from '@/components/Navbar/Navbar';
import { CiLock } from 'react-icons/ci';

export default function GroupDetails({
  params: { id },
}: {
  params: { id: string };
}) {
  const [group, setGroup] = useState<I_Group | null>(null);

  useEffect(() => {
    getGroupById(id).then((d) => {
      setGroup(d ?? null);
      console.log(d);
    });
  }, []);

  return (
    <>
      <Navbar />
      <section
        className="w-full overflow-hidden rounded-b-3xl border-b shadow-md"
        style={{ height: '60vw' }}
      >
        {group ? (
          <img
            className="overflow-hidden object-cover object-center"
            alt="Group Photo"
            src={group.image_url}
          />
        ) : null}
      </section>
      <section className="w-full px-4 pt-4">
        {group ? (
          <>
            <h1 className="text-2xl font-semibold">{group.name}</h1>
            <div className="flex gap-2">
              <div className='flex flex-nowrap my-auto'>
                <CiLock className="size-5" />
                <span className="pl-1 text-slate-500">
                  Private group
                </span>
              </div>
              <strong>•</strong>
              <span className="text-slate-500">
                {group.members_count} member
                {group.members_count > 1 ? 's' : ''}
              </span>
            </div>
          </>
        ) : null}
      </section>
    </>
  );
}
