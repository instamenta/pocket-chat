import React from 'react';
import Navbar from '@/components/Navbar';

type T_Props = { children: React.ReactNode };

export default function FriendsLayout({ children }: T_Props) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
