import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { EdgeStoreProvider } from '@/lib/store/edgestore';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from '@/lib/context/UserContext';
import { WebSocketProvider } from '@/lib/context/WebsocketContext';
import { WebVitals } from '@/components/web_vitals';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pocket Chat',
  description: 'Chat online',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // @ts-ignore
  return (
    <html lang="en" className="h-screen">
      <body className={inter.className}>
        <WebVitals />
        <EdgeStoreProvider>
          <ToastContainer />
          <UserProvider>
            <WebSocketProvider>{children}</WebSocketProvider>
          </UserProvider>
        </EdgeStoreProvider>
      </body>
    </html>
  );
}
