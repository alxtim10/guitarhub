'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();

const QueryClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      {children}
    </QueryClientProvider>
  );
};

export default QueryClientLayout;
