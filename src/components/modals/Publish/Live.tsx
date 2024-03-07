'use client';

import React, { useState } from 'react';
import TextArea from '@/components/functional/TextArea';
import { useRouter } from 'next/navigation';
import { SiLivewire } from 'react-icons/si';
import { createLive } from '@/lib/queries/live';

const PublishLiveModal = () => {
  const router = useRouter();

  const [description, setDescription] = useState<string>('');

  const handleCreate = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    const response = await createLive();
    if (!response) {
      return console.error('Failed to create live');
    }

    router.push(`/live/host/${response.id}`);
  };

  return (
    <>
      <div className="my-4 flex flex-col justify-center gap-2">
        <SiLivewire className="mx-auto size-24 fill-pink-600 transition-all hover:-rotate-12 hover:scale-105" />
        <h1 className="mx-auto text-center text-xl font-semibold">
          Start Live
        </h1>
      </div>

      <div className="flex w-full flex-row justify-center bg-white">
        <section className="mx-4 w-full rounded-xl border border-slate-400">
          <TextArea
            rows={2}
            description={description}
            setDescription={setDescription}
            placeholder="Description"
            small={true}
          />
        </section>
      </div>
      <div className="flex w-full justify-center px-4 pb-4 pt-4">
        <button
          onClick={handleCreate}
          className="w-full rounded-md bg-pink-600 py-1 text-lg font-semibold text-white outline outline-2 outline-pink-600
        transition-all hover:bg-white hover:text-pink-600"
        >
          Go Live
        </button>
      </div>
    </>
  );
};

export default PublishLiveModal;
