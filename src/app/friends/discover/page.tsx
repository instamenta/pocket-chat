'use client';

import React from 'react';
import { REST } from '@/variables';
import { I_UserSchema } from '@/types';
import { extractAuthToken } from '@/lib';

const Discover = () => {

  const [userList, setUserList] = React.useState<I_UserSchema[]>([]);
  const [friendRequests, setFriendRequests] = React.useState({ send: [], received: [] });

  React.useEffect(() => {
    fetch(REST.LIST_USERS)
      .then(async (response: Response) => {
        if (!response.ok) return console.log('HTTP ERROR', response.status, response);
        const data = await response.json();
        console.log(data);
        setUserList(data);
      }).catch(console.error);

    fetch(REST.LIST_FRIEND_REQUESTS)
      .then(async (response: Response) => {
        if (!response.ok) return console.log('HTTP ERROR', response.status, response);
        const data = await response.json();
        console.log(data);
        setFriendRequests(data);
      }).catch(console.error);
    ;
  }, []);


  // TODO ADD MUTUAL FRIENDS

  const handleSendFriendRequest = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    event.preventDefault();

    const authToken = extractAuthToken();
    if (!authToken) throw new Error('Unauthorized');

    const response = await fetch(REST.SEND_FRIEND_REQUEST(id), {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', 'X-Authorization-Token': authToken }
    }).catch(console.error);

    if (!response || !response.ok) {
      return console.error(`Failed to send request Status: ${response?.status}`, response);
    }

    console.log('Successs');
  };

  return (
    <article className="bg-gray-100">
      <div className="mt-2 w-full border-b-2 border-t-2 border-gray-300 shadow-2xl ">
        <h1 className="px-8 font-extrabold text-gray-500 text-3xl">Discover people</h1>
      </div>
      <section className="px-8 pt-8 grid grid-cols-2 gap-3">
        {userList.map((user, index) => (
          <div key={index} className="flex flex-col mb-2 rounded-xl overflow-hidden shadow-xl">
            <div>
              <img src={user.picture} className="w-full aspect-square object-center overflow-hidden" />
            </div>
            <div className="px-4 pt-2 border-x-2 border-gray-300">
              <h3 className="font-medium">
                {user.first_name + ' ' + user.last_name}
              </h3>
              <span className="font-light text-xs text-slate-500 italic">
              {'@' + user.username}
            </span>
            </div>
            <div className="p-4 border-b-2 border-x-2 border-gray-300 font-medium rounded-b-xl ">
              <button className="mb-1 text-slate-500 border-2 bg-white w-full py-1 shadow-inner shadow-gray-500 transition-all
                               hover:border-slate-400 hover:bg-slate-100 hover:text-black"
                      onClick={(event) => handleSendFriendRequest(event, user.id)}
              >
                Send Request
              </button>
              <button className="border-2 bg-gray-400 text-white w-full py-1 shadow-inner shadow-gray-500 transition-all
                               hover:border-slate-400 hover:bg-slate-100 hover:text-black"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </section>

    </article>
  )
    ;
};

export default Discover;