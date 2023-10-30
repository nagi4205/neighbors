// 一度、use clientを使わずにやってみる
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios, { AxiosError } from 'axios';
import PostItem from './PostItem';
import Link from 'next/link';
import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import Notification from '@/components/Notification';

const http = axios.create({
  baseURL: 'http://localhost',
  withCredentials: true,
});

// fetch()　ver
// const handleLikeEvent = async (postId: string, userId: string) => {
//   try {
//     const response = await fetch("http://localhost/api/likes", {
//       credentials: "include",
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "X-Requested-With": "XMLHttpRequest",
//       },
//       body: JSON.stringify({ post_id: postId, user_id: userId }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       const errorMessage = errorData.message || response.statusText;
//       throw new Error(`Network error: ${errorMessage}`);
//     }

//     const data = await response.json();
//     console.log(data);

//     if (data.status === "liked") {
//       console.log("いいねしました。");
//     } else {
//       console.log("いいねを外しました。");
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

const handleLikeEvent = async (postId: string, userId: string) => {
  try {
    const response = await axios.post(
      'http://localhost/api/likes',
      {
        post_id: postId,
        user_id: userId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        withCredentials: true, // axios でクッキーを含めるためにはこのオプションを指定します。
      }
    );

    console.log(response.data); // log the response data for debugging

    // Now, based on the response, you can update the UI accordingly.
    if (response.data.status === 'liked') {
      // setLikeStatus(postId)
      console.log('いいねしました。');
    } else {
      // Update the UI to reflect that the post was unliked
      console.log('いいねを外しました。');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const fetchPostsWithGeolocation = async (): Promise<Post[]> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const geolocationInfo: GeolocationInfo = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              radius: 4,
            };

            const params = new URLSearchParams({
              latitude: geolocationInfo.latitude.toString(),
              longitude: geolocationInfo.longitude.toString(),
              radius: geolocationInfo.radius.toString(),
            });

            const response = await axios.get(
              `http://localhost/api/posts?${params}`,
              {
                withCredentials: true,
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                },
              }
            );

            const data = response.data;
            console.log(response.request);
            console.log(response.data);
            console.log(geolocationInfo);
            console.log(JSON.stringify(geolocationInfo));

            const posts: Post[] = await response.data;
            resolve(posts);
          } catch (error) {
            if (axios.isAxiosError(error)) {
              if (error.request) {
                console.error('Error Request:', error.request);
              } else {
                console.error('Error:', error.message);
              }
            } else {
              console.error('Unknown error:', error);
            }

            reject(error);
          }
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
};

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [newPost, setNewPost] = useState<Post | null>(null);
  const [notification, setNotification] = useState({
    message: '',
    visible: false,
  });

  const fetchGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmitPost = async () => {
    try {
      const response = await axios.post(
        'http://localhost/api/posts',
        {
          content: content,
          latitude: latitude,
          longitude: longitude,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          withCredentials: true, // axios でクッキーを含めるためにはこのオプションを指定します。
        }
      );
      console.log(response.data.post);
      const createdPost: Post = response.data;
      setNewPost(createdPost);
    } catch (error) {
      console.log('投稿に失敗しました。');
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await fetchPostsWithGeolocation(); // getAllPostsを非同期で呼び出し
        console.log(fetchedPosts);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div className='bg-red-500'>dddd</div>
      {posts.map((post) => (
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

      <div className='fixed bottom-5 right-5 flex'>
        <Button variant='outline' className='mr-40'>
          いい感じ
        </Button>
        <Dialog.Root>
          <Dialog.Trigger>
            <Button
              onClick={fetchGeolocation}
              className='bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              投稿
            </Button>
          </Dialog.Trigger>

          <Dialog.Content style={{ maxWidth: 450 }}>
            <Dialog.Title>投稿しましょう！</Dialog.Title>
            <Dialog.Description size='2' mb='4'>
              Make changes to your profile.
            </Dialog.Description>

            <Flex direction='column' gap='3'>
              {latitude === null || longitude === null ? (
                <li className='flex items-center'>
                  <div role='status'>
                    <svg
                      aria-hidden='true'
                      className='w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                      viewBox='0 0 100 101'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                        fill='currentColor'
                      />
                      <path
                        d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                        fill='currentFill'
                      />
                    </svg>
                    <span className='sr-only'>Loading...</span>
                  </div>
                  位置情報取得中...
                </li>
              ) : (
                <li className='flex items-center'>
                  <svg
                    className='w-4 h-4 mr-2 text-sky-500 dark:text-sky-400 flex-shrink-0'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
                  </svg>
                  取得しました！
                </li>
              )}
              {/* <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Content
              </Text>
              <TextField.Input
                defaultValue="Freja Johnsen"
                placeholder="Enter your full name"
              />q
            </label> */}
              <label htmlFor='content'>Content</label>
              <input
                className=''
                id='content'
                placeholder='Post...'
                value={content !== null ? content : ''}
                onChange={(e) => setContent(e.target.value)}
              />
              <input type='hidden' value={latitude !== null ? latitude : ''} />
              <input
                type='hidden'
                value={longitude !== null ? longitude : ''}
              />

              {/* <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Email
              </Text>
              <TextField.Input
                defaultValue="freja@example.com"
                placeholder="Enter your email"
              />
            </label> */}
            </Flex>

            <Flex gap='3' mt='4' justify='end'>
              <Dialog.Close>
                <Button variant='soft' color='gray'>
                  Cancel
                </Button>
              </Dialog.Close>
              <Dialog.Close>
                <Button
                  onClick={handleSubmitPost}
                  disabled={latitude === null || longitude === null || !content}
                >
                  Save
                </Button>
              </Dialog.Close>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
      </div>
    </>
  );
};

export default PostList;
