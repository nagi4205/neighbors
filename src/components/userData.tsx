'use client';
import React from 'react';
import { useUserData } from '@/lib/tanstack-query/authQuery';
import { useRouter } from 'next/navigation';

interface AuthProviderProps {
  children: React.ReactNode;
}

const UserProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const { data: user, isLoading, isError } = useUserData();
  if (user) {
    console.log('UserProvider: user', user);
    router.push('/home');
  }
  if (isLoading)
    return (
      <>
        <div className='w-full h-screen flex justify-center items-center'>
          Laoding...
        </div>
      </>
    );
  if (isError)
    return (
      // <>
      //   <div className='w-full h-screen flex justify-center items-center'>
      //     Error...
      //   </div>
      // </>
      <>{children}</>
    );

  // return <>{children}</>;
};

export default UserProvider;
