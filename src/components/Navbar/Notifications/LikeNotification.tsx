'use client';

import React, { useEffect, useState } from 'react';
import { I_PopulatedNotification, I_Publication } from '@/lib/types';
import { getPublicationById } from '@/lib/queries/publication';
import moment from 'moment';

const LikeNotification = ({ notification }: { notification: I_PopulatedNotification }) => {

  const [publication, setPublication] = useState<void | I_Publication>();

  useEffect(() => {
    getPublicationById(notification.reference_id).then(setPublication);
  }, []);

  return (
    <div className="w-full ps-3 flex justify-between flex-nowrap">
      <div>
        <div className="mb-1.5 text-sm text-gray-500 flex flex-nowrap justify-between ">
          <div className="w-full">
      <span
        className="font-semibold text-gray-900">{notification.first_name + ' ' + notification.last_name}</span>
            {' '} {+notification.content > 1
            ? `and ${+notification.content - 1} others` : ''
          } liked your publication
          </div>

        </div>
        <div className="text-xs text-blue-600 ">
          {moment(notification.created_at).toNow()}
        </div>
      </div>
      <div className="h-full flex justify-center align-middle">
        {publication
          ? <img className="size-12 my-auto" src={publication.images[0]} alt="" />
          : null}
      </div>
    </div>
  );
};


export default LikeNotification;