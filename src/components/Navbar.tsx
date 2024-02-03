'use client';

import React from 'react';
import * as Actions from '../lib/actions/actions';
import Link from 'next/link';
import useUser from '@/lib/store';
import { I_UserSchema } from '@/lib/types';

const Navbar = () => {
  const [user, setUser] = React.useState<I_UserSchema | null>(null);
  const [toggle, setToggle] = React.useState<boolean>(false);

  React.useEffect(() => {
    useUser
      .getState()
      .getUser()
      .then((user) => setUser(user));
  }, []);

  const handleSIgnOut = async (
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
    <nav className="mb-3 border-b-cyan-700 bg-white p-4 drop-shadow-xl transition-all  hover:bg-slate-100">
      {/* border-b-4 hover:border-b-8 */}
      <div className="container mx-auto flex items-center justify-between">
        {/* LOGO/NAME PLACE HOLDER */}
        <Link
          href="/"
          className="text-lg font-bold text-cyan-700 transition-transform hover:translate-x-4 hover:scale-125"
        >
          Chatter
        </Link>
        <div className="flex flex-row items-center space-x-4 text-gray-800">
          {/* NAVBAR ITEMS */}
          {user ? (
            <></>
          ) : (
            <>
              <Link
                href="/auth/sign-in"
                className="hover:text-black hover:underline"
              >
                Sign In
              </Link>
              <Link
                href="/auth/sign-up"
                className="hover:text-black hover:underline"
              >
                Sign Up
              </Link>
            </>
          )}

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
            <img
              className="me-2 h-8 w-8 rounded-full"
              src={user?.picture ?? ''}
              alt="avatar"
            />
            Bonnie Green
            <svg
              className="ms-3 h-2.5 w-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {/* User Data and Dropdown */}
          {user ? (
            <div
              id="dropdownAvatarName"
              className={`absolute z-50 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow ${
                !toggle ? 'hidden' : ''
              }`}
              style={{ top: '65px', right: '0' }}
            >
              <div className="px-4 py-3 text-sm text-gray-900">
                <div className="font-medium ">Pro User</div>
                <div className="truncate">@{user.username}</div>
              </div>
              <ul
                className="py-2 text-sm text-gray-700 "
                aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
              >
                <li>
                  <Link
                    href="/chat"
                    className="block px-4 py-2 hover:bg-gray-100 "
                  >
                    Chat
                  </Link>
                </li>
                <li>
                  <Link href="/friends" className="block px-4 py-2 hover:bg-gray-100 ">
                    Discover
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100 ">
                    Earnings
                  </Link>
                </li>
              </ul>
              <div className="py-2">
                <button
                  onClick={handleSIgnOut}
                  className="block w-full bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:font-bold "
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
