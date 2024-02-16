'use client';

import React from 'react';
import * as Actions from '../lib/actions/actions';
import Link from 'next/link';
import useUser from '@/lib/store';
import { BiSolidMessageDetail } from 'react-icons/bi';
import { useUserContext } from '@/lib/context/UserContext';

const Navbar = () => {
  const { user } = useUserContext();
  const [toggle, setToggle] = React.useState<boolean>(false);

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
    <nav className="border-b-cyan-700 bg-white p-4 shadow-md transition-all hover:bg-slate-100">
      {/* border-b-4 hover:border-b-8 */}
      <div className="container mx-auto flex items-center justify-between">
        {/* LOGO/NAME PLACE HOLDER */}
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600 transition-transform hover:translate-x-4 hover:scale-125"
        >
          Chatter
        </Link>
        <div className="flex flex-row items-center space-x-4 text-gray-800">
          {/* NAVBAR ITEMS */}
          <div className="flex flex-row justify-center align-middle">
            {/* AUTH ACTION BUTTON */}
            <button
              id="dropdownAvatarNameButton"
              data-dropdown-toggle="dropdownAvatarName"
              className="flex items-center rounded-full pe-1 text-sm font-medium text-gray-900
            hover:text-blue-600 focus:ring-4 focus:ring-gray-100 md:me-0"
              type="button"
              onClick={toggleDropdown}
            >
              <span className="sr-only">Open user menu</span>
              <span className="text-gray-700">
                {user.username ? `@${user.username}` : ''}
              </span>
            </button>

            <Link
              href="/chat"
              className="mx-2 my-auto flex h-full justify-center rounded-full bg-blue-100 align-middle"
            >
              <BiSolidMessageDetail className="aspect-square h-8 w-8 scale-90 fill-slate-500 transition-all hover:fill-blue-600" />
            </Link>
            <button
              id="dropdownAvatarNameButton"
              data-dropdown-toggle="dropdownAvatarName"
              className="flex items-center rounded-full text-sm font-medium text-gray-900
            hover:text-blue-600 focus:ring-4 focus:ring-gray-100 md:me-0"
              type="button"
              onClick={toggleDropdown}
            >
              <img
                className="ml-2 h-10 w-10 rounded-full"
                src={user.picture ?? ''}
                alt="avatar"
              />
            </button>
          </div>

          {/* User Data and Dropdown */}
          <div
            id="dropdownAvatarName"
            className={`absolute z-50 w-32 divide-y divide-gray-100 rounded-lg bg-white shadow ${
              !toggle ? 'hidden' : ''
            }`}
            style={{ top: '65px', right: '15px' }}
          >
            <div className="px-4 py-3 text-sm text-gray-900">
              <div className="truncate underline">
                {user.first_name ? `Hi, ${user.first_name}` : ''}
              </div>
            </div>
            <ul
              className="py-2 text-sm text-gray-700"
              aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
            >
              <li>
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-left transition-all hover:bg-gray-100 hover:text-gray-900 hover:underline "
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/chat"
                  className="block px-4 py-2 text-left transition-all hover:bg-gray-100 hover:text-gray-900 hover:underline "
                >
                  Chat
                </Link>
              </li>
              <li>
                <Link
                  href="/friends"
                  className="block px-4 py-2 text-left transition-all hover:bg-gray-100 hover:text-gray-900 hover:underline "
                >
                  Discover
                </Link>
              </li>
            </ul>
            <div className="py-2">
              <button
                onClick={handleSignOut}
                className="block w-full bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:font-bold "
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
