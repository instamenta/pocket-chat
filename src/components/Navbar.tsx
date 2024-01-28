'use client';

import React from 'react';
import * as Actions from '../lib/actions/actions';
import Link from 'next/link';
import useUser from '@/lib/store';

const Navbar = () => {
  const [status, setStatus] = React.useState<boolean>(false);
  const state = useUser.getState().isAuthenticated();

  React.useEffect(() => {

    console.log(useUser.getState().user)
    setStatus(status);
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
          <button
            onClick={handleLogout}
            className="hover:text-black hover:underline"
          >
            Logout
          </button>

          {status ? (
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
              <a href="/auth/sign-in" className="hover:text-black hover:underline">Sign In</a>
              <a href="/auth/sign-up" className="hover:text-black hover:underline">Sign Up</a>
            </>
          )}

          {/* AUTH ACTION BUTTON */}
          <div
            className={`h-9 w-9 rounded-full shadow-lg shadow-gray-400 ${
              status ? 'bg-green-500' : 'bg-red-500'
            }`}
          ></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
