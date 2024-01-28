'use client';

import React from 'react';
import { extractAuthToken } from '@/lib';
import * as Actions from '../lib/actions/actions';
import Link from 'next/link';

const Navbar = () => {
  const [cookie, setCookie] = React.useState<string | null>(null);

  React.useEffect(() => {
    const data = extractAuthToken();
    if (data) setCookie(data);
  }, []);

  const handleLogout = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
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
          {cookie ? (
            <>
              <a href="/chat" className="hover:text-black hover:underline">
                Chat
              </a>
              <button
                onClick={handleLogout}
                className="hover:text-black hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a
                href="/auth/sign-in"
                className="hover:text-black hover:underline"
              >
                Sign In
              </a>
              <a
                href="/auth/sign-up"
                className="hover:text-black hover:underline"
              >
                Sign Up
              </a>
            </>
          )}

          {/* AUTH ACTION BUTTON */}
          <div
            className={`h-9 w-9 rounded-full shadow-lg shadow-gray-400 ${
              cookie ? 'bg-green-500' : 'bg-red-500'
            }`}
          ></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
