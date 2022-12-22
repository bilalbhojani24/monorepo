import React from 'react';
import SelectMenu from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { CHECK_POSITION } from './const/selectMenuConstants';

const defaultConfig = {
  title: 'Application/Components/SelectMenu',
  component: SelectMenu,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import SelectMenu from 'bifrost/SelectMenu'"} />;
      }
    }
  },
  argTypes: {
    checkPosition: {
      options: CHECK_POSITION,
      control: { type: 'inline-radio' }
    }
  },
  controls: {}
};
const Template = (args) => <SelectMenu {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
