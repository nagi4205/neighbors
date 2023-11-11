'use client';
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useQuery } from 'react-query';
import Link from 'next/link';
import {
  Button,
  Dialog,
  Flex,
  ScrollArea,
  Text,
  TextField,
} from '@radix-ui/themes';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

type NotificationType = {
  message: string;
  visible: boolean;
};

type NewPost = {
  newPost: Post | null;
};

const PostItem: React.FC<
  Post & { setNotification: (notification: NotificationType) => void } & NewPost
> = ({
  id,
  hasLiked,
  image,
  title,
  content,
  created_at,
  user,
  likedCount,
  setNotification,
  newPost,
}) => {
  const [liked, setLiked] = useState(hasLiked);
  const [likedNumber, setLikedNumber] = useState(likedCount);
  const [updateContent, setUpdateContent] = useState(content);
  const router = useRouter();

  const handleLike = async () => {
    try {
      const response = await axios.post(
        'http://localhost/api/likes',
        {
          post_id: id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          withCredentials: true,
        }
      );

      if (response.data.status === 'liked') {
        console.log(response.data.status);
        console.log(`status Value: ${response.data.status}`);
        setLiked(true);
        setLikedNumber(likedNumber + 1);
      } else if (response.data.status === 'unliked') {
        console.log('status Value: ${response.data.status}');
        setLiked(false);
        setLikedNumber(likedNumber - 1);
      } else {
        throw new Error('Unexpected status Value: ${response.data.status}');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // const deletePost = async () => {
  //   try {
  //     console.log('deletePost始まるよ');
  //     const response = await axios.delete(`http://localhost/api/posts/${id}`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'X-Requested-With': 'XMLHttpRequest',
  //       },
  //       withCredentials: true,
  //     });

  //     if (response.data.status === 'success') {
  //       console.log(response.data);
  //       setNotification({
  //         message: '投稿が正常に削除されました。',
  //         visible: true,
  //       });
  //       console.log(Notification);
  //     } else {
  //       throw new Error(`Unexpected status Value: ${response.data.status}`);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  // const deletePost = async () => {
  //   console.log('deletePost始まるよ');

  //   const deleteRequest = axios.delete(`http://localhost/api/posts/${id}`, {
  //     // <-- Promiseとして定義
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'X-Requested-With': 'XMLHttpRequest',
  //     },
  //     withCredentials: true,
  //   });

  //   toast.promise(
  //     // <-- toast.promiseを使ってPromiseをハンドリング
  //     deleteRequest,
  //     {
  //       pending: '削除中...',
  //       success: '投稿を削除しました。',
  //       error: '投稿の削除に失敗しました。', // <-- errorのメッセージ
  //     }
  //   );

  //   try {
  //     await deleteRequest; // <-- 実際のリクエストのawait
  //     console.log(deleteRequest);
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  const deletePost = async () => {
    console.log('deletePost始まるよ');

    // const deleteRequest = () =>
    //   axios.delete(`http://localhost/api/posts/${id}`, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'X-Requested-With': 'XMLHttpRequest',
    //     },
    //     withCredentials: true,
    //   });

    const deleteRequest = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          axios
            .delete(`http://localhost/api/posts/${id}`, {
              headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
              },
              withCredentials: true,
            })
            .then(resolve)
            .catch(reject);
        }, 3000); // 3秒後に上記のaxiosリクエストを実行します
      });
    };

    // エラーハンドリングや追加の処理を行う場合
    deleteRequest()
      .then((response) => {
        if (response.data.status !== 'success') {
          console.error(`Unexpected status Value: ${response.data.status}`);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const updatePost = async () => {
    try {
      console.log('editPost始まるよ');
      const response = await axios.put(
        `http://localhost/api/posts/${id}`,
        {
          content: updateContent,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          withCredentials: true,
        }
      );

      if (response.data.status === 'success') {
        console.log(response.data);
        setNotification({
          message: '投稿が正常に編集されました。',
          visible: true,
        });
      } else {
        throw new Error(`Unexpected status Value: ${response.data.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleNavigateToPostDetail = () => {
    // 投稿の詳細ページへ遷移する
    router.push(`${user.name}/post/${id}`);
  };

  return (
    <>
      <article
        className='flex w-full flex-col rounded-xl p-7 hover:bg-blue-50 dark:hover:bg-gray-950'
        onClick={handleNavigateToPostDetail}
      >
        <div className='flex items-start justify-between'>
          <div className='flex w-full flex-1 flex-row gap-4'>
            <div className='flex flex-col items-center'>
              <Link href='/' className='relative h-11 w-11'>
                <Image
                  src={
                    user
                      ? user.profile_image
                      : '/20230630_channels4_profile.jpg'
                  }
                  // src="/20230630_channels4_profile.jpg"
                  alt='user_community_image'
                  fill
                  className='cursor-pointer rounded-full'
                  onClick={(e) => e.stopPropagation()}
                />
              </Link>
              <div className='thread-card_bar' />
            </div>

            <div className='flex w-full flex-col'>
              {/* <Link href={`/profile/${author.id}`} className="w-fit">
                  <h4 className="cursor-pointer text-base-semibold text-light-1">
                    {author.name}
                  </h4>
                </Link> */}

              {/* あとで消す消してもいい */}
              <div className='flex justify-between gap-x-8'>
                <Link href='/' className='w-fit'>
                  <h4 className='cursor-pointer text-base-semibold text-light-1'>
                    {/* ↓どうするか考える */}
                    {user ? user.name : 'No Name'}
                  </h4>
                </Link>

                <div>
                  <div>
                    <button onClick={deletePost} className='border'>
                      Delete
                    </button>
                  </div>
                  <Dialog.Root>
                    <Dialog.Trigger>
                      <Button>Edit Post</Button>
                    </Dialog.Trigger>

                    <Dialog.Content style={{ maxWidth: 450 }}>
                      <Dialog.Title>Edit Post</Dialog.Title>
                      <Dialog.Description size='2' mb='4'>
                        Edit your post.
                      </Dialog.Description>

                      <label>
                        <Text as='div' size='2' mb='1' weight='bold'>
                          Content
                        </Text>
                        <TextField.Input
                          defaultValue={content}
                          placeholder={content}
                          // value={content !== null ? content : ''}
                          onChange={(e) => setUpdateContent(e.target.value)}
                        />
                      </label>

                      <Flex gap='3' mt='4' justify='end'>
                        <Dialog.Close>
                          <Button variant='soft' color='gray'>
                            Cancel
                          </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                          <Button onClick={updatePost}>Save</Button>
                        </Dialog.Close>
                      </Flex>
                    </Dialog.Content>
                  </Dialog.Root>
                </div>
              </div>

              <div className='thread-card_bar' />
              {/* ↓imageはどうするか考える */}
              {image ? (
                <Image
                  src={image}
                  className='cursor-pointer object-contain'
                  width={120}
                  height={120}
                  alt='image Description'
                />
              ) : null}
              <p className='mt-2 text-small-regular text-light-2'>{content}</p>

              <div className='mb-10 mt-5 flex flex-col gap-3'>
                <div className='flex gap-3.5'>
                  <Image
                    src='/assets/heart-gray.svg'
                    alt='heart'
                    width={24}
                    height={24}
                    className='cursor-pointer object-contain'
                  />
                  {/* <Link href={`/thread/${id}`}> */}
                  <Link href=''>
                    <Image
                      src='/assets/reply.svg'
                      alt='heart'
                      width={24}
                      height={24}
                      className='cursor-pointer object-contain'
                    />
                  </Link>
                  <Image
                    src='/assets/repost.svg'
                    alt='heart'
                    width={24}
                    height={24}
                    className='cursor-pointer object-contain'
                  />
                  <Image
                    src='/assets/share.svg'
                    alt='heart'
                    width={24}
                    height={24}
                    className='cursor-pointer object-contain'
                  />
                </div>

                <div className=''>
                  <button onClick={handleLike} className='mx-8'>
                    {liked ? (
                      'いいねしました'
                    ) : (
                      <Image
                        src='/assets/heart-gray.svg'
                        alt='heart'
                        width={24}
                        height={24}
                        className='cursor-pointer object-contain'
                      />
                    )}
                  </button>
                  <p>いいね数：{likedNumber}</p>
                  <p>{created_at}</p>
                </div>
                {/* {isComment && comments.length > 0 && (
                    <Link href={`/thread/${id}`}>
                      <p className="mt-1 text-subtle-medium text-gray-1">
                        {comments.length} repl
                        {comments.length > 1 ? "ies" : "y"}
                      </p>
                    </Link>
                  )} */}
              </div>
            </div>
          </div>
        </div>
      </article>

      <div className='shadow my-4 flex flex-col text-light-1'>
        {/* <p>{title}</p> */}
        {/* {image ? (
          <Image
            src={image}
            className="cursor-pointer object-contain"
            width={120}
            height={120}
            alt="image Description"
          />
        ) : null} */}
        {/* <p>{created_at}</p> */}
        {/* <p>{content}</p> */}
        {/* <button onClick={handleLike}>{liked ? "いいね" : "not いいね"}</button>
        <p>{likedNumber}</p> */}
      </div>
    </>
  );
};
export default PostItem;
