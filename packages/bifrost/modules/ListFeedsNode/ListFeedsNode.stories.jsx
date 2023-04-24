import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import {
  LF_ICON_COLOR,
  LF_ICON_CONTAINER_SIZE,
  LF_ICON_SIZE,
  LF_ICON_VARIANT,
  LF_MARGIN_SIZE
} from '../../shared/listFeedsNodeConstants';
import Badge from '../Badge';
import Checkbox from '../Checkbox';
import { MdFolder } from '../Icon';

import sampleImg from './stories-sample/sample-image.png';
import ListFeedsNode from './index';

const optionRadio = 'inline-radio';

const defaultConfig = {
  title: 'Application/Components/ListFeedsNode',
  component: ListFeedsNode,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import ListFeedsNode from 'bifrost/ListFeedsNode'"}
        />
      )
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/GCu9Z0GTnebRUa5nioN6Yr/branch/0XLJgixcfDRI08weCNGhke/Tailwind-UI-Library?node-id=9622-107985&t=pOBkxJLejoWe2W5H-0'
    }
  },
  argTypes: {
    feedNumber: {
      option: { type: 'null' },
      defaultValue: null
    },
    feedIconSize: {
      control: { type: optionRadio },
      type: { summary: Object.keys(LF_ICON_SIZE).join(', '), required: false },
      options: Object.keys(LF_ICON_SIZE),
      defaultValue: LF_ICON_SIZE.md
    },
    feedIconColor: {
      control: { type: optionRadio },
      type: { summary: Object.keys(LF_ICON_COLOR).join(', '), required: false },
      options: Object.keys(LF_ICON_COLOR),
      defaultValue: LF_ICON_COLOR.brand
    },
    feedIconVariant: {
      control: { type: optionRadio },
      type: {
        summary: Object.keys(LF_ICON_VARIANT).join(', '),
        required: false
      },
      options: Object.keys(LF_ICON_VARIANT),
      defaultValue: LF_ICON_VARIANT.dark
    },
    feedIconContainerSize: {
      control: { type: optionRadio },
      type: {
        summary: Object.keys(LF_ICON_CONTAINER_SIZE).join(', '),
        required: false
      },
      options: Object.keys(LF_ICON_CONTAINER_SIZE),
      defaultValue: LF_ICON_CONTAINER_SIZE.md
    },
    spacing: {
      control: { type: optionRadio },
      type: {
        summary: Object.keys(LF_MARGIN_SIZE).join(', '),
        required: false
      },
      options: Object.keys(LF_MARGIN_SIZE),
      defaultValue: LF_MARGIN_SIZE.default
    },
    showConnector: {
      option: { type: 'boolean' },
      defaultValue: true
    },
    isFeedIconBorder: {
      option: { type: 'boolean' },
      defaultValue: true
    },
    feedIcon: {
      option: { type: null },
      defaultValue: <MdFolder />
    },
    headerNode: {
      option: { type: null },
      defaultValue: <p>Header Node</p>
    },
    descriptionNode: {
      option: { type: null },
      defaultValue: null
    },
    footerNode: {
      option: { type: null },
      defaultValue: null
    }
  },
  controls: {}
};

const sampleFeedPrimary = [
  {
    feedNumber: 1
  },
  {
    feedNumber: 2
  },
  {
    feedNumber: 3
  }
];

const sampleFeedVariousSizes = [
  {
    feedNumber: 1,
    iconSize: LF_ICON_SIZE.lg
  },
  {
    feedNumber: 2,
    iconSize: LF_ICON_SIZE.md
  },
  {
    feedNumber: 3,
    iconSize: LF_ICON_SIZE.sm
  }
];

const Template = (args) =>
  sampleFeedPrimary.map((el) => (
    <ListFeedsNode
      {...args}
      feedNumber={
        <p className="text-base-400 text-center text-xs leading-5">
          {el.feedNumber}
        </p>
      }
      headerNode={
        <>
          <div className="flex">
            <p className="text-base-500 text-sm">
              <b className="text-base-800">Nathan Elliss</b> added a T
              result:&nbsp;
            </p>
            <Badge text="Passed" modifier="success" />
          </div>
          <p className="text-base-500 text-sm">Jan 26, 2023 | 3:20 PM (IST)</p>
        </>
      }
      descriptionNode={
        <p className="text-base-700 text-sm">
          I Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis
          minus animi nam natus. Ex commodi temporibus possimus rem eveniet
          repellendus inventore sapiente mollitia excepturi, magni incidunt est
          necessitatibus nemo harum!
        </p>
      }
    />
  ));

const FeedIconSizesTemplate = (args) =>
  sampleFeedVariousSizes.map((el) => (
    <ListFeedsNode
      {...args}
      feedNumber={
        <p className="text-base-400 text-center text-xs leading-5">
          {el.feedNumber}
        </p>
      }
      feedIconSize={el.iconSize}
      feedIconContainerSize={LF_ICON_SIZE.lg}
      headerNode={
        <>
          <div className="flex">
            <p className="text-base-500 text-sm">
              <b className="text-base-800">Nathan Ellises</b> added a a
              result:&nbsp;
            </p>
            <Badge text="Passed" modifier="success" />
          </div>
          <p className="text-base-500 text-sm">Jan 27, 2023 | 3:20 PM (IST)</p>
        </>
      }
      descriptionNode={
        <p className="text-base-700 text-sm">
          P Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis
          minus animi nam natus. Ex commodi temporibus possimus rem eveniet
          repellendus inventore sapiente mollitia excepturi, magni incidunt est
          necessitatibus nemo harum!
        </p>
      }
    />
  ));

const FeedWithImageTemplate = (args) =>
  sampleFeedPrimary.map((el) => (
    <ListFeedsNode
      {...args}
      feedNumber={
        <p className="text-base-400 text-center text-xs leading-5">
          {el.feedNumber}
        </p>
      }
      feedIcon={
        <img src={sampleImg} className="w-full" alt="Sample Feed Title" />
      }
      headerNode={
        <>
          <div className="flex">
            <p className="text-base-500 text-sm">
              <b className="text-base-800">Nathan Ellis</b> added a
              result:&nbsp;
            </p>
            <Badge text="Passed" modifier="success" />
          </div>
          <p className="text-base-500 text-sm">Jan 25, 2023 | 3:20 PM (IST)</p>
        </>
      }
      descriptionNode={
        <p className="text-base-700 text-sm">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis
          minus animi nam natus. Ex commodi temporibus possimus rem eveniet
          repellendus inventore sapiente mollitia excepturi, magni incidunt est
          necessitatibus nemo harum!
        </p>
      }
    />
  ));

const FeedWithCheckboxTemplate = (args) =>
  sampleFeedPrimary.map((el) => (
    <ListFeedsNode
      {...args}
      feedNumber={
        <p className="text-base-400 text-center text-xs leading-5">
          {el.feedNumber}
        </p>
      }
      feedIcon={
        <Checkbox
          data={{ value: el.feedNumber }}
          id={el.feedNumber}
          border={false}
          name="list-feed"
        />
      }
      isFeedIconBorder={false}
      headerNode={
        <label htmlFor={`list-feed${el.feedNumber}`}>
          <div className="flex select-none">
            <p className="text-base-500 text-sm">
              <b className="text-base-800">Nathan Ellis2</b> added a ap
              result:&nbsp;
            </p>
            <Badge text="Passed" modifier="success" />
          </div>
          <p className="text-base-500 text-sm">Jan 29, 2023 | 3:20 PM (IST)</p>
        </label>
      }
      descriptionNode={
        <p className="text-base-700 text-sm">
          pLorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis
          minus animi nam natus. Ex commodi temporibus possimus rem eveniet
          repellendus inventore sapiente mollitia excepturi, magni incidunt est
          necessitatibus nemo harum!
        </p>
      }
    />
  ));

const FeedWithHoverTemplate = (args) =>
  sampleFeedPrimary.map((el) => (
    <ListFeedsNode
      {...args}
      feedNumber={
        <p className="text-base-400 text-center text-xs leading-5">
          {el.feedNumber}
        </p>
      }
      headerNode={
        <>
          <div className="flex">
            <p className="text-base-500 text-sm">
              <b className="text-base-800">Nathan Ellis</b> added a
              result:&nbsp;
            </p>
            <Badge text="Passed" modifier="success" />
          </div>
          <p className="text-base-500 text-sm">Jan 25, 2023 | 3:20 PM (IST)</p>
        </>
      }
      descriptionNode={
        <p className="text-base-700 text-sm">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis
          minus animi nam natus. Ex commodi temporibus possimus rem eveniet
          repellendus inventore sapiente mollitia excepturi, magni incidunt est
          necessitatibus nemo harum!
        </p>
      }
      footerNode={
        <div
          className="flex h-4 cursor-pointer flex-col justify-center bg-white"
          tabIndex="0"
          role="button"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              console.log('Clicked');
            }
          }}
          onClick={() => console.log('Clicked')}
        >
          <hr className="text-brand-500" />
        </div>
      }
    />
  ));

const Primary = Template.bind({});
const FeedIconSizes = FeedIconSizesTemplate.bind({});
const FeedWithImage = FeedWithImageTemplate.bind({});
const FeedWithCheckbox = FeedWithCheckboxTemplate.bind({});
const FeedWithHover = FeedWithHoverTemplate.bind({});
Primary.parameters = {
  controls: {}
};
FeedWithCheckbox.args = {
  isFeedIconBorder: false,
  feedIconColor: LF_ICON_COLOR.white
};

export default defaultConfig;
export {
  FeedIconSizes,
  FeedWithCheckbox,
  FeedWithHover,
  FeedWithImage,
  Primary
};
