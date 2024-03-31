'use client';

import React, { useEffect, useState } from 'react';
import { I_PopulatedNotification, I_Publication, I_ShortPopulated } from '@/lib/types';
import { getPublicationById } from '@/lib/queries/publication';
import moment from 'moment';
import { getShortById } from '@/lib/queries/short';

const LikeShortNotification = ({ notification }: { notification: I_PopulatedNotification }) => {

  // const [short, setShort] = useState<I_ShortPopulated | null>(null);

  // useEffect(() => {
    // getShortById(notification.reference_id).then(setShort);
  // }, []);

  return (
    <div className="w-full ps-3 flex justify-between flex-nowrap">
      <div>
        <div className="mb-1.5 text-sm text-gray-500 flex flex-nowrap justify-between ">
          <div className="w-full">
      <span
        className="font-semibold text-gray-900">{notification.first_name + ' ' + notification.last_name}</span>
            {' '} {+notification.content > 1
            ? `and ${+notification.content - 1} others` : ''
          } liked your short
          </div>

        </div>
        <div className="text-xs text-blue-600 ">
          {moment(notification.created_at).toNow()}
        </div>
      </div>
      {/*<div className="h-full flex justify-center align-middle">*/}
      {/*  {short*/}
      {/*    ? <img className="size-12 my-auto" src={short.images[0]} alt="" />*/}
      {/*    : null}*/}
      {/*</div>*/}
    </div>
  );
};


export default LikeShortNotification;