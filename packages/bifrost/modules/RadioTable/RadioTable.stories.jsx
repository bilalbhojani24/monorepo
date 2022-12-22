import React from 'react';
import RadioTable from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';

const defaultConfig = {
    title: 'Application/Components/RadioTable',
    component: RadioTable,
    parameters: {
        docs: {
        page: () => {
            return <DocPageTemplate importStatement={"import RadioTable from 'bifrost/RadioTable'"} />;
        }
        }
    },
    argTypes: {},
    controls: {}
};
const Template = (args) => <RadioTable {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };