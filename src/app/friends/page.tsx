'use server';

import React from 'react';
import {
  acceptFriendRequest,
  declineFriendRequest,
  deleteFriendRequest,
  listFriendRecommendations,
  listFriendRequestsOnly,
  listFriendSentOnly,
  sendFriendRequest
} from '@/lib/queries/friend';
import FriendSection from '@/components/micros/FriendSection';

// TODO ADD MUTUAL FRIENDS

const Discover = async () => {

  const friendRequestsRecieved = await listFriendRequestsOnly();
  const friendRequestsSent = await listFriendSentOnly();
  const friendRecommendations = await listFriendRecommendations();

  console.log(friendRequestsRecieved);
  console.log(friendRequestsSent);
  console.log(friendRecommendations);
  //
  // const handleCancelFriendRequest = async (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  //   id: string
  // ) => {
  //   event.preventDefault();
  //   await deleteFriendRequest(id);
  // };
  //
  // const handleSendFriendRequest = async (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  //   id: string
  // ) => {
  //   event.preventDefault();
  //   await sendFriendRequest(id);
  // };
  //
  // const handleAcceptFriendRequest = async (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  //   id: string
  // ) => {
  //   event.preventDefault();
  //   await acceptFriendRequest(id);
  // };
  //
  // const handleDeclineFriendRequest = async (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  //   id: string
  // ) => {
  //   event.preventDefault();
  //   await declineFriendRequest(id);
  // };

  return (
    <article className="bg-gray-100">
      <FriendSection list={[]} header={'Friend Requests'} />
      <FriendSection list={[]} header={'Requests Sent'} />
      <FriendSection list={[]} header={'Discover people'} />
    </article>
  );
};

export default Discover;
