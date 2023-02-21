import React from 'react';
import StackedListWTwoColumns from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { CheckCircleIcon, ChevronRightIcon, EnvelopeIcon } from '@heroicons/react/20/solid';
import { STACK_LIST_MODES } from './const/stackedListWTwoColumnsConstants';

const list = [
  {
    id: '1',
    firstColumn: {
      heading: 'Ricardo Cooper',
      subHeading: 'ricardo.cooper@example.com',
      metaNode: <EnvelopeIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-base-400" aria-hidden="true" />
    },
    avatar: (
      <img
        className="h-12 w-12 rounded-full"
        src={
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        }
        alt=""
      />
    ),
    secondColumn: {
      heading: "I'm aside heading",
      subHeading: "I'm aside subheading",
      metaNode: <CheckCircleIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-success-400" aria-hidden="true" />
    },
    href: '#'
  }
];

const defaultConfig = {
  title: 'Application/Components/StackedListWTwoColumns',
  component: StackedListWTwoColumns,
  parameters: {
    docs: {
      page: () => {
        return (
          <DocPageTemplate importStatement={"import StackedListWTwoColumns from 'bifrost/StackedListWTwoColumns'"} />
        );
      }
    }
  },
  argTypes: {
    list: {
      defaultValue: list,
      type: { summary: 'OBJECT', required: false },
      description: 'List of items to be covered in Stacked list',
      control: { type: 'object' }
    },
    format: {
      defaultValue: STACK_LIST_MODES[0],
      options: STACK_LIST_MODES,
      control: { type: 'select' },
      description: 'Format of two column stack list component',
      type: { summary: 'STRING', required: false }
    },
    badgeProps: {
      defaultValue: {
        modifier: 'primary'
      },
      type: { summary: 'OBJECT', required: false },
      description: 'Props to be passed into badge component',
      control: { type: 'object' }
    },
    avatarVisible: {
      control: { type: 'boolean' },
      description: 'Hide/Show avatar',
      type: { summary: 'BOOLEAN', required: false },
      defaultValue: true
    }
  },
  controls: {}
};
const Template = (args) => <StackedListWTwoColumns {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
