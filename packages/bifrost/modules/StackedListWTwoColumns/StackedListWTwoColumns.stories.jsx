import React from 'react';
import StackedListWTwoColumns from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';

const defaultConfig = {
    title: 'Application/Components/StackedListWTwoColumns',
    component: StackedListWTwoColumns,
    parameters: {
        docs: {
        page: () => {
            return <DocPageTemplate importStatement={"import StackedListWTwoColumns from 'bifrost/StackedListWTwoColumns'"} />;
        }
        }
    },
    argTypes: {},
    controls: {}
};
const Template = (args) => <StackedListWTwoColumns {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };