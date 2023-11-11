'use client';
import React, { useEffect, useState } from 'react';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useGeolocation } from './queries';

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [client] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
