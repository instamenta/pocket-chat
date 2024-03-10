import dynamic from 'next/dynamic';
import React from 'react';

const WatchLiveDynamic = dynamic(() => import('./WatchLive'), { ssr: false });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WatchLiveWrapper = (props: any) => {
  return <WatchLiveDynamic {...props} />;
};

export default WatchLiveWrapper;
