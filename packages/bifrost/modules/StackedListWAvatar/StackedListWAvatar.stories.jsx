import React from 'react';
import StackedListWAvatar from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { STACK_LIST_MODES } from './const/stackedListWAvatarConstants';

const list = [
  {
    id: 1,
    heading: 'Velit placeat sit ducimus non sed',
    subHeading: 'Gloria Roberston',
    link: '#',
    textAside: 'ipsum',
    avatar: (
      <img
        className="h-10 w-10 rounded-full"
        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
    ),
  },
  {
    id: 2,
    heading: 'Velit placeat sit ducimus non sed',
    subHeading: 'Gloria Roberston',
    textAside: 'lorem',
    link: '#',
    avatar: (
      <img
        className="h-10 w-10 rounded-full"
        src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
    ),
  },
];

const defaultConfig = {
  title: 'Application/Components/StackedListWAvatar',
  component: StackedListWAvatar,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import StackedListWAvatar from 'bifrost/StackedListWAvatar'"} />;
      },
    },
  },
  argTypes: {
    list: {
      defaultValue: list,
      type: { summary: 'OBJECT', required: true },
      description: 'List of items to be covered in Stacked list',
      control: { type: 'object' },
    },
    format: {
      defaultValue: STACK_LIST_MODES[0],
      options: STACK_LIST_MODES,
      control: { type: 'select' },
      description: 'Format of single column stack list component',
      type: { summary: 'STRING', required: true },
    },
    action: {
      defaultValue: {
        variant: 'white',
        buttonType: 'half-rounded-button',
        wrapperClassName: 'flex w-full justify-center',
        onClick: () => console.log('button clicked'),
      },
      type: { summary: 'OBJECT', required: false },
      description: 'Action to be conducted',
      control: { type: 'object' },
    },
    avatarVisible: {
      control: { type: 'boolean' },
      description: 'Hide/Show avatar',
      type: { summary: 'BOOLEAN', required: false },
      defaultValue: true,
    },
    actionTitle: {
      type: { summary: 'STRING', required: false },
      description: 'Text content of action button',
      control: { type: 'text' },
      defaultValue: 'Demo',
    },
  },
  controls: {},
};
const Template = (args) => <StackedListWAvatar {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { Primary };
