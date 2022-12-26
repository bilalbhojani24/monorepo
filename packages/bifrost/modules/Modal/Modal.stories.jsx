import React from 'react';
import Modal from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { CheckIcon } from '@heroicons/react/24/outline';
import { MODAL_SIZE } from './const/modalConstants';

const defaultConfig = {
  title: 'Application/Components/Modal',
  component: Modal,
  parameters: {
    docs: {
      page: () => {
        return (
          <DocPageTemplate
            importStatement={"import Modal from 'bifrost/Modal'"}
          />
        );
      },
    },
  },
  argTypes: {
    children: {
      option: { type: null },
      defaultValue: '',
    },
    onClose: {
      option: { type: null },
      defaultValue: () => {},
    },
    show: {
      option: { type: 'boolean' },
      defaultValue: false,
    },
    size: {
      options: MODAL_SIZE,
      control: { type: 'inline-radio' },
      defaultValue: MODAL_SIZE[0],
    },
  },
  controls: {},
};
const Template = (args) => <Modal {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { Primary };
