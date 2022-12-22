import { CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, UsersIcon } from '../../Icon';

export const navs = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    activeIcon: HomeIcon,
    inActiveIcon: HomeIcon,
    path: '/',
    badgeLabel: 'Active'
  },
  {
    id: 'team',
    label: 'Team',
    activeIcon: UsersIcon,
    inActiveIcon: UsersIcon,
    path: '/team'
  },
  {
    id: 'project',
    label: 'Projects',
    activeIcon: FolderIcon,
    inActiveIcon: FolderIcon,
    path: '/projects',
    badgeLabel: 'Active'
  },
  {
    id: 'calendar',
    label: 'Calendar',
    activeIcon: CalendarIcon,
    inActiveIcon: CalendarIcon,
    path: '/calendar'
  },
  {
    id: 'document',
    label: 'Documents',
    activeIcon: InboxIcon,
    inActiveIcon: InboxIcon,
    path: '/documents',
    childrens: [
      { id: 'document__adhar', label: 'Adhar', path: '/adhar' },
      { id: 'document__pancard', label: 'Pancard', path: '/pancard' }
    ]
  },
  {
    id: 'report',
    label: 'Reports',
    activeIcon: ChartBarIcon,
    inActiveIcon: ChartBarIcon,
    path: '/reports',
    childrens: [
      { id: 'report__finance', label: 'Finance', path: '/finance' },
      { id: 'report__team', label: 'Team', path: '/team' }
    ]
  }
];
