'use client';

import React from 'react';
import { useUserContext } from '@/lib/context/UserContext';
import useUser from '@/lib/store';
import * as Actions from '@/lib/actions/actions';
import Link from 'next/link';
import { CgProfile } from 'react-icons/cg';
import { BsDoorOpen, BsSend } from 'react-icons/bs';
import { PiUsersBold } from 'react-icons/pi';

const DropdownMenu: React.FC = () => {
  const { user } = useUserContext();
  const [toggle, setToggle] = React.useState<boolean>(false);

  const handleSignOut = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    useUser.getState().logout();
    Actions.remoteAuthToken().then();
  };

  const toggleDropdown = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setToggle((prev) => !prev);
  };

  return (
    <>
      <button
        id="dropdownAvatarNameButton"
        data-dropdown-toggle="dropdownAvatarName"
        className="flex items-center rounded-full text-sm font-medium text-gray-900
            hover:text-blue-600 focus:ring-4 focus:ring-gray-100"
        type="button"
        onClick={toggleDropdown}
      >
        <img
          className="size-10 rounded-full"
          src={user.picture ?? ''}
          alt="avatar"
        />
      </button>
      <div
        id="dropdownAvatarName"
        className={`absolute z-50 w-40 divide-y divide-gray-100 rounded-lg border-t bg-white shadow drop-shadow-2xl ${
          !toggle ? 'hidden' : ''
        }`}
        style={{ top: '65px', right: '15px' }}
      >
        <div className="px-4 py-3 text-sm text-gray-900">
          <div className="truncate">
            Hi, <strong>{user.first_name}</strong>
          </div>
        </div>
        <ul
          className="py-2 text-sm text-gray-700"
          aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
        >
          <li className="odd:bg-slate-100">
            <Link
              href="/profile"
              className="flex gap-2 px-4 py-2 text-left transition-all hover:bg-gray-100 hover:text-gray-900 hover:underline "
            >
              <CgProfile className="size-5" />
              <strong>Profile</strong>
            </Link>
          </li>
          <li className="odd:bg-slate-100">
            <Link
              href="/chat"
              className="flex gap-2 px-4 py-2 text-left transition-all hover:bg-gray-100 hover:text-gray-900 hover:underline "
            >
              <BsSend className="size-5" />
              <strong>Chat</strong>
            </Link>
          </li>
          <li className="odd:bg-slate-100">
            <Link
              href="/friends"
              className="flex gap-2 px-4 py-2 text-left transition-all hover:bg-gray-100 hover:text-gray-900 hover:underline "
            >
              <PiUsersBold className="size-5" />
              <strong>Discover</strong>
            </Link>
          </li>
        </ul>
        <button
          onClick={handleSignOut}
          className="flex w-full gap-2 border-y  px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 hover:font-bold "
        >
          <BsDoorOpen className="size-5" />
          <span>Sign out</span>
        </button>
      </div>
    </>
  );
};

export default DropdownMenu;