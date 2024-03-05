'use client';

import React, { useState } from 'react';
import VideoUpload from '@/components/functional/VideoUpload';
import TextArea from '@/components/functional/TextArea';
import { useRouter } from 'next/navigation';
import { createShort } from '@/lib/queries/short';
import { SiYoutubeshorts } from 'react-icons/si';

const PublishShortModal = () => {
  const router = useRouter();

  const [description, setDescription] = useState<string>('');

  const handleUpload = async (filename: string) => {
    // const storyId =
    await createShort(filename, description);
    router.push('/feed/short');
  };

  return (
    <>
      <div className="my-4 flex flex-col justify-center gap-2">
        <SiYoutubeshorts className="size-24 mx-auto" />
        <h2 className="mx-auto text-center text-xl font-semibold">
          Publish Short
        </h2>
      </div>

      <div className="flex w-full flex-row justify-center bg-white">
        <section className="mx-10 w-full rounded-xl border border-slate-400">
          <TextArea
            rows={4}
            description={description}
            setDescription={setDescription}
            placeholder="Share your experience with everybody."
            small={true}
          />
        </section>
      </div>
      <div className="">
        <VideoUpload onUploadSuccess={handleUpload} customHeight={'100%'} />
      </div>
    </>
  );
};

export default PublishShortModal;
