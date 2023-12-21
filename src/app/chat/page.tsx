'use client';

import React from 'react';
import Navbar from '@/components/Navbar';

export default function Chat() {
  const [flash, setFlash] = React.useState(false);

  const handleClick = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 400);
  };

  return (<>
      <Navbar />
      {/* Searchbar */}
      <div className="w-full py-4 px-6">
        <div
          className={`bg-blue-50 w-full drop-shadow-lg border-t-gray-300 border-t rounded-xl flex flex-row justify-around transition-all ${
            flash ? 'border-gray-100 shadow-2xl shadow-cyan-300 animate-flash border-1' : ''
          }`}>
          <input className="w-full h-full bg-transparent m-1 p-2 rounded-l-3xl
														focus:bg-gray-50 focus:outline-0 focus:bg-transparent" />
          <button className={`pr-3 rounded-r-3xl transition-transform ${
            flash ? 'animate-flash scale-110' : ''
          }`} onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 50 50"
            >
              <path
                d="M 21 3 C 11.622998 3 4 10.623005 4 20 C 4 29.376995 11.622998 37 21 37 C 24.712383 37 28.139151 35.791079 30.9375 33.765625 L 44.085938 46.914062 L 46.914062 44.085938 L 33.886719 31.058594 C 36.443536 28.083 38 24.223631 38 20 C 38 10.623005 30.377002 3 21 3 z M 21 5 C 29.296122 5 36 11.703883 36 20 C 36 28.296117 29.296122 35 21 35 C 12.703878 35 6 28.296117 6 20 C 6 11.703883 12.703878 5 21 5 z"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Sidescroll */}
      <section className="w-full bg-gray-white py-3 px-5 flex flex-row overflow-x-auto scrollbar-sm border-b-2">

        {/* Add Story Button */}
        <div className="flex-none w-12 h-12 mr-4 last:mr-0">
          <div className="bg-blue-500 w-12 h-12 rounded-full flex justify-center items-center align-middle">
            <svg xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24"
                 fill="none"
                 stroke="white"
                 strokeWidth="1.8"
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 className="feather feather-plus"
                 width="30"
                 height="30">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
          <p className="w-12 pt-2 text-xs font-medium text-center text-gray-600 truncate capitalize">You</p>
        </div>

        {/* Sidescroll Accounts */}
        {['Tutankamon', 'Samuel', 'Myname', 'Anaastasiq', 'Anatahuan', 'Anatahuan', 'Anatahuan'].map((item, index) => (
          <div className="flex-none mr-4 last:mr-0 w-14 flex flex-col justify-center items-center" key={index}>
            <div className="border-2 border-white outline outline-blue-500 bg-green-400 w-12 h-12 rounded-full" />
            <p className="w-16 pt-2 text-xs font-medium text-center text-gray-600 truncate capitalize">{item}</p>
          </div>
        ))}
      </section>

      {/* Chats Section*/}
      <section className="bg-white pt-4 w-full overflow-y-auto max-h-[calc(100vh-257px)] ">

        {/* Chat Box */}
        {[
          { fullName: 'Smith Richardson', lastMessage: 'We should meet up soon', time: '5:30 PM', missedCount: 0 },
          { fullName: 'John Doe', lastMessage: 'How are you doing?', time: '3:45 PM', missedCount: 3 },
          { fullName: 'Alice Johnson', lastMessage: 'Great news!', time: '1:20 PM', missedCount: 10 },
          { fullName: 'Bob Smith', lastMessage: 'Where are you?', time: '10:15 AM', missedCount: 3 },
          { fullName: 'Emily White', lastMessage: 'Happy birthday!', time: '8:00 AM', missedCount: 1 },
          { fullName: 'David Brown', lastMessage: 'Let\'s grab lunch', time: '6:30 AM', missedCount: 2 },
          { fullName: 'Sophia Taylor', lastMessage: 'Thank you!', time: 'Yesterday', missedCount: 0 },
          { fullName: 'Michael Wilson', lastMessage: 'Check this out', time: '2 days ago', missedCount: 0 },
          { fullName: 'Olivia Martin', lastMessage: 'I\'m on my way', time: '3 days ago', missedCount: 4 },
          { fullName: 'James Anderson', lastMessage: 'Don\'t forget', time: '4 days ago', missedCount: 0 },
          { fullName: 'Emma Harris', lastMessage: 'See you later', time: '5 days ago', missedCount: 0 },
          { fullName: 'William Clark', lastMessage: 'It\'s urgent', time: '1 week ago', missedCount: 0 },
          { fullName: 'Ava Lewis', lastMessage: 'Missed your call', time: '2 weeks ago', missedCount: 1 },
          { fullName: 'Ethan Turner', lastMessage: 'Happy holidays!', time: '3 weeks ago', missedCount: 4 },
          { fullName: 'Mia Adams', lastMessage: 'Let\'s plan something', time: '4 weeks ago', missedCount: 0 }
        ].map((item, index) => (
          <div className="w-full flex px-5 py-3" key={index}>
            <div
              className="rounded-full bg-blue-500 h-16 aspect-square border-2 border-white outline outline-blue-500" />
            <div className="ml-4 w-full h-full pt-2">
              <label className="capitalize text-lg font-mono">{item.fullName}</label>
              <p className={`text-sm ${item.missedCount
                ? 'font-normal text-gray-500'
                : 'font-medium text-gray-800'
              }`}>
                {item.lastMessage}
              </p>
            </div>
            <div className="w-24 pt-3">
              <p className="font-light w-full text-right text-xs text-nowrap">{item.time}</p>
              <p className={`font-ling w-full text-right text-nowrap pt-2 ${
                item.missedCount <= 4 ? 'text-blue-500' : 'text-blue-300'}`
              }>
                {!item.missedCount ? '' : item.missedCount <= 4
                  ? `${' * '.repeat(item.missedCount)}`
                  : `${item.missedCount}*`
                }
              </p>
            </div>
          </div>
        ))}

      </section>
    </>
  );
}
