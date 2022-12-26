import React from 'react';
import ModalWAlert from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';

const defaultConfig = {
    title: 'Application/Components/ModalWAlert',
    component: ModalWAlert,
    parameters: {
        docs: {
        page: () => {
            return <DocPageTemplate importStatement={"import ModalWAlert from 'bifrost/ModalWAlert'"} />;
        }
        }
    },
    argTypes: {},
    controls: {}
};
const Template = (args) => <ModalWAlert {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };