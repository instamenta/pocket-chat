import React from 'react';
import { T_friendRequestLists } from '@/lib/queries/friend';

type T_props = { index: number, user: T_friendRequestLists };

export const FriendCard = ({ index, user, buttons }: T_props) => {
  return (
    <div
      key={index}
      className="mb-2 flex flex-col overflow-hidden rounded-xl shadow-xl"
    >
      <div>
        <img
          alt="User Picture"
          src={user.picture}
          className="aspect-square w-full overflow-hidden object-center"
        />
      </div>
      <div className="border-x-2 border-gray-300 px-4 pt-2">
        <h3 className="font-medium">
          {user.first_name + ' ' + user.last_name}
        </h3>
        <span className="text-xs font-light italic text-slate-500">
                    {'@' + user.username}
                  </span>
      </div>
      <div className="rounded-b-xl border-x-2 border-b-2 border-gray-300 p-4 font-medium ">

        <button
          onClick={(event) => handleAcceptFriendRequest(event, user.id)}
          className="mb-1 w-full border-2 bg-white py-1 text-slate-500 shadow-inner shadow-gray-500 transition-all
                               hover:border-slate-400 hover:bg-slate-100 hover:text-black"
        >
          Accept
        </button>
        <button
          onClick={(event) => handleDeclineFriendRequest(event, user.id)}
          className="w-full border-2 bg-gray-400 py-1 text-white shadow-inner shadow-gray-500 transition-all
                               hover:border-slate-400 hover:bg-slate-100 hover:text-black"
        >
          Decline
        </button>
      </div>
    </div>
  );
};
