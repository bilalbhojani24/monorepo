import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';
import { CheckIcon } from '../Icon';
import SlideoverBody from '../SlideoverBody';
import SlideoverFooter from '../SlideoverFooter';
import SlideoverHeader from '../SlideoverHeader';

import { MODAL_SIZE } from './const/modalConstants';
import Slideover from './index';

const SlideoverBodyDummyData = () => (
  <>
    <div className="bg-success-100 mx-auto flex h-12 w-12 items-center justify-center rounded-full">
      <CheckIcon className="text-success-600 h-6 w-6" aria-hidden="true" />
    </div>
    <div className="mt-3 text-center sm:mt-5">
      <h3 as="h3" className="text-base-900 text-lg font-medium leading-6">
        Payment successful
      </h3>
      <div className="mt-2" />
    </div>
  </>
);

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
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/GCu9Z0GTnebRUa5nioN6Yr/Tailwind-UI-Library?node-id=157-36713&t=TWCLo3KWhysdxj9F-0'
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
    size: {
      option: { type: 'string' },
      control: { type: 'select', options: MODAL_SIZE },
      defaultValue: MODAL_SIZE[2]
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
predefinedComponents.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText('Go to Dashboard')).toBeVisible();
  await expect(canvas.getByText('Deactive account')).toBeVisible();
  await expect(canvas.queryAllByRole('button').length).toBe(3);
  for (let i = 0; i < 3; i += 1) {
    userEvent.click(canvas.queryAllByRole('button')[i]);
  }
};

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
        wrapperClassName="bg-danger-700"
        lightText
      />

      <SlideoverBody>
        {[...Array(10)].map((itemIndex) => (
          <SlideoverBodyDummyData key={itemIndex} />
        ))}
      </SlideoverBody>

      <SlideoverFooter wrapperClassName="bg-brand-100">
        <Button fullWidth colors="brand">
          Go to Dashboard
        </Button>
      </SlideoverFooter>
    </>
  )
};
