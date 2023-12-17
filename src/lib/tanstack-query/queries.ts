import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/tanstack-query/queryKeys';
import { getGeolocation, reverseGeocoding } from '@/lib/actions/post.action';
import {
  searchPostsByGeolocation,
  searchPostsByFollowingUsers,
  searchCommunitiesByGeolocation,
  createPost,
  createCommunity,
} from '../laravel/api';

// type GeolocationData = {
//   latitude: number;
//   longitude: number;
// };

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const useGeolocation = () => {
  return useQuery<GeolocationData, Error>({
    queryKey: [QUERY_KEYS.GET_GEOLOCATION],
    queryFn: getGeolocation,
    gcTime: 5 * 60 * 1000, // キャッシュの時間をここで設定できます。
    refetchInterval: 60 * 1000, // 3０秒ごとに位置情報を再取得します。
    refetchOnWindowFocus: false, // ウィンドウフォーカス時には再フェッチしない。
  });
};

// 地名を取得するためのカスタムフック
export const useReverseGeocoding = (geolocationData?: GeolocationData) => {
  return useQuery<LocationData>({
    queryKey: [
      QUERY_KEYS.GET_REVERSE_GEOCODING,
      geolocationData?.latitude,
      geolocationData?.longitude,
    ],
    queryFn: () => reverseGeocoding(geolocationData!),
    enabled: !!geolocationData, // latitudeとlongitudeが有効な場合のみクエリを実行
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
    refetchInterval: 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useGetPostsByFollowingUsers = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POSTS_BY_FOLLOWINGUSERS],
    queryFn: async () => {
      // await delay(10000);
      return searchPostsByFollowingUsers();
    },
    refetchInterval: 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useGetCommunitiesByGeolocation = (
  geolocationData?: GeolocationData
) => {
  // // isEnabled をgeolocationDataの有無と正確な型で計算
  // const isEnabled = Boolean(geolocationData);
  return useQuery({
    queryKey: [
      QUERY_KEYS.GET_COMMUNITIES_BY_GEOLOCATION,
      geolocationData?.latitude,
      geolocationData?.longitude,
    ],
    // この記述があっているのかわからない。enabledを定義しているのでエラーが投げられる可能性ゼロ。
    queryFn: async () => {
      // await delay(10000);
      if (geolocationData) {
        return searchCommunitiesByGeolocation(geolocationData);
      } else {
        throw new Error('Geolocation data is undefined.');
      }
    },
    // enabled: isEnabled,
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

export const useCreateCommunity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (community: NewCommunity) => createCommunity(community),
    onSuccess: () => {
      // queryClient.invalidateQueries({
      //   queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      // });
    },
  });
};
