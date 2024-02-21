'use client';

import React, { useState } from 'react';
import * as Actions from '../lib/actions/actions';
import Link from 'next/link';
import useUser from '@/lib/store';
import { useUserContext } from '@/lib/context/UserContext';
import { VscBell, VscBellDot } from 'react-icons/vsc';
import { BsDoorOpen, BsSend, BsSendExclamation } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { PiUsersBold } from 'react-icons/pi';

const Navbar = () => {
  const { user } = useUserContext();
  const [toggle, setToggle] = React.useState<boolean>(false);
  const [hasNotifications, setHasNotifications] = useState<boolean>(false);

  const handleSignOut = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    useUser.getState().logout();
    await Actions.remoteAuthToken();
  };

  const toggleDropdown = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setToggle((prev) => !prev);
  };

  return (
    <nav className="border-b-cyan-700 bg-white px-4 py-2 shadow-md transition-all hover:bg-slate-100">
      {/* border-b-4 hover:border-b-8 */}
      <div className="container mx-auto flex items-center justify-between">
        {/* LOGO/NAME PLACE HOLDER */}
        <Link
          href="/feed/"
          className="flex gap-2 text-2xl font-bold text-blue-600 transition-transform hover:translate-x-4 hover:scale-125"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="size-8"
            alt="Flowbite Logo"
          />
          Pocket Chat
        </Link>
        <div className="flex flex-row items-center space-x-4 text-gray-800">
          <div className="flex flex-row content-center justify-center align-middle">
            {/* Notifications */}
            {hasNotifications ? (
              <VscBellDot className="m-auto size-7 rounded-full  bg-blue-100 transition-all hover:fill-blue-600" />
            ) : (
              <VscBell className="m-auto size-7 rounded-full bg-blue-100 transition-all hover:fill-blue-600" />
            )}

            {/* Chat */}
            <Link
              href="/chat"
              className="mx-2 my-auto flex h-full justify-center rounded-full bg-blue-100 align-middle"
            >
              {hasNotifications ? (
                <BsSendExclamation className="size-7 fill-slate-500 transition-all hover:fill-blue-600" />
              ) : (
                <BsSend className="size-7 fill-slate-500 transition-all hover:fill-blue-600" />
              )}
            </Link>

            {/* Dropdown */}
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
          </div>

          {/* User Data and Dropdown */}
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
