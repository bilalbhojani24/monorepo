import React from 'react';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import TextArea from './index';

const defaultConfig = {
  title: 'Application/Components/TextArea',
  component: TextArea,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import TextArea from 'bifrost/TextArea'"}
        />
      )
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/GCu9Z0GTnebRUa5nioN6Yr/Tailwind-UI-Library?node-id=1872-11722&t=TWCLo3KWhysdxj9F-0'
    }
  },
  argTypes: {
    id: {
      option: { type: 'string' },
      defaultValue: 'Add your comment'
    },
    defaultValue: {
      option: { type: 'string' },
      defaultValue: undefined
    },
    disabled: {
      option: { type: 'boolean' },
      defaultValue: false
    },
    label: {
      option: { type: 'string' },
      defaultValue: 'Add your comment'
    },
    name: {
      option: { type: 'string' },
      defaultValue: 'textarea'
    },
    onChange: {
      option: { type: 'null' },
      defaultValue: (e) => {
        // eslint-disable-next-line no-console
        console.log(e.target.value);
      }
    },
    rows: {
      option: { type: 'number' },
      defaultValue: 3
    },
    value: {
      option: { type: 'string' },
      defaultValue: 'I am value'
    }
  },
  controls: {}
};
const Template = (args) => <TextArea {...args} />;
const UncontrolledTextareaTemplate = (args) => <TextArea {...args} />;
const Primary = Template.bind({});
const UncontrolledTextarea = UncontrolledTextareaTemplate.bind({});
UncontrolledTextarea.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const defValue = 'I am default value';
  const userVal = 'Test Generated Value';
  await expect(canvas.getByDisplayValue(defValue)).toBeInTheDocument();
  await userEvent.click(canvas.getByDisplayValue(defValue));
  await userEvent.clear(canvas.getByDisplayValue(defValue));
  await expect(canvas.getByRole('textbox')).not.toContain(defValue);
  await userEvent.type(canvas.getByRole('textbox'), userVal);
  await expect(canvas.getByDisplayValue(userVal)).toBeInTheDocument();
};
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary, UncontrolledTextarea };

UncontrolledTextarea.args = {
  value: undefined,
  defaultValue: 'I am default value'
};
