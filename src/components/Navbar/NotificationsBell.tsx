'use client';

import React, { useEffect, useState } from 'react';
import { BsSend, BsSendExclamation } from 'react-icons/bs';
import { I_PopulatedNotification } from '@/lib/types';
import { listNotifications } from '@/lib/queries/notification';
import { VscBell, VscBellDot } from 'react-icons/vsc';
import moment from 'moment';

const NotificationsBell: React.FC = () => {
  const [toggle, setToggle] = React.useState<boolean>(false);
  const [hasNotifications, setHasNotifications] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<I_PopulatedNotification[]>(
    [],
  );

  useEffect(() => {
    listNotifications('all').then((data) => {
      console.log(data);
      setNotifications(data);
      setHasNotifications(data.some((d) => d.type === 'unseen'));
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
            className="absolute mt-3 right-0 z-20 w-80 max-w-sm divide-y divide-gray-100 overflow-y-auto rounded-lg border bg-white shadow-xl "
            style={{ maxHeight: '40vh' }}
          >
            <div className="block rounded-t-lg bg-gray-50 px-4 py-2 text-center font-medium text-gray-700 ">
              Notifications
            </div>
            <div className="divide-y divide-gray-100">
              {notifications.slice(0, 6).map((notification, index) => (
                <a
                  href="#"
                  className="flex px-4 py-3 hover:bg-gray-100 "
                  key={index}
                >
                  <div className="flex-shrink-0">
                    <img
                      className="h-11 w-11 rounded-full"
                      src={notification.picture}
                      alt="Profile Pic"
                    />
                    <div className="absolute -mt-5 ms-6 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-blue-600">
                      <svg
                        className="h-2 w-2 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 18"
                      >
                        <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                        <path d="M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z" />
                      </svg>
                    </div>
                  </div>
                  <div className="w-full ps-3">
                    <div className="mb-1.5 text-sm text-gray-500">
                      New message from{' '}
                      <span className="font-semibold text-gray-900">
                        {notification.first_name + ' ' + notification.last_name}
                      </span>
                      : "{notification.content}"
                    </div>
                    <div className="text-xs text-blue-600 ">
                      {moment(notification.created_at).toNow()}
                    </div>
                  </div>
                </a>
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
                  <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                </svg>
                View all
              </div>
            </a>
          </div>
        )}
      </div>

      {hasNotifications ? (
        <BsSendExclamation className="my-auto ml-3 size-7 fill-slate-500 transition-all hover:fill-blue-600" />
      ) : (
        <BsSend className="my-auto ml-3 size-7 fill-slate-500 transition-all hover:fill-blue-600" />
      )}
    </>
  );
};

export default NotificationsBell;
