import React from 'react';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import { dummyData } from './const/radioTableConstants';
import RadioTable from './index';

const defaultConfig = {
  title: 'Application/Components/RadioTable',
  component: RadioTable,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import RadioTable from 'bifrost/RadioTable'"}
        />
      )
    }
  },
  argTypes: {
    options: {
      option: { type: null },
      defaultValue: dummyData
    }
  },
  controls: {}
};
const Template = (args) => <RadioTable {...args} />;
const Primary = Template.bind({});
Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByRole('radiogroup')).toBeVisible();
  await expect(canvas.queryAllByRole('radio')[0]).toBeChecked();
  await userEvent.click(canvas.queryAllByRole('radio')[1]);
  await expect(canvas.queryAllByRole('radio')[1]).toBeChecked();
  await userEvent.click(canvas.queryAllByRole('radio')[2]);
  await expect(canvas.queryAllByRole('radio')[1]).toBeChecked();
};
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
