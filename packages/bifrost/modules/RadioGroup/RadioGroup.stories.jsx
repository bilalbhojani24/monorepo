import React from 'react';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import { DIRECTIONS } from './const/radioGroupConstants';
import RadioGroup from './index';

const defaultConfig = {
  title: 'Application/Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import RadioGroup from 'bifrost/RadioGroup'"}
        />
      )
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/GCu9Z0GTnebRUa5nioN6Yr/Tailwind-UI-Library?node-id=122-34479&t=TWCLo3KWhysdxj9F-0'
    }
  },
  argTypes: {
    direction: {
      options: DIRECTIONS,
      control: { type: 'inline-radio' },
      defaultValue: DIRECTIONS[0]
    },
    selectedOption: {
      option: { type: null },
      defaultValue: {
        id: 'radio-2',
        name: 'Radio 2 and it can grow longer and much more longer',
        description: 'It is the description of Radio 1',
        disabled: false
      }
    },
    inlineDescription: {
      control: { type: 'boolean' },
      defaultValue: false
    },
    rightAligned: {
      control: { type: 'boolean' },
      defaultValue: false
    },
    options: {
      option: { type: null },
      defaultValue: [
        {
          id: 'radio-1',
          name: 'Radio 1 and it can grow longer and much more longer',
          description: 'It is the description of Radio 1',
          disabled: false
        },
        {
          id: 'radio-2',
          name: 'Radio 2 and it can grow longer',
          description: 'It is the description of Radio 2',
          disabled: false
        },
        {
          id: 'radio-3',
          name: 'Radio 3 and it can grow longer',
          description: 'It is the description of Radio 3',
          disabled: true
        }
      ]
    }
  },
  controls: {}
};
const Template = (args) => <RadioGroup {...args} />;
const Primary = Template.bind({});
Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const radios = canvas.queryAllByRole('radio');
  await expect(radios.length).toBe(3);
  await userEvent.click(radios[0]);
  await expect(radios[1]).toBeChecked();
};

Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
