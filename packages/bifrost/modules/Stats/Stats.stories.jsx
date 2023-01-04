import React from 'react';
import Stats from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';

const defaultConfig = {
    title: 'Application/Components/Stats',
    component: Stats,
    parameters: {
        docs: {
        page: () => {
            return <DocPageTemplate importStatement={"import Stats from 'bifrost/Stats'"} />;
        }
        }
    },
    argTypes: {},
    controls: {}
};
const Template = (args) => <Stats {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };