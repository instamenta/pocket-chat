'use client';

import React from 'react';
import Link from 'next/link';
import { CiLogin } from 'react-icons/ci';

const HomePageNavbar = () => {
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
          <Link href="/auth" className="flex hover:text-black font-semibold text-lg hover:underline">
            <span>Sign</span>
            <CiLogin className="w-7 h-7" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default HomePageNavbar;
