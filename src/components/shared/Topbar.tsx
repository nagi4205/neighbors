'use client';
// not installed
// import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs";
// import { dark } from "@clerk/themes";
import * as React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuthContext } from '../../app/context/auth';
import { useQuery } from '@tanstack/react-query';
import { CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL } from 'next/dist/shared/lib/constants';

function Topbar() {
  // const { isLoggedIn } = useAuthContext();
  const pathname = usePathname();
  const isHidden = pathname === '/home' || pathname === '/friends';
  const { setTheme } = useTheme();
  const fetchUserInfo = async () => {
    console.log('on fetchUserInfo');
    const res = await fetch('http://localhost/api/profile', {
      credentials: 'include', // Laravel Sanctum とのクッキーを使った認証をサポートするため
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(res);
    if (!res.ok) {
      throw new Error('Failed to fetch user info');
    }
    return res.json();
  };

  // '/home' または '/friends' の場合は何もレンダリングしない
  if (isHidden) {
    return null;
  }

  // const { data: user, isSuccess } = useQuery("userInfo", fetchUserInfo, {
  //   staleTime: 600000, // 10 minutes
  //   cacheTime: 600000, // 10 minutes
  // });

  // const { isSuccess, data: user } = useQuery({
  //   queryKey: ["data"],
  //   queryFn: fetchUserInfo,
  // });

  return (
    <nav className='topbar'>
      {/* // <nav className='fixed top-0 z-30 flex w-full items-center justify-between bg-[#121417] px-6 py-3'> */}
      <Link href='/' className='flex items-center gap-4'>
        <Image src='assets/image.svg' alt='logo' width={28} height={28} />
        {/* <p className='text-heading3-bold text-[#FFFFFF] max-xs:hidden animate-bounce duration-50 repeat-[5]'> */}
        <p className='text-heading3-bold max-xs:hidden'>Neighbors</p>
      </Link>

      <div className='flex items-center gap-1'>
        <div className='block md:hidden'></div>
        {/* あとで編集する
           <div className='flex cursor-pointer'>
            <Image
              src='/assets/logout.svg'
              alt='logout'
              width={24}
              height={24}
            />
          </div> */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' size='icon'>
              <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
              <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
              <span className='sr-only'>Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={() => setTheme('light')}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* {isSuccess && (
            <div className="mr-2">
              <Image
                src={user.profile_image}
                alt="Profile"
                width={24}
                height={24}
              />
            </div>
          )} */}
        {/* <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn> */}
      </div>

      {/* <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        /> */}
    </nav>
  );
}

export default Topbar;
