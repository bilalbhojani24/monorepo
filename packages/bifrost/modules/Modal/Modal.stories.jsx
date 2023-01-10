import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { CheckIcon } from '../Icon';
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
      defaultValue: null,
    },
    footer: {
      option: { type: null },
      defaultValue: (
        <ModalFooter
          position="right"
          variant="alert"
          primaryButtonLabel="Deactivate"
          secondaryButtonLabel="Cancel"
        />
      ),
    },
    header: {
      option: { type: null },
      defaultValue: (
        <ModalHeader
          heading="Default Action"
          subHeading="Are you sure you want to deactivate your account?"
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
const CustomBodyTemplate = (args) => <Modal {...args} />;
const HeaderWithIconTemplate = (args) => <Modal {...args} />;
const ScrollableModalTemplate = (args) => <Modal {...args} />;

const Primary = Template.bind({});
const CustomBody = CustomBodyTemplate.bind({});
const HeaderWithIcon = HeaderWithIconTemplate.bind({});
const ScrollableModal = ScrollableModalTemplate.bind({});

Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { CustomBody, HeaderWithIcon, Primary, ScrollableModal };

/** ------------------
 * CustomBody
 ---------------------- */
CustomBody.args = {
  body: (
    <div>
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success-100">
        <CheckIcon className="h-6 w-6 text-success-600" aria-hidden="true" />
      </div>
      <div className="mt-3 text-center sm:mt-5">
        <h3 as="h3" className="text-gray-900 text-lg font-medium leading-6">
          Payment successful
        </h3>
        <div className="mt-2">
          <p className="text-gray-500 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            amet labore.
          </p>
        </div>
      </div>
    </div>
  ),
  header: null,
  footer: (
    <ModalFooter
      primaryButtonLabel="Go back to dashboard"
      position="full-width"
    />
  ),
};

/** ------------------
 * HeaderWithIcon
 ---------------------- */
HeaderWithIcon.args = {
  body: null,
  header: (
    <ModalHeader
      heading="Deactive account"
      subHeading="Are you sure you want to deactivate your account? All of your data will be permanently removed from our servers forever. This action cannot be undone."
      Icon={ExclamationTriangleIcon}
    />
  ),
  footer: (
    <ModalFooter
      primaryButtonLabel="Cancel"
      secondaryButtonLabel="Deactive"
      variant="alert"
      position="right"
      backgroundColorClass="bg-base-100"
    />
  ),
};

/** ------------------
 * ScrollableModal
 ---------------------- */
ScrollableModal.args = {
  body: (
    <div
      style={{
        height: '600px',
      }}
    >
      <h1>First am Modal Body</h1>
      <h1>I am Modal Body</h1>
      <h1>I am Modal Body</h1>
      <h1>I am Modal Body</h1>
      <h1>I am Modal Body</h1>
      <h1>I am Modal Body</h1>
      <h1>I am Modal Body</h1>
      <h1>I am Modal Body</h1>
      <h1>I am Modal Body</h1>
      <h1>I am Modal Body</h1>
      <h1>I am Modal Body</h1>
      <h1>I am Modal Body</h1>
      <h1>I am Modal Body</h1>
      <h1>I am Modal Body</h1>
      <h1>I am Modal Body</h1>
      <h1>I am Modal Body</h1>
      <h1>I am Modal Body</h1>
      <h1>I am Modal Body</h1>
      <h1>I am Modal Body</h1>
      <h1>I am Modal Body</h1>
      <h1>I am Modal Body</h1>
      <h1>I am Modal Body</h1>
      <h1>I am Modal Body</h1>
      <h1>Last am Modal Body</h1>
    </div>
  ),
  header: (
    <ModalHeader
      heading="Deactive account"
      subHeading="Are you sure you want to deactivate your account?"
      isBorder
    />
  ),
  footer: (
    <ModalFooter
      primaryButtonLabel="Deactivate"
      secondaryButtonLabel="Cancel"
      variant="alert"
      position="right"
      backgroundColorClass="bg-base-100"
      isBorder
    />
  ),
};
