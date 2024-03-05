'use client';

import React, { useState } from 'react';
import VideoUpload from '@/components/functional/VideoUpload';
import TextArea from '@/components/functional/TextArea';
import { useRouter } from 'next/navigation';
import { createShort } from '@/lib/queries/short';

const PublishShortModal = () => {
  const router = useRouter();

  const [description, setDescription] = useState<string>('');

  const handleUpload = async (filename: string) => {
    // const storyId =
    await createShort(filename, description);
    router.push('/feed/short');
  };

  return (
    <article className='flex flex-col justify-center'>
      <div className="pt-6">
        <VideoUpload onUploadSuccess={handleUpload} customHeight={'100%'} />
      </div>

      <div className="flex w-full flex-row justify-center bg-white">
        <section className="mx-10 mb-6 w-full rounded-xl border border-slate-400">
          <TextArea
            rows={4}
            description={description}
            setDescription={setDescription}
            placeholder="Share your experience with everybody."
            small={true}
          />
        </section>
      </div>
    </article>
  );
};

export default PublishShortModal;
