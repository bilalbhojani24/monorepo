import React from 'react';
import TableBody from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';

const defaultConfig = {
    title: 'Application/Components/TableBody',
    component: TableBody,
    parameters: {
        docs: {
        page: () => {
            return <DocPageTemplate importStatement={"import TableBody from 'bifrost/TableBody'"} />;
        }
        }
    },
    argTypes: {},
    controls: {}
};
const Template = (args) => <TableBody {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };