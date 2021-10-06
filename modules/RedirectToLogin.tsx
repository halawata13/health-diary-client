import React from 'react';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';

export const RedirectToLogin = () => {
  const { cache } = useSWRConfig();
  // @ts-ignore
  cache.clear();
  const router = useRouter();
  router.push('/login');

  return <></>;
};
