'use client';

import React from 'react';
import { I_PopulatedNotification } from '@/lib/types';
import moment from 'moment';

const CommentShortNotification = ({ notification }: { notification: I_PopulatedNotification }) => {

  // const [short, setShort] = useState<I_ShortPopulated | null>(null);
  //
  // useEffect(() => {
  //   getShortById(notification.reference_id).then(setShort);
  // }, []);

  return (
    <div className="w-full ps-3 flex justify-between flex-nowrap">
      <div>
        <div className="mb-1.5 text-sm text-gray-500 flex flex-nowrap justify-between ">
          <div className="w-full">
      <span
        className="font-semibold text-gray-900">{notification.first_name + ' ' + notification.last_name}</span>
            {' '}commented on your short &quot;{notification.content.slice(0, 16)}
            {notification.content.length > 16 ? '...' : ''}&quot;
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


export default CommentShortNotification;