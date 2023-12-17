// 一元化すべき
type GeolocationInfo = {
  latitude: number;
  longitude: number;
  radius: number;
};

type GeolocationData = {
  latitude: number;
  longitude: number;
};

type LocationName = {
  locationName: string;
};

type LocationData = {
  geolocationData: GeolocationData;
  locationName?: LocationName;
};

type User = {
  id: string;
  name: string;
  profile_image: string;
};

enum FetchType {
  followingUsers = 'followingUsers',
}

type Post = {
  id: string;
  hasLiked?: boolean;
  image?: string;
  content: string;
  createdAt: string;
  author: User;
  likedCount?: number;
  locationName?: string;
};

type Community = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  owner: User;
  locationData: LocationData;
};

type NewPost = {
  content: string;
  locationData?: LocationData; // friendだけの投稿の場合は、GeolocationDataは必要ないため。
};

type NewCommunity = {
  name: string;
  description?: string;
  geolocationData: GeolocationData; // communityの場合は、GeolocationData必須。
};

type CommunityMessage = {
  id: string;
  content: string;
  author: User;
  created_at: string;
  isAuthor: boolean;
};
