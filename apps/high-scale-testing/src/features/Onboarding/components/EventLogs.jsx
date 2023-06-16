import React from 'react';
import {
  Button,
  CodeSnippet,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ProgressBar
} from '@browserstack/bifrost';
import { useMountEffect } from '@browserstack/hooks';
import { AGEventsLogModalPresented } from 'constants/event-names';
import PropTypes from 'prop-types';
import { logHSTEvent } from 'utils/logger';

const EventLogs = ({
  closeEventLogsModal,
  eventLogsCode,
  currentStep,
  totalSteps
}) => {
  useMountEffect(() => {
    logHSTEvent([], 'web_events', AGEventsLogModalPresented);
  });

  return (
    <Modal size="3xl" show={eventLogsCode && eventLogsCode.length > 0}>
      <ModalHeader dismissButton={false} heading="Event Logs" />
      <ModalBody className="overflow-auto">
        <div>
          <p className="flex gap-2 pb-4 text-sm text-base-900">
            Hang tight! We are completing the setup of your grid. It could take
            as long as 15-20m. You will also receive an email notification once
            the grid is ready.
          </p>

          <CodeSnippet
            code={eventLogsCode}
            maxHeight="260px"
            singleLine={false}
          />
          <div className="pt-4">
            <ProgressBar
              currentStep="0"
              label="label"
              percentage={(currentStep / totalSteps) * 100}
              steps={[]}
              title={
                <span className="flex justify-between">
                  Current Progress: {`${currentStep}/${totalSteps}`}
                </span>
              }
              wrapperClassName="mt-3"
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter position="right">
        <Button
          aria-label="Close"
          colors="white"
          onClick={closeEventLogsModal}
          type="button"
          varaint="primary"
        >
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

EventLogs.propTypes = {
  closeEventLogsModal: PropTypes.func.isRequired,
  currentStep: PropTypes.number.isRequired,
  eventLogsCode: PropTypes.string.isRequired,
  totalSteps: PropTypes.number.isRequired
};

export default EventLogs;
