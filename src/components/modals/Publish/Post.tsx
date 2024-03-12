'use client';

import React, { useState } from 'react';
import TextArea from '@/components/functional/TextArea';
import { useEdgeStore } from '@/lib/store/edgestore';
import {
  FileState,
  MultiImageDropzone,
} from '@/components/edgestore/MultiImageDropzone';
import { createPublication } from '@/lib/queries/publication';
import { FaRegPenToSquare } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { useErrorNotification, useSuccessNotification } from '@/components/toast/CustomToasts';

const PublishPublicationModal = () => {
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
      useErrorNotification('Failed to create post', {position: 'top-center'});
      return console.error('Failed to create post');
    }
    useSuccessNotification('Successfully created group publication', {position: 'bottom-center'});
    router.push('/feed');
  };

  return (
    <>
      <div className="my-4 flex flex-col justify-center gap-2">
        <FaRegPenToSquare className="mx-auto size-24 fill-blue-600" />
        <h2 className="mx-auto text-center text-xl font-semibold">
          Publish Publication
        </h2>
      </div>

      <section className="px-4">
        <div className="mb-4 w-full rounded-lg border border-gray-200 bg-gray-50 ">
          <TextArea
            small={true}
            description={description}
            setDescription={setDescription}
          />
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
      <section className="flex w-full justify-center px-10 pb-4 pt-4">
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

export default PublishPublicationModal;
