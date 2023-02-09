import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';
import { CheckIcon } from '../Icon';
import ModalBody from '../ModalBody';
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
      )
    }
  },
  argTypes: {
    children: {
      option: { type: null },
      defaultValue: (
        <>
          <ModalHeader
            heading="Default Action"
            subHeading="Are you sure you want to deactivate your account?"
            handleDismissClick={() => {
              console.log('Clicked');
            }}
          />
          <ModalFooter
            position="right"
            backgroundColorClass="bg-base-100"
            isBorder
          >
            <Button colors="white">Cancel</Button>
            <Button colors="brand">Deactivate</Button>
          </ModalFooter>
        </>
      )
    },
    onOverlayClick: {
      option: { type: null },
      defaultValue: () => {
        console.log('Overlay clicked');
      }
    },
    onClose: {
      option: { type: null },
      defaultValue: () => {
        console.log('onClose called');
      }
    },
    show: {
      option: { type: 'boolean' },
      defaultValue: false
    },
    size: {
      options: MODAL_SIZE,
      control: { type: 'inline-radio' },
      defaultValue: MODAL_SIZE[0]
    }
  },
  controls: {}
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
  controls: {}
};

export default defaultConfig;
export { CustomBody, HeaderWithIcon, Primary, ScrollableModal };

/** ------------------
 * CustomBody
 ---------------------- */
CustomBody.args = {
  children: (
    <>
      <ModalBody className="py-5">
        <div>
          <div className="bg-success-100 mx-auto flex h-12 w-12 items-center justify-center rounded-full">
            <CheckIcon
              className="text-success-600 h-6 w-6"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <h3 as="h3" className="text-base-900 text-lg font-medium leading-6">
              Payment successful
            </h3>
            <div className="mt-2">
              <p className="text-base-500 text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur amet labore.
              </p>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button fullWidth colors="brand">
          Go to Dashboard
        </Button>
      </ModalFooter>
    </>
  )
};

/** ------------------
 * HeaderWithIcon
 ---------------------- */
HeaderWithIcon.args = {
  children: (
    <>
      <ModalHeader
        heading="Deactive account"
        subHeading="Are you sure you want to deactivate your account? All of your data will be permanently removed from our servers forever. This action cannot be undone."
        icon={
          <ExclamationTriangleIcon
            className="text-danger-600 h-6 w-6"
            aria-hidden="true"
          />
        }
        iconWrapperClassname="bg-danger-100"
      />
      <ModalFooter position="right" backgroundColorClass="bg-base-100" isBorder>
        <Button colors="white">Cancel</Button>
        <Button colors="danger">Deactivate</Button>
      </ModalFooter>
    </>
  )
};

/** ------------------
 * ScrollableModal
 ---------------------- */
ScrollableModal.args = {
  children: (
    <>
      <ModalHeader
        heading="Deactive account"
        subHeading="Are you sure you want to deactivate your account?"
        isBorder
      />
      <ModalBody className="py-2">
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
        <h1>I am Modal Body</h1>
        <h1>I am Modal Body</h1>
        <h1>I am Modal Body</h1>
        <h1>I am Modal Body</h1>
        <h1>I am Modal Body</h1>
        <h1>Last am Modal Body</h1>
      </ModalBody>
      <ModalFooter position="right" backgroundColorClass="bg-base-100" isBorder>
        <Button colors="white">Cancel</Button>
        <Button colors="danger">Deactivate</Button>
      </ModalFooter>
    </>
  )
};
