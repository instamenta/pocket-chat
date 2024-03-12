'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { GoBook } from 'react-icons/go';
import { useEdgeStore } from '@/lib/store/edgestore';
import { createStory } from '@/lib/queries/story';
import { SingleImageDropzone } from '@/components/edgestore/SingleImageDropzone';
import { IoCloudUploadOutline } from 'react-icons/io5';
import {
  useErrorNotification,
  useSuccessNotification,
  useWarnNotification,
} from '@/components/toast/CustomToasts';

const PublishStoryModal = () => {
  const router = useRouter();

  const { edgestore } = useEdgeStore();
  const [file, setFile] = React.useState<File>();

  const handleImageUpload = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    if (!file) {
      useWarnNotification('Pick image', { position: 'top-center' });
      return console.warn('Image is required');
    }
    const r = await edgestore.publicFiles.upload({ file });

    const response = await createStory(r.url);
    if (!response) {
      useErrorNotification('Failed to create story', {
        position: 'top-center',
      });
      return console.log('Empty response body');
    }

    useSuccessNotification('Successfully created story', {
      position: 'bottom-center',
    });

    router.push('/feed');
  };

  return (
    <>
      <div className="my-4 flex flex-col justify-center gap-2">
        <GoBook className="mx-auto size-24 fill-purple-600" />
        <h2 className="mx-auto text-center text-xl font-semibold">
          Publish Story
        </h2>
      </div>

      <SingleImageDropzone
        width={1}
        height={1}
        value={file}
        className="aspect-phone-portrait m-auto w-full border-2 bg-white transition-all hover:bg-slate-200"
        onChange={setFile}
      />

      <button
        className="mx-10 my-6 flex items-center gap-4 rounded-md bg-white px-5 text-slate-600 outline outline-2
          outline-slate-300 transition-all hover:scale-110 hover:text-purple-600 hover:outline-purple-600"
        onClick={handleImageUpload}
      >
        <div className="scale-150 rounded-full bg-white">
          <IoCloudUploadOutline className="h-10 w-10 text-purple-600 transition-all hover:scale-110" />
        </div>
        <span className="ml-4 text-center text-2xl font-semibold">Upload</span>
      </button>
    </>
  );
};

export default PublishStoryModal;
