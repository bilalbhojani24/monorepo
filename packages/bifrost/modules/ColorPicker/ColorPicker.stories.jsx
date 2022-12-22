import React from 'react';
import ColorPicker from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';

const defaultConfig = {
  title: 'Application/Components/ColorPicker',
  component: ColorPicker,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import ColorPicker from 'bifrost/ColorPicker'"} />;
      }
    }
  },
  argTypes: {},
  controls: {}
};
const Template = (args) => <ColorPicker {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
