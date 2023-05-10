import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { BUTTON_VARIANTS } from '../Button/const/buttonConstants';
import { PlusIcon } from '../Icon';

import { ES_VARIANTS } from './const/emptyStateComstants';
import EmptyState from './index';

const mainIcon = (
  <svg
    className="text-base-400 mx-auto h-12 w-12"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      vectorEffect="non-scaling-stroke"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
    />
  </svg>
);

const defaultConfig = {
  title: 'Application/Components/EmptyState',
  component: EmptyState,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import EmptyState from 'bifrost/EmptyState'"}
        />
      )
    },
    design: {
      type: 'figma',
      url: ''
    }
  },
  argTypes: {
    mainIcon: {
      type: { summary: 'NODE', required: false },
      description: 'ABCDEFGHIJK',
      //   control: { type: null },
      defaultValue: mainIcon
    },
    description: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: 'Get started by creating a new project.'
    },
    buttonProps: {
      type: { summary: 'OBJECT', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'object' },
      defaultValue: {
        children: (
          <>
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            New Project
          </>
        ),
        variant: BUTTON_VARIANTS[0]
      }
    },
    title: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: 'No projects'
    },
    variant: {
      options: ES_VARIANTS,
      control: { type: 'select' },
      defaultValue: ES_VARIANTS[0]
    }
  },
  controls: {}
};
const Template = (args) => <EmptyState {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
