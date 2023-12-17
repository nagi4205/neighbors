import { Home, Search, PenLine, Heart, Users } from 'lucide-react';

export const sidebarLists = [
  {
    iconComponent: <Home />,
    route: '/home',
    label: 'Home',
  },
  {
    iconComponent: <Search />,
    route: '/search',
    label: 'Search',
  },
  {
    iconComponent: <Heart />,
    route: '/activity',
    label: 'Activity',
  },
  {
    iconComponent: <Users />,
    route: '/communities',
    label: 'Communities',
  },
];

export const PostIcon = {
  iconComponent: <PenLine />,
  label: 'ポストする',
};

export const profileTabs = [
  { value: 'threads', label: 'Threads', icon: '/assets/reply.svg' },
  { value: 'replies', label: 'Replies', icon: '/assets/members.svg' },
  { value: 'tagged', label: 'Tagged', icon: '/assets/tag.svg' },
];

export const communityTabs = [
  { value: 'threads', label: 'Threads', icon: '/assets/reply.svg' },
  { value: 'members', label: 'Members', icon: '/assets/members.svg' },
  { value: 'requests', label: 'Requests', icon: '/assets/request.svg' },
];
