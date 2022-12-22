import React from 'react';
import RadioSmallCards from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';

const defaultConfig = {
    title: 'Application/Components/RadioSmallCards',
    component: RadioSmallCards,
    parameters: {
        docs: {
        page: () => {
            return <DocPageTemplate importStatement={"import RadioSmallCards from 'bifrost/RadioSmallCards'"} />;
        }
        }
    },
    argTypes: {},
    controls: {}
};
const Template = (args) => <RadioSmallCards {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };