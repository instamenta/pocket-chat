'use client';

import React, { useState } from 'react';
import { LuPlusCircle } from 'react-icons/lu';
import { FaRegPenToSquare } from 'react-icons/fa6';
import { IoIosBook } from 'react-icons/io';
import { SiYoutubeshorts } from 'react-icons/si';
import { PiShootingStarBold } from 'react-icons/pi';
import { MdGroups3 } from 'react-icons/md';
import { FaCalendarPlus } from 'react-icons/fa';
import PublishShortModal from '@/components/modals/Publish/Short';
import PublishPublicationModal from '@/components/modals/Publish/Post';
import PublishStoryModal from '@/components/modals/Publish/Story';
import PublishGroupPublicationModal from '@/components/modals/Publish/Group';

type T_States =
  | 'none'
  | 'publication'
  | 'story'
  | 'group'
  | 'event'
  | 'short'
  | 'milestone';

const PublishDropdown = () => {
  const [toggle, setToggle] = React.useState<boolean>(false);
  const [state, setState] = useState<T_States>('none');

  return (
    <>
      <div className="my-auto pr-2">
        <LuPlusCircle
          onClick={() => setToggle((prev) => !prev)}
          className=" my-auto size-7 cursor-pointer text-slate-600 transition-all hover:fill-blue-600"
        />

        {toggle && (
          <div className="absolute right-20 z-20 mt-3 max-w-sm divide-y divide-gray-100 overflow-y-auto rounded-lg border bg-white px-2 shadow-xl ">
            <div className="py-2">
              <span className="px-2.5 text-lg font-semibold">Publish</span>
            </div>
            <ul className="flex flex-col gap-4 px-2 py-4">
              <li
                className="no-wrap flex cursor-pointer gap-2 rounded-2xl border-y border-white border-y-slate-100 pr-2 shadow-inner transition-all hover:bg-gray-100"
                onClick={() => setState('publication')}
              >
                <div className="flex-center my-auto flex aspect-square content-center rounded-full bg-slate-200 p-2">
                  <FaRegPenToSquare className="size-6" />
                </div>
                <div className="my-auto flex flex-col justify-start">
                  <span className="text-sm font-semibold text-slate-800">
                    Post
                  </span>
                  <span className="text-sm font-light text-slate-600">
                    Share a post to feed
                  </span>
                </div>
              </li>
              <li
                className="no-wrap flex cursor-pointer gap-2 rounded-2xl border-y border-white border-y-slate-100 pr-2 shadow-inner transition-all hover:bg-gray-100"
                onClick={() => setState('story')}
              >
                <div className="flex-center my-auto flex aspect-square content-center rounded-full bg-slate-200 p-2">
                  <IoIosBook className="size-6" />
                </div>
                <div className="my-auto flex flex-col justify-start">
                  <span className="text-sm font-semibold text-slate-800">
                    Story
                  </span>
                  <span className="text-sm font-light text-slate-600">
                    Share a photo
                  </span>
                </div>
              </li>
              <li
                className="no-wrap flex cursor-pointer gap-2 rounded-2xl border-y border-white border-y-slate-100 pr-2 shadow-inner transition-all hover:bg-gray-100"
                onClick={() => setState('short')}
              >
                <div className="flex-center my-auto flex aspect-square content-center rounded-full bg-slate-200 p-2">
                  <SiYoutubeshorts className="size-6" />
                </div>
                <div className="my-auto flex flex-col justify-start">
                  <span className="text-sm font-semibold text-slate-800">
                    Short
                  </span>
                  <span className="text-sm font-light text-slate-600">
                    Share a short
                  </span>
                </div>
              </li>
              <li
                className="no-wrap flex cursor-pointer gap-2 rounded-2xl border-y border-white border-y-slate-100 pr-2 shadow-inner transition-all hover:bg-gray-100"
                onClick={() => setState('milestone')}
              >
                <div className="flex-center my-auto flex aspect-square content-center rounded-full bg-slate-200 p-2">
                  <PiShootingStarBold className="size-6" />
                </div>
                <div className="my-auto flex flex-col justify-start">
                  <span className="text-sm font-semibold text-slate-800">
                    Milestone
                  </span>
                  <span className="text-sm font-light text-slate-600">
                    Add a life event
                  </span>
                </div>
              </li>
              <li
                className="no-wrap flex cursor-pointer gap-2 rounded-2xl border-y border-white border-y-slate-100 pr-2 shadow-inner transition-all hover:bg-gray-100"
                onClick={() => setState('group')}
              >
                <div className="flex-center my-auto flex aspect-square content-center rounded-full bg-slate-200 p-2">
                  <MdGroups3 className="size-6" />
                </div>

                <div className="my-auto flex flex-col justify-start">
                  <span className="text-sm font-semibold text-slate-800">
                    Group
                  </span>
                  <span className="text-sm font-light text-slate-600">
                    Share a post in group
                  </span>
                </div>
              </li>
              <li
                className="no-wrap flex cursor-pointer gap-2 rounded-2xl border-y border-white border-y-slate-100 pr-2 shadow-inner transition-all hover:bg-gray-100"
                onClick={() => setState('event')}
              >
                <div className="flex-center my-auto flex aspect-square content-center rounded-full bg-slate-200 p-2">
                  <FaCalendarPlus className="size-6" />
                </div>
                <div className="my-auto flex flex-col justify-start">
                  <span className="text-sm font-semibold text-slate-800">
                    Event
                  </span>
                  <span className="text-sm font-light text-slate-600">
                    Bring people together
                  </span>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>

      {state !== 'none' ? (
        <section
          className="absolute left-0 top-0 z-20 flex h-screen items-center justify-center p-10"
          style={{ backgroundColor: 'rgba(255,255,255,0.69)', width: '97vw' }}
          onClick={() => {
            setState('none');
          }}
        >
          <article
            id="publish-modal"
            className="relative z-30 m-8 flex w-full flex-col content-center justify-center rounded-xl border-2 border-blue-600 bg-white p-4 drop-shadow-2xl"
            onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
              e.stopPropagation()
            }
          >
            {state === 'publication' ? <PublishPublicationModal /> : null}
            {state === 'story' ? <PublishStoryModal /> : null}
            {state === 'group' ? <PublishGroupPublicationModal /> : null}
            {state === 'event' ? <></> : null}
            {state === 'short' ? <PublishShortModal /> : null}
            {state === 'milestone' ? <></> : null}
          </article>
        </section>
      ) : null}
    </>
  );
};

export default PublishDropdown;
