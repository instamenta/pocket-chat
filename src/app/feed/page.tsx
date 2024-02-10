'use client';

import React, { useEffect, useState } from 'react';
import { I_Recommendation } from '@/lib/types';
import Navbar from '@/components/Navbar';
import { getRecommendations, likePublication } from '@/lib/queries/publication';
import { FaCommentDots, FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa6';

const Feed = () => {
  const [publications, setPublications] = useState<I_Recommendation[]>([]);

  useEffect(() => {
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
      <section className="w-full bg-slate-200 pt-4">
        {publications.map((publication, index) => (
          <div
            key={index}
            className=" mb-5 flex flex-col rounded-3xl border bg-white p-4 drop-shadow-xl"
          >
            <div className="flex w-full flex-row pb-4">
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
              <div className="text-pretty pb-4">
                <span className="font-medium text-gray-900">
                  {publication.description}
                </span>
              </div>
            ) : null}

            <div
              className={`grid gap-1 outline outline-1 outline-gray-200 ${
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
            <div className="flex flex-row"></div>
            <div className="flex flex-row justify-between px-4 py-2">
              <div className="flex flex-row">
                <div
                  className="hover:cursor-pointer"
                  onClick={(event) => handleLike(event, publication.id, index)}
                >
                  {publication.liked_by_user ? (
                    <FaHeart className="h-7 w-7 fill-red-600" />
                  ) : (
                    <FaRegHeart className="h-7 w-7" />
                  )}
                </div>
                <div className="ml-2">
                  <span>
                    {publication.likes_count
                      ? `Liked by ${publication.likes_count} users.`
                      : 'Be the first one to like'}
                  </span>
                </div>
              </div>
              <div>
                <FaCommentDots className="h-7 w-7 fill-gray-600" />
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Feed;
