'use client';

import { ToastContentProps, ToastOptions } from 'react-toastify';
import React from 'react';

export const toast_config: ToastOptions<unknown> | undefined = {
  draggable: false,
  autoClose: false,
  closeOnClick: false,
  position: 'top-center',
};

const CustomToast = ({ closeToast, data }: ToastContentProps<{}>) => {
  return (
    <div>
      <p className="m-auto text-center font-bold">{'Friend is calling you.'}</p>
      <div className="flex flex-col">
        <button
          className="w-full bg-white text-black outline outline-1 outline-green-600"
          onClick={() => {
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
export default CustomToast;
