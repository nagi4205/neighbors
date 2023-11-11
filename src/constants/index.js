import { Home, Search, PenLine, Heart, Users } from 'lucide-react';

export const sidebarLists = [
  {
    type: 'link',
    iconComponent: <Home />,
    route: '/home',
    label: 'Home',
  },
  {
    type: 'link',
    iconComponent: <Search />,
    route: '/search',
    label: 'Search',
  },
  {
    type: 'button',
    iconComponent: <PenLine />,
    route: '/create-thread',
    label: 'Create Thread',
  },
  {
    type: 'link',
    iconComponent: <Heart />,
    route: '/activity',
    label: 'Activity',
  },
  {
    type: 'link',
    iconComponent: <Users />,
    route: '/communities',
    label: 'Communities',
  },
  // {
  //   imgURL: '/assets/user.svg',
  //   route: '/profile',
  //   label: 'Profile',
  // },
];

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
