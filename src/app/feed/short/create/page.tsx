'use client';

import React, { useState } from 'react';
import VideoUpload from '@/components/functional/VideoUpload';
import TextArea from '@/components/functional/TextArea';
import { createShort } from '@/lib/queries/short';
import { useRouter } from 'next/navigation';


const CreateShort = () => {
  const router = useRouter();

  const [description, setDescription] = useState<string>('');

  const handleUpload = async (filename: string) => {
    // const storyId =
    await createShort(filename, description);
    router.push('/feed/short');
  };

  return (
    <div>
      <div style={{ height: '80vh' }} className="pt-6">
        <VideoUpload onUploadSuccess={handleUpload} customHeight={'100%'} />
      </div>

      <div className="absolute bottom-0 z-10 flex w-full flex-row justify-center bg-white">
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
    </div>
  );
};

export default CreateShort;
