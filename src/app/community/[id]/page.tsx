'use client';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft } from 'lucide-react';
import CommunityMessageCard from '@/components/cards/CommunityMessageCard';
import { toast } from 'sonner';
// import { Chat } from '@/lib/echo';
import { Channel } from 'laravel-echo';
import axios from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const page = () => {
  const [community, setCommunity] = useState<Community>();
  const [communityMessages, setCommunityMessages] = useState<
    CommunityMessage[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState<string | null>(null);
  const [echo, setEcho] = useState<Echo | null>(null);
  const params = useParams();
  const router = useRouter();
  console.log(params.id);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  useEffect(() => {
    console.log('useEffect発火');

    if (typeof window !== 'undefined' && !echo) {
      console.log('Echoインスタンスを作成');
      window.Pusher = Pusher;
      window.Pusher.logToConsole = true;

      const newEcho = new Echo({
        broadcaster: 'pusher',
        key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
        cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
        wsPort: 443,
        enableStats: false,
        encrypted: true,
      });

      setEcho(newEcho);
    }

    const fetchPost = async () => {
      try {
        const response = await fetch(
          `http://localhost/api/communities/${params.id}`,
          {
            method: 'GET',
            credentials: 'include',
            headers: headers,
          }
        );
        const data = await response.json();
        console.log(data.communityMessages);
        setCommunity(data.community);
        setCommunityMessages(data.communityMessages);
      } catch (e) {
        console.error('Error fetching community:', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();

    let channel: Channel | null = null;
    let channelName: string | null = null;
    if (echo) {
      console.log('Echo instance:', echo.socketId()); // Echoインスタンスの確認

      channelName = `community.${params.id}`;
      channel = echo.channel(channelName);
      console.log(`%c Listening on channel: ${channelName}`, 'color: red'); // チャンネル名の確認

      channel.listen('CommunityMessagePosted', (data: any) => {
        console.log(data); // 受信したメッセージの確認
        setCommunityMessages((prevMessages) => [
          ...(prevMessages || []), // prevMessagesがundefinedの場合は空の配列を使用
          data,
        ]);
      });
    }

    return () => {
      if (channel) {
        channel.stopListening('.CommunityMessagePosted');
        // 存在しないと表示された
        // channel.unsubscribe();
        console.log(`Unsubscribed from channel: ${channelName}`); // 退会処理の確認
      }
    };
  }, [params.id, echo]);

  const handleSubmit = async () => {
    if (!content) return; // contentがnullまたは空の場合は処理を実行しない
    const socketId = echo ? echo.socketId() : null;

    try {
      // const response = await fetch('http://localhost/api/community_messages', {
      //   method: 'POST',
      //   credentials: 'include',
      //   headers: headers,
      //   body: JSON.stringify({ content: content, community_id: params.id }), // ContentデータをJSONに変換して送信
      // });

      // if (!response.ok) {
      //   // response.okがfalseの場合、エラーレスポンスを処理する
      //   const errorData = await response.json();
      //   console.error('Subscription error:', errorData);
      //   // ここでUIにエラーを表示するなどの処理を追加
      //   return;
      // }

      const response = await axios.post(
        'http://localhost/api/community_messages',
        {
          content: content,
          community_id: params.id,
        },
        {
          withCredentials: true,
          headers: {
            'X-Socket-ID': socketId,
          },
        }
      );

      const data = await response.data;
      console.log('New message data:', data);

      if (data.newCommunityMessage) {
        console.log('こんこ');
        setCommunityMessages((prevMessages) => [
          ...(prevMessages || []), // prevMessagesがundefinedの場合は空の配列を使用
          data.newCommunityMessage,
        ]);
        setContent('');
        toast('メッセージを送信しました。');
      } else {
        console.error('No new message data returned from the server.');
        toast('メッセージデータがサーバーから返されませんでした。');
      }
    } catch (e) {
      console.error('Error posting message:', e);
      toast('エラーが発生しました。');
    }
  };

  const handleSubmitSANKA = async () => {
    try {
      const response = await fetch('http://localhost/api/community_members', {
        method: 'POST',
        credentials: 'include',
        headers: headers,
        body: JSON.stringify({ community_id: params.id }), // ContentデータをJSONに変換して送信
      });

      if (!response.ok) {
        // response.okがfalseの場合、エラーレスポンスを処理する
        const errorData = await response.json();
        console.error('Subscription error:', errorData);
        // ここでUIにエラーを表示するなどの処理を追加
        return;
      }

      const data = await response.json();
      console.log('Subscription data:', data);
      // ここで、応答に基づいて何らかのアクションを行う
    } catch (e) {
      console.error('Error subscribing:', e);
    }
  };

  const handleBackPage = () => {
    router.back();
  };

  // 専用のローディングコンポーネントを作成する
  if (isLoading) {
    return (
      <div className=''>
        <div>このページは存在しません。</div>
        <button className='bg-red-400'>検索</button>
      </div>
    );
  }

  return (
    <div>
      <div className='bg-green-400 p-2 sticky top-0 z-10'>
        <div className='flex gap-x-4'>
          <button className='hover:opacity-40' onClick={handleBackPage}>
            <ChevronLeft />
          </button>
          <div>{community ? community.name : 'コミュニティはありません。'}</div>
        </div>
      </div>
      <Button variant={'destructive'} size={'sm'} onClick={handleSubmitSANKA}>
        参加
      </Button>
      <div className='mt-8'>
        {/* 配列の一部をそのままレンダリングする場合の処理 */}
        {/* <div>{communityMessages ? communityMessages[0].content : ''}</div> */}
        {communityMessages &&
          communityMessages.map((communityMessage) => (
            <div>
              <CommunityMessageCard
                key={communityMessage.id}
                {...communityMessage}
              />
              {/* <div key={index}>{communityMessage.content}</div> */}
            </div>
          ))}
      </div>
      <div className='flex w-full max-w-lg items-center space-x-2 absolute bottom-0 z-10'>
        <Input
          type='community_messaege'
          placeholder='メッセージを入力して下さい'
          onChange={(e) => setContent(e.target.value)}
        />
        <Button type='submit' onClick={handleSubmit} disabled={!content}>
          Subscribe
        </Button>
      </div>
    </div>
  );
};

export default page;
