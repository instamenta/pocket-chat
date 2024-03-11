'use client';

import React, { useEffect, useState } from 'react';
import {
  I_Recommendation,
  I_UserSchema,
  T_PopulatedComment,
} from '@/lib/types';
import { IoMdClose } from 'react-icons/io';
import ImageCarousel from '@/components/functional/ImageCarousel';
import { IoHeartHalfOutline, IoPersonAdd } from 'react-icons/io5';
import { FaHeart, FaRegShareFromSquare } from 'react-icons/fa6';
import { FaCommentDots, FaRegHeart, FaRegTrashAlt } from 'react-icons/fa';
import { BiSend } from 'react-icons/bi';
import { likePublication } from '@/lib/queries/publication';
import {
  createComment,
  deleteComment,
  likeComment,
  listCommentsByPublication,
} from '@/lib/queries/comment';
import { sendFriendRequest } from '@/lib/queries/friend';
import { CiEdit } from 'react-icons/ci';
import { MdReport } from 'react-icons/md';

const PublicationDetails = ({
  publication,
  onClose,
  setPublication,
  publications,
  setPublications,
  user,
}: {
  publication: I_Recommendation;
  setPublication: (
    value: React.SetStateAction<I_Recommendation | null>,
  ) => void;
  onClose: () => void;
  publications: I_Recommendation[];
  setPublications: (value: React.SetStateAction<I_Recommendation[]>) => void;
  user: I_UserSchema;
}) => {
  const [comments, setComments] = useState<T_PopulatedComment[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  useEffect(() => {
    console.log(publication);
    listCommentsByPublication(publication.id).then((d) => setComments(d ?? []));
  }, []);

  const handleLikeComment = (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    id: string,
  ) => {
    event.preventDefault();
    const index = comments.findIndex((data) => data.id === id);

    likeComment(id).then((status) => {
      if (!status) {
        return console.log('Failed to like or dislike post');
      }
      setComments((prev) => {
        const updatedComments = [...prev];
        const comm = { ...updatedComments[index] };
        comm.liked_by_user = !comm.liked_by_user;
        comm.liked_by_user ? comm.likes_count++ : comm.likes_count--;
        updatedComments[index] = comm;
        return updatedComments;
      });
    });
  };

  const handleSendFriendRequest = (id: string) => {
    sendFriendRequest(id).then();
  };

  const handleLike = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string,
  ) => {
    event.preventDefault();

    const index = publications.findIndex((data) => data.id === id);

    likePublication(id).then((status) => {
      if (!status) {
        return console.log('Failed to like or dislike post');
      }
      setPublications((prev) => {
        const updatedPublications = [...prev];
        const pub = { ...updatedPublications[index] };
        pub.liked_by_user = !pub.liked_by_user;
        pub.liked_by_user ? pub.likes_count++ : pub.likes_count--;
        updatedPublications[index] = pub;
        setPublication(pub);
        return updatedPublications;
      });
    });
  };

  const handleComment = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    if (!newComment.trim()) {
      return console.log('Empty comment');
    }
    const createdComment = await createComment(publication.id, {
      userId: user.id,
      content: newComment,
    });
    if (!createdComment) return console.log('No Comment');

    setComments((prev) => [
      ...prev,
      {
        ...createdComment,
        liked_by_user: false,
        username: user.username,
        picture: user.picture,
        first_name: user.first_name,
        last_name: user.last_name,
        likes_count: 0,
      },
    ]);
    setNewComment('');
  };

  const handleDeleteComment = (commentId: string) => {
    deleteComment(commentId).then((success) => {
      if (!success) return console.error('Failed to delete Comment');
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    });
  };

  const handleToggleCommentEdit = (index: number) => {
    const newComments = [...comments];
    const target = newComments[index];
    target.edit = target.edit !== true;

    newComments[index] = target;
    setComments(newComments);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40 px-2">
      <div className="relative flex min-h-screen items-center justify-center">
        <div className="mx-auto my-10 w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-lg">
          <button
            onClick={onClose}
            className="rounded-full transition-all hover:scale-110 hover:bg-slate-100 absolute top-12 right-2 z-20"
          >
            <IoMdClose className="h-8 w-8" />
          </button>

          {/* Modal content */}
          <div className="">
            {/* Images */}
            <div className="h-auto w-full bg-slate-300 shadow-inner">
              <ImageCarousel images={publication.images} />
            </div>

            <div className="flex w-full flex-row content-center justify-between border-t p-4">
              <div className="flex gap-3">
                <img
                  src={publication.picture}
                  alt="user-pic"
                  className="h-16 w-16 overflow-hidden rounded-full"
                />
                <div className='my-auto'>
                  <h2 className="text-lg font-bold capitalize">
                    {publication.first_name + ' ' + publication.last_name}
                  </h2>
                  <span className="">@{publication.username}</span>
                </div>
              </div>
              <div className="my-auto">
                {user.id !== publication.publisher_id &&
                !publication.is_friend_with_user ? (
                  <IoPersonAdd
                    className="h-7 w-7"
                    onClick={() =>
                      handleSendFriendRequest(publication.publisher_id)
                    }
                  />
                ) : null}
              </div>
            </div>
            <div className="px-4">
              <p>{publication.description}</p>
            </div>
            <div className="flex w-full justify-between px-4 pb-2 pt-4">
              <div className="flex content-center gap-1">
                <IoHeartHalfOutline className="h-6 w-6" />
                <span>{publication.likes_count}</span>
              </div>
              <div className="flex gap-2">
                <div className="flex gap-2">
                  <span>{publication.comments_count + ' ' + 'comments'}</span> &middot;
                  <span>{24 + ' ' + 'reposts'}</span>
                </div>
              </div>
            </div>

            <div
              className="flex w-full flex-nowrap justify-evenly gap-4 border-t-2 border-t-slate-300 py-3 text-center font-semibold mt-2">
              <div className="flex flex-row flex-nowrap gap-1">
                <div
                  className="hover:cursor-pointer"
                  onClick={(event) => handleLike(event, publication.id)}
                >
                  {publication.liked_by_user ? (
                    <FaHeart className="h-5 w-5 fill-red-600" />
                  ) : (
                    <FaRegHeart className="h-5 w-5" />
                  )}
                </div>
                <span>Like</span>
              </div>
              <label
                htmlFor="comment"
                className="flex flex-row flex-nowrap gap-1"
              >
                <FaCommentDots className="h-5 w-5 fill-gray-600" />
                <span>Comment</span>
              </label>
              <div className="flex flex-row flex-nowrap gap-1">
                <BiSend className="h-5 w-5" />
                <span>Send</span>
              </div>
              <div className="flex flex-row flex-nowrap gap-1 ">
                <FaRegShareFromSquare className="h-5 w-5" />
                <span>Share</span>
              </div>
            </div>
          </div>
          {/* Comment Section */}
          <section className="flex flex-col gap-4 border-y px-4 py-2">
            {comments.length === 100 ? (
              <div className="w-full text-center text-slate-500">
                Load more...
              </div>
            ) : null}
            {comments.map((comment, index) => (
              <div key={index} className="mt-2 flex w-full flex-col">
                <div className="flex w-full flex-row gap-2">
                  <div className="h-10 w-10">
                    <img
                      className="h-10 w-10 overflow-hidden rounded-full"
                      src={comment.picture}
                      alt="profile-pic"
                    />
                  </div>
                  <div className="flex flex-col" style={{ width: '80%' }}>
                    <div className="flex justify-between rounded-r-lg rounded-br-lg bg-gray-100 p-2">
                      <div className="flex flex-col pb-2">
                        <span className="font-semibold capitalize">
                          {comment.first_name + ' ' + comment.last_name}
                        </span>
                        <span className="text-sm text-slate-500">
                          @{comment.username}
                        </span>
                      </div>
                      <div className="relative">
                        <div
                          onClick={() => handleToggleCommentEdit(index)}
                          className="mr-2 cursor-pointer text-lg font-semibold"
                        >
                          ...
                        </div>
                        {comment.edit ? (
                          <div className="absolute -right-5 top-8 ">
                            <ul className="divide-y divide-gray-200 rounded-md bg-white px-2 py-3 drop-shadow-xl">
                              {comment.user_id === user.id ? (
                                <>
                                  <li
                                    className="flex content-center  justify-start gap-1 pb-1 text-sm"
                                    onClick={() =>
                                      handleDeleteComment(comment.id)
                                    }
                                  >
                                    <FaRegTrashAlt className="my-auto" />
                                    <span>Delete</span>
                                  </li>
                                  <li className="flex content-center justify-start gap-1 pt-1 text-sm">
                                    <CiEdit className="my-auto size-4" />
                                    <span>Edit</span>
                                  </li>
                                </>
                              ) : (
                                <>
                                  <li className="flex content-center  justify-start gap-1 pb-1 text-sm">
                                    <MdReport className="my-auto size-5" />
                                    <span>Report</span>
                                  </li>
                                </>
                              )}
                            </ul>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex gap-4 bg-gray-100 px-2 pb-2">
                      <span>{comment.content}</span>
                    </div>

                    {/* Comment Likes and Handler */}
                    <div className="mt-2 flex flex-row content-center gap-2 text-sm text-black">
                      <span>{comment.likes_count}</span>
                      <FaRegHeart
                        onClick={(event) =>
                          handleLikeComment(event, comment.id)
                        }
                        className={`h-4 w-4 ${comment.liked_by_user ? 'fill-red-600' : ''}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {!comments.length ? (
              <div className="flex w-full content-center my-3">
                <span className="my-auto text-center mx-auto">No Comments</span>
              </div>
            ) : null}
          </section>

          <form className='pb-5'>
            <label htmlFor="comment" className="sr-only">
              Your message
            </label>
            <div className="flex items-center rounded-lg bg-gray-50 px-3 py-2 ">
              <button
                type="button"
                className="inline-flex cursor-pointer justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 "
              >
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 18"
                >
                  <path
                    fill="currentColor"
                    d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                  />
                </svg>
                <span className="sr-only">Upload image</span>
              </button>
              <button
                type="button"
                className="cursor-pointer rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              >
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"
                  />
                </svg>
                <span className="sr-only">Add emoji</span>
              </button>
              <textarea
                id="comment"
                rows={1}
                value={newComment}
                onChange={(e) => setNewComment(() => e.target.value)}
                className="mx-4 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 outline-none transition-all focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your message..."
              ></textarea>
              <button
                type="button"
                onClick={handleComment}
                className="inline-flex cursor-pointer justify-center rounded-full p-2 text-blue-600 hover:bg-blue-100"
              >
                <svg
                  className="h-5 w-5 rotate-90 rtl:-rotate-90"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path
                    d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                </svg>
                <span className="sr-only">Send message</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PublicationDetails;
