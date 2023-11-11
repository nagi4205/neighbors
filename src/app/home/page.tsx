'use client';
// not installed
// import { currentUser } from "@clerk/nextjs";
import { redirect } from 'next/navigation';

// not created
import PostCard from '@/components/cards/PostCard';
// import Pagination from "@/components/shared/Pagination";
import { useState, useEffect } from 'react';
// not created
import PostList from '@/lib/actions/post.action';

import InputForm from '@/components/forms/InputForm';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';

// import { fetchUser } from "@/lib/actions/user.actions";

function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  // const user = await currentUser();
  // if (!user) return null;

  //あとで消す
  // useEffect(() => {
  //   // history.pushStateを使って新しい履歴エントリを追加
  //   if (showDetail) {
  //     window.history.pushState(null, '', '#detail');
  //   }

  //   const handlePopState = (e) => {
  //     // showDetailの状態を変更する
  //     setShowDetail(window.location.hash === '#detail');
  //   };

  //   // popstateイベントリスナを追加
  //   window.addEventListener('popstate', handlePopState);

  //   return () => {
  //     // イベントリスナをクリーンアップ
  //     window.removeEventListener('popstate', handlePopState);
  //   };
  // }, [showDetail]);
  // const handleArticleClick = () => {
  //   setShowDetail(true);
  // };

  const handleBackClick = () => {
    // 履歴のエントリを1つ戻る
    window.history.back();
  };
  // const userInfo = await fetchUser(user.id);
  // if (!userInfo?.onboarded) redirect("/onboarding");
  return (
    <>
      <h1 className='head-text text-left'>Home</h1>

      <section className='mt-9 flex flex-col gap-4'>
        <p className='no-result'>No threads found</p>
        {/* <PostList /> */}

        {/* {!showDetail ? (
          <article
            className='flex w-full flex-col rounded-xl bg-blue-200 p-7 hover:bg-gray-50 cursor-pointer'
            onClick={handleArticleClick}
          >
          <div>一覧画面サンプル</div>
          </article> */}
        <PostList />
        {/* ) : (
          <div className='detail-component'>
            <button onClick={handleBackClick}>戻る</button>
          </div>
        )} */}

        {/* <InputForm /> */}

        {/* <button
          className="fixed bottom-5 right-5 bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          // onClick={toggleModal}
        >
          投稿
        </button> */}

        {/* あとで消す消してもいい */}
        {/* <Dialog.Root>
          <Dialog.Trigger>
            <Button className="fixed bottom-5 right-5 bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              投稿
            </Button>
          </Dialog.Trigger>

          <Dialog.Content style={{ maxWidth: 450 }}>
            <Dialog.Title>Edit profile</Dialog.Title>
            <Dialog.Description size="2" mb="4">
              Make changes to your profile.
            </Dialog.Description>

            <Flex direction="column" gap="3">
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Name
                </Text>
                <TextField.Input
                  defaultValue="Freja Johnsen"
                  placeholder="Enter your full name"
                />
              </label>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Email
                </Text>
                <TextField.Input
                  defaultValue="freja@example.com"
                  placeholder="Enter your email"
                />
              </label>
            </Flex>

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </Dialog.Close>
              <Dialog.Close>
                <Button>Save</Button>
              </Dialog.Close>
            </Flex>
          </Dialog.Content>
        </Dialog.Root> */}
      </section>
    </>
  );
}

export default Home;
