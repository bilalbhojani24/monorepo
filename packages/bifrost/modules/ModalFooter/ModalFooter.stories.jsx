import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import { POSITION, VARIANT } from './const/modalFooterConstants';
import ModalFooter from './index';

const defaultConfig = {
  title: 'Application/Components/ModalFooter',
  component: ModalFooter,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import ModalFooter from 'bifrost/ModalFooter'"}
        />
      ),
    },
  },

  argTypes: {
    backgroundColorClass: {
      option: { type: 'string' },
      defaultValue: '',
    },
    handlePrimaryButtonClick: {
      option: { type: null },
      description: 'Callback when negative button is clicked',
      defaultValue: () => {
        console.log('handlePrimaryButtonClick - called');
      },
    },
    handleSecondaryButtonClick: {
      option: { type: null },
      description: 'Callback when positive button is clicked',
      defaultValue: () => {
        console.log('handleSecondaryButtonClick - called');
      },
    },
    isBorder: {
      option: { type: 'boolean' },
      defaultValue: false,
    },
    position: {
      options: POSITION,
      controls: { type: 'inline-radio' },
      defaultValue: POSITION[0],
    },
    primaryButtonLabel: {
      option: { type: 'string' },
      defaultValue: 'Submit',
    },
    secondaryButtonLabel: {
      option: { type: 'string' },
      defaultValue: 'Cancel',
    },
    variant: {
      options: VARIANT,
      controls: { type: 'inline-radio' },
      defaultValue: VARIANT[0],
    },
  },
  controls: {},
};
const Template = (args) => <ModalFooter {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { Primary };
