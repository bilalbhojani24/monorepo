import React from 'react';
import ModalWActionButtons from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { MODAL_SIZE } from '../Modal/const/modalConstants';

const defaultConfig = {
  title: 'Application/Components/ModalWActionButtons',
  component: ModalWActionButtons,
  parameters: {
    docs: {
      page: () => {
        return (
          <DocPageTemplate
            importStatement={
              "import ModalWActionButtons from 'bifrost/ModalWActionButtons'"
            }
          />
        );
      },
    },
  },
  argTypes: {
    description: {
      option: { type: 'string' },
      defaultValue:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam laudantium explicabo pariatur iste dolorem animi vitae error totam. At sapiente aliquam accusamus facere veritatis.',
      description: 'Description message of the modal',
    },
    handleNegativeButtonClick: {
      option: { type: null },
      description: 'Callback when negative button is clicked',
      defaultValue: () => {
        console.log('handleNegativeButtonClick - called');
      },
    },
    handlePositiveButtonClick: {
      option: { type: null },
      description: 'Callback when positive button is clicked',
      defaultValue: () => {
        console.log('handlePositiveButtonClick - called');
      },
    },
    negativeButtonLabel: {
      option: { type: 'string' },
      defaultValue: 'Cancel',
    },
    onClose: {
      option: { type: null },
      description: 'Callback modal is closed',
      defaultValue: () => {
        console.log('onClose is called');
      },
    },
    positiveButtonLabel: {
      option: { type: 'string' },
      defaultValue: 'Submit',
    },
    show: {
      option: { type: 'boolean' },
      defaultValue: true,
      description: 'show/hide modal using this tag',
    },
    size: {
      options: MODAL_SIZE,
      control: { type: 'inline-radio' },
      defaultValue: MODAL_SIZE[0],
      description: 'Size of the modal',
    },
    title: {
      option: { type: 'string' },
      defaultValue: 'Payment successful',
    },
  },
  controls: {},
};
const Template = (args) => <ModalWActionButtons {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { Primary };
