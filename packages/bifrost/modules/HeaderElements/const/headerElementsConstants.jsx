import React from 'react';

import {
  MdAccountCircle,
  MdHelp,
  MdLocalOffer,
  MdNotifications,
  MdPersonAddAlt1,
  MdSearch
} from '../../Icon';

export const ELEMENTS_WITH_LABEL = [
  {
    name: 'team',
    description: 'Invite my Team',
    icon: <MdPersonAddAlt1 className="text-base-400 h-5 w-5" />,
    link: 'https://www.browserstack.com/accounts/manage-users'
  },
  {
    name: 'pricing',
    description: 'Plan & Pricing',
    icon: <MdLocalOffer className="text-base-400 h-5 w-5" />,
    link: 'https://www.browserstack.com/accounts/subscriptions'
  },
  {
    name: 'help',
    description: 'Get Help',
    icon: <MdHelp className="text-base-400 h-5 w-5" />
  },
  {
    name: 'search',
    icon: <MdSearch className="text-base-400 h-6 w-6" />,
    link: 'https://www.browserstack.com/search'
  },
  {
    name: 'notifications',
    icon: <MdNotifications className="text-base-400 h-6 w-6" />
  },
  {
    name: 'account',
    icon: <MdAccountCircle className="text-base-400 h-6 w-6" />
  }
];
export const ACCOUNT_ARRAY = [
  { name: 'Summary', link: 'https://www.browserstack.com/accounts/profile' },
  {
    name: 'User Management',
    link: 'https://www.browserstack.com/accounts/manage-users'
  },
  {
    name: 'Integrations',
    link: 'https://www.browserstack.com/accounts/integrations'
  },
  { name: 'Settings', link: 'https://www.browserstack.com/accounts/settings' },
  { name: 'Support', link: '' },
  { name: 'Contact', link: 'https://www.browserstack.com/contact?ref=header' }
];
