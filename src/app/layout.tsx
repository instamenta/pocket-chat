import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { EdgeStoreProvider } from '@/lib/store/edgestore';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chatter',
  description: 'Chat online',
};

type T_Props = { children: React.ReactNode };

export default function RootLayout({ children }: T_Props) {
  return (
    <html lang="en" className="h-screen">
      <body className={inter.className}>
        <EdgeStoreProvider>
          <ToastContainer />
          {children}
        </EdgeStoreProvider>
      </body>
    </html>
  );
}
