'use client';

import React, { useEffect, useState } from 'react';
import { I_PopulatedNotification, I_Publication, T_Comment } from '@/lib/types';
import moment from 'moment';
import { getCommentById } from '@/lib/queries/comment';
import { getPublicationById } from '@/lib/queries/publication';

const LikeCommentNotification = ({ notification }: { notification: I_PopulatedNotification }) => {

  const [publication, setPublication] = useState<null | I_Publication>(null);

  useEffect(() => {
    getCommentById(notification.reference_id).then((commentData) => {
      if (!commentData) return console.error('Failed to get comment with id', notification.reference_id);

      getPublicationById(commentData?.publication_id)
        .then(publicationData => setPublication(publicationData ?? null));
    });
  }, []);

  return (
    <div className="w-full ps-3 flex justify-between flex-nowrap">
      <div>
        <div className="mb-1.5 text-sm text-gray-500 flex flex-nowrap justify-between ">
          <div className="w-full">
      <span
        className="font-semibold text-gray-900">{notification.first_name + ' ' + notification.last_name}</span>
            {' '} liked your comment &quot;{notification.content.slice(0, 16)}
            {notification.content.length > 16 ? '...' : ''}&quot;
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


export default LikeCommentNotification;