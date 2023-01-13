import React from 'react';
import TableCell from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';

const defaultConfig = {
    title: 'Application/Components/TableCell',
    component: TableCell,
    parameters: {
        docs: {
        page: () => {
            return <DocPageTemplate importStatement={"import TableCell from 'bifrost/TableCell'"} />;
        }
        }
    },
    argTypes: {},
    controls: {}
};
const Template = (args) => <TableCell {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };