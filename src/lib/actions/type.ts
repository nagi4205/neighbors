type GeolocationInfo = {
  latitude: number;
  longitude: number;
  radius: number;
};

type Post = {
  id: string;
  hasLiked: boolean;
  image: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
  likedCount: number;
};
