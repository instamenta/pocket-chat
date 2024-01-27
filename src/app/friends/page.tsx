'use client';

import React from 'react';
import { REST } from '@/variables';
import { I_UserSchema, T_FriendRequestData } from '@/types';
import { initRequest } from '@/lib';
import Navbar from '@/components/Navbar';

// TODO ADD MUTUAL FRIENDS

const Discover = () => {
  const [userList, setUserList] = React.useState<I_UserSchema[]>([]);
  const [requests, setRequests] = React.useState<T_FriendRequestData[]>([]);

  React.useEffect(() => {
    fetch(REST.LIST_FRIEND_RECOMMENDATIONS, initRequest({ auth: true }))
      .then(async (response: Response) => {
        if (!response.ok) {
          return console.log('HTTP ERROR', response.status, response);
        }
        setUserList(await response.json());
      });

    fetch(REST.LIST_FRIEND_REQUESTS, initRequest({ auth: true }))
      .then(async (response: Response) => {
        if (!response.ok) {
          return console.log('HTTP ERROR', response.status, response);
        }
        setRequests(await response.json());
      });
  }, []);

  const handleCancelFriendRequest = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    event.preventDefault();
    const response = await fetch(
      REST.DELETE_FRIEND_REQUEST(id),
      initRequest({ method: 'DELETE', auth: true })
    );

    if (!response || !response.ok) {
      return console.error(`Failed to send request Status: ${response?.status}`, response);
    }
  };

  const handleSendFriendRequest = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    event.preventDefault();
    const response = await fetch(
      REST.SEND_FRIEND_REQUEST(id),
      initRequest({ method: 'POST', auth: true })
    );

    if (!response || !response.ok) {
      return console.error(`Failed to send request Status: ${response?.status}`, response);
    }
  };

  return (<>
      <Navbar />
      <article className="bg-gray-100">

        <div className="mt-2 w-full border-b-2 border-t-2 border-gray-300 shadow-2xl ">
          <h1 className="px-8 text-3xl font-extrabold text-gray-500">
            Requests Sent
          </h1>
        </div>
        <section className="grid grid-cols-2 gap-3 px-8 pt-8">
          {requests
            .filter(({ request_type }) => request_type === 'sent')
            .map((user, index) => (
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
                  <h3 className="font-medium">{user.first_name + ' ' + user.last_name}</h3>
                  <span className="text-xs font-light italic text-slate-500">{'@' + user.username}</span>
                </div>
                <div className="rounded-b-xl border-x-2 border-b-2 border-gray-300 p-4 font-medium ">
                  <button
                    className="mb-1 w-full border-2 bg-white py-1 text-slate-500 shadow-inner shadow-gray-500 transition-all
                             hover:border-slate-400 hover:bg-slate-100 hover:text-black"
                    onClick={(event) => handleCancelFriendRequest(event, user.id)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          {!requests.filter(({ request_type }) => request_type === 'sent')
            .length ? (
            <div className="col-span-2 flex w-full pb-8">
              <h2 className="m-auto text-center text-3xl font-light text-slate-500">
                ( Empty )
              </h2>
            </div>
          ) : (
            <></>
          )}
        </section>

        <div className="mt-2 w-full border-b-2 border-t-2 border-gray-300 shadow-2xl ">
          <h1 className="px-8 text-3xl font-extrabold text-gray-500">
            Friend Requests
          </h1>
        </div>
        <section className="grid grid-cols-2 gap-3 px-8 pt-8">
          {requests
            .filter(({ request_type }) => request_type === 'received')
            .map((user, index) => (
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
                    className="mb-1 w-full border-2 bg-white py-1 text-slate-500 shadow-inner shadow-gray-500 transition-all
                               hover:border-slate-400 hover:bg-slate-100 hover:text-black"
                    onClick={(event) => handleSendFriendRequest(event, user.id)}
                  >
                    Send Request
                  </button>
                  <button
                    className="w-full border-2 bg-gray-400 py-1 text-white shadow-inner shadow-gray-500 transition-all
                               hover:border-slate-400 hover:bg-slate-100 hover:text-black"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          {!requests.filter(
            ({ request_type }) => request_type === 'received'
          ).length ? (
            <div className="col-span-2 flex w-full pb-8">
              <h2 className="m-auto text-center text-3xl font-light text-slate-500">
                ( Empty )
              </h2>
            </div>
          ) : (
            <></>
          )}
        </section>

        <div className="mt-2 w-full border-b-2 border-t-2 border-gray-300 shadow-2xl ">
          <h1 className="px-8 text-3xl font-extrabold text-gray-500">
            Discover people
          </h1>
        </div>
        <section className="grid grid-cols-2 gap-3 px-8 pt-8">
          {userList.map((user, index) => (
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
                  className="mb-1 w-full border-2 bg-white py-1 text-slate-500 shadow-inner shadow-gray-500 transition-all
                               hover:border-slate-400 hover:bg-slate-100 hover:text-black"
                  onClick={(event) => handleSendFriendRequest(event, user.id)}
                >
                  Send Request
                </button>
                <button
                  className="w-full border-2 bg-gray-400 py-1 text-white shadow-inner shadow-gray-500 transition-all
                               hover:border-slate-400 hover:bg-slate-100 hover:text-black"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          {!userList.length ? (
            <div className="col-span-2 flex w-full pb-8">
              <h2 className="m-auto text-center text-3xl font-light text-slate-500">
                ( Empty )
              </h2>
            </div>
          ) : (
            <></>
          )}
        </section>
      </article>
    </>
  );
};

export default Discover;
