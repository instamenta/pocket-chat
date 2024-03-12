'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TextArea from '@/components/functional/TextArea';
import { HiMiniUserGroup } from 'react-icons/hi2';
import { createGroup } from '@/lib/queries/group';
import { SingleImageDropzone } from '@/components/edgestore/SingleImageDropzone';
import { useEdgeStore } from '@/lib/store/edgestore';
import {
  useErrorNotification,
  useSuccessNotification,
  useWarnNotification,
} from '@/components/toast/CustomToasts';
import { MdGroups2 } from 'react-icons/md';

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
        useWarnNotification('Group image is required', {
          position: 'top-center',
        });
        return console.error('Group image is required');
      case groupName.trim().length < 1:
        useWarnNotification('Group name is required', {
          position: 'top-center',
        });
        return console.error('Group name is required');
    }

    // @ts-ignore
    const { url } = await edgestore.publicFiles.upload({ file: image });

    const result = await createGroup(groupName.trim(), description.trim(), url);

    if (!result) {
      useErrorNotification('Failed to create group', {
        position: 'bottom-right',
      });
      return console.error('Failed to create group');
    }

    useSuccessNotification('Group created', { position: 'bottom-right' });

    router.push(`/group/${result.id}`);
  };

  return (
    <>
      <div className="my-4 flex flex-col justify-center">
        <MdGroups2 className="mx-auto size-28 fill-blue-600" />
        <h2 className="mx-auto text-center text-xl font-semibold">
          Create Group
        </h2>
      </div>

      <form className="relative w-full px-4 py-2 pb-6">
        {/* Image Upload*/}
        <section className="w-full gap-4 rounded-3xl">
          <SingleImageDropzone
            height={100}
            width={100}
            value={image}
            className="mx-auto border-2 bg-white"
            onChange={setImage}
          />
        </section>

        <section className="rounded-3xl pt-2">
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

        <section className="flex w-full justify-center px-10 pb-4 pt-6">
          <button
            onClick={handleSubmit}
            className="w-full rounded-md bg-blue-600 py-1 text-lg font-semibold text-white outline outline-2 outline-blue-600
        transition-all hover:bg-white hover:text-blue-600
        "
          >
            Create Group
          </button>
        </section>
      </form>
    </>
  );
}
