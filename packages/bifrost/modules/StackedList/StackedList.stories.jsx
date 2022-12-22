import React from 'react';
import StackedList from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { messages } from './const/stackedListConstant';

const defaultConfig = {
  title: 'Application/Components/StackedList',
  component: StackedList,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import StackedList from 'bifrost/StackedList'"} />;
      }
    }
  },
  argTypes: {
    descriptionMaxLength: {
      options: { type: 'number' },
      defaultValue: 150
    },
    handleListClick: {
      options: { type: null },
      defaultValue: (message) => {
        console.log(message);
      }
    },
    list: {
      options: { type: null },
      defaultValue: messages
    }
  },
  controls: {}
};
const Template = (args) => <StackedList {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
