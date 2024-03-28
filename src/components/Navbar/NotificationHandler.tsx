'use client';

import React from 'react';
import { I_PopulatedNotification } from '@/lib/types';
import { notification_types } from '@/lib/types/enumerations';
import MessageNotification from '@/components/Navbar/Notifications/MessageNotification';
import LikeNotification from '@/components/Navbar/Notifications/LikeNotification';
import CommentNotification from '@/components/Navbar/Notifications/CommentNotification';

const NotificationHandler = ({ notification, index }: {
  notification: I_PopulatedNotification, index: number
}) => {

  const buildMessage = (notification: I_PopulatedNotification) => {
    switch (notification.type) {
      case notification_types.MESSAGE: {
        return <MessageNotification notification={notification} />;
      }
      case notification_types.LIKE: {
        return <LikeNotification notification={notification} />;
      }
      case notification_types.COMMENT: {
        return <CommentNotification notification={notification} />;
      }
      default: {
        console.error(`Notification with Unknown type ${notification.type}`);
      }
    }
  };

  return (
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
        <div
          className="absolute -mt-5 ms-6 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-blue-600">
          <svg
            className="h-2 w-2 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 18"
          >
            <path
              d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
            <path
              d="M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z" />
          </svg>
        </div>
      </div>
      {buildMessage(notification)}
    </a>
  );
};

export default NotificationHandler;