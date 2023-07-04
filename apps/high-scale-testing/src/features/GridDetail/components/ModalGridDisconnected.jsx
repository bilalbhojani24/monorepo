import React from 'react';
import {
  Button,
  ExclamationTriangleIcon,
  Modal,
  ModalBody,
  ModalHeader
} from '@browserstack/bifrost';

const ModalGridDisconnected = () => (
  <Modal show size="lg">
    <ModalHeader
      heading="Trial grid disconnected due to inactivity"
      subHeading="We have disconnected the trial grid due to inactivity. If you still want to continue using the trial grid, please reconnect. To continue with unlimited browser testing, setup your own grid"
      icon={
        <ExclamationTriangleIcon
          className="text-danger-600 h-6 w-6"
          aria-hidden="true"
        />
      }
      iconWrapperClassname="bg-danger-100"
    />

    <ModalBody className="mb-6">
      <div className="flex justify-end gap-3">
        <Button size="default" colors="white">
          Reconnect Trial Grid
        </Button>
        <Button size="default">Setup your own Grid</Button>
      </div>
    </ModalBody>
  </Modal>
);

export { ModalGridDisconnected };
