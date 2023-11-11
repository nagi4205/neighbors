import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/tanstack-query/queryKeys';
import { getGeolocation } from '@/lib/actions/post.action';
import { searchPostsByGeolocation, createPost } from '../laravel/api';

type GeolocationData = {
  latitude: number;
  longitude: number;
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const useGeolocation = () => {
  return useQuery<GeolocationData, Error>({
    queryKey: [QUERY_KEYS.GET_GEOLOCATION],
    queryFn: getGeolocation,
    gcTime: 5 * 60 * 1000, // キャッシュの時間をここで設定できます。
    refetchInterval: 30 * 1000, // 3０秒ごとに位置情報を再取得します。
    refetchOnWindowFocus: false, // ウィンドウフォーカス時には再フェッチしない。
  });
};

export const useGetPostsByGeolocation = (geolocationData?: GeolocationData) => {
  // isEnabled をgeolocationDataの有無と正確な型で計算
  const isEnabled = Boolean(geolocationData);
  return useQuery({
    queryKey: [
      QUERY_KEYS.GET_POSTS_BY_GEOLOCATION,
      geolocationData?.latitude,
      geolocationData?.longitude,
    ],
    // この記述があっているのかわからない。enabledを定義しているのでエラーが投げられる可能性ゼロ。
    queryFn: async () => {
      // await delay(10000);
      if (geolocationData) {
        return searchPostsByGeolocation(geolocationData);
      } else {
        throw new Error('Geolocation data is undefined.');
      }
    },
    enabled: isEnabled,
    refetchInterval: 10 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: NewPost) => createPost(post),
    onSuccess: () => {
      // queryClient.invalidateQueries({
      //   queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      // });
    },
  });
};
