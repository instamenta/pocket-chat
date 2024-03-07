import React from 'react';
import { CiSquarePlus } from 'react-icons/ci';
import { TfiGallery } from 'react-icons/tfi';

const QuickPost = ({
  description,
  setDescription,
  className = '',
}: {
  description: string;
  setDescription: (data: string) => void;
  className?: string;
}) => {
  return (
    <section
      className={`flex flex-row justify-between gap-1 bg-white px-4 py-2 ${className}`}
    >
      <CiSquarePlus className="my-auto h-12 w-12 fill-blue-600 transition-all hover:scale-110" />
      <textarea
        id="editor"
        rows={1}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        className="block w-full border-0 bg-white px-2 pt-3 text-sm text-gray-800 outline-none focus:ring-0"
        placeholder="Share your experience with everybody."
        required
      ></textarea>
      <TfiGallery className="my-auto h-10 w-12 rounded-xl fill-green-600 px-1 transition-all hover:scale-110 hover:bg-slate-200 hover:fill-green-700 " />
    </section>
  );
};

export default QuickPost;
