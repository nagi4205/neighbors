export const sidebarLists = [
  {
    type: 'link',
    imgURL: '/assets/home.svg',
    route: '/',
    label: 'Home',
  },
  {
    type: 'link',
    imgURL: '/assets/search.svg',
    route: '/search',
    label: 'Search',
  },
  {
    type: 'button',
    imgURL: '/assets/note-pencil.svg',
    route: '/create-thread',
    label: 'Create Thread',
  },
  {
    type: 'link',
    imgURL: '/assets/heart.svg',
    route: '/activity',
    label: 'Activity',
  },
  {
    type: 'link',
    imgURL: '/assets/community.svg',
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
