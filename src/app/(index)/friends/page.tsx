'use client';

import { redirect } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import Notification from '@/components/Notification';
import {
  useGeolocation,
  useGetPostsByGeolocation,
  useGetPostsByFollowingUsers,
} from '@/lib/tanstack-query/queries';
import Loader from '@/components/shared/Loader';
// not created
import PostCard from '@/components/cards/PostCard';
// import Pagination from "@/components/shared/Pagination";
import { useState, useEffect, use } from 'react';
// not created
import PostList from '@/lib/actions/post.action';

import InputForm from '@/components/forms/InputForm';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import PostItem from '@/lib/actions/PostItem';

// import { fetchUser } from "@/lib/actions/user.actions";

function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [newPost, setNewPost] = useState<Post | null>(null);
  const [notification, setNotification] = useState({
    message: '',
    visible: false,
  });

  const { data: postsByFollowingUsers } = useGetPostsByFollowingUsers();

  console.log(postsByFollowingUsers);
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
      <>
        {postsByFollowingUsers?.map((post) => (
          <PostItem
            key={post.id}
            {...post}
            setNotification={setNotification}
            newPost={newPost}
          />
        ))}
        {notification.visible && (
          <Notification
            message={notification.message}
            onClose={() =>
              setNotification((prev) => ({ ...prev, visible: false }))
            }
          />
        )}
      </>

      <section className='mt-20 flex flex-col'></section>
    </>
  );
}

export default Home;
