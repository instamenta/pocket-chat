'use client';

import React, { useEffect, useState } from 'react';
import { I_PopulatedNotification, T_Comment } from '@/lib/types';
import moment from 'moment';
import { getShortCommentById } from '@/lib/queries/short';

const LikeShortCommentNotification = ({ notification }: { notification: I_PopulatedNotification }) => {

  const [comment, setComment] = useState<T_Comment & { likes_count: number } | null>();

  useEffect(() => {
    getShortCommentById(notification.reference_id).then((commentData) => {
      setComment(commentData);
      if (!commentData) {
        return console.error('Failed to get comment with id', notification.reference_id);
      }
    });
  }, []);

  return (
    <div className="w-full ps-3">
      <div className="mb-1.5 text-sm text-gray-500 w-full">
        <div className="w-full">
          <span className="font-semibold text-gray-900">
            {notification.first_name + ' ' + notification.last_name}</span>
          {' '}
          {+notification.content > 1 ? `and ${+notification.content - 1} others` : ''
          } liked your comment &quot;
          {comment ? <>
            {comment?.content.slice(0, 16)}
            {comment.content.length > 16 ? '...' : ''}&quot;
          </> : null}
        </div>

      </div>
      <div className="text-xs text-blue-600 ">
        {moment(notification.created_at).toNow()}
      </div>
    </div>
  );
};


export default LikeShortCommentNotification;