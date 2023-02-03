import React from 'react';
import TextEditor from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';

const defaultConfig = {
    title: 'Application/Components/TextEditor',
    component: TextEditor,
    parameters: {
        docs: {
        page: () => {
            return <DocPageTemplate importStatement={"import TextEditor from 'bifrost/TextEditor'"} />;
        }
        }
    },
    argTypes: {},
    controls: {}
};
const Template = (args) => <TextEditor {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };