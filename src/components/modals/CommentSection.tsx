import React, { useEffect, useRef, useState } from 'react';
import { I_ShortPopulated, T_PopulatedComment } from '@/lib/types';
import { createShortComment, deleteShortComment, likeShortComment, listCommentsByShort } from '@/lib/queries/short';
import { FaRegHeart, FaRegTrashAlt } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';
import { MdReport } from 'react-icons/md';
import { useUserContext } from '@/lib/context/UserContext';

export function CommentSection(
  { short, onClose, visibility, shortIndex, setShortsList }
    : {
    short: I_ShortPopulated
    visibility: 'hidden' | 'visible';
    onClose: () => void;
    shortIndex: number | string
    setShortsList: React.Dispatch<React.SetStateAction<I_ShortPopulated[]>>,
  }
) {
  const { user } = useUserContext();

  const [comments, setComments] = useState<T_PopulatedComment[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  const commentsContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (visibility === 'hidden') return;
    listCommentsByShort(short.id).then(setComments);
  }, [visibility, shortIndex]);

  useEffect(() => {
    if (visibility === 'visible' && commentsContainerRef?.current)
    {
      const { current: container } = commentsContainerRef;
      //? Scroll to the bottom of the comment section
      container.scrollTop = container.scrollHeight;
    }
  }, [comments, visibility]);


  const handleLikeComment = (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    commentId: string
  ) => {
    event.preventDefault();
    const index = comments.findIndex((comment) => comment.id === commentId);

    likeShortComment(commentId).then((status) => {
      if (!status) {
        return console.log('Failed to like or dislike comment');
      }
      setComments((currentComments) => {
        const updatedComments = [...currentComments];
        const newComment = { ...updatedComments[index] };

        newComment.liked_by_user = !newComment.liked_by_user;
        newComment.liked_by_user ? newComment.likes_count++ : newComment.likes_count--;

        updatedComments[index] = newComment;
        return updatedComments;
      });
    });
  };

  // const handleSendFriendRequest = (id: string) => {
  //   sendFriendRequest(id).then();
  // };

  const handleComment = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (!newComment.trim()) {
      return console.log('Empty comment');
    }
    const createdComment = await createShortComment(
      short.id, {
        userId: user.id,
        content: newComment
      }
    );
    if (!createdComment) return console.log('No Comment');

    setComments((currentComments) => [
      ...currentComments,
      {
        ...createdComment,
        liked_by_user: false,
        username: user.username,
        picture: user.picture,
        first_name: user.first_name,
        last_name: user.last_name,
        likes_count: 0
      }
    ]);

    setShortsList((currentShorts) => {
      const updatedShorts = [...currentShorts];

      const newShort = { ...updatedShorts[+shortIndex] };
      newShort.comments_count++;
      updatedShorts[+shortIndex] = newShort;

      return updatedShorts;
    });

    setNewComment('');
  };

  const handleDeleteComment = (commentId: string) => {
    deleteShortComment(commentId).then((success) => {
      if (!success) return console.error('Failed to delete Comment', commentId);

      setComments((prev) => prev.filter((c) => c.id !== commentId));

      setShortsList((currentShorts) => {
        const updatedShorts = [...currentShorts];
        const newShort = { ...updatedShorts[+shortIndex] };

        newShort.comments_count--;
        updatedShorts[+shortIndex] = newShort;

        return updatedShorts;
      });
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
    <section
      className={`fixed top-0 left-0 h-screen w-screen bg-white bg-opacity-30 flex justify-center align-middle ${
        visibility === 'visible' ? 'block' : 'hidden'
      }`}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="fixed bottom-0 bg-slate-200 text-black w-full lg:max-w-[1024px] h-[60vh] justify-end flex flex-col">

        <section
          className="flex flex-col gap-4 scrollbar-xs scroll-smooth border-y px-4 py-2 overflow-y-scroll"
          ref={commentsContainerRef}
        >
          {/* TODO Pagination */}
          {comments.length === 100 ? (
            <div className="w-full text-center text-slate-500">
              Load more...
            </div>
          ) : null}

          {/* Comments */}
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
                                  className="flex content-center cursor-pointer justify-start gap-1 pb-1 text-sm"
                                  onClick={() => handleDeleteComment(comment.id)}
                                >
                                  <FaRegTrashAlt className="my-auto" />
                                  <span>Delete</span>
                                </li>
                                <li className="flex content-center cursor-pointer justify-start gap-1 pt-1 text-sm">
                                  <CiEdit className="my-auto size-4" />
                                  <span>Edit</span>
                                </li>
                              </>
                            ) : (
                              <>
                                <li className="flex content-center cursor-pointer justify-start gap-1 pb-1 text-sm">
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
                      onClick={(event) => handleLikeComment(event, comment.id)}
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

        <form className="pb-5">
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
              onChange={(event) => setNewComment(() => event.target.value)}
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
    </section>
  );
}