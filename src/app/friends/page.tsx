'use client';

import React from 'react';
import {
  acceptFriendRequest,
  declineFriendRequest,
  deleteFriendRequest,
  listFriendRecommendations,
  listFriendRequestsOnly,
  listFriendSentOnly,
  sendFriendRequest,
  T_friendRequestLists
} from '@/lib/queries/friend';

// TODO ADD MUTUAL FRIENDS

const Discover = () => {
  const [sent, setSent] = React.useState<T_friendRequestLists[]>([]);
  const [received, setReceived] = React.useState<T_friendRequestLists[]>([]);
  const [recommendations, setRecommendations] = React.useState<
    T_friendRequestLists[]
  >([]);

  React.useEffect(() => {
    Promise.all([
      listFriendRequestsOnly(),
      listFriendSentOnly(),
      listFriendRecommendations()
    ]).then(
      ([friendRequestsReceived, friendRequestsSent, friendRecommendations]) => {
        setSent(friendRequestsSent);
        setReceived(friendRequestsReceived);
        setRecommendations(friendRecommendations);
      }
    );
  }, []);

  //* Received
  const handleAcceptFriendRequest = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
    index: number
  ) => {
    event.preventDefault();
    await acceptFriendRequest(id);
    recommendations.push(received[index]);
    received.splice(index, 1);
    setReceived([...received]);
    setRecommendations([...recommendations]);
  };

  const handleDeclineFriendRequest = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
    index: number
  ) => {
    event.preventDefault();
    await declineFriendRequest(id);
    recommendations.push(received[index]);
    received.splice(index, 1);
    setReceived([...received]);
    setRecommendations([...recommendations]);
  };

  //* Sent
  const handleCancelFriendRequest = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
    index: number
  ) => {
    event.preventDefault();
    await deleteFriendRequest(id);
    recommendations.push(sent[index]);
    sent.splice(index, 1);
    setSent([...sent]);
    setRecommendations([...recommendations]);
  };

  //* Recommendations
  const handleSendFriendRequest = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
    index: number
  ) => {
    event.preventDefault();
    await sendFriendRequest(id);
    sent.push(recommendations[index]);
    recommendations.splice(index, 1);
    setSent([...sent]);
    setRecommendations([...recommendations]);
  };

  return (
    <>
      {/* HEADER */}
      <div className="mt-2 w-full border-b-2 border-t-2 border-gray-300 shadow-2xl ">
        <h1 className="px-8 text-3xl font-extrabold text-gray-500">
          Friend Requests
        </h1>
      </div>

      {/* GRID CONTAINER */}
      <section className="grid grid-cols-2 gap-5 pb-8 px-8 pt-8">
        {/* CARDS */}
        {received.map((user, index) => (
          <div
            key={index}
            className="mb-2 flex flex-col overflow-hidden  transition-all hover:drop-shadow-2xl hover:scale-105"
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
                onClick={(event) =>
                  handleAcceptFriendRequest(event, user.id, index)
                }
                className="mb-1 w-full border-2 bg-white py-1 text-slate-500 shadow-inner shadow-gray-500 transition-all
                   hover:border-slate-400 hover:bg-slate-100 hover:text-black"
              >
                Accept
              </button>
              <button
                onClick={(event) =>
                  handleDeclineFriendRequest(event, user.id, index)
                }
                className="w-full border-2 bg-gray-400 py-1 text-white shadow-inner shadow-gray-500 transition-all
                   hover:border-slate-400 hover:bg-slate-100 hover:text-black"
              >
                Decline
              </button>
            </div>
          </div>
        ))}

        {/* EMPTY MESSAGE */}
        {!received.length ? (
          <div className="col-span-2 flex w-full pb-8">
            <h2 className="m-auto text-center text-3xl font-light text-slate-500">
              ( Empty )
            </h2>
          </div>
        ) : null}
      </section>

      {/* HEADER */}
      <div className="mt-2 w-full border-b-2 border-t-2 border-gray-300 shadow-2xl ">
        <h1 className="px-8 text-3xl font-extrabold text-gray-500">
          Requests Sent
        </h1>
      </div>

      {/* GRID CONTAINER */}
      <section className="grid grid-cols-2 gap-5 px-8 pb-8 pt-8">
        {/* CARDS */}
        {sent.map((user, index) => (
          <div
            key={index}
            className="mb-2 flex flex-col overflow-hidden rounded-xl shadow-xl transition-all hover:drop-shadow-2xl hover:scale-105"
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
                onClick={(event) =>
                  handleCancelFriendRequest(event, user.id, index)
                }
                className="w-full border-2 bg-gray-400 py-1 text-white shadow-inner shadow-gray-500 transition-all
                 hover:border-slate-400 hover:bg-slate-100 hover:text-black"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}

        {/* EMPTY MESSAGE */}
        {!sent.length ? (
          <div className="col-span-2 flex w-full pb-8">
            <h2 className="m-auto text-center text-3xl font-light text-slate-500">
              ( Empty )
            </h2>
          </div>
        ) : null}
      </section>

      {/* HEADER */}
      <div className="mt-2 w-full border-b-2 border-t-2 border-gray-300 shadow-2xl ">
        <h1 className="px-8 text-3xl font-extrabold text-gray-500">
          Discover People
        </h1>
      </div>

      {/* GRID CONTAINER */}
      <section className="grid grid-cols-2 gap-5 pb-8 px-8 pt-8">
        {/* CARDS */}
        {recommendations.map((user, index) => (
          <div
            key={index}
            className="mb-2 flex flex-col overflow-hidden rounded-xl shadow-xl transition-all hover:drop-shadow-2xl hover:scale-105"
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
                onClick={(event) =>
                  handleSendFriendRequest(event, user.id, index)
                }
                className="w-full border-2 bg-gray-400 py-1 text-white shadow-inner shadow-gray-500 transition-all
                 hover:border-slate-400 hover:bg-slate-100 hover:text-black"
              >
                Send Request
              </button>
            </div>
          </div>
        ))}

        {/* EMPTY MESSAGE */}
        {!recommendations.length ? (
          <div className="col-span-2 flex w-full pb-8">
            <h2 className="m-auto text-center text-3xl font-light text-slate-500">
              ( Empty )
            </h2>
          </div>
        ) : null}
      </section>
    </>
  );
};

export default Discover;
