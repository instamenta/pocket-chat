import React, { useEffect } from 'react';
import { MdOutlineInsertComment } from 'react-icons/md';
import { FaShare } from 'react-icons/fa6';
import { IoShareSocialSharp } from 'react-icons/io5';
import { I_ShortPopulated } from '@/lib/types';
import { likeShort } from '@/lib/queries/short';
import { GoHeartFill } from 'react-icons/go';
import { useErrorNotification } from '@/components/toast/CustomToasts';

const ActionSidebar = (
  {
    short, setShort, index
  }
    : {
    short: I_ShortPopulated,
    setShort: React.Dispatch<React.SetStateAction<I_ShortPopulated[]>>,
    index: string | number
  }
) => {
  useEffect(() => {
  }, []);

  const handleLike = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();

    const success = await likeShort(short.id);
    if (!success) {
      useErrorNotification('Failed to like Short', { position: 'bottom-right' });
      return console.error('Failed to like Short');
    }

    setShort((currentShorts) => {
      const updatedPublications = [...currentShorts];
      const short = { ...updatedPublications[+index] };
      short.liked_by_user = !short.liked_by_user;
      short.liked_by_user ? short.likes_count++ : short.likes_count--;
      updatedPublications[+index] = short;
      return updatedPublications;
    });
  };

  return (
    <section
      className="absolute bottom-0 right-0 z-20 mb-4 flex h-full flex-col justify-end gap-3 border-red-600 pr-3 align-middle
      text-sm text-white md:right-32 lg:right-64 xl:right-96">
      <div onClick={handleLike}
           className="flex flex-col justify-center gap-1 rounded-full bg-black bg-opacity-5 text-center align-middle"
      >
        <GoHeartFill
          className={`mx-auto size-7  bg-opacity-100 ${short.liked_by_user ? 'fill-red-600' : 'fill-white'}`} />
        <span className="bg-opacity-100">{short.likes_count}</span>
      </div>
      <div
        className="flex flex-col justify-center gap-1 rounded-full bg-black bg-opacity-5 text-center align-middle">
        <MdOutlineInsertComment className="mx-auto size-7 fill-white bg-opacity-100" />
        <span className="bg-opacity-100">{short.comments_count}</span>
      </div>
      <div
        className="flex flex-col justify-center gap-1 rounded-full bg-black bg-opacity-5 text-center align-middle">
        <FaShare className="mx-auto size-7 fill-white bg-opacity-100" />
        <span className="bg-opacity-100">Repost</span>
      </div>
      <div
        className="flex flex-col justify-center gap-1 rounded-full bg-black bg-opacity-5 text-center align-middle">
        <IoShareSocialSharp className="mx-auto size-7 fill-white bg-opacity-100" />
        <span className="bg-opacity-100">Share</span>
      </div>
      <img
        src={short.user_picture}
        className="mx-auto mt-2 size-10 rounded-xl"
        alt="user picture"
      />
    </section>
  );
};

export default ActionSidebar;