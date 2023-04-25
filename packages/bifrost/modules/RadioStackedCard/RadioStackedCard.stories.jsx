import React from 'react';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import {
  dummyData,
  RADIO_STACKED_CARD_PLACEMENT
} from './const/radioStackedCardConstants';
import RadioStackedCard from './index';

const defaultConfig = {
  title: 'Application/Components/RadioStackedCard',
  component: RadioStackedCard,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import RadioStackedCard from 'bifrost/RadioStackedCard'"
          }
        />
      )
    }
  },
  argTypes: {
    placement: {
      options: Object.values(RADIO_STACKED_CARD_PLACEMENT),
      control: { type: 'inline-radio' },
      defaultValue: RADIO_STACKED_CARD_PLACEMENT.horizontal
    },
    data: {
      option: { type: null },
      defaultValue: dummyData
    },
    onChange: {
      control: { type: null },
      defaultValue: (selectedItem) => {
        console.log(selectedItem);
      }
    },
    name: {
      option: { type: 'string' },
      defaultValue: 'radioGroup'
    }
  },
  controls: {}
};
const Template = (args) => <RadioStackedCard {...args} />;
const Primary = Template.bind({});
Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByRole('radiogroup')).toBeVisible();
  await expect(canvas.queryAllByRole('radio')[0]).toBeChecked();
  await userEvent.click(canvas.queryAllByRole('radio')[1]);
  await expect(canvas.queryAllByRole('radio')[1]).toBeChecked();
  await userEvent.click(canvas.queryAllByRole('radio')[3]);
  await expect(canvas.queryAllByRole('radio')[1]).toBeChecked();
};
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
