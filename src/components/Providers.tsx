'use client';

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useStore } from 'zustand/context';

// const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider createStore={useStore}>
      {children}
    </Provider>
    // <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Providers;
