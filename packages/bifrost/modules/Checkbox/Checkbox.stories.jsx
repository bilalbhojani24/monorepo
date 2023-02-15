import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { MdSearch } from '../Icon';

import {
  CHECKBOX_DESCRIPTION_VARIANT,
  CHECKBOX_POSITION_VARIANT
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
      )
    }
  },
  argTypes: {
    border: {
      control: { type: 'boolean' },
      defaultValue: true
    },
    checked: {
      control: { type: 'boolean' },
      defaultValue: undefined
    },
    data: {
      control: { type: null },
      defaultValue: {
        value: '1',
        label: 'Annette Black',
        description: 'Get notified when someones posts a comment on a posting'
      }
    },
    defaultChecked: {
      control: { type: 'boolean' },
      defaultValue: true
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false
    },
    description: {
      options: CHECKBOX_DESCRIPTION_VARIANT,
      control: { type: 'inline-radio' },
      defaultValue: CHECKBOX_DESCRIPTION_VARIANT.none
    },
    icon: {
      defaultValue: null
    },
    indeterminate: {
      control: { type: 'boolean' },
      defaultValue: false
    },
    isCard: {
      control: { type: 'boolean' },
      defaultValue: false
    },
    name: {
      options: { type: 'string' },
      defaultValue: 'checkbox'
    },
    onChange: {
      control: { type: null },
      defaultValue: (event) => {
        console.log(event.target.checked);
      }
    },
    position: {
      options: CHECKBOX_POSITION_VARIANT,
      control: { type: 'inline-radio' },
      defaultValue: CHECKBOX_POSITION_VARIANT.left
    },
    wrapperClassName: {
      options: { type: 'string' },
      defaultValue: ''
    }
  },
  controls: {}
};
const Template = (args) => <Checkbox {...args} />;
const ControlledCheckboxTemplate = (args) => <Checkbox {...args} />;
const CheckboxWithIconTemplate = (args) => <Checkbox {...args} />;
const CheckboxPrimary = Template.bind({});
const ControlledCheckbox = ControlledCheckboxTemplate.bind({});
const CheckboxWithIcon = CheckboxWithIconTemplate.bind({});

CheckboxPrimary.parameters = {};

export default defaultConfig;
export { CheckboxPrimary, CheckboxWithIcon, ControlledCheckbox };

ControlledCheckbox.args = {
  checked: true,
  defaultChecked: undefined
};

CheckboxWithIcon.args = {
  icon: <MdSearch className="h-4 w-4" />
};
