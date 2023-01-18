import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import {
  CHECKBOX_DESCRIPTION_VARIANT,
  CHECKBOX_POSITION_VARIANT,
} from './const/checkboxConstants';
import Checkbox from './index';

const defaultConfig = {
  title: 'Application/Components/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Checkbox from 'bifrost/Checkbox'"}
        />
      ),
    },
  },
  argTypes: {
    border: {
      control: { type: 'boolean' },
      defaultValue: true,
    },
    checked: {
      control: { type: 'boolean' },
      defaultValue: undefined,
    },
    data: {
      control: { type: null },
      defaultValue: {
        value: '1',
        label: 'Annette Black',
        description: 'Get notified when someones posts a comment on a posting',
      },
    },
    defaultChecked: {
      control: { type: 'boolean' },
      defaultValue: true,
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    description: {
      options: CHECKBOX_DESCRIPTION_VARIANT,
      control: { type: 'inline-radio' },
      defaultValue: CHECKBOX_DESCRIPTION_VARIANT.none,
    },
    indeterminate: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    isCard: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    name: {
      options: { type: 'string' },
      defaultValue: 'checkbox',
    },
    onChange: {
      control: { type: null },
      defaultValue: (event) => {
        console.log(event.target.checked);
      },
    },
    position: {
      options: CHECKBOX_POSITION_VARIANT,
      control: { type: 'inline-radio' },
      defaultValue: CHECKBOX_POSITION_VARIANT.left,
    },
    wrapperClass: {
      options: { type: 'string' },
      defaultValue: '',
    },
  },
  controls: {},
};
const Template = (args) => <Checkbox {...args} />;
const ControlledCheckboxTemplate = (args) => <Checkbox {...args} />;
const CheckboxPrimary = Template.bind({});
const ControlledCheckbox = ControlledCheckboxTemplate.bind({});

CheckboxPrimary.parameters = {};

export default defaultConfig;
export { CheckboxPrimary, ControlledCheckbox };

ControlledCheckbox.args = {
  checked: true,
  defaultChecked: undefined,
};
