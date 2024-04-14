'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import { IoCloseCircleOutline } from 'react-icons/io5';
import Link from 'next/link';
import { I_UserSchema } from '@/lib/types';
import { getFriendsCountByUserId, listFriendsByUsername } from '@/lib/queries/friend';
import { useUserContext } from '@/lib/context/UserContext';
import { getUserByUsername } from '@/lib/queries/user';
import { getPublicationsCountByUserId } from '@/lib/queries/publication';

const ProfileFriendsList = ({ params: { username } }: { params: { username: string }; }) => {
    const [friends, setFriends] = useState<I_UserSchema[]>([]);
    const { user } = useUserContext();
    const [recipient, setRecipient] = useState<I_UserSchema | null>();
    const [friendsCount, setFriendsCount] = useState<number>(0);
    const [publicationCount, setPublicationCount] = useState<number>(0);

    useEffect(() => {
      async function initialize() {
        listFriendsByUsername(username).then(setFriends);

        let userData: I_UserSchema | null;
        if (user.username === username) {
          setRecipient(user);
          userData = user;
        } else {
          userData = await getUserByUsername(username) ?? null;
          setRecipient(userData);
        }

        if (!userData) return console.error('Failed to get user data');

        await Promise.all([
          getPublicationsCountByUserId(userData.id),
          getFriendsCountByUserId(userData.id)
        ]).then(([publicationCountData, friendsCountData]) => {
          if (publicationCountData) setPublicationCount(publicationCountData.count);
          if (friendsCountData) setFriendsCount(friendsCountData.count);
        });
      }

      initialize().then()

      ;
    }, []);

    return (
      <>
        <Navbar />
        <Sidebar />
        <section className="px-4 pt-4  lg:mx-auto lg:w-[1020px]">
          <h2 className="text-xl text-slate-700 md:text-2xl">
            <span className="font-semibold">{recipient?.first_name + ' ' + recipient?.last_name}&apos;s</span> friends
          </h2>
          <h3 className="text-lg font-semibold text-slate-400 md:text-xl">
            Quite famous init?
          </h3>
          <div className="w-full mx-auto text-center">
            <span>Total {friendsCount}</span>
          </div>
        </section>
        <section className="mt-6 grid w-full grid-cols-1 gap-5 px-4 lg:mx-auto lg:w-[1020px]">
          {friends.map((friend, index) => (
            <>
              <article
                key={index}
                className="flex w-full flex-col justify-between rounded-xl border border-slate-300 shadow-xl"
              >
                <div className="relative flex w-full flex-col justify-between overflow-hidden shadow-inner">
                  <div className="flex px-8 align-middle pt-4">
                    <img
                      src={friend.picture}
                      className="size-40 overflow-hidden object-scale-down md:size-48 xl:size-52"
                      alt="Group Photo"
                    />

                    <div className="my-auto flex flex-col pl-6 pt-4 md:text-lg">
                      <span className="font-semibold pt-0">{friend.first_name + ' ' + friend.last_name}</span>
                      <div className="w-full pt-1 pb-2 font-light text-slate-700">
                        <p>@{friend.username}</p>
                      </div>

                      <div className="flex flex-col text-nowrap">
                      <span className="text-slate-500">
                         <strong>{friendsCount}</strong> friends
                      </span>
                        <span className="text-slate-500">
                        <strong>{(Math.random() * 100).toFixed(0)}</strong>{' '}
                          publications
                      </span>
                      </div>
                    </div>
                  </div>

                  <IoCloseCircleOutline
                    className="absolute right-1 top-1 size-10 fill-slate-500"
                    style={{ opacity: '30%' }}
                  />
                </div>

                {/* Button */}
                <div className="flex flex-col px-4 pb-4 md:text-lg mt-4">
                  <Link
                    href={`/profile/${friend.username}`}
                    className="w-full rounded-md bg-blue-200 px-8 py-1 text-center font-semibold text-blue-600 shadow-inner "
                  >
                    Add friend
                  </Link>
                </div>
              </article>
              <div className="block border-t border-t-gray-200 md:hidden" />
            </>
          ))}
        </section>
      </>
    );
  }
;

export default ProfileFriendsList;