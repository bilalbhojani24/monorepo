import React from 'react';
import TableHead from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';

const defaultConfig = {
    title: 'Application/Components/TableHead',
    component: TableHead,
    parameters: {
        docs: {
        page: () => {
            return <DocPageTemplate importStatement={"import TableHead from 'bifrost/TableHead'"} />;
        }
        }
    },
    argTypes: {},
    controls: {}
};
const Template = (args) => <TableHead {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };