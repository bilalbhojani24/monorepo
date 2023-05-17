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

import { DummyData } from './const/GalleryConstants';
import Gallery from './index';

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
        backdropWrapperClassName="bg-brand-300"
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
        <GalleryMedia data={DummyData} />
      </div>
      <GalleryMediaFooterButton wrapperClassName="mt-7 py-2 block mx-auto px-32">
        See All
      </GalleryMediaFooterButton>
    </>
  ),
  wrapperClassName: ''
};

export const GalleryExampleWPreview = () => {
  const [data, setData] = useState(DummyData);
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

    if (clickedItem?.status === MEDIA_CARD_STATUS[4]) {
      window.open(clickedItem.file);
      return;
    }

    setPreviewItem(clickedItem);
  };

  const handleBulkSelect = (e) => {
    if (e.target.checked) {
      setData(
        data.map((item) => ({
          ...item,
          selected: true
        }))
      );
      setSelectedItems(data);
    } else {
      setData(
        data.map((item) => ({
          ...item,
          selected: false
        }))
      );
      setSelectedItems([]);
    }
  };

  return (
    <Gallery className="h-full w-full">
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
          <>
            {previewItem?.status === MEDIA_CARD_STATUS[0] && (
              <img src={previewItem?.file} alt={previewItem?.subTitle} />
            )}
          </>
        }
        visible={!!previewItem}
      />
      {selectedItems.length > 0 && (
        <GalleryMediaActionbar
          primaryActions={
            <div className="flex items-center gap-3">
              <Checkbox border={false} onChange={(e) => handleBulkSelect(e)} />
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
  );
};

export default defaultConfig;
export { Primary };
