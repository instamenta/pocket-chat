'use client';

import { ToastContentProps, ToastOptions } from 'react-toastify';
import React from 'react';
import { useRouter } from 'next/navigation';
import { T_VideoCallInviteResponse } from '@/lib/types';

export const toast_config:  ToastOptions<unknown> | undefined = {
  draggable: false,
  autoClose: false,
  closeOnClick: false,
  position: 'top-center',
}

const VideoChatInvitation = ({
  closeToast,
  data,
}: ToastContentProps<T_VideoCallInviteResponse>) => {
  const router = useRouter();

  return (
    <div>
      <p className="m-auto text-center font-bold">{'Friend is calling you.'}</p>
      <div className="flex flex-col">
        <button
          className="w-full bg-white text-black outline outline-1 outline-green-600"
          onClick={() => {
            router.push(`/chat/video/${data?.room_id}`);
            closeToast();
          }}
        >
          Accept
        </button>
        <button
          className="w-full bg-white text-black outline outline-1 outline-red-600"
          onClick={closeToast}
        >
          Decline
        </button>
      </div>
    </div>
  );
};
export default VideoChatInvitation;
