import React from 'react';
import { Button, CheckIcon, Modal, ModalBody } from '@browserstack/bifrost';

const ModalGridCreatedSuccessfully = () => (
  <Modal show size="sm">
    <ModalBody className="py-5">
      <div>
        <div className="bg-success-100 mx-auto flex h-12 w-12 items-center justify-center rounded-full">
          <CheckIcon className="text-success-600 h-6 w-6" aria-hidden="true" />
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <h3 as="h3" className="text-base-900 text-lg font-medium leading-6">
            Grid created successfully
          </h3>
          <div className="mt-2">
            <p className="text-base-500 text-sm">
              ‘High Scale grid’ is created successfully. The trial grid will be
              now disconnected. Your tests will continue on the newly created
              grid
            </p>
          </div>
        </div>

        <Button fullWidth wrapperClassName="mt-6">
          Switch from trial to your own grid
        </Button>
      </div>
    </ModalBody>
  </Modal>
);
export { ModalGridCreatedSuccessfully };
