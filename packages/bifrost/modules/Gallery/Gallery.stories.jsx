import React, { useState } from 'react';

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
    icon: (
      <TrashIcon
        className="text-base-700 h-4 cursor-pointer"
        aria-hidden="true"
      />
    ),
    status: MEDIA_CARD_STATUS[0],
    selected: true,
    id: 1,
    thumbnail: 'https://rb.gy/3b4b0'
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
    thumbnail: 'https://rb.gy/3b4b0'
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
      defaultValue: []
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
        topAction={
          <div className="bg-base-900 absolute left-0 top-0 flex w-full justify-between p-5 text-white">
            <div className="flex items-center gap-3">
              <p className="text-sm font-medium leading-5 text-white">
                sit amet consectetur adipisicisng elit.
              </p>
            </div>
            <div className="flex gap-3">
              <MdContentCopy
                className="h-5 w-5 cursor-pointer"
                aria-hidden="true"
              />
              <HiOutlineDownload
                className="h-5 w-5 cursor-pointer"
                aria-hidden="true"
              />
              <TrashIcon
                className="h-5 w-5 cursor-pointer"
                aria-hidden="true"
              />
            </div>
          </div>
        }
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
              sit amet consectetur adispisicing elit.
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
      <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        <GalleryMedia data={dummyData} />
      </div>
      <GalleryMediaFooterButton wrapperClassName="mt-7 py-2 block mx-auto px-32">
        See All
      </GalleryMediaFooterButton>
    </>
  ),
  wrapperClassName: ''
};

export const WorkingExample = () => {
  const [data, setData] = useState(dummyData);
  // const [previewVisible, setPreviewVisible] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);

  const [selectedItems, setSelectedItems] = useState(
    data.filter((item) => item.selected)
  );

  const handleMediaUpdate = (change, id) => {
    const dupData = [...data];
    const res = dupData.find((item) => item.id === id);
    res.selected = change;
    setData(dupData);
    setSelectedItems(data.filter((item) => item.selected));
  };

  const handleCardClick = (id) => {
    const clickedItem = data.find((item) => item.id === id);
    if (
      clickedItem?.status === MEDIA_CARD_STATUS[1] ||
      clickedItem?.status === MEDIA_CARD_STATUS[2] ||
      clickedItem?.status === MEDIA_CARD_STATUS[3] ||
      clickedItem?.status === MEDIA_CARD_STATUS[5]
    )
      return;
    setPreviewItem(clickedItem);
  };

  const handleBulkSelect = (e) => {
    if (e.target.checked) {
      setData(
        dummyData.map((item) => ({
          ...item,
          selected: true
        }))
      );
      setSelectedItems(data);
    } else {
      setData(
        dummyData.map((item) => ({
          ...item,
          selected: false
        }))
      );
      setSelectedItems([]);
    }
  };

  return (
    <>
      <GalleryPreview
        onClose={() => setPreviewItem(null)}
        topAction={
          <div className="bg-base-900 absolute left-0 top-0 flex w-full justify-between p-5 text-white">
            <div className="flex items-center gap-3">
              <p className="text-sm font-medium leading-5 text-white">
                {previewItem?.title}
              </p>
            </div>
            <div className="flex gap-3">
              <MdContentCopy
                className="h-5 w-5 cursor-pointer"
                aria-hidden="true"
              />
              <HiOutlineDownload
                className="h-5 w-5 cursor-pointer"
                aria-hidden="true"
              />
              <TrashIcon
                className="h-5 w-5 cursor-pointer"
                aria-hidden="true"
              />
            </div>
          </div>
        }
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
        content={
          previewItem?.status === MEDIA_CARD_STATUS[0] && (
            <img src={data[0].thumbnail} alt={data[0].subTitle} />
          )
        }
        visible={!!previewItem}
      />
      <Gallery className="h-full w-full">
        {selectedItems.length > 0 && (
          <GalleryMediaActionbar
            primaryActions={
              <div className="flex items-center gap-3">
                <Checkbox
                  border={false}
                  onChange={(e) => handleBulkSelect(e)}
                />
                <p className="text-base-900 text-sm font-medium leading-5">
                  {selectedItems.length} item(s) selected
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
                <TrashIcon
                  className="h-5 w-5 cursor-pointer"
                  aria-hidden="true"
                />
              </div>
            }
          />
        )}
        <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          <GalleryMedia
            onCardClick={(id) => handleCardClick(id)}
            data={data}
            onChange={(status, id) => handleMediaUpdate(status, id)}
          />
        </div>
        <GalleryMediaFooterButton wrapperClassName="mt-7 py-2 block mx-auto px-32">
          See All
        </GalleryMediaFooterButton>
      </Gallery>
    </>
  );
};

export default defaultConfig;
export { Primary };
