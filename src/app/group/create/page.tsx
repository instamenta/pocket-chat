'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SimplifiedNavbar from '@/components/Navbar/SimplifiedNavbar';
import TextArea from '@/components/functional/TextArea';
import { HiMiniUserGroup } from 'react-icons/hi2';
import { createGroup } from '@/lib/queries/group';
import { SingleImageDropzone } from '@/components/edgestore/SingleImageDropzone';
import { useEdgeStore } from '@/lib/store/edgestore';

export default function CreateGroup() {
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  const [description, setDescription] = useState<string>('');
  const [groupName, setGroupName] = useState<string>('');
  const [image, setImage] = useState<string | File | undefined>(undefined);

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

      switch (true) {
      case !image:
        return console.error('Group image is required');
      case groupName.trim().length < 1:
        return console.error('Group name is required');
    }

    // @ts-ignore
    const { url } = await edgestore.publicFiles.upload({ file: image });

    const result = await createGroup(
      groupName.trim(),
      description.trim(),
      url,
    );

    if (!result) return console.error('Failed to create group');

    router.push(`/group/${result.id}`);
  };

  return (
    <>
      {/* Navbar */}
      <SimplifiedNavbar title={'Create Group'} />

      <form
        className="flex h-screen flex-col justify-around border-t border-t-slate-400 align-middle"
        style={{ height: '93vh' }}
      >
        {/* Image Upload*/}
        <section className="w-full gap-4 rounded-3xl bg-purple-100 py-6">
          <div className="flex w-full justify-center pb-2">
            <span className="mx-auto text-center text-lg font-semibold text-slate-700">
              Group Picture
            </span>
          </div>
          <SingleImageDropzone
            height={100}
            width={100}
            value={image}
            className="mx-auto border-2 bg-white"
            onChange={setImage}
          />
        </section>

        <section className="rounded-3xl bg-blue-100 p-10">
          <label className="font-semibold text-slate-700" htmlFor="name">
            Name
          </label>
          <div className="my-1.5 mb-4 flex justify-between rounded-t-xl border-none bg-white py-2 outline outline-1 outline-slate-700 transition-all hover:outline-blue-600">
            <div className="px-2">
              <HiMiniUserGroup className="h-6 w-6" />
            </div>
            <input
              id="name"
              name="name"
              className="mr-2 w-full px-2"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Group Name"
            />
          </div>

          <label className="mb-2 font-semibold text-slate-700">
            Description
          </label>
          <div className="w-full rounded-b-xl bg-white outline outline-1 outline-slate-700">
            <TextArea
              rows={4}
              description={description}
              setDescription={setDescription}
              placeholder="Groups Description"
              small={true}
            />
          </div>
        </section>

        <section className="flex w-full justify-center bg-green-200 py-8">
          <button
            onClick={handleSubmit}
            className="rounded-xl bg-white px-8 py-2 font-semibold outline outline-2 outline-slate-700
        transition-all hover:scale-110
        "
          >
            Create Group
          </button>
        </section>
      </form>
    </>
  );
}
