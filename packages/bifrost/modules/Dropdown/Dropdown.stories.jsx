import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import { DROPDOWN_TYPES } from './const/dropdownConstants';
import Dropdown from './index';

const defaultConfig = {
  title: 'Application/Components/Dropdown',
  component: Dropdown,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Dropdown from 'bifrost/Dropdown'"}
        />
      )
    }
  },
  argTypes: {
    triggerTitle: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'Lorem ipsum dolor'
    },
    triggerVariant: {
      control: { type: 'inline-radio' },
      type: { summary: DROPDOWN_TYPES.join(', '), required: false },
      options: DROPDOWN_TYPES,
      description: 'Lorem siet'
    },
    headerVisible: {
      control: { type: 'boolean' },
      type: { summary: 'BOOLEAN', required: false },
      description: 'Lorem amit',
      defaultValue: false
    },
    heading: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'Lorem Ipsum',
      defaultValue: 'Lorem'
    },
    subHeading: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'Lorem Ipsum',
      defaultValue: 'Ipsum'
    },
    options: {
      defaultValue: [
        {
          id: '1',
          body: 'Edit'
        },
        {
          id: '2',
          body: 'Duplicate',
          divider: false
        },
        {
          id: '3',
          body: 'Archive',
          divider: true
        }
      ]
    }
  },
  controls: {}
};
const Template = (args) => (
  <div className="flex justify-center">
    <Dropdown {...args} />
  </div>
);
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
