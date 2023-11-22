'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export const page = () => {
  const [post, setPost] = useState<Post>();
  const params = useParams();
  console.log(params);

  useEffect(() => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const fetchPost = async () => {
      const response = await fetch(
        `http://localhost/api/posts/${params.postId}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: headers,
        }
      );
      const data = await response.json();
      setPost(data);
    };

    fetchPost();
  }, [params.id]);

  console.log(post);

  return (
    <>
      アップル
      {post?.content}
      {/* <div className='flex flex-col'>
        <div>{post}</div>
        <div>{post.author.id}</div>
      </div>
      <div className='flex flex-col items-center'>
        <Link href='/' className='relative h-11 w-11'>
          <Image
            src={
              post.author.name
                ? post.author.profile_image
                : '/20230630_channels4_profile.jpg'
            }
            alt='user_community_image'
            fill
            className='cursor-pointer rounded-full'
            // onClick={(e) => e.stopPropagation()}
          />
        </Link>
        <div className='thread-card_bar' />
      </div> */}
    </>
  );
};

export default page;
