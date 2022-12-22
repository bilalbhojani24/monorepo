import React from 'react';
import PageHeadings from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';

const defaultConfig = {
    title: 'Application/Components/PageHeadings',
    component: PageHeadings,
    parameters: {
        docs: {
        page: () => {
            return <DocPageTemplate importStatement={"import PageHeadings from 'bifrost/PageHeadings'"} />;
        }
        }
    },
    argTypes: {},
    controls: {}
};
const Template = (args) => <PageHeadings {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };