import React from 'react';
import ChatWidget from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';

const defaultConfig = {
    title: 'Application/Components/ChatWidget',
    component: ChatWidget,
    parameters: {
        docs: {
        page: () => {
            return <DocPageTemplate importStatement={"import ChatWidget from 'bifrost/ChatWidget'"} />;
        }
        }
    },
    argTypes: {},
    controls: {}
};
const Template = (args) => <ChatWidget {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };