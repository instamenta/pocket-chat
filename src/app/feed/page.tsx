'use client';

import React, { useEffect, useState } from 'react';
import { I_Recommendation, I_UserSchema } from '@/lib/types';
import Navbar from '@/components/Navbar';
import { getRecommendations, likePublication } from '@/lib/queries/publication';
import { FaAddressBook, FaCommentDots, FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa6';
import { CiSquarePlus } from 'react-icons/ci';
import { TfiGallery } from 'react-icons/tfi';
import { GrYoutube } from 'react-icons/gr';
import { MdGroups, MdLiveTv, MdMore } from 'react-icons/md';
import { RiLiveFill } from 'react-icons/ri';
import useUser from '@/lib/store';
import { AiFillPlusCircle } from 'react-icons/ai';
import { BiSend } from "react-icons/bi";
import { FaRegShareFromSquare } from "react-icons/fa6";

const Feed = () => {
  const [publications, setPublications] = useState<I_Recommendation[]>([]);
  const [description, setDescription] = useState<string>('');
  const [user, setUser] = useState<I_UserSchema | null>(null);

  useEffect(() => {
    useUser
      .getState()
      .getUser()
      .then((d) => setUser(d));

    getRecommendations().then((d) => {
      setPublications(d ?? []);
      console.log(d);
    });
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
        if (pub.liked_by_user) {
          pub.likes_count++;
        } else {
          pub.likes_count--;
        }
        updatedPublications[index] = pub;
        return updatedPublications;
      });
    });
  };

  return (
    <>
      <Navbar />

      <section className="flex flex-row justify-between gap-1 px-4 py-2">
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
      {/* STORY SECTION */}
      <div className="drop-shadow-md">
        <section className="scrollbar-none flex h-56 w-full flex-row gap-2.5 overflow-x-auto bg-slate-100 px-2 py-4 text-center font-semibold shadow-inner">
          {/* First Element*/}
          <div className="aspect-phone-portrait relative rounded-2xl border-2 border-white bg-slate-300 outline outline-blue-600">
            <img
              className="h-3/5 w-full overflow-hidden rounded-t-2xl"
              src={user?.picture}
              alt="profile-pic"
            />
            <AiFillPlusCircle
              className="absolute bottom-0 left-1/2 z-50 mb-9 h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform
          rounded-full bg-white text-blue-600"
            />
            <div className="absolute bottom-0 left-0 flex h-2/5 w-full overflow-hidden rounded-b-2xl bg-white py-1">
              <span className="w-full self-end text-nowrap text-center text-sm text-gray-600">
                Create Story
              </span>
            </div>
          </div>

          <AiFillPlusCircle />
          {/* REST */}
          <div className="aspect-phone-portrait relative rounded-2xl border-2 border-white bg-slate-300 outline outline-blue-600">
            <div className="absolute left-2 top-2 z-50 h-8 w-8 rounded-full bg-slate-500 outline outline-2 outline-white"></div>
            <img
              className="absolute left-0 top-0 h-full w-full rounded-2xl"
              src="https://g1.img-dpreview.com/3ACBE6D011274856888F900E563D7A85.jpg"
              alt="story-image"
            />
            <div className="absolute bottom-0 left-0 w-full overflow-hidden rounded-b-2xl bg-gradient-to-b from-transparent to-black px-2 py-1">
              <span className="block truncate text-xs text-white">
                Gonzaliez Garsia
              </span>
            </div>
          </div>
          <div className="aspect-phone-portrait relative rounded-2xl border-2 border-white bg-slate-300 outline outline-blue-600">
            <img
              className="absolute left-0 top-0 h-full w-full rounded-2xl"
              src="https://g1.img-dpreview.com/3ACBE6D011274856888F900E563D7A85.jpg"
              alt="story-image"
            />
            <div className="absolute bottom-0 left-0 w-full overflow-hidden rounded-b-2xl bg-gradient-to-b from-transparent to-black px-2 py-1">
              <span className="block truncate text-xs text-white">
                Gonzaliez Garsia
              </span>
            </div>
          </div>
          <div className="aspect-phone-portrait relative rounded-2xl border-2 border-white bg-slate-300 outline outline-blue-600">
            <img
              className="absolute left-0 top-0 h-full w-full rounded-2xl"
              src="https://g1.img-dpreview.com/3ACBE6D011274856888F900E563D7A85.jpg"
              alt="story-image"
            />
            <div className="absolute bottom-0 left-0 w-full overflow-hidden rounded-b-2xl bg-gradient-to-b from-transparent to-black px-2 py-1">
              <span className="block truncate text-xs text-white">
                Gonzaliez Garsia
              </span>
            </div>
          </div>
          <div className="aspect-phone-portrait relative rounded-2xl border-2 border-white bg-slate-300 outline outline-blue-600">
            <img
              className="absolute left-0 top-0 h-full w-full rounded-2xl"
              src="https://g1.img-dpreview.com/3ACBE6D011274856888F900E563D7A85.jpg"
              alt="story-image"
            />
            <div className="absolute bottom-0 left-0 w-full overflow-hidden rounded-b-2xl bg-gradient-to-b from-transparent to-black px-2 py-1">
              <span className="block truncate text-xs text-white">
                Gonzaliez Garsia
              </span>
            </div>
          </div>
          <div className="aspect-phone-portrait relative rounded-2xl border-2 border-white bg-slate-300 outline outline-blue-600">
            <img
              className="absolute left-0 top-0 h-full w-full rounded-2xl"
              src="https://g1.img-dpreview.com/3ACBE6D011274856888F900E563D7A85.jpg"
              alt="story-image"
            />
            <div className="absolute bottom-0 left-0 w-full overflow-hidden rounded-b-2xl bg-gradient-to-b from-transparent to-black px-2 py-1">
              <span className="block truncate text-xs text-white">
                Gonzaliez Garsia
              </span>
            </div>
          </div>
          <div className="aspect-phone-portrait relative rounded-2xl border-2 border-white bg-slate-300 outline outline-blue-600">
            <img
              className="absolute left-0 top-0 h-full w-full rounded-2xl"
              src="https://g1.img-dpreview.com/3ACBE6D011274856888F900E563D7A85.jpg"
              alt="story-image"
            />
            <div className="absolute bottom-0 left-0 w-full overflow-hidden rounded-b-2xl bg-gradient-to-b from-transparent to-black px-2 py-1">
              <span className="block truncate text-xs text-white">
                Gonzaliez Garsia
              </span>
            </div>
          </div>
          <div className="aspect-phone-portrait relative rounded-2xl border-2 border-white bg-slate-300 outline outline-blue-600">
            <img
              className="absolute left-0 top-0 h-full w-full rounded-2xl"
              src="https://g1.img-dpreview.com/3ACBE6D011274856888F900E563D7A85.jpg"
              alt="story-image"
            />
            <div className="absolute bottom-0 left-0 w-full overflow-hidden rounded-b-2xl bg-gradient-to-b from-transparent to-black px-2 py-1">
              <span className="block truncate text-xs text-white">
                Gonzaliez Garsia
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* Section */}
      <section className="scrollbar-sm flex w-full flex-row gap-3 overflow-x-auto bg-slate-100 px-2 pb-2.5 pt-2 text-center font-semibold shadow-inner">
        <div className="flex flex-row gap-1.5 rounded-2xl border-t border-t-slate-200 bg-white px-4 py-1.5 drop-shadow-lg">
          <GrYoutube className="h-6 w-6 fill-purple-500" />
          <span>Reels</span>
        </div>

        <div className="flex flex-row gap-1.5 rounded-2xl border-t border-t-slate-200 bg-white px-4 py-1.5 drop-shadow-lg">
          <RiLiveFill className="h-6 w-6 fill-pink-600" />
          <span>Live</span>
        </div>
        <div className="flex flex-row gap-1.5 rounded-2xl border-t border-t-slate-200 bg-white px-4 py-1.5 drop-shadow-lg">
          <MdGroups className="h-6 w-6 fill-blue-600" />
          <span>Group</span>
        </div>

        <div className="flex flex-row gap-1.5 rounded-2xl border-t border-t-slate-200 bg-white px-4 py-1.5 drop-shadow-lg">
          <MdLiveTv className="h-6 w-6 fill-red-600" />
          <span>Room</span>
        </div>
        <div className="flex flex-row gap-1.5 rounded-2xl border-t border-t-slate-200 bg-white px-4 py-1.5 drop-shadow-lg">
          <FaAddressBook className="h-6 w-6 fill-green-600 py-0.5" />
          <span>People</span>
        </div>
        <div className="flex flex-row gap-1.5 rounded-2xl border-t border-t-slate-200 bg-white px-4 py-1.5 drop-shadow-lg">
          <MdMore className="h-6 w-6 fill-yellow-900" />
          <span>More</span>
        </div>
      </section>
      {/* PUBLICATIONS CONTAINER */}
      <section className="w-full bg-slate-200 pt-2 shadow-inner">
        {publications.map((publication, index) => (
          <article
            key={index}
            className="mb-3 flex flex-col border bg-white drop-shadow border-t-gray-300 border-t-2"
          >
            <div className="flex w-full flex-row p-4 pb-4">
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
            </div>
            {publication.description ? (
              <div className="text-pretty px-4 pb-2">
                <span className="font-medium text-gray-900">
                  {publication.description}
                </span>
              </div>
            ) : null}
            {/* Image Out liner */}
            <div className="mx-4 h-3 border-x-2 border-t-2 " />

            {/* Publication Images */}
            <div
              className={`grid  ${
                publication.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
              }`}
            >
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
            {/* Image Out liner */}
            <div className="mx-4 h-3 border-x-2 border-b-2 " />

            <div className="flex flex-row"></div>
            <div className="flex flex-row justify-between px-4 py-2">
            {/*  TODO */}
            </div>
            <div className="flex justify-evenly flex-nowrap gap-4 w-full border-t-2 border-t-slate-300 py-3 text-center font-semibold">
              <div className="flex flex-row flex-nowrap gap-1">
                <div
                  className="hover:cursor-pointer"
                  onClick={(event) => handleLike(event, publication.id, index)}
                >
                  {publication.liked_by_user ? (
                    <FaHeart className="h-5 w-5 fill-red-600" />
                  ) : (
                    <FaRegHeart className="h-5 w-5" />
                  )}
                </div>
                <span>Like</span>
              </div>
              <div className="flex flex-row flex-nowrap gap-1">
                <FaCommentDots className="h-5 w-5 fill-gray-600" />
                <span>Comment</span>
              </div>
              <div className="flex flex-row flex-nowrap gap-1">
                <BiSend className="w-5 h-5" />
                <span>Send</span>
              </div>
              <div className="flex flex-row flex-nowrap gap-1 ">
                <FaRegShareFromSquare className="w-5 h-5" />
                <span>Share</span>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
};

export default Feed;
