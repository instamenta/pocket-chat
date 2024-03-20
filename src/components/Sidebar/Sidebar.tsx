import React from 'react';
import {
  MdGroups,
  MdLiveTv,
  MdMore,
  MdOutlineHelp,
  MdReportProblem,
} from 'react-icons/md';
import Link from 'next/link';
import { SiYoutubeshorts } from 'react-icons/si';
import { RiLiveFill } from 'react-icons/ri';
import { FaAddressBook, FaUser, FaUserFriends } from 'react-icons/fa';
import { LuLogOut, LuSendHorizonal } from 'react-icons/lu';

const Sidebar = ({ emptySpace = true }: { emptySpace?: boolean }) => {
  return (
    <aside
      id="separator-sidebar"
      className={`fixed left-0 ${emptySpace ? 'top-0' : 'top-0'} z-10 h-screen w-64 -translate-x-full shadow-2xl transition-transform 2xl:translate-x-0`}
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto bg-gray-50 px-3 pb-4 pt-16">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              href="/group"
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100  "
            >
              <FaUser className="size-7 fill-slate-600" />
              <span className="my-auto ms-3 text-lg">Profile</span>
            </Link>
          </li>
          <li>
            <Link
              href="/group"
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100  "
            >
              <MdGroups className="size-7 fill-blue-600" />
              <span className="my-auto ms-3 text-lg">Group</span>
            </Link>
          </li>

          <li>
            <Link
              href="#"
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100  "
            >
              <SiYoutubeshorts className="size-7 fill-blue-600" />
              <span className="my-auto ms-3 text-lg">Shorts</span>
            </Link>
          </li>
          <li>
            <Link
              href="/live"
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100  "
            >
              <RiLiveFill className="size-7 fill-pink-600" />
              <span className="my-auto ms-3 text-lg">Live</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100  "
            >
              <MdLiveTv className="size-7 fill-red-600" />
              <span className="my-auto ms-3 text-lg">Room</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100  "
            >
              <FaAddressBook className="size-7 fill-green-600 py-0.5" />
              <span className="my-auto ms-3 text-lg">People</span>
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100  "
            >
              <MdMore className="size-7 fill-yellow-900" />
              <span className="my-auto ms-3 text-lg">More</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="group flex items-center rounded-lg p-2 text-gray-900 transition duration-75 hover:bg-gray-100  "
            >
              <FaUserFriends className="size-7 fill-yellow-600" />
              <span className="my-auto ms-3 text-lg">Find Friends</span>
            </a>
          </li>
          <li>
            <Link
              href="#"
              className="group flex items-center rounded-lg p-2 text-gray-900 transition duration-75 hover:bg-gray-100  "
            >
              <LuSendHorizonal className="size-7 text-blue-600" />
              <span className="my-auto ms-3 text-lg">Messages</span>
            </Link>
          </li>
        </ul>
        <ul className="mt-4 space-y-2 border-t border-gray-200 pt-4 font-medium ">
          <li>
            <button className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100  ">
              <LuLogOut className="size-7 " />
              <span className="my-auto ms-3 text-lg">Sign Out</span>
            </button>
          </li>
          <li>
            <a
              href="#"
              className="group flex items-center rounded-lg p-2 text-gray-900 transition duration-75 hover:bg-gray-100  "
            >
              <MdReportProblem className="size-7" />
              <span className="my-auto ms-3 text-lg">Report</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="group flex items-center rounded-lg p-2 text-gray-900 transition duration-75 hover:bg-gray-100  "
            >
              <MdOutlineHelp className="size-7" />
              <span className="my-auto ms-3 text-lg">Help</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
