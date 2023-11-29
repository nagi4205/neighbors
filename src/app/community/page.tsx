'use client';
import React, { useState } from 'react';
import {
  useCreateCommunity,
  useGeolocation,
  useGetCommunitiesByGeolocation,
} from '@/lib/tanstack-query/queries';
import axios from 'axios';
import { createCommunity } from '@/lib/laravel/api';
import CommunityCard from '@/components/cards/CommunityCard';

const CreateCommunity = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [content, setContent] = useState<string | null>(null);

  const {
    data: geolocationData,
    isError: isGeoError,
    isLoading: isGeoLoading,
  } = useGeolocation();
  console.log(isGeoLoading);
  console.log(geolocationData);

  const {
    mutateAsync: createCommunity,
    isLoading: isLoadingCreate,
    isSuccess: isSuccessCreate,
  } = useCreateCommunity();

  const {
    data: communitiesByGeolocation,
    isError: isCommunitiesError,
    isLoading: isCommunitiesLoading,
  } = useGetCommunitiesByGeolocation(geolocationData);

  console.log(communitiesByGeolocation);

  const handleSubmit = async () => {
    console.log('L29.on handleSubmit');

    // 位置情報が未設定の場合はエラー
    if (!geolocationData) {
      console.error('位置情報を取得して下さい。');
      return;
    }

    const newCommunity = await createCommunity({
      name: name as string,
      description: description as string,
      geolocationData: geolocationData,
    });

    if (isSuccessCreate) {
      console.log('L29.on handleSubmit');
      // toast('This is a sonner toast');
      //問題あり、タイムラインが更新されるというと問題あり
      // 全体がレンダリングされてしまっている気がする
      setContent(null);
    }
  };

  const { name, description } = formData;

  const onChange = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const onSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const res = await axios.post(
  //       'http://localhost:8000/api/communities',
  //       formData
  //     );
  //     console.log('コミュニティ作成に成功:', res.data);
  //     // 成功したら何かの処理を行う
  //   } catch (err) {
  //     console.error('コミュニティ作成に失敗:', err.response.data);
  //     // エラー処理を行う
  //   }
  // };

  return (
    <div>
      <h1>コミュニティ作成</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>名前:</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor='description'>説明:</label>
          <textarea
            name='description'
            value={description}
            onChange={onChange}
            required
          />
        </div>
        <button type='submit'>送信</button>
      </form>
      {communitiesByGeolocation?.map((community) => (
        <CommunityCard key={community.id} {...community} />
      ))}
    </div>
  );
};

export default CreateCommunity;
