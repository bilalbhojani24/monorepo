import React from 'react';

import { MEDIA_CARD_STATUS } from '../../GalleryMedia/const/GalleryMediaConstants';
import { TrashIcon } from '../../Icon';

import file from './test.pdf';

export const DummyData = [
  {
    title: 'lorem some file.jsx',
    subTitle: 'sub-lorem',
    icon: (
      <TrashIcon
        className="text-base-700 h-4 cursor-pointer"
        aria-hidden="true"
      />
    ),
    status: MEDIA_CARD_STATUS[0],
    selected: true,
    id: 1,
    file: 'https://rb.gy/3b4b0'
  },

  {
    title: 'ipsum lorem some file.jsx',
    subTitle: 'sub-ipsum',
    icon: (
      <TrashIcon
        className="text-base-700 h-4 cursor-pointer"
        aria-hidden="true"
      />
    ),
    status: MEDIA_CARD_STATUS[1],
    selected: true,
    id: 2
  },

  {
    title: 'dolor sub-dolor.ts',
    subTitle: 'Meta Data',
    icon: (
      <TrashIcon
        className="text-base-700 h-4 cursor-pointer"
        aria-hidden="true"
      />
    ),
    status: MEDIA_CARD_STATUS[2],
    selected: false,
    id: 3
  },

  {
    title: 'lorem some file.jsx',
    subTitle: 'sub-lorem',
    icon: (
      <TrashIcon
        className="text-base-700 h-4 cursor-pointer"
        aria-hidden="true"
      />
    ),
    status: MEDIA_CARD_STATUS[3],
    selected: true,
    id: 4,
    file: 'https://rb.gy/3b4b0'
  },

  {
    title: 'ipsum.lorem.some.file.jsx',
    subTitle: 'sub-ipsum',
    icon: (
      <TrashIcon
        className="text-base-700 h-4 cursor-pointer"
        aria-hidden="true"
      />
    ),
    status: MEDIA_CARD_STATUS[4],
    selected: false,
    file,
    id: 5
  },

  {
    title: 'ipsum lorem some really big file.jsx',
    subTitle: 'sub-ipsum',
    icon: (
      <TrashIcon
        className="text-base-700 h-4 cursor-pointer"
        aria-hidden="true"
      />
    ),
    status: MEDIA_CARD_STATUS[5],
    selected: false,
    id: 6
  }
];
