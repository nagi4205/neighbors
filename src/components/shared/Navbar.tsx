'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export const IndexNavbar = () => {
  const pathname = usePathname();
  const isHome = pathname === '/home';
  const isFriends = pathname === '/friends';

  return (
    <>
      <div className='sticky top-0 flex justify-between items-center h-12 border-b bg-custom-gray backdrop-blur-lg'>
        <Link href='/home' className='w-1/2 flex justify-center'>
          <h1
            className={`text-body-bold duration-300 ${
              isHome && 'text-custom-green'
            }`}
          >
            Home
          </h1>
        </Link>
        <Link href='/friends' className='w-1/2 flex justify-center'>
          <h1
            className={`text-body-bold duration-300 ${
              isFriends && 'text-custom-green'
            }`}
          >
            Friends
          </h1>
        </Link>
      </div>
    </>
  );
};
