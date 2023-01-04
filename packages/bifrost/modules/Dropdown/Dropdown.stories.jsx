import React from 'react';
import Dropdown from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { DROPDOWN_TYPES } from './const/dropdownConstants';

const defaultConfig = {
  title: 'Application/Components/Dropdown',
  component: Dropdown,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import Dropdown from 'bifrost/Dropdown'"} />;
      }
    }
  },
  argTypes: {
    triggerTitle: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'Lorem Ipsum'
    },
    dividerRequired: {
      control: { type: 'boolean' },
      type: { summary: 'BOOLEAN', required: false },
      description: 'Lorem Ipsum'
    },
    triggerVariant: {
      control: { type: 'inline-radio' },
      type: { summary: DROPDOWN_TYPES.join(', '), required: false },
      options: DROPDOWN_TYPES,
      description: 'Lorem Ipsum'
    },
    headerRequired: {
      control: { type: 'boolean' },
      type: { summary: 'BOOLEAN', required: false },
      description: 'Lorem Ipsum'
    },
    heading: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'Lorem Ipsum'
    },
    subHeading: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'Lorem Ipsum'
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
