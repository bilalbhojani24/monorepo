import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';
import Checkbox from '../Checkbox';
import GalleryMedia from '../GalleryMedia';
import { MEDIA_CARD_STATUS } from '../GalleryMedia/const/GalleryMediaConstants';
import GalleryMediaActionbar from '../GalleryMediaActionbar';
import GalleryMediaFooterButton from '../GalleryMediaFooterButton';
import GalleryPreview from '../GalleryPreview';
import {
  HiOutlineDownload,
  MdContentCopy,
  MinusIcon,
  PlusIcon,
  TrashIcon
} from '../Icon';

import Gallery from './index';

const dummyData = [
  {
    title: 'lorem some file.jsx',
    subTitle: 'sub-lorem',
    icon: <TrashIcon className="text-base-700 h-4" aria-hidden="true" />,
    status: MEDIA_CARD_STATUS[0]
  },

  {
    title: 'ipsum lorem some file.jsx',
    subTitle: 'sub-ipsum',
    icon: <TrashIcon className="text-base-700 h-4" aria-hidden="true" />,
    status: MEDIA_CARD_STATUS[1]
  },

  {
    title: 'dolor sub-dolor.ts',
    subTitle: 'Meta Data',
    icon: <TrashIcon className="text-base-700 h-4" aria-hidden="true" />,
    status: MEDIA_CARD_STATUS[2]
  },

  {
    title: 'lorem some file.jsx',
    subTitle: 'sub-lorem',
    icon: <TrashIcon className="text-base-700 h-4" aria-hidden="true" />,
    status: MEDIA_CARD_STATUS[3]
  },

  {
    title: 'ipsum.lorem.some.file.jsx',
    subTitle: 'sub-ipsum',
    icon: <TrashIcon className="text-base-700 h-4" aria-hidden="true" />,
    status: MEDIA_CARD_STATUS[4]
  },

  {
    title: 'ipsum lorem some really big file.jsx',
    subTitle: 'sub-ipsum',
    icon: <TrashIcon className="text-base-700 h-4" aria-hidden="true" />,
    status: MEDIA_CARD_STATUS[5]
  }
];

const defaultConfig = {
  title: 'Application/Components/Gallery',
  component: Gallery,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Gallery from 'bifrost/Gallery'"}
        />
      )
    }
  },
  argTypes: {
    galleryItems: {
      defaultValue: [
        {
          title: 'lorem',
          subTitle: 'sub lorem',
          action: <TrashIcon />,
          thumbnail:
            'https://images.pexels.com/photos/1843717/pexels-photo-1843717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          key: '1'
        }
      ]
    }
  },
  controls: {}
};
const Template = (args) => <Gallery {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

Primary.args = {
  children: (
    <>
      <GalleryPreview
        bottomAction={
          <div>
            <Button
              wrapperClassName="rounded-r-none"
              colors="white"
              icon={<MinusIcon className="mx-auto h-5 w-5" />}
              isIconOnlyButton
            />
            <Button
              wrapperClassName="rounded-l-none"
              colors="white"
              icon={<PlusIcon className="mx-auto h-5 w-5" />}
              isIconOnlyButton
            />
          </div>
        }
      />
      <GalleryMediaActionbar
        primaryActions={
          <div className="flex items-center gap-3">
            <Checkbox border={false} />
            <p className="text-base-900 text-sm font-medium leading-5">
              sit amet consectetur adipisicing elit.
            </p>
          </div>
        }
        secondaryActions={
          <div className="flex gap-3">
            <MdContentCopy
              className="h-5 w-5 cursor-pointer"
              aria-hidden="true"
            />
            <HiOutlineDownload
              className="h-5 w-5 cursor-pointer"
              aria-hidden="true"
            />
            <TrashIcon className="h-5 w-5 cursor-pointer" aria-hidden="true" />
          </div>
        }
      />
      <div className="grid grid-cols-6 gap-3">
        {dummyData.map((dummyItem, id) => (
          <GalleryMedia
            key={`${id + 1}`}
            title={dummyItem.title}
            subTitle={dummyItem.subTitle}
            icon={dummyItem.icon}
            status={dummyItem.status}
          />
        ))}
      </div>
      <GalleryMediaFooterButton wrapperClassName="mt-7 py-2 block mx-auto px-32">
        See All
      </GalleryMediaFooterButton>
    </>
  ),
  wrapperClassName: ''
};

export default defaultConfig;
export { Primary };
