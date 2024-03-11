import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoHeartHalfOutline } from 'react-icons/io5';
import { FaHeart, FaRegShareFromSquare } from 'react-icons/fa6';
import { FaCommentDots, FaRegHeart } from 'react-icons/fa';
import { BiSend } from 'react-icons/bi';
import { likePublication } from '@/lib/queries/publication';
import { I_Recommendation } from '@/lib/types';
import PublicationDetails from '@/components/modals/PublicationDetails';
import { useUserContext } from '@/lib/context/UserContext';

const PublicationSlider = ({
  dataPromise,
}: {
  dataPromise:  Promise<I_Recommendation[]>;
}) => {
  const { user } = useUserContext();

  const [publications, setPublications] = useState<I_Recommendation[]>([]);
  const [selectedPublication, setSelectedPublication] =
    useState<I_Recommendation | null>(null);

  useEffect(() => {
    dataPromise.then((d) => setPublications(d ?? []));
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
      {/* Publication Details Overlay */}
      {selectedPublication && user && (
        <PublicationDetails
          setPublication={setSelectedPublication}
          publication={selectedPublication}
          onClose={() => setSelectedPublication(null)}
          publications={publications}
          setPublications={setPublications}
          user={user}
        />
      )}

      {publications.map((publication, index) => (
        <article
          key={index}
          className="mb-6 flex flex-col border border-t-2 border-t-gray-300 bg-white drop-shadow"
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
            className={`grid ${
              publication.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
            }`}
          >
            {/* Images */}
            {publication.images
              .slice(0, 4)
              .map((image: string, index: number) => (
                <div key={index} className="overflow-hidden">
                  <img
                    src={image}
                    alt="image"
                    className="object-contain"
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

          <div className="flex w-full flex-nowrap justify-evenly gap-4 border-t-2 border-t-slate-300 py-3 text-center font-semibold">
            <div className="flex flex-row flex-nowrap gap-1">
              {/* Like Publication*/}
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
    </>
  );
};

export default PublicationSlider;
