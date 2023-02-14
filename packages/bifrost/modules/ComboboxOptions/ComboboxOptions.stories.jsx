import React from 'react';
import ComboboxOptions from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';

const defaultConfig = {
    title: 'Application/Components/ComboboxOptions',
    component: ComboboxOptions,
    parameters: {
        docs: {
        page: () => {
            return <DocPageTemplate importStatement={"import ComboboxOptions from 'bifrost/ComboboxOptions'"} />;
        }
        }
    },
    argTypes: {},
    controls: {}
};
const Template = (args) => <ComboboxOptions {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };