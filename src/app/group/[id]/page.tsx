'use client';

import React, { useEffect, useState } from 'react';
import { getGroupById, listGroupPublication } from '@/lib/queries/group';
import { I_Group, I_Recommendation } from '@/lib/types';
import Navbar from '@/components/Navbar/Navbar';
import { CiLock } from 'react-icons/ci';
import QuickPost from '@/components/modals/QuickPost';
import { FaHeart, FaPlus, FaRegShareFromSquare } from 'react-icons/fa6';
import { HiMiniUserGroup } from 'react-icons/hi2';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { IoHeartHalfOutline, IoSearch } from 'react-icons/io5';
import { BsThreeDots } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';
import Link from 'next/link';
import { FaCommentDots, FaRegHeart } from 'react-icons/fa';
import { BiSend } from 'react-icons/bi';
import PublicationDetails from '@/components/modals/PublicationDetails';
import { likePublication } from '@/lib/queries/publication';
import { useUserContext } from '@/lib/context/UserContext';

export default function GroupDetails({
  params: { id },
}: {
  params: { id: string };
}) {
  const { user } = useUserContext();

  const [group, setGroup] = useState<I_Group | null>(null);
  const [publications, setPublications] = useState<I_Recommendation[]>([]);
  const [description, setDescription] = useState<string>('');
  const [selectedPublication, setSelectedPublication] =
    useState<I_Recommendation | null>(null);

  useEffect(() => {
    Promise.all([getGroupById(id), listGroupPublication(id)]).then(
      ([groupData, publicationsData]) => {
        setGroup(groupData ?? null);
        setPublications(publicationsData);
      },
    );
  }, []);

  const handleLike = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string,
    index: number,
  ) => {
    event.preventDefault();
    likePublication(id).then((status) => {
      if (!status) {
        console.log('Failed to like or dislike post');
        return publications;
      }
      setPublications((currentPublications) => {
        const updatedPublications = [...currentPublications];
        const pub = { ...updatedPublications[index] };
        pub.liked_by_user = !pub.liked_by_user;
        pub.liked_by_user ? pub.likes_count++ : pub.likes_count--;

        updatedPublications[index] = pub;
        return updatedPublications;
      });
    });
  };

  const handleOpenPublicationDetails = (publication: I_Recommendation) => {
    setSelectedPublication(publication);
  };

  return (
    <>
      <Navbar />

      {/* Publication Details Overlay */}
      {selectedPublication && user && (
        <PublicationDetails
          publication={selectedPublication}
          onClose={() => setSelectedPublication(null)}
          publications={publications}
          setPublications={setPublications}
          user={user}
        />
      )}

      <section
        className="w-full overflow-hidden rounded-b-3xl border-b shadow-md"
        style={{ height: '60vw' }}
      >
        {group ? (
          <img
            className="overflow-hidden object-cover object-center"
            alt="Group Photo"
            src={group.image_url}
          />
        ) : null}
      </section>
      <section className="w-full border-b border-b-slate-300 px-4 pb-4 pt-4">
        {group ? (
          <>
            <h1 className="text-2xl font-semibold">{group.name}</h1>
            <div className="flex gap-2">
              <div className="my-auto flex flex-nowrap">
                <CiLock className="size-5" />
                <span className="pl-1 text-slate-500">Private group</span>
              </div>
              <strong>•</strong>
              <span className="text-slate-500">
                {group.members_count} member
                {group.members_count > 1 ? 's' : ''}
              </span>
            </div>
            <section className="grid grid-cols-9 gap-2 pb-2 pt-6">
              <button
                className="col-span-3 flex w-full flex-nowrap content-center justify-center gap-1 rounded-md
              bg-blue-600 py-1 text-white outline outline-2 outline-blue-600 transition-all hover:bg-white hover:text-blue-600 "
              >
                <FaPlus className="my-auto" />
                <span className="font-semibold">Invite</span>
              </button>
              <button
                className="col-span-3 flex w-full content-center justify-center rounded-md bg-gray-200 py-1
                transition-all hover:bg-slate-300"
              >
                <HiMiniUserGroup className="my-auto size-5" />
                <MdOutlineArrowDropDown className="my-auto size-5" />
              </button>
              <button
                className="col-span-1 flex w-full content-center justify-center rounded-md bg-gray-200 py-1
                transition-all hover:bg-slate-300"
              >
                <IoSearch className="my-auto size-5" />
              </button>
              <button
                className="col-span-1 flex w-full content-center justify-center rounded-md bg-gray-200 py-1
                transition-all hover:bg-slate-300"
              >
                <BsThreeDots className="my-auto size-5" />
              </button>
              <button
                className="col-span-1 flex w-full content-center justify-center rounded-md bg-gray-200 py-1
                transition-all hover:bg-slate-300"
              >
                <IoIosArrowDown className="my-auto size-5" />
              </button>
            </section>
          </>
        ) : null}
      </section>
      <section className="font-semi grid w-full grid-cols-3 font-semibold">
        <div className="mx-auto flex w-full justify-center border-b-2 border-b-blue-600 py-3 shadow-inner">
          <span className="text-center text-blue-600">Featured</span>
        </div>
        <div className="mx-auto flex w-full justify-center border-b border-b-slate-200 py-3  shadow-inner">
          <span className="text-center">Members</span>
        </div>
        <div className="mx-auto flex w-full justify-center border-b border-b-slate-200 py-3 shadow-inner">
          <span className="text-center">More</span>
        </div>
      </section>

      <section className="w-full bg-slate-100 p-4">
        <div className="w-full">
          <QuickPost
            className="rounded-xl border-t border-t-slate-200 drop-shadow-xl"
            description={description}
            setDescription={setDescription}
          />
        </div>
        <h2 className="mx-4 py-2 text-lg font-semibold text-gray-600">
          Recent Publications
        </h2>
      </section>
      
      <div className="w-full bg-slate-200 pt-2 shadow-inner">
        {publications.map((publication, index) => (
          <article
            key={index}
            className="mb-3 flex flex-col border border-t-2 border-t-gray-300 bg-white drop-shadow"
          >
            {/* Publisher Data */}
            <Link
              href={`/profile/${publication.username}`}
              className="flex w-full flex-row p-4 pb-4"
            >
              {/* Publisher Profile Pic */}
              <div className="">
                <img
                  src={publication.picture}
                  alt="profile pic"
                  className="aspect-square h-14 w-14 rounded-full border-2 border-white outline outline-blue-600"
                />
              </div>
              <div className="ml-4 flex flex-col justify-between py-1">
                  <span className="font-semibold capitalize">
                    {publication.first_name + ' ' + publication.last_name}
                  </span>
                <div className="text-gray-600">
                  @<span className="font-light">{publication.username}</span>
                </div>
              </div>
            </Link>
            {publication.description ? (
              <div className="text-pretty px-4 pb-2">
                  <span className="font-medium text-gray-900">
                    {publication.description}
                  </span>
              </div>
            ) : null}
            {/* Image TOP Outline */}
            <div className="mx-4 h-3 border-x-2 border-t-2 " />

            {/* Images Grid Container */}
            <div
              onClick={() => handleOpenPublicationDetails(publication)}
              className={`grid  ${
                publication.images.length === 1
                  ? 'grid-cols-1'
                  : 'grid-cols-2'
              }`}
            >
              {/* Images */}
              {publication.images
                .slice(0, 4)
                .map((image: string, index: number) => (
                  <div key={index} className="aspect-square overflow-hidden">
                    <img
                      src={image}
                      alt="image"
                      className="aspect-square overflow-hidden object-center"
                    />
                  </div>
                ))}
            </div>
            {/* Image Bottom Outline */}
            <div className="mx-4 h-3 border-x-2 border-b-2 " />

            {/* Publication Rating */}
            <div className="flex w-full justify-between px-4 pb-2 pt-4">
              <div className="flex content-center gap-1">
                <IoHeartHalfOutline className="size-6 fill-red-600 " />
                <span>{publication.likes_count}</span>
              </div>
              <div className="flex gap-2">
                <div className="flex gap-2">
                  <span>{publication.comments_count + ' ' + 'comments'}</span>
                  <span>{24 + ' ' + 'reposts'}</span>
                </div>
              </div>
            </div>

            <div
              className="flex w-full flex-nowrap justify-evenly gap-4 border-t-2 border-t-slate-300 py-3 text-center font-semibold">
              <div className="flex flex-row flex-nowrap gap-1">
                {/* Like Publication*/}
                <div
                  className="hover:cursor-pointer"
                  onClick={(event) =>
                    handleLike(event, publication.id, index)
                  }
                >
                  {publication.liked_by_user ? (
                    <FaHeart className="h-5 w-5 fill-red-600" />
                  ) : (
                    <FaRegHeart className="h-5 w-5" />
                  )}
                </div>
                <span>Like</span>
              </div>

              {/* Comment Publication */}
              <button
                onClick={() => handleOpenPublicationDetails(publication)}
                className="flex flex-row flex-nowrap gap-1"
              >
                <FaCommentDots className="h-5 w-5 fill-gray-600" />
                <span>Comment</span>
              </button>

              {/* Share to Conversation */}
              <button className="flex flex-row flex-nowrap gap-1">
                <BiSend className="h-5 w-5" />
                <span>Send</span>
              </button>

              {/* Share Button */}
              <button className="flex flex-row flex-nowrap gap-1 ">
                <FaRegShareFromSquare className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
