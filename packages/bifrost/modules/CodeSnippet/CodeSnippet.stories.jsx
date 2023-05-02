import React from 'react';
import CodeSnippet from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';

const defaultConfig = {
    title: 'Application/Components/CodeSnippet',
    component: CodeSnippet,
    parameters: {
        docs: {
        page: () => {
            return <DocPageTemplate importStatement={"import CodeSnippet from 'bifrost/CodeSnippet'"} />;
        }
        }
    },
    argTypes: {},
    controls: {}
};
const Template = (args) => <CodeSnippet {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };