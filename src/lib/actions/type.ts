type GeolocationInfo = {
  latitude: number;
  longitude: number;
  radius: number;
};

type User = {
  id: string;
  name: string;
  profile_image: string;
};

type Post = {
  id: string;
  hasLiked: boolean;
  image: string;
  title: string;
  content: string;
  created_at: string;
  user: User;
  likedCount: number;
};
