'use client';

import React, { useEffect, useState } from 'react';
import { getGroupById, listGroupPublication } from '@/lib/queries/group';
import { I_Group } from '@/lib/types';
import Navbar from '@/components/Navbar/Navbar';
import { CiLock } from 'react-icons/ci';
import QuickPost from '@/components/modals/QuickPost';
import { FaPlus } from 'react-icons/fa6';
import { HiMiniUserGroup } from 'react-icons/hi2';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { IoSearch } from 'react-icons/io5';
import { BsThreeDots } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';
import PublicationSlider from '@/components/modals/PublicationSlider';
import Footer from '@/components/Footer';

export default function GroupDetails({
  params: { id },
}: {
  params: { id: string };
}) {
  const [group, setGroup] = useState<I_Group | null>(null);
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    getGroupById(id).then((groupData) => setGroup(groupData ?? null));
  }, []);

  return (
    <>
      <Navbar />

      <section className="mt-4 w-full overflow-hidden rounded-b-3xl border-b shadow-md md:max-h-[30vh]">
        {group ? (
          <img
            className="overflow-hidden object-cover object-center"
            alt="Group Photo"
            src={group.image_url}
          />
        ) : null}
      </section>

      <section className="w-full border-b border-b-slate-300 px-4 pb-4 pt-4">
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
            <section className="grid grid-cols-9 gap-2 pb-2 pt-6 md:px-10 lg:px-20 xl:px-32 2xl:px-60">
              <button
                className="col-span-3 flex w-full flex-nowrap content-center justify-center gap-1 rounded-md
              bg-blue-600 py-1 text-white outline outline-2 outline-blue-600 transition-all hover:bg-white hover:text-blue-600"
              >
                <FaPlus className="my-auto md:size-6" />
                <span className="my-auto font-semibold md:text-xl">Invite</span>
              </button>
              <button
                className="col-span-3 flex w-full content-center justify-center rounded-md bg-gray-200 py-1
                transition-all hover:bg-slate-300"
              >
                <HiMiniUserGroup className="my-auto size-5 md:size-6" />
                <MdOutlineArrowDropDown className="my-auto size-5 md:size-6" />
              </button>
              <button
                className="col-span-1 flex w-full content-center justify-center rounded-md bg-gray-200 py-1
                transition-all hover:bg-slate-300"
              >
                <IoSearch className="my-auto size-5 md:size-6" />
              </button>
              <button
                className="col-span-1 flex w-full content-center justify-center rounded-md bg-gray-200 py-1
                transition-all hover:bg-slate-300"
              >
                <BsThreeDots className="my-auto size-5 md:size-6" />
              </button>
              <button
                className="col-span-1 flex w-full content-center justify-center rounded-md bg-gray-200 py-1
                transition-all hover:bg-slate-300"
              >
                <IoIosArrowDown className="my-auto size-5 md:size-6" />
              </button>
            </section>
          </>
        ) : null}
      </section>

      <section className="font-semi grid w-full grid-cols-3 font-semibold">
        <div className="mx-auto flex w-full justify-center border-b-2 border-b-blue-600 py-3 shadow-inner">
          <span className="text-center text-blue-600 md:text-md xl:text-xl">Featured</span>
        </div>
        <div className="mx-auto flex w-full justify-center border-b border-b-slate-200 py-3 shadow-inner">
          <span className="text-center md:text-md xl:text-xl">Members</span>
        </div>
        <div className="mx-auto flex w-full justify-center border-b border-b-slate-200 py-3 shadow-inner">
          <span className="text-center md:text-md xl:text-xl">More</span>
        </div>
      </section>

      <section className="w-full bg-slate-100 p-4">
        <div className="w-full">
          <QuickPost
            className="rounded-xl border-t border-t-slate-200 drop-shadow-xl"
            description={description}
            setDescription={setDescription}
          />
        </div>
        <h2 className="mx-4 py-2 font-semibold text-gray-600 text-xl lg:mx-auto lg:w-[1020px] lg:text-2xl mt-4">
          Recent Publications
        </h2>
      </section>

      <section className="mb-10 w-full bg-slate-200 pt-2 shadow-inner lg:mx-auto lg:w-[1020px]">
        <PublicationSlider dataPromise={listGroupPublication(id)} />
      </section>

      <Footer />
    </>
  );
}
