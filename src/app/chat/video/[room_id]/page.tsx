import dynamic from 'next/dynamic';
import React from 'react';

const VideoChatDynamic = dynamic(() => import('./VideoChat'), { ssr: false });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VideoChatWrapper = (props: any) => {
  return <VideoChatDynamic {...props} />;
};

export default VideoChatWrapper;
