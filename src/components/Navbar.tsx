'use client';

import React from 'react';
import * as Actions from '../lib/actions/actions';
import Link from 'next/link';
import useUser from '@/lib/store';
import { I_UserSchema } from '@/lib/types';

const Navbar = () => {
  const [user, setUser] = React.useState<I_UserSchema | null>(null);

  React.useEffect(() => {
    setUser(useUser.getState().user);

    console.log(user)
    console.log(user?.picture)
  }, []);

  const handleLogout = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    await Actions.remoteAuthToken();
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
            <>
              <Link href="/chat" className="hover:text-black hover:underline">
                Chat
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-black hover:underline"
              >
                Logout
              </button>
            </>
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
            className="flex items-center rounded-full pe-1 text-sm font-medium text-gray-900 hover:text-blue-600 focus:ring-4 focus:ring-gray-100 md:me-0 dark:text-white dark:hover:text-blue-500 dark:focus:ring-gray-700"
            type="button"
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
              className="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
            >
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div className="font-medium ">Pro User</div>
                <div className="truncate">name@flowbite.com</div>
              </div>
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
              >
                <li>
                  <Link
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Earnings
                  </Link>
                </li>
              </ul>
              <div className="py-2">
                <Link
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Sign out
                </Link>
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
