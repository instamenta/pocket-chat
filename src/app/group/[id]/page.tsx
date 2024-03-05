'use client';

import React, { useEffect, useState } from 'react';
import { getGroupById, listGroupPublication } from '@/lib/queries/group';
import { I_Group, I_Recommendation } from '@/lib/types';
import Navbar from '@/components/Navbar/Navbar';
import { CiLock } from 'react-icons/ci';
import QuickPost from '@/components/modals/QuickPost';
import { FaPlus } from "react-icons/fa6";
import { HiMiniUserGroup } from "react-icons/hi2";
import { MdOutlineArrowDropDown } from "react-icons/md";

export default function GroupDetails({
  params: { id },
}: {
  params: { id: string };
}) {
  const [group, setGroup] = useState<I_Group | null>(null);
  const [publications, setPublications] = useState<I_Recommendation[]>([]);
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    Promise.all([getGroupById(id), listGroupPublication(id)]).then(
      ([groupData, publicationsData]) => {
        setGroup(groupData ?? null);
        setPublications(publicationsData);
      },
    );
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
      <section className="w-full border-b border-b-slate-300 px-4 pb-8 pt-4">
        {group ? (
          <>
            <h1 className="text-2xl font-semibold">{group.name}</h1>
            <div className="flex gap-2">
              <div className="my-auto flex flex-nowrap">
                <CiLock className="size-5" />
                <span className="pl-1 text-slate-500">Private group</span>
              </div>
              <strong>•</strong>
              <span className="text-slate-500">
                {group.members_count} member
                {group.members_count > 1 ? 's' : ''}
              </span>
            </div>
            <section className="grid grid-cols-9 gap-2">
              <button className="flex gap-1 flex-nowrap justify-center col-span-3 w-full rounded-md bg-blue-600 content-center text-white py-1">
                <FaPlus className='my-auto' /><
                span className='font-semibold'>Invite</span>
              </button>
              <button className="col-span-3 w-full rounded-md bg-gray-200 py-1">
                <HiMiniUserGroup/>
                <MdOutlineArrowDropDown />
              </button>
              <button className="col-span-1 w-full rounded-md bg-gray-200 py-1">
                Invite
              </button>
              <button className="col-span-1 w-full rounded-md bg-gray-200 py-1">
                Invite
              </button>
              <button className="col-span-1 w-full rounded-md bg-gray-200 py-1">
                Invite
              </button>
            </section>
          </>
        ) : null}
      </section>

      <QuickPost description={description} setDescription={setDescription} />

      <section>
        {publications.map((publcation, index) => (
          <article key={index} className="size-40 bg-red-300"></article>
        ))}
      </section>
    </>
  );
}
