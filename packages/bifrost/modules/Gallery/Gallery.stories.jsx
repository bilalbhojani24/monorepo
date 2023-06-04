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
  ArrowLongLeftIcon,
  HiOutlineDownload,
  MdContentCopy,
  MdOutlineDelete,
  MinusIcon,
  PlusIcon
} from '../Icon';

import { DummyData } from './const/GalleryConstants';
import Gallery from './index';

const defaultConfig = {
  title: 'Application/Components/Gallery',
  component: Gallery,
  subcomponents: {
    GalleryMedia,
    GalleryMediaActionbar,
    GalleryMediaFooterButton,
    GalleryPreview
  },
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
    <GalleryMedia
      wrapperClassName="grid gap-3 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      data={DummyData}
    />
  ),
  wrapperClassName: ''
};

export const GalleryExampleWPreview = () => {
  const [data, setData] = useState(DummyData);
  const [previewItem, setPreviewItem] = useState(null);
  const [multiSelect, setMultiSelect] = useState(true);

  const [selectedItems, setSelectedItems] = useState(
    data.filter((item) => item.selected)
  );

  const handleMediaUpdate = (change, id) => {
    const dupData = [...data];
    const res = dupData.find((item) => item.id === id);
    res.selected = change;

    const selectedData = data.filter((item) => item.selected);
    // if image is selected enable multiselect mode
    if (
      selectedData.filter((item) => item.status === MEDIA_CARD_STATUS[0])
        .length > 0
    )
      setMultiSelect(true);
    else setMultiSelect(false);

    setData(dupData);
    setSelectedItems(selectedData);
  };

  const handleCardClick = (id) => {
    const clickedItem = data.find((item) => item.id === id);
    // no action for error, loading, video and doc formats
    if (
      clickedItem?.status === MEDIA_CARD_STATUS[1] ||
      clickedItem?.status === MEDIA_CARD_STATUS[2] ||
      clickedItem?.status === MEDIA_CARD_STATUS[3] ||
      clickedItem?.status === MEDIA_CARD_STATUS[5]
    )
      return;

    // open pdf in new tab
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

      // if everything is unselected, multiselect should be disabled as well
      setMultiSelect(false);
    }
  };

  return (
    <Gallery className="h-full w-full">
      <GalleryPreview
        backdropWrapperClassName="bg-base-900"
        onClose={() => setPreviewItem(null)}
        topAction={
          <div className="bg-base-900 absolute left-0 top-0 flex w-full justify-between p-5 text-white">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setPreviewItem(null);
                }}
                aria-label="exit-preview-btn"
              >
                <ArrowLongLeftIcon
                  className="h-6 w-6 text-white"
                  aria-label="go-back-btn"
                />
              </button>
              <p className="text-sm font-medium leading-5 text-white">
                {previewItem?.title}
              </p>
            </div>
            <div className="flex gap-4">
              <MdContentCopy
                className="h-5 w-5 cursor-pointer"
                aria-hidden="true"
              />
              <HiOutlineDownload
                className="h-5 w-5 cursor-pointer"
                aria-hidden="true"
              />
              <MdOutlineDelete
                className="h-5 w-5 cursor-pointer"
                aria-hidden="true"
              />
            </div>
          </div>
        }
        bottomAction={
          <>
            <Button
              variant="minimal"
              wrapperClassName="rounded-r-none focus:border-none bg-white focus:z-10"
              colors="white"
              icon={<MinusIcon className="mx-auto h-5 w-5" />}
              isIconOnlyButton
              aria-label="item-decrease-zoom-btn"
            />
            <Button
              variant="minimal"
              wrapperClassName="rounded-l-none focus:border-none bg-white focus:z-10"
              colors="white"
              icon={<PlusIcon className="mx-auto h-5 w-5" />}
              isIconOnlyButton
              aria-label="item-increase-zoom-btn"
            />
          </>
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
      <GalleryMediaActionbar
        visible={selectedItems.length > 0}
        primaryActions={
          <div className="flex items-center gap-4">
            <Checkbox
              aria-label={`check-${data.label}`}
              name="media-action-bar-chck"
              border={false}
              onChange={(e) => handleBulkSelect(e)}
            />
            <p className="text-base-900 text-sm font-medium leading-5">
              {selectedItems.length} item(s) selected
            </p>
          </div>
        }
        secondaryActions={
          <div className="flex gap-4">
            <MdContentCopy
              className="h-5 w-5 cursor-pointer"
              aria-hidden="true"
            />
            <HiOutlineDownload
              className="h-5 w-5 cursor-pointer"
              aria-hidden="true"
            />
            <MdOutlineDelete
              className="h-5 w-5 cursor-pointer"
              aria-hidden="true"
            />
          </div>
        }
      />
      <GalleryMedia
        wrapperClassName="grid gap-3 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        onCardClick={(id) => handleCardClick(id)}
        data={data}
        onChange={(status, id) => handleMediaUpdate(status, id)}
        alwaysVisible={multiSelect}
      />
      <GalleryMediaFooterButton wrapperClassName="mt-7 py-2 block mx-auto px-32">
        See All
      </GalleryMediaFooterButton>
    </Gallery>
  );
};

export default defaultConfig;
export { Primary };
