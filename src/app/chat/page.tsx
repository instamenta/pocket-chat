'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Link from 'next/link';
import { listFriendsByUserId } from '@/lib/queries/friend';
import { I_UserSchema, T_Conversations } from '@/lib/types';
import { useUserContext } from '@/lib/context/UserContext';
import Sidebar from '@/components/Sidebar/Sidebar';
import { listConversations } from '@/lib/queries/message';
import { timeAgo } from '@/lib/utilities/formatting';

export default function Conversations() {
  const [flash, setFlash] = useState(false);
  const [userList, setUserList] = useState<I_UserSchema[]>([]);
  const [conversations, setConversations] = useState<T_Conversations[]>([]);
  const { user } = useUserContext();

  const handleClick = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 400);
  };

  useEffect(() => {
    Promise.all([listFriendsByUserId(user!.id), listConversations()]).then(
      ([userList, conversations]) => {
        setUserList(userList);
        setConversations(conversations);
      },
    );
  }, []);

  return (
    <>
      {/* Add Friends Action Button*/}
      <Link
        href="/friends/"
        className="fixed bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500"
      >
        {/*<?xml version="1.0" encoding="utf-8"?>*/}
        <svg
          viewBox="0 0 63 70"
          xmlns="http://www.w3.org/2000/svg"
          strokeWidth="3"
          stroke="#000000"
          fill="none"
        >
          <circle cx="29.22" cy="16.28" r="11.14" />
          <path d="M41.32,35.69c-2.69-1.95-8.34-3.25-12.1-3.25h0A22.55,22.55,0,0,0,6.67,55h29.9" />
          <circle cx="45.38" cy="46.92" r="11.94" />
          <line x1="45.98" y1="39.8" x2="45.98" y2="53.8" />
          <line x1="38.98" y1="46.8" x2="52.98" y2="46.8" />
        </svg>
      </Link>

      <Navbar />
      <Sidebar />
      {/* Searchbar */}
      <div className="w-full px-6 py-1 md:mx-auto md:w-[420px] lg:mx-auto lg:w-[520px]">
        <div
          className={`z-20 flex w-full flex-row justify-around rounded-xl border-t border-t-gray-300 bg-blue-50 
        drop-shadow-lg transition-all ${
          flash
            ? 'animate-flash border-1 border-gray-100 shadow-2xl shadow-cyan-300'
            : ''
        }`}
        >
          <input
            className="z-30 m-1 h-full w-full rounded-l-3xl bg-transparent p-2
								 focus:bg-gray-50 focus:bg-transparent focus:outline-0"
          />
          <button
            className={`rounded-r-3xl pr-3 transition-transform ${
              flash ? 'animate-flash scale-110' : ''
            }`}
            onClick={handleClick}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 50 50"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M 21 3 C 11.622998 3 4 10.623005 4 20 C 4 29.376995 11.622998 37 21 37 C 24.712383 37 28.139151 35.791079 30.9375 33.765625 L 44.085938 46.914062 L 46.914062 44.085938 L 33.886719 31.058594 C 36.443536 28.083 38 24.223631 38 20 C 38 10.623005 30.377002 3 21 3 z M 21 5 C 29.296122 5 36 11.703883 36 20 C 36 28.296117 29.296122 35 21 35 C 12.703878 35 6 28.296117 6 20 C 6 11.703883 12.703878 5 21 5 z"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Side Scroll */}
      <section
        className="bg-gray-white scrollbar-sm flex w-full flex-row overflow-x-auto border-b-2 px-5 py-3
      md:mx-auto md:w-[680px] lg:mx-auto lg:w-[1020px]
      "
      >
        {/* Add Story Button */}
        <div className="mr-4 h-12 w-12 flex-none last:mr-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 align-middle">
            <svg
              className="feather feather-plus"
              viewBox="0 0 24 24"
              fill="none"
              width="30"
              height="30"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
          <p className="w-12 truncate pt-2 text-center text-xs font-medium capitalize text-gray-600">
            You
          </p>
        </div>

        {/* Side scroll Accounts */}
        {userList.map((user, index) => (
          <div
            key={index}
            className="mr-4 flex w-14 flex-none flex-col items-center justify-center last:mr-0"
          >
            <Link href={`/chat/${user.username}`}>
              <div className="h-12 w-12 rounded-full border-2 border-white outline outline-blue-500">
                <img
                  className="aspect-square rounded-full"
                  alt="Profile Pic"
                  src={user.picture}
                />
              </div>
              <p className="w-16 truncate pt-2 text-center text-xs font-medium capitalize text-gray-600">
                {user.first_name + ' ' + user.last_name}
              </p>
            </Link>
          </div>
        ))}
      </section>

      {/* Chats Section*/}
      <section
        className="scrollbar-xs max-h-[calc(100vh-257px)] w-full overflow-y-auto bg-white pt-4
      md:mx-auto md:w-[680px] lg:mx-auto lg:w-[1020px]"
      >
        {/* Chat Box */}
        {conversations.map((conversation, index) => (
          <div className="flex w-full px-5 py-3" key={index}>
            <div className="aspect-square h-16 rounded-full border-2 border-white bg-blue-500 outline outline-blue-500">
              <img
                src={conversation.picture}
                alt="user-pic"
                className="h-full w-full rounded-full"
              />
            </div>
            <div className="ml-4 h-full w-full pt-2">
              <label className="font-mono text-lg capitalize">
                {conversation.first_name + ' ' + conversation.last_name}
              </label>
              <p
                className={`text-sm ${
                  index
                    ? 'font-normal text-gray-500'
                    : 'font-medium text-gray-800'
                }`}
              >
                {conversation.last_message}
              </p>
            </div>
            <div className="w-24 pt-3">
              <p className="w-full text-nowrap text-right text-xs font-light">
                {timeAgo(conversation.created_at)}
              </p>
              <p
                className={`font-ling w-full text-nowrap pt-2 text-right ${
                  index <= 4 ? 'text-blue-500' : 'text-blue-300'
                }`}
              >
                {index
                  ? ''
                  : index <= 4
                    ? `${' * '.repeat(index)}`
                    : `${index}*`}
              </p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
