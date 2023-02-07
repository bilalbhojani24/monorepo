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
    discription: 'Invite my Team',
    icon: <MdPersonAddAlt1 className="text-base-400 h-5 w-5" />
  },
  {
    discription: 'Pricing',
    icon: <MdLocalOffer className="text-base-400 h-5 w-5" />
  }
];
export const ELEMENTS_WITH_ICON = [
  {
    name: 'help',
    icon: <MdHelp className="text-base-400 h-6 w-6" />
  },
  {
    name: 'search',
    icon: <MdSearch className="text-base-400 h-6 w-6" />
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
