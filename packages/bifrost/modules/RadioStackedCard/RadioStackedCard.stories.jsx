import React from 'react';
import RadioStackedCard from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { dummyData, RADIO_STACKED_CARD_PLACEMENT } from './const/radioStackedCardConstants';

const defaultConfig = {
  title: 'Application/Components/RadioStackedCard',
  component: RadioStackedCard,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import RadioStackedCard from 'bifrost/RadioStackedCard'"} />;
      }
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
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
