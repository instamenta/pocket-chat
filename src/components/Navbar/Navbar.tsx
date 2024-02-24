'use client';

import React from 'react';
import Link from 'next/link';

import NotificationsBell from '@/components/Navbar/NotificationsBell';
import Image from 'next/image';
import DropdownMenu from '@/components/Navbar/DropdownMenu';

const Navbar = () => {
  return (
    <nav className="border-b-cyan-700 bg-white px-4 py-2 shadow-md transition-all hover:bg-slate-100">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/feed/"
          className="flex gap-2 text-xl font-bold text-blue-600 transition-transform hover:translate-x-4 hover:scale-125"
        >
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Flowbite Logo"
            width={26}
            height={26}
          />
          Pocket Chat
        </Link>
        {/* Main Navigation */}
        <div className="flex flex-row items-center space-x-4 text-gray-800">
          <div className="flex flex-row content-center justify-center align-middle">
            {/* Notifications */}
            <NotificationsBell />

            {/* Chat */}
            <Link
              href="/chat"
              className="mx-2 my-auto flex h-full justify-center rounded-full bg-blue-100 align-middle"
            ></Link>

            {/* Dropdown */}
            <DropdownMenu />
          </div>

          {/* User Data and Dropdown */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
