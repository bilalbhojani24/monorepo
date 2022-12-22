import React from 'react';
import Checkbox from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { CHECKBOX_DESCRIPTION_VARIANT, CHECKBOX_POSITION_VARIANT, people } from './const/checkboxConstants';

const defaultConfig = {
  title: 'Application/Components/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import Checkbox from 'bifrost/Checkbox'"} />;
      }
    }
  },
  argTypes: {
    border: {
      control: { type: 'boolean' },
      defaultValue: true
    },
    data: {
      control: { type: null },
      defaultValue: people
    },
    description: {
      options: CHECKBOX_DESCRIPTION_VARIANT,
      control: { type: 'inline-radio' },
      defaultValue: CHECKBOX_DESCRIPTION_VARIANT.none
    },
    isCard: {
      control: { type: 'boolean' },
      defaultValue: false
    },
    name: {
      options: { type: 'string' },
      defaultValue: 'checkbox'
    },
    onAllChange: {
      control: { type: null },
      defaultValue: (list, event) => {
        console.log(list);
      }
    },
    onChange: {
      control: { type: null },
      defaultValue: (curr, all, event) => {
        console.log(curr);
        console.log(all);
      }
    },
    position: {
      options: CHECKBOX_POSITION_VARIANT,
      control: { type: 'inline-radio' },
      defaultValue: CHECKBOX_POSITION_VARIANT.left
    },
    wrapperClass: {
      options: { type: 'string' },
      defaultValue: ''
    }
  },
  controls: {}
};
const Template = (args) => <Checkbox {...args} />;
const CheckboxPrimary = Template.bind({});
CheckboxPrimary.parameters = {};

export default defaultConfig;
export { CheckboxPrimary };
