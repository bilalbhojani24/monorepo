import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';
import { CheckIcon } from '../Icon';
import SlideoverFooter from '../SlideoverFooter';
import SlideoverHeader from '../SlideoverHeader';

import Slideover from './index';

const defaultConfig = {
  title: 'Application/Components/Slideover',
  component: Slideover,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Slideover from '@browserstack/bifrost'"}
        />
      )
    }
  },
  argTypes: {
    children: {
      option: { type: null },
      defaultValue: (
        <>
          <SlideoverHeader
            heading="Default Action"
            subHeading="Are you sure you want to deactivate your account?"
            handleDismissClick={() => {}}
          />
          <SlideoverFooter
            position="right"
            variant="alert"
            primaryButtonLabel="Deactivate"
            secondaryButtonLabel="Cancel"
          />
        </>
      )
    },
    show: {
      option: { type: 'boolean' },
      defaultValue: true
    },
    slideoverWidth: {
      option: { type: 'string' },
      defaultValue: 'w-96'
    },
    backgroundOverlay: {
      option: { type: 'boolean' },
      defaultValue: true
    },
    closeButtonOutside: {
      option: { type: 'boolean' },
      defaultValue: true
    },
    onOverlayClick: {
      option: { type: null },
      defaultValue: () => {
        console.log('Overlay clicked');
      }
    },
    onClose: {
      option: { type: null },
      defaultValue: () => {}
    },
    topMarginElementId: {
      option: { type: 'string' },
      defaultValue: 'topMarginTrial'
    }
  },
  controls: {}
};

const predefinedComponentsTemplate = (args) => <Slideover {...args} />;

const predefinedComponents = predefinedComponentsTemplate.bind({});

export default defaultConfig;
export { predefinedComponents };

predefinedComponents.args = {
  children: (
    <>
      <SlideoverHeader
        dismissButton
        heading="Deactive account"
        subHeading="Are you sure you want to deactivate your account? All of your data will be permanently removed from our servers forever. This action cannot be undone."
        Icon={<ExclamationTriangleIcon className="text-white" />}
        isBorder
        backgroundColorClass="bg-danger-700"
        lightText
      />

      <div className="flex-1 py-4">
        <div className="bg-success-100 mx-auto flex h-12 w-12 items-center justify-center rounded-full">
          <CheckIcon className="text-success-600 h-6 w-6" aria-hidden="true" />
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <h3 as="h3" className="text-base-900 text-lg font-medium leading-6">
            Payment successful
          </h3>
          <div className="mt-2" />
        </div>

        <div className="bg-success-100 mx-auto flex h-12 w-12 items-center justify-center rounded-full">
          <CheckIcon className="text-success-600 h-6 w-6" aria-hidden="true" />
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <h3 as="h3" className="text-base-900 text-lg font-medium leading-6">
            Payment successful
          </h3>
          <div className="mt-2" />
        </div>

        <div className="bg-success-100 mx-auto flex h-12 w-12 items-center justify-center rounded-full">
          <CheckIcon className="text-success-600 h-6 w-6" aria-hidden="true" />
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <h3 as="h3" className="text-base-900 text-lg font-medium leading-6">
            Payment successful
          </h3>
          <div className="mt-2" />
        </div>
      </div>

      <SlideoverFooter backgroundColorClass="bg-brand-100">
        <Button fullWidth colors="brand">
          Go to Dashboard
        </Button>
      </SlideoverFooter>
    </>
  )
};
