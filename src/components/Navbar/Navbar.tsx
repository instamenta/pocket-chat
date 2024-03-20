'use client';

import React from 'react';
import Link from 'next/link';

import NotificationsBell from '@/components/Navbar/NotificationsBell';
import Image from 'next/image';
import DropdownMenu from '@/components/Navbar/DropdownMenu';
import PublishDropdown from '@/components/Navbar/PublishDropdown';
import GopherLogo from '../../../public/images/gopher-logo.png';

const Navbar = () => {
  return (
    <nav className="z-20 border-b-cyan-700 bg-white px-4 py-2 shadow-md transition-all">
      <div className="container mx-auto flex items-center justify-between lg:w-[1080px] lg:px-10">
        {/* Logo */}
        <Link
          href="/feed/"
          className="flex gap-2 text-xl font-bold text-blue-600 transition-transform hover:translate-x-4 hover:scale-125"
        >
          <Image
            src={GopherLogo}
            alt="Flowbite Logo"
            width={48}
            height={48}
            className="scale-150"
          />
          <h1 className="my-auto lg:text-2xl">Pocket Chat</h1>
        </Link>
        {/* Main Navigation */}
        <div className="flex flex-row items-center space-x-4 text-gray-800">
          <div className="flex flex-row content-center justify-center align-middle">
            {/* Publish */}
            <PublishDropdown />

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
