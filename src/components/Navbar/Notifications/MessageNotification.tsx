'use client';

import React from 'react';
import { I_PopulatedNotification } from '@/lib/types';
import moment from 'moment';

const MessageNotification = ({ notification }: { notification: I_PopulatedNotification }) => {
  return (
    <div className="w-full ps-3 flex justify-between flex-nowrap">
      <div>
        <div className="mb-1.5 text-sm text-gray-500 flex flex-nowrap justify-between ">
          <div className="w-full">
      <span
        className="font-semibold text-gray-900">{notification.first_name + ' ' + notification.last_name}</span>
            &quot;{notification.content.slice(0, 16)}{notification.content.length > 16 ? '...' : ''} &quot;
          </div>

        </div>
        <div className="text-xs text-blue-600 ">
          {moment(notification.created_at).toNow()}
        </div>
      </div>
      <div className="h-full flex justify-center align-middle">
        <img className="size-12 my-auto rounded-full" src={notification.picture} alt="" />
      </div>
    </div>
  );
};


export default MessageNotification;