import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import ModalFooter from '../ModalFooter';
import ModalHeader from '../ModalHeader';

import { MODAL_SIZE } from './const/modalConstants';
import Modal from './index';

const defaultConfig = {
  title: 'Application/Components/Modal',
  component: Modal,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Modal from 'bifrost/Modal'"}
        />
      ),
    },
  },
  argTypes: {
    body: {
      option: { type: null },
      defaultValue: <h1>Body of Modal</h1>,
    },
    footer: {
      option: { type: null },
      defaultValue: (
        <ModalFooter
          position="full-width"
          backgroundColorClass="bg-base-50"
          variant="alert"
        />
      ),
    },
    header: {
      option: { type: null },
      defaultValue: (
        <ModalHeader
          heading="Default Action"
          subHeading="Are you sure you want to deactivate your account?"
          Icon={ExclamationTriangleIcon}
          handleDismissClick={() => {
            console.log('Clicked');
          }}
        />
      ),
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
