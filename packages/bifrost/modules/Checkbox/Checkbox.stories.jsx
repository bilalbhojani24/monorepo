import React from 'react';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

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
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/GCu9Z0GTnebRUa5nioN6Yr/Tailwind-UI-Library?node-id=5554-84213&t=TWCLo3KWhysdxj9F-0'
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

const name = 'Annette Black';

const Template = (args) => <Checkbox {...args} />;
const ControlledCheckboxTemplate = (args) => <Checkbox {...args} />;
const CheckboxWithIconTemplate = (args) => <Checkbox {...args} />;
const CheckboxPrimary = Template.bind({});
CheckboxPrimary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText(name)).toBeVisible();
  await userEvent.click(canvas.getByRole('checkbox'));
  await expect(canvas.getByRole('checkbox')).not.toBeChecked();
  await userEvent.click(canvas.getByRole('checkbox'));
  await expect(canvas.getByRole('checkbox')).toBeChecked();
};

const ControlledCheckbox = ControlledCheckboxTemplate.bind({});
ControlledCheckbox.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText(name)).toBeVisible();
  await userEvent.click(canvas.getByRole('checkbox'));
  await expect(canvas.getByRole('checkbox')).toBeChecked();
};

const CheckboxWithIcon = CheckboxWithIconTemplate.bind({});
CheckboxWithIcon.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText(name)).toBeVisible();
  await userEvent.click(canvas.getByRole('checkbox'));
  await expect(canvas.getByRole('checkbox')).not.toBeChecked();
  await userEvent.click(canvas.getByRole('checkbox'));
  await expect(canvas.getByRole('checkbox')).toBeChecked();
};

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
