'use client';

import React, { useEffect, useState } from 'react';
import { BsSend, BsSendExclamation } from 'react-icons/bs';
import { I_PopulatedNotification } from '@/lib/types';
import { listNotifications } from '@/lib/queries/notification';
import { VscBell, VscBellDot } from 'react-icons/vsc';
import Link from 'next/link';
import NotificationHandler from '@/components/Navbar/NotificationHandler';

const NotificationsBell: React.FC = () => {
  const [toggle, setToggle] = React.useState<boolean>(false);
  const [hasNotifications, setHasNotifications] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<I_PopulatedNotification[]>(
    []
  );

  useEffect(() => {
    listNotifications('all').then((data) => {
      setNotifications(data);
      setHasNotifications(data.some((d) => !d.seen));
    });
  }, []);

  return (
    <>
      <div className="relative my-auto">
        {hasNotifications ? (
          <VscBell
            onClick={() => setToggle((prev) => !prev)}
            className=" size-7 cursor-pointer fill-slate-500 transition-all hover:fill-blue-600"
          />
        ) : (
          <VscBellDot
            onClick={() => setToggle((prev) => !prev)}
            className="my-auto size-7 cursor-pointer fill-slate-500 transition-all hover:fill-blue-600"
          />
        )}
        {toggle && (
          <div
            className="absolute right-0 z-20 mt-3 max-h-[40vh] w-96 max-w-sm divide-y divide-gray-100 overflow-y-auto rounded-lg border bg-white shadow-xl xl:-left-36 "
            onMouseLeave={() => setToggle((prev) => !prev)}
          >
            <div className="block rounded-t-lg bg-gray-50 px-4 py-2 text-center font-medium text-gray-700 ">
              Notifications
            </div>
            <div className="divide-y divide-gray-100">
              {notifications.map((notification, index) => (
                <NotificationHandler notification={notification} index={index} key={index} />
              ))}
            </div>
            <a
              href="#"
              className="block rounded-b-lg bg-gray-50 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100  "
            >
              <div className="inline-flex items-center ">
                <svg
                  className="me-2 h-4 w-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 14"
                >
                  <path
                    d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                </svg>
                View all
              </div>
            </a>
          </div>
        )}
      </div>

      <Link href="/chat" className="my-auto ml-3">
        {hasNotifications ? (
          <BsSendExclamation className=" size-7 fill-slate-500 transition-all hover:fill-blue-600" />
        ) : (
          <BsSend className=" size-7 fill-slate-500 transition-all hover:fill-blue-600" />
        )}
      </Link>
    </>
  );
};

export default NotificationsBell;
