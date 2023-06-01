import React from 'react';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import { STEPS_FORMAT, STEPS_STATUS } from './const/stepsConstants';
import Steps from './index';

const steps = [
  {
    id: '1',
    name: 'Create account',
    description: 'Vitae sed mi luctus laoreet.',
    status: STEPS_STATUS[0]
  },
  {
    id: '2',
    name: 'Profile ( Current Completed )',
    description: 'Cursus semper viverra facilisis et et some more.',
    status: STEPS_STATUS[3]
  },
  {
    id: '3',
    name: 'Business information',
    description: 'Penatibus eu quis ante.',
    status: STEPS_STATUS[1]
  },
  {
    id: '4',
    name: 'Theme',
    description: 'Faucibus nec enim leo et.',
    status: STEPS_STATUS[2]
  },
  {
    id: '5',
    name: 'Preview',
    description: 'Iusto et officia maiores porro ad non quas.',
    status: STEPS_STATUS[2]
  }
];

const defaultConfig = {
  title: 'Application/Components/Steps',
  component: Steps,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Steps from 'bifrost/Steps'"}
        />
      )
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/GCu9Z0GTnebRUa5nioN6Yr/Tailwind-UI-Library?node-id=395-9548&t=TWCLo3KWhysdxj9F-0'
    }
  },
  argTypes: {
    steps: {
      type: { summary: 'OBJECT', required: false },
      description: 'List of items to be covered in steps',
      control: { type: 'object' },
      defaultValue: steps
    },
    onClick: {
      type: { summary: 'FUNCTION', required: false },
      description: 'Function callback when a step is clicked',
      control: { type: 'select' }
    },
    label: {
      type: { summary: 'STRING', required: false },
      description: 'Provide label to overall Step component for accessibility',
      control: { type: 'text' },
      defaultValue: 'label'
    },
    format: {
      options: STEPS_FORMAT,
      control: { type: 'select' },
      description: 'Format of list types',
      type: { summary: 'STRING', required: false },
      defaultValue: STEPS_FORMAT[0]
    },
    wrapperClassName: {
      type: { summary: 'STRING', required: false },
      description: 'Provide class to overall Step component',
      control: { type: 'text' },
      defaultValue: ''
    }
  },
  controls: {}
};

const Bullet = (args) => <Steps {...args} />;
const BulletList = Bullet.bind({});
BulletList.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const liItems = await canvas.queryAllByRole('listitem');
  await expect(liItems.length).toBe(5);
  liItems.forEach(async (liItem) => {
    await userEvent.click(liItem);
  });
};
Bullet.parameters = {
  controls: {}
};

BulletList.args = {
  format: STEPS_FORMAT[1]
};

const Panels = (args) => <Steps {...args} />;
const PanelsList = Panels.bind({});
PanelsList.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const liItems = await canvas.queryAllByRole('listitem');
  await expect(liItems.length).toBe(5);
  liItems.forEach(async (liItem) => {
    await userEvent.click(liItem);
  });
};
Panels.parameters = {
  controls: {}
};

PanelsList.args = {
  format: STEPS_FORMAT[2]
};

const Circle = (args) => <Steps {...args} />;
const CircleList = Circle.bind({});
CircleList.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const liItems = await canvas.queryAllByRole('listitem');
  await expect(liItems.length).toBe(5);
  liItems.forEach(async (liItem) => {
    await userEvent.click(liItem);
  });
};
Circle.parameters = {
  controls: {}
};

CircleList.args = {
  format: STEPS_FORMAT[3]
};

const BulletsAndText = (args) => <Steps {...args} />;
const BulletsAndTextList = BulletsAndText.bind({});
BulletsAndTextList.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const liItems = await canvas.queryAllByRole('listitem');
  await expect(liItems.length).toBe(5);
  liItems.forEach(async (liItem) => {
    await userEvent.click(liItem);
  });
};
BulletsAndText.parameters = {
  controls: {}
};

BulletsAndTextList.args = {
  format: STEPS_FORMAT[4]
};

const CircleWithText = (args) => <Steps {...args} />;
const CircleWithTextList = CircleWithText.bind({});

CircleWithTextList.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const liItems = await canvas.queryAllByRole('listitem');
  await expect(liItems.length).toBe(5);
  liItems.forEach(async (liItem) => {
    await userEvent.click(liItem);
  });
};
CircleWithText.parameters = {
  controls: {}
};

CircleWithText.args = {
  format: STEPS_FORMAT[5]
};

const Simple = (args) => <Steps {...args} />;
const SimpleList = Simple.bind({});
SimpleList.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const liItems = await canvas.queryAllByRole('listitem');
  await expect(liItems.length).toBe(5);
  liItems.forEach(async (liItem) => {
    await userEvent.click(liItem);
  });
};
Simple.parameters = {
  controls: {}
};

export default defaultConfig;
export {
  BulletList,
  BulletsAndTextList,
  CircleList,
  CircleWithText,
  PanelsList,
  SimpleList
};
