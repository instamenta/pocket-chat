'use client';

import React from 'react';
import Link from 'next/link';
import { CiLogin } from 'react-icons/ci';
import Image from 'next/image';

const HomePageNavbar = () => {
  return (
    <nav className="border-b-cyan-700 bg-white p-4 shadow-md transition-all hover:bg-slate-100">
      {/* border-b-4 hover:border-b-8 */}
      <div className="container mx-auto flex items-center justify-between">
        {/* LOGO/NAME PLACE HOLDER */}
        <Link
          href="/"
          className="flex gap-2 text-2xl font-bold text-blue-600 transition-transform hover:translate-x-4 hover:scale-125"
        >
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Flowbite Logo"
            width={32}
            height={32}
          />
          Pocket Chat
        </Link>
        <div className="flex flex-row items-center space-x-4 text-gray-700">
          <Link
            href="/auth"
            className="flex text-lg font-semibold hover:text-black hover:underline"
          >
            <span>Sign</span>
            <CiLogin className="h-7 w-7" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default HomePageNavbar;
