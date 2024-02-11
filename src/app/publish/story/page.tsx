'use client';

import React, { useEffect, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa6';
import { GoGear } from 'react-icons/go';
import { useRouter } from 'next/navigation';
import { SingleImageDropzone } from '@/components/edgestore/SingleImageDropzone';
import { useEdgeStore } from '@/lib/store/edgestore';
import useUser from '@/lib/store';
import { I_UserSchema } from '@/lib/types';
import { updateProfilePicture } from '@/lib/queries/user';
import { toast } from 'react-toastify';
import { IoCloudUploadOutline } from 'react-icons/io5';

const CreateStory = () => {
  const router = useRouter();

  const { edgestore } = useEdgeStore();
  const [file, setFile] = React.useState<File>();
  const [user, setUser] = useState<I_UserSchema | null>(null);

  useEffect(() => {
    useUser
      .getState()
      .getUser()
      .then((d) => setUser(d));
  }, []);

  const handleImageUpload = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    if (!file) return;
    const r = await edgestore.publicFiles.upload({ file });

    const response = await updateProfilePicture(r.url);
    if (!response) {
      toast(() => (
        <div className="bg-red-400 outline outline-2 outline-red-600">
          <p className="m-auto text-center font-bold">Failed to update info.</p>
        </div>
      ));
      return console.log('Empty response body');
    }

    toast(() => (
      <div className="outline outline-2 outline-green-600">
        <p className="m-auto text-center font-bold">
          Successfully updated info
        </p>
      </div>
    ));

    useUser.getState().setUser(response.userData);
    setUser(response.userData);
    setToggleImagePicker(false);
    router.refresh();
  };

  return (
    <>
      <nav className="flex justify-between px-3 py-3">
        <button
          className="flex justify-center align-middle"
          onClick={(e) => {
            e.preventDefault();
            router.push('/');
          }}
        >
          <FaChevronLeft className="h-6 w-6" />
        </button>

        <button className="flex justify-center align-middle">
          <GoGear className="h-7 w-7" />
        </button>
      </nav>
      <section
        className="flex w-full flex-col items-center "
        style={{
          height: 'calc(100vh - 52px)',
          backgroundImage: 'linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)',
        }}
      >
        <div className="pb-44 pt-10">
          <h1 className="shadow-outline text-5xl font-black text-white">
            Publish your Story
          </h1>
        </div>
        <SingleImageDropzone
          width={1}
          height={1}
          value={file}
          className="m-auto border-2 bg-white bg-opacity-50"
          onChange={(file) => setFile(file)}
        />
        <button
          className="mt-10 flex items-center gap-4 rounded-md px-5 bg-white"
          onClick={handleImageUpload}
        >
          <div className="bg-white rounded-full scale-150">
            <IoCloudUploadOutline className="h-10 w-10 transition-all hover:scale-110" />
          </div>
          <span className="text-2xl ">Upload</span>
        </button>
      </section>
    </>
  );
};

export default CreateStory;
