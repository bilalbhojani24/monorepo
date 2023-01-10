import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { ExclamationTriangleIcon } from '../Icon';

import ModalHeader from './index';

const defaultConfig = {
  title: 'Application/Components/ModalHeader',
  component: ModalHeader,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import ModalHeader from 'bifrost/ModalHeader'"}
        />
      ),
    },
  },

  argTypes: {
    dismissButton: {
      option: { type: 'boolean' },
      defaultValue: true,
    },
    handleDismissClick: {
      option: { type: null },
      defaultValue: () => {
        console.log('Dismiss button clicked');
      },
    },
    heading: {
      option: { type: 'string' },
      defaultValue: 'Deactivate account',
    },
    isBorder: {
      option: { type: 'boolean' },
      defaultValue: false,
    },
    subHeading: {
      option: { type: 'string' },
      defaultValue:
        'Are you sure you want to deactivate your account? All of your data will be permanently removed from our servers forever. This action cannot be undone.',
    },
    Icon: {
      option: { type: null },
      defaultValue: ExclamationTriangleIcon,
    },
  },
  controls: {},
};
const Template = (args) => <ModalHeader {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { Primary };
