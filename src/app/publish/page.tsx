'use client';

import {
  type FileState,
  MultiImageDropzone,
} from '@/components/edgestore/MultiImageDropzone';
import React, { useState } from 'react';
import { useEdgeStore } from '@/lib/store/edgestore';
import { createPublication } from '@/lib/queries/publication';
import { FaChevronLeft } from 'react-icons/fa6';
import { GoGear } from 'react-icons/go';
import { useRouter } from 'next/navigation';
import TextArea from '@/components/functional/TextArea';

const CreatePublication = () => {
  const { edgestore } = useEdgeStore();
  const router = useRouter();

  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [description, setDescription] = useState<string>('');

  function updateFileProgress(key: string, progress: FileState['progress']) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key,
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    const imageUrls: string[] = [];

    await Promise.all(
      fileStates.map(async (addedFileState) => {
        try {
          const res = await edgestore.publicFiles.upload({
            // @ts-ignore
            file: addedFileState.file,
            onProgressChange: async (progress) => {
              updateFileProgress(addedFileState.key, progress);
              if (progress === 100) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                updateFileProgress(addedFileState.key, 'COMPLETE');
              }
            },
            options: undefined,
          });
          imageUrls.push(res.url);
        } catch (error) {
          console.error(error);
          updateFileProgress(addedFileState.key, 'ERROR');
        }
      }),
    );

    const id = await createPublication({
      publication_status: 'published',
      description: description,
      images: imageUrls,
    });
    if (!id) {
      return console.error('Failed to create post');
    }
  };

  return (
    <>
      <nav className="flex justify-between px-3 pt-3">
        <button
          className="flex justify-center align-middle"
          onClick={(event) => {
            event.preventDefault();
            router.push('/');
          }}
        >
          <FaChevronLeft className="h-6 w-6" />
        </button>
        <div className="m-auto w-full text-center">
          <h1 className="select-none pb-5 text-xl font-medium">
            Create Publication
          </h1>
        </div>
        <button className="flex justify-center align-middle">
          <GoGear className="h-7 w-7" />
        </button>
      </nav>
      <section className="px-4">
        <div className="mb-4 w-full rounded-lg border border-gray-200 bg-gray-50 ">
          <TextArea description={description} setDescription={setDescription} />
        </div>
      </section>
      <section className="px-4">
        <MultiImageDropzone
          className="bg-slate-200"
          value={fileStates}
          dropzoneOptions={{
            maxFiles: 9,
          }}
          onChange={(files) => {
            setFileStates(files);
          }}
          onFilesAdded={async (addedFiles) => {
            setFileStates([...fileStates, ...addedFiles]);
          }}
        />
      </section>
      <section className="flex w-full justify-center border-y-2 border-dashed border-slate-400 bg-slate-100 px-10 pb-4 pt-4">
        <button
          onClick={handleSubmit}
          className="w-full rounded-md bg-blue-600 py-1 text-lg font-semibold text-white outline outline-2 outline-blue-600
        transition-all hover:bg-white hover:text-blue-600"
        >
          Upload
        </button>
      </section>
    </>
  );
};

export default CreatePublication;
