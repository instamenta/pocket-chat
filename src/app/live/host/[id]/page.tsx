import dynamic from 'next/dynamic';
import React from 'react';

const HostLiveDynamic = dynamic(() => import('./HostLive'), { ssr: false });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HostLiveWrapper = (props: any) => {
  return <HostLiveDynamic {...props} />;
};

export default HostLiveWrapper;
