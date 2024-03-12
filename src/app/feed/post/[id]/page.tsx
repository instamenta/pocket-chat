'use client';

import React from 'react';
import { useCustomNotification } from '@/components/toast/CustomToasts';

const Page = () => {
  const handleClick1 = () => {
    useCustomNotification({
      content: 'Your custom notification',
      buttons: [
        {
          content: 'Nice',
          color: 'red',
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div className="flex h-screen w-screen justify-start align-middle ">
      <div className="mt-48 w-full">
        <button onClick={handleClick1} className="mx-auto bg-red-600 p-10">
          PEPEGA
        </button>
      </div>
    </div>
  );
};

export default Page;
