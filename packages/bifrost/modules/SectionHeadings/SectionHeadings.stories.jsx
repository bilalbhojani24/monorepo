import React from 'react';
import SectionHeadings from './index';
import { MagnifyingGlassIcon, BarsArrowUpIcon, ChevronDownIcon } from '../Icon/index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { SH_VARIANTS } from './const/sectionHeadingsConstants';
import { BUTTON_SIZES, BUTTON_VARIANTS } from '../Button/const/buttonConstants';
import { BADGE_MODIFIER, BADGE_SIZE } from '../Badge/const/badgeConstants';

const tabs = [
  { name: 'Applied' },
  { name: 'Phone Screening' },
  { name: 'Interview' },
  { name: 'Offer' },
  { name: 'Hired' }
];

const dropDownOptions = [
  {
    name: 'Edit'
  },
  {
    name: 'Duplicate'
  }
];

const defaultConfig = {
  title: 'Application/Components/SectionHeadings',
  component: SectionHeadings,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import SectionHeadings from 'bifrost/SectionHeadings'"} />;
      }
    }
  },
  argTypes: {
    title: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: 'Job Postings'
    },
    subTitle: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: 'in Engineering'
    },
    description: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: ''
    },
    primaryButtonProps: {
      type: { summary: 'OBJECT', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'object' },
      defaultValue: {
        children: 'Share',
        variant: BUTTON_VARIANTS[2],
        size: BUTTON_SIZES[3]
      }
    },
    secondaryButtonProps: {
      type: { summary: 'OBJECT', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'object' },
      defaultValue: {
        children: 'Create',
        size: BUTTON_SIZES[3]
      }
    },
    badgeProps: {
      type: { summary: 'OBJECT', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'object' },
      defaultValue: {
        text: 'Open',
        modifier: BADGE_MODIFIER[2],
        size: BADGE_SIZE[1]
      }
    },
    dropdownProps: {
      type: { summary: 'OBJECT', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'object' },
      defaultValue: {
        options: dropDownOptions,
        triggerVariant: 'meatball-button'
      }
    },
    tabsProps: {
      type: { summary: 'OBJECT', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'object' },
      defaultValue: { tabsArray: tabs }
    },
    inputProps: {
      type: { summary: 'OBJECT', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'object' },
      defaultValue: {
        placeholder: 'Search',
        icon: <MagnifyingGlassIcon className="h-5 w-5 text-base-400" aria-hidden="true" />,
        buttonElement: (
          <div className="inline-flex items-center ">
            <BarsArrowUpIcon className="h-5 w-5 text-base-400" aria-hidden="true" />
            <span className="ml-2">Sort</span>
            <ChevronDownIcon className="ml-2.5 -mr-1.5 h-5 w-5 text-base-400" aria-hidden="true" />
          </div>
        )
      }
    },
    variant: {
      options: SH_VARIANTS,
      control: { type: 'select' },
      defaultValue: SH_VARIANTS[1]
    }
  },
  controls: {}
};
const Template = (args) => <SectionHeadings {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
