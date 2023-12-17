'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import apple from '@components/shared/LeftSidebar/apple.svg';
import DialogPage from '../dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import useAuth, { useUserData } from '@/lib/tanstack-query/authQuery';

// not installed
// import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";

import { sidebarLists } from '@/constants';
import { useCreatePost, useGeolocation } from '@/lib/tanstack-query/queries';
import { use, useState } from 'react';

const LeftSidebar = () => {
  const [content, setContent] = useState<string | null>(null);
  const { logout } = useAuth();
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useUserData();
  // const { toast } = useToast();

  console.log('on LeftSidebar');
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const {
    data: geolocationData,
    isError: isGeoError,
    isLoading: isGeoLoading,
  } = useGeolocation();
  console.log(isGeoLoading);

  const {
    mutateAsync: createPost,
    isLoading: isLoadingCreate,
    isSuccess: isSuccessCreate,
  } = useCreatePost();

  // 作成途中
  // Geolocationがnullの場合不都合、明示的にnullにすることもできるが、そうでないのにgeolocationDataがnullで保存されててしまう可能性あり
  // toastが機能しない時がある
  const handleSubmit = async () => {
    console.log('L63.on handleSubmit');
    const newPost = await createPost({
      content: content as string,
      GeolocationData: geolocationData,
    });

    if (isSuccessCreate) {
      console.log('L66.on handleSubmit');
      toast('This is a sonner toast');
      //問題あり、タイムラインが更新されるというと問題あり
      setContent(null);
    }
  };

  //あとで移譲する
  // larave/apiに移譲し、usemutation完成

  // not installed clerk
  // const { userId } = useAuth();

  return (
    <>
      {/* <Button variant='outline'>Button</Button> */}
      {/* <DialogPage /> */}
      <section className='custom-scrollbar leftsidebar'>
        <div className='flex w-full flex-1 flex-col gap-6 px-6'>
          {/* <Link href='/' className='flex items-center gap-4'> */}
          <Link
            href='/'
            className='relative flex justify-start gap-4 rounded-lg p-4'
          >
            <Image src='assets/logo.svg' alt='logo' width={28} height={28} />
            <p className='text-heading3-bold max-lg:hidden'>Neighbors</p>
          </Link>
          <button onClick={() => toast('This is a sonner toast')}>
            Render my toast
          </button>
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
                  {/* <Image
                    src={list.imgURL}
                    alt={list.label}
                    width={24}
                    height={24}
                  /> */}
                  {list.iconComponent}

                  {/* <p className='text-[#FFFFFF] max-lg:hidden'>{list.label}</p> */}
                  <p className='max-lg:hidden'>{list.label}</p>
                </Link>
              );
            }

            if (list.type === 'button') {
              return (
                <Dialog key={list.label}>
                  <DialogTrigger asChild>
                    <Button
                      variant='ghost'
                      className='leftsidebar_link'
                      onClick={() => console.log('押しました。')}
                    >
                      {/* <Image
                          src={list.imgURL}
                          alt={list.label}
                          width={24}
                          height={24}
                        /> */}
                      {list.iconComponent}
                      <p className='max-lg:hidden'>{list.label}</p>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers..
                      </DialogDescription>
                    </DialogHeader>
                    <div className='grid gap-4 py-4'>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='name' className='text-right'>
                          Name
                        </Label>
                        <Input
                          id='name'
                          defaultValue='Pedro Duarte'
                          className='col-span-3'
                          onChange={(e) => setContent(e.target.value)}
                        />
                      </div>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='username' className='text-right'>
                          Username
                        </Label>
                        <Input
                          id='username'
                          defaultValue='@peduarte'
                          className='col-span-3'
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          type='submit'
                          onClick={handleSubmit}
                          disabled={
                            geolocationData?.latitude === undefined ||
                            geolocationData?.longitude === undefined ||
                            !content
                          }
                        >
                          Post
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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

        {user ? (
          <div className='flex item-center justify-center'>
            {/* <p className='text-light-1'>Welcome, {session.user.name}!</p> */}
            {/* <Image
              src={session.user.image}
              alt='User Profile Image'
              width={100}
              height={100}
            /> */}
            <HoverCard openDelay={200}>
              <HoverCardTrigger>
                <div className='flex'>
                  <Avatar>
                    {/* <AvatarImage src={session.user.image} /> */}
                  </Avatar>
                  <div>{user.name}</div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent sideOffset={20} side='right'>
                <div className='mt-10 px-6'>
                  <div className='flex cursor-pointer gap-4 p-4'>
                    <Image
                      src='/assets/logout.svg'
                      alt='logout'
                      width={24}
                      height={24}
                    />

                    <p className='max-lg:hidden'>Logout</p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        ) : (
          <div className='mt-4 px-6'>
            <div className='flex cursor-pointer gap-4 p-4'>
              <Image
                src='/assets/logout.svg'
                alt='logout'
                width={24}
                height={24}
              />
              <Link href='/sign-in' className='max-lg:hidden'>
                Sign in
              </Link>
            </div>
          </div>
        )}

        <div className='mt-10 px-6'>
          <button onClick={() => logout()}>
            <div className='flex cursor-pointer gap-4 p-4'>
              <Image
                src='/assets/logout.svg'
                alt='logout'
                width={24}
                height={24}
              />

              <p className='max-lg:hidden'>Logout</p>
            </div>
          </button>

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
