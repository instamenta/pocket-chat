'use server';

import React from 'react';
import { listFriendRecommendations, listFriendRequestsOnly, listFriendSentOnly } from '@/lib/queries/server';
import FriendSection from '@/components/micros/FriendSection';

// TODO ADD MUTUAL FRIENDS

const Discover = async () => {

  const [
    friendRequestsReceived,
    friendRequestsSent,
    friendRecommendations
  ] = await Promise.all([
    listFriendRequestsOnly(),
    listFriendSentOnly(),
    listFriendRecommendations()
  ]);

  // const handleCancelFriendRequest = async (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  //   id: string
  // ) => {
  //   event.preventDefault();
  //   await deleteFriendRequest(id);
  // };
  // const handleSendFriendRequest = async (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  //   id: string
  // ) => {
  //   event.preventDefault();
  //   await sendFriendRequest(id);
  // };
  // const handleAcceptFriendRequest = async (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  //   id: string
  // ) => {
  //   event.preventDefault();
  //   await acceptFriendRequest(id);
  // };
  // const handleDeclineFriendRequest = async (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  //   id: string
  // ) => {
  //   event.preventDefault();
  //   await declineFriendRequest(id);
  // };

  return (
    <article className="bg-gray-100">
      <FriendSection list={friendRequestsReceived} header={'Friend Requests'} />
      <FriendSection list={friendRequestsSent} header={'Requests Sent'} />
      <FriendSection list={friendRecommendations} header={'Discover People'} />
    </article>
  );
};

export default Discover;
