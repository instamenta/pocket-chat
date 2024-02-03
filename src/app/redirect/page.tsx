'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const RedirectPage = () => {
  const router = useRouter();
  React.useEffect(() => {
    router.refresh();
    router.push('/');
  });
  return <></>;
};

export default RedirectPage;
