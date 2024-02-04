'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { listFriendsByUserId } from '@/lib/queries/friend';
import { I_UserSchema } from '@/lib/types';
import useUser, { emptyUser } from '@/lib/store';

export default function Chat() {
  const [flash, setFlash] = React.useState(false);
  const [userList, setUserList] = React.useState<I_UserSchema[]>([]);
  const [user, setUser] = React.useState<I_UserSchema>(emptyUser);

  const handleClick = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 400);
  };

  React.useEffect(() => {
    useUser
      .getState()
      .getUser()
      .then((user) => setUser(user ?? emptyUser));
    listFriendsByUserId(user!.id).then((data) => {
      setUserList(data);
      console.log(userList);
    });
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
      {/* Searchbar */}
      <div className="w-full px-6 py-1">
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
      <section className="bg-gray-white scrollbar-sm flex w-full flex-row overflow-x-auto border-b-2 px-5 py-3">
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
      <section className="scrollbar-xs max-h-[calc(100vh-257px)] w-full overflow-y-auto bg-white pt-4">
        {/* Chat Box */}
        {[
          {
            fullName: 'Smith Richardson',
            lastMessage: 'We should meet up soon',
            time: '5:30 PM',
            missedCount: 0,
          },
          {
            fullName: 'John Doe',
            lastMessage: 'How are you doing?',
            time: '3:45 PM',
            missedCount: 3,
          },
          {
            fullName: 'Alice Johnson',
            lastMessage: 'Great news!',
            time: '1:20 PM',
            missedCount: 10,
          },
          {
            fullName: 'Bob Smith',
            lastMessage: 'Where are you?',
            time: '10:15 AM',
            missedCount: 3,
          },
          {
            fullName: 'Emily White',
            lastMessage: 'Happy birthday!',
            time: '8:00 AM',
            missedCount: 1,
          },
          {
            fullName: 'David Brown',
            lastMessage: 'Let\'s grab lunch',
            time: '6:30 AM',
            missedCount: 2,
          },
          {
            fullName: 'Sophia Taylor',
            lastMessage: 'Thank you!',
            time: 'Yesterday',
            missedCount: 0,
          },
          {
            fullName: 'Michael Wilson',
            lastMessage: 'Check this out',
            time: '2 days ago',
            missedCount: 0,
          },
          {
            fullName: 'Olivia Martin',
            lastMessage: 'I\'m on my way',
            time: '3 days ago',
            missedCount: 4,
          },
          {
            fullName: 'James Anderson',
            lastMessage: 'Don\'t forget',
            time: '4 days ago',
            missedCount: 0,
          },
          {
            fullName: 'Emma Harris',
            lastMessage: 'See you later',
            time: '5 days ago',
            missedCount: 0,
          },
          {
            fullName: 'William Clark',
            lastMessage: 'It\'s urgent',
            time: '1 week ago',
            missedCount: 0,
          },
          {
            fullName: 'Ava Lewis',
            lastMessage: 'Missed your call',
            time: '2 weeks ago',
            missedCount: 1,
          },
          {
            fullName: 'Ethan Turner',
            lastMessage: 'Happy holidays!',
            time: '3 weeks ago',
            missedCount: 4,
          },
          {
            fullName: 'Mia Adams',
            lastMessage: 'Let\'s plan something',
            time: '4 weeks ago',
            missedCount: 0,
          },
        ].map((item, index) => (
          <div className="flex w-full px-5 py-3" key={index}>
            <div className="aspect-square h-16 rounded-full border-2 border-white bg-blue-500 outline outline-blue-500" />
            <div className="ml-4 h-full w-full pt-2">
              <label className="font-mono text-lg capitalize">
                {item.fullName}
              </label>
              <p
                className={`text-sm ${
                  item.missedCount
                    ? 'font-normal text-gray-500'
                    : 'font-medium text-gray-800'
                }`}
              >
                {item.lastMessage}
              </p>
            </div>
            <div className="w-24 pt-3">
              <p className="w-full text-nowrap text-right text-xs font-light">
                {item.time}
              </p>
              <p
                className={`font-ling w-full text-nowrap pt-2 text-right ${
                  item.missedCount <= 4 ? 'text-blue-500' : 'text-blue-300'
                }`}
              >
                {!item.missedCount
                  ? ''
                  : item.missedCount <= 4
                    ? `${' * '.repeat(item.missedCount)}`
                    : `${item.missedCount}*`}
              </p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
