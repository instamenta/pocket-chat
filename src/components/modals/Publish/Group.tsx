'use client';

import React, { useEffect, useState } from 'react';
import TextArea from '@/components/functional/TextArea';
import { useEdgeStore } from '@/lib/store/edgestore';
import {
  FileState,
  MultiImageDropzone,
} from '@/components/edgestore/MultiImageDropzone';
import { createPublication } from '@/lib/queries/publication';
import { MdGroups2 } from 'react-icons/md';
import { I_Group } from '@/lib/types';
import { useUserContext } from '@/lib/context/UserContext';
import { listGroupsByUser } from '@/lib/queries/group';

const PublishGroupPublicationModal = () => {
  const { edgestore } = useEdgeStore();

  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [description, setDescription] = useState<string>('');
  const [groups, setGroups] = useState<I_Group[]>([]);
  const [picked, setPicked] = useState<I_Group | null>(null);
  const { user } = useUserContext();

  useEffect(() => {
    if (!user) return;
    listGroupsByUser(user.id).then((d) => {
      setGroups(d);
      if (d.length) setPicked(d[0]);
    });
  }, [user]);

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
      <div className="my-4 flex flex-col justify-center gap-2">
        <MdGroups2 className="mx-auto size-24" />
        <h2 className="mx-auto text-center text-xl font-semibold">
          Publish to Group
        </h2>
      </div>

      <div className="px-4">
        <div className="mb-4 w-full rounded-lg border border-gray-200 bg-gray-50 ">
          <TextArea
            small={true}
            description={description}
            setDescription={setDescription}
          />
        </div>
      </div>
      <div className="px-4">
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
      </div>
      <div className="w-full px-4 py-2 ">
        <div className="rounded-xl py-2 outline outline-1 outline-slate-500">
          <div className="">
            {picked ? (
              <span>{picked.name}</span>
            ) : (
              <span className="px-4">No groups</span>
            )}
          </div>
          <ul className="">
            {groups.map((group, index) => (
              <li key={index}>{group.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex w-full justify-center px-10 pb-4 pt-4">
        <button
          onClick={handleSubmit}
          className="w-full rounded-md bg-blue-600 py-1 text-lg font-semibold text-white outline outline-2 outline-blue-600
        transition-all hover:bg-white hover:text-blue-600"
        >
          Upload
        </button>
      </div>
    </>
  );
};

export default PublishGroupPublicationModal;
