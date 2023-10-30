'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import apple from '@components/shared/LeftSidebar/apple.svg';
import DialogPage from '../dialog';
import { Button } from '@/components/ui/button';

// not installed
// import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";

import { sidebarLists } from '@/constants';

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  // not installed clerk
  // const { userId } = useAuth();

  return (
    <>
      {/* <Button variant='outline'>Button</Button> */}
      {/* <DialogPage /> */}
      <section className='custom-scrollbar leftsidebar'>
        <div className='flex w-full flex-1 flex-col gap-6 px-6'>
          {sidebarLists.map((list) => {
            if (list.type === 'link') {
              const isActive =
                (pathname.includes(list.route) && list.route.length > 1) ||
                pathname === list.route;

              // not defined userId
              // if (link.route === "/profile") link.route = `${link.route}/${userId}`;

              return (
                <Link
                  href={list.route}
                  key={list.label}
                  className={`leftsidebar_link ${isActive && 'bg-[#3b82f6] '}`}
                >
                  <Image
                    src={list.imgURL}
                    alt={list.label}
                    width={24}
                    height={24}
                  />

                  <p className='text-[#FFFFFF] max-lg:hidden'>{list.label}</p>
                </Link>
              );
            }

            if (list.type === 'button') {
              return (
                <button
                  key={list.label}
                  className='leftsidebar_link'
                  onClick={() => console.log('押しました。')}
                >
                  <Image
                    src={list.imgURL}
                    alt={list.label}
                    width={24}
                    height={24}
                  />

                  <p className='text-[#FFFFFF] max-lg:hidden'>{list.label}</p>
                </button>
              );
              // const isActive =
              //   (pathname.includes(list.route) && list.route.length > 1) ||
              //   pathname === list.route;

              // // not defined userId
              // // if (link.route === "/profile") link.route = `${link.route}/${userId}`;

              // return (
              //   <Link
              //     href={list.route}
              //     key={list.label}
              //     className={`leftsidebar_link ${isActive && 'bg-primary-500 '}`}
              //   >
              //     <Image
              //       src={list.imgURL}
              //       alt={list.label}
              //       width={24}
              //       height={24}
              //     />

              //     <p className='text-light-1 max-lg:hidden'>{list.label}</p>
              //   </Link>
              // );
            }
          })}
        </div>

        <div className='mt-10 px-6'>
          <div className='flex cursor-pointer gap-4 p-4'>
            <Image
              src='/assets/logout.svg'
              alt='logout'
              width={24}
              height={24}
            />

            <p className='text-[#EFEFEF] max-lg:hidden'>Logout</p>
          </div>
          {/* <SignedIn>
        <SignOutButton signOutCallback={() => router.push("/sign-in")}>
          <div className="flex cursor-pointer gap-4 p-4">
            <Image
              src="/assets/logout.svg"
              alt="logout"
              width={24}
              height={24}
            />

            <p className="text-light-2 max-lg:hidden">Logout</p>
          </div>
        </SignOutButton>
      </SignedIn> */}
        </div>
      </section>
    </>
  );
};

export default LeftSidebar;
