'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { I_Recommendation, I_UserSchema, T_MutualFriend } from '@/lib/types';
import { FaChevronLeft, FaCirclePlus, FaUserPlus } from 'react-icons/fa6';
import { BsGrid3X3 } from 'react-icons/bs';
import { PiVideoLight } from 'react-icons/pi';
import { SiYoutubeshorts } from 'react-icons/si';
import { GoGear } from 'react-icons/go';
import Link from 'next/link';
import { getUserByUsername } from '@/lib/queries/user';
import { FaUserEdit } from 'react-icons/fa';
import { getPublicationsByUserId, getPublicationsCountByUserId } from '@/lib/queries/publication';
import { useUserContext } from '@/lib/context/UserContext';
import PublicationDetails from '@/components/modals/PublicationDetails';
import { getFriendsCountByUserId, listMutualFriendsByUsers } from '@/lib/queries/friend';
import { formatCount } from '@/lib/utilities/formatting';
import Sidebar from '@/components/Sidebar/Sidebar';

const ProfilePage = ({ params: { username } }: { params: { username: string }; }) => {
  const router = useRouter();
  const { user } = useUserContext();

  const [recipient, setRecipient] = useState<I_UserSchema | null>(null);
  const [isUser, setIsUser] = useState<boolean>(false);
  const [publications, setPublications] = useState<I_Recommendation[]>([]);
  const [mutualFriends, setMutualFriends] = useState<T_MutualFriend[]>([]);

  const [stats, setStats] = useState<{
    posts_count: number,
    friends_count: number
  }>({
    posts_count: 0,
    friends_count: 0
  });

  const [selectedPublication, setSelectedPublication] =
    useState<I_Recommendation | null>(null);


  useEffect(() => {
    void (async function initialize() {
      if (!user) return console.log('User not found');

      let recipient: I_UserSchema;
      if (username === user.username) {
        setIsUser(true);
        setRecipient(user);
        recipient = user;
      } else {
        const recipientData = await getUserByUsername(username);
        if (!recipientData) {
          console.error(`Failed to get recipient with username ${username}`);
          throw new Error(`Failed to get recipient with username ${username}`);
        }
        setRecipient(recipientData);
        recipient = recipientData;
      }

      await Promise.all([
        getPublicationsCountByUserId(recipient.id),
        getFriendsCountByUserId(recipient.id),
        getPublicationsByUserId(recipient.id),
        listMutualFriendsByUsers(recipient.id)
      ]).then(([
                 publicationCountData,
                 friendsCountData,
                 publicationData,
                 mutualFriendsData
               ]) => {
        setStats(prev => ({ ...prev, posts_count: publicationCountData?.count ?? 0 }));
        setStats(prev => ({ ...prev, friends_count: friendsCountData?.count ?? 0 }));
        setPublications(publicationData?.filter((e) => e.images.length) ?? []);
        setMutualFriends(mutualFriendsData);
      });
    })();
  }, []);

  const handleOpenPublicationDetails = (publication: I_Recommendation) => {
    setSelectedPublication(publication);
  };

  return (
    <>
      <Sidebar />

      <div className="h-screen bg-white text-black md:mx-auto md:w-[680px] lg:mx-auto lg:w-[1020px]">
        {/* Publication Details Overlay */}
        {selectedPublication && user && (
          <PublicationDetails
            setPublication={setSelectedPublication}
            publication={selectedPublication}
            onClose={() => setSelectedPublication(null)}
            publications={publications}
            setPublications={setPublications}
            user={user}
          />
        )}

        {/* NAVIGATION BAR */}
        <nav className="flex justify-between px-3 pt-3">
          <button
            className="flex justify-center align-middle"
            onClick={(e) => {
              e.preventDefault();
              router.push('/');
            }}
          >
            <FaChevronLeft className="h-6 w-6" />
          </button>

          <div className="m-auto w-full text-center">
            <h1 className="select-none pb-5 text-xl font-medium">{`@${username}`}</h1>
          </div>
          <button className="flex justify-center align-middle">
            <GoGear className="h-7 w-7" />
          </button>
        </nav>
        <div className="mx-4">
          <section className="flex flex-row justify-between pr-8">
            <div
              className="h-24 w-24 overflow-hidden rounded-full border-2 border-white bg-blue-600 outline outline-blue-600">
              <img src={recipient?.picture ?? ''} alt="Profile Picture" />
            </div>
            <div className="flex flex-row justify-center align-middle">
              <div className="flex w-20 flex-col justify-center text-center">
                <span className="font-bold">{formatCount(stats.posts_count)}</span>
                <label className="text-gray-700">Posts</label>
              </div>
              <Link href={`/profile/${username}/friends`}
                    className="flex w-20 flex-col justify-center text-center"
              >
                <span className="font-bold">{formatCount(stats.friends_count)}</span>
                <label className="text-gray-700">Friends</label>
              </Link>
              <div className="flex w-20 flex-col justify-center text-center">
                <span className="font-bold">{formatCount(1300)}</span>
                <label className="text-gray-700">Followers</label>
              </div>
            </div>
          </section>

          <section className="pt-4">
            <h2 className="text-lg font-semibold">
              {recipient?.first_name + ' ' + recipient?.last_name}
            </h2>
            <span className="text-sm font-semibold text-gray-400">
            Programmer
          </span>
            <div className="w-3/4">
              <span style={{ fontSize: '13px' }}>{recipient?.bio ?? ''}</span>
            </div>
          </section>

          <section className="flex flex-row gap-2 pt-4 text-sm">
            <div className="h-6 w-6 rounded-full bg-gray-950"></div>
            <span>
            Friends with {
              mutualFriends.map((data, index) => (
                <>
                  <b key={index}>
                    {data.last_name + data.last_name}
                  </b>
                  {mutualFriends.length !== index ? ',' : ''}
                </>
              ))
            }
              {mutualFriends.length
                ? `and ${stats.friends_count - mutualFriends.length} more`
                : stats.friends_count
              }.
          </span>
          </section>
          <section className="flex flex-row gap-4 py-3.5 font-semibold">
            <button
              className="w-full rounded-md bg-blue-600 text-white outline outline-blue-600 transition-all hover:bg-white hover:text-black hover:outline-2 ">
              {isUser ? 'Edit' : 'Add Friend'}
            </button>
            <button
              className="w-full rounded-md bg-slate-200 font-medium outline outline-slate-200  transition-all hover:bg-white hover:outline-2 hover:outline-blue-600">
              Message
            </button>
            <button
              className="w-full rounded-md bg-slate-200 font-medium outline outline-slate-200  transition-all hover:bg-white hover:outline-2 hover:outline-blue-600">
              Contact
            </button>
            <button
              className="rounded-md bg-blue-600 px-2  outline  outline-blue-600 transition-all hover:bg-white hover:outline-2">
              {isUser ? (
                <FaUserEdit className="h-6 w-6 fill-white hover:fill-black" />
              ) : (
                <FaUserPlus className="h-6 w-6 fill-white hover:fill-black" />
              )}
            </button>
          </section>
        </div>

        {/* Side Scroll */}
        <section className="bg-gray-white scrollbar-sm flex w-full flex-row gap-2.5 overflow-x-auto px-5 py-3">
          {/* Add Story Button */}
          <div className="mr-4 h-14 w-16 flex-none last:mr-0">
            <FaCirclePlus className="flex h-16 w-16 items-center justify-center rounded-full fill-blue-600" />
            <p className="w-12 truncate pt-2 text-center text-xs font-medium capitalize text-gray-600">
              You
            </p>
          </div>

          {/* Side scroll Accounts */}
          <div className="mr-4 flex w-16 flex-none flex-col items-center justify-center last:mr-0">
            <Link href={`/chat/${recipient?.username}`}>
              <div className="h-16 w-16 rounded-full border-2 border-white outline outline-blue-500">
                <img
                  className="aspect-square rounded-full object-center"
                  alt="Profile Pic"
                  src={recipient?.picture}
                />
              </div>
              <p className="w-16 truncate pt-2 text-center text-xs font-medium capitalize text-gray-600">
                {recipient?.first_name + ' ' + recipient?.last_name}
              </p>
            </Link>
          </div>
          <div className="mr-4 flex w-16 flex-none flex-col items-center justify-center last:mr-0">
            <Link href={`/chat/${recipient?.username}`}>
              <div className="h-16 w-16 rounded-full border-2 border-white outline outline-blue-500">
                <img
                  className="aspect-square rounded-full"
                  alt="Profile Pic"
                  src={recipient?.picture}
                />
              </div>
              <p className="w-16 truncate pt-2 text-center text-xs font-medium capitalize text-gray-600">
                {recipient?.first_name + ' ' + recipient?.last_name}
              </p>
            </Link>
          </div>
          <div className="mr-4 flex w-16 flex-none flex-col items-center justify-center last:mr-0">
            <Link href={`/chat/${recipient?.username}`}>
              <div className="h-16 w-16 rounded-full border-2 border-white outline outline-blue-500">
                <img
                  className="aspect-square rounded-full"
                  alt="Profile Pic"
                  src={recipient?.picture}
                />
              </div>
              <p className="w-16 truncate pt-2 text-center text-xs font-medium capitalize text-gray-600">
                {recipient?.first_name + ' ' + recipient?.last_name}
              </p>
            </Link>
          </div>
          <div className="mr-4 flex w-16 flex-none flex-col items-center justify-center last:mr-0">
            <Link href={`/chat/${recipient?.username}`}>
              <div className="h-16 w-16 rounded-full border-2 border-white outline outline-blue-500">
                <img
                  className="aspect-square rounded-full"
                  alt="Profile Pic"
                  src={recipient?.picture}
                />
              </div>
              <p className="w-16 truncate pt-2 text-center text-xs font-medium capitalize text-gray-600">
                {recipient?.first_name + ' ' + recipient?.last_name}
              </p>
            </Link>
          </div>
          <div className="mr-4 flex w-16 flex-none flex-col items-center justify-center last:mr-0">
            <Link href={`/chat/${recipient?.username}`}>
              <div className="h-16 w-16 rounded-full border-2 border-white outline outline-blue-500">
                <img
                  className="aspect-square rounded-full"
                  alt="Profile Pic"
                  src={recipient?.picture}
                />
              </div>
              <p className="w-16 truncate pt-2 text-center text-xs font-medium capitalize text-gray-600">
                {recipient?.first_name + ' ' + recipient?.last_name}
              </p>
            </Link>
          </div>
          <div className="mr-4 flex w-16 flex-none flex-col items-center justify-center last:mr-0">
            <Link href={`/chat/${recipient?.username}`}>
              <div className="h-16 w-16 rounded-full border-2 border-white outline outline-blue-500">
                <img
                  className="aspect-square rounded-full"
                  alt="Profile Pic"
                  src={recipient?.picture}
                />
              </div>
              <p className="w-16 truncate pt-2 text-center text-xs font-medium capitalize text-gray-600">
                {recipient?.first_name + ' ' + recipient?.last_name}
              </p>
            </Link>
          </div>
          <div className="mr-4 flex w-16 flex-none flex-col items-center justify-center last:mr-0">
            <Link href={`/chat/${recipient?.username}`}>
              <div className="h-16 w-16 rounded-full border-2 border-white outline outline-blue-500">
                <img
                  className="aspect-square rounded-full"
                  alt="Profile Pic"
                  src={recipient?.picture}
                />
              </div>
              <p className="w-16 truncate pt-2 text-center text-xs font-medium capitalize text-gray-600">
                {recipient?.first_name + ' ' + recipient?.last_name}
              </p>
            </Link>
          </div>
        </section>
        <section className="flex flex-row">
          <div className="flex w-1/3 justify-center border-b-4 border-slate-600 py-3">
            <BsGrid3X3 className="h-7 w-7" />
          </div>
          <div className="flex w-1/3 justify-center py-3 ">
            <PiVideoLight className="h-7 w-7" />
          </div>
          <div className="flex w-1/3 justify-center py-3 ">
            <SiYoutubeshorts className="h-7 w-7" />
          </div>
        </section>
        {/* Images Section Container*/}
        <section className="grid grid-cols-3 gap-0.5 pt-0.5">
          {publications.map((publication, index) => (
            <img
              onClick={() => handleOpenPublicationDetails(publication)}
              key={index}
              className="aspect-square w-full overflow-hidden object-scale-down"
              src={publication.images[0]}
              alt="Image"
            />
          ))}
          <div className="aspect-square w-full bg-gray-400"></div>
        </section>
      </div>
    </>
  );
};

export default ProfilePage;
