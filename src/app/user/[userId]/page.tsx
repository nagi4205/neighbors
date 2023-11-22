'use client';
// import ProfileAvatar from '@/components/client-components/profile-avatar';
// import Tweet from '@/components/client-components/tweet';
// import { getTweets } from '@/lib/supabase/queries';
// import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const UserProfilePage = () => {
  const [user, setUser] = useState<User>();
  const params = useParams();
  console.log(params);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  useEffect(() => {
    console.log('発火');

    const fetchPost = async () => {
      const response = await fetch(
        `http://localhost/api/users/${params.userId}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: headers,
        }
      );
      const data = await response.json();
      setUser(data);
    };

    fetchPost();
  }, [params.userId]);

  console.log(user);

  const handleFollowRequest = async () => {
    try {
      const response = await fetch('http://localhost/api/follow_requests', {
        method: 'POST',
        headers: headers,
        credentials: 'include',
        //userがundifinedの可能性あり
        body: JSON.stringify({ followee_id: user?.id }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // レスポンス処理
      const data = await response.json();
      console.log(data);
      toast.success(data);

      console.log('Follow request successful:', data);
    } catch (error) {
      console.error('Failed to send follow request:', error);
    }
  };
  // const supabaseClient = createServerComponentSupabaseClient({
  //   cookies,
  //   headers,
  // });

  // const { data: userData, error: userError } =
  //   await supabaseClient.auth.getUser();

  // const getUserTweets = await getTweets({
  //   currentUserID: userData.user?.id,
  //   profileUsername: params.username,
  // });

  // useEffect(() => {
  //   supabase.auth.getUser().then((res) => {
  //     if (res.data.user?.id) {
  //       const filePath = `public/${res.data.user?.id}`;

  //       const {
  //         data: { publicUrl },
  //       } = supabase.storage.from("avatars").getPublicUrl(filePath);

  //       setProfileImage(publicUrl);
  //     }
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <main className='flex w-full  h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600'>
      <div className='flex flex-col font-bold p-6 backdrop-blur bg-black/10 sticky top-0'>
        {/* <ProfileAvatar
          username={params.username}
          avatarUrl={getUserTweets ? getUserTweets[0].profile.avatarUrl : null}
        /> */}

        {/* テスト */}
        <div>{user?.name}</div>
        <button onClick={handleFollowRequest}>フォローする</button>

        <h1 className='text-lg'>
          {/* {userData.user?.user_metadata?.username || 'Profile'} */}
        </h1>
        <div className='text-xs text-gray-400'>
          {/* {getUserTweets?.length || 0} Tweets */}
        </div>
      </div>
      <div className='w-full'>
        {/* {getUserTweets &&
          getUserTweets.map(({ likes, tweet, profile, hasLiked, replies }) => {
            return (
              <Tweet
                key={tweet.id}
                tweet={{
                  tweetDetails: {
                    ...tweet,
                  },
                  userProfile: {
                    ...profile,
                  },
                }}
                likesCount={likes.length}
                currentUserId={userData.user?.id}
                hasLiked={hasLiked}
                repliesCount={replies.length}
              />
            );
          })} */}
      </div>
    </main>
  );
};

export default UserProfilePage;
