import React from 'react';
import {
  Button,
  CodeSnippet,
  Hyperlink,
  MdOutlineLocalCafe,
  MdOutlineOpenInNew,
  Modal,
  ProgressBar
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

const EventLogs = ({
  closeEventLogsModal,
  eventLogsCode,
  currentStep,
  totalSteps
}) => (
  <Modal size="3xl" show={eventLogsCode && eventLogsCode.length > 0}>
    <div className="mx-6 my-4">
      <p className="text-lg font-medium">Event Logs</p>
      <div className="border-base-300 mt-4 rounded-lg border">
        <CodeSnippet
          code={eventLogsCode}
          maxHeight="260px"
          singleLine={false}
        />
        <div className="border-base-300 border-y p-4">
          <ProgressBar
            currentStep="0"
            label="label"
            percentage={(currentStep / totalSteps) * 100}
            steps={[]}
            title={
              <span className="flex justify-between">
                Current Progress: {`${currentStep}/${totalSteps}`}
                <Hyperlink wrapperClassName=" gap-x-2 text-sm font-medium">
                  View Documentation <MdOutlineOpenInNew />
                </Hyperlink>
              </span>
            }
          />
        </div>
        <div className="text-base-600 flex gap-2 p-4 text-sm">
          <MdOutlineLocalCafe className="text-2xl" />
          <p>
            Hang tight! We are completing the setup of your grid. It could take
            as long as 15-20m. You will also receive an email notification once
            the grid is ready.
          </p>
        </div>
      </div>
      <div className="mt-3 justify-end">
        <Button
          aria-label="Close"
          colors="white"
          onClick={closeEventLogsModal}
          type="button"
          varaint="primary"
        >
          Close
        </Button>
      </div>
    </div>
  </Modal>
);

EventLogs.propTypes = {
  closeEventLogsModal: PropTypes.func.isRequired,
  currentStep: PropTypes.number.isRequired,
  eventLogsCode: PropTypes.string.isRequired,
  totalSteps: PropTypes.number.isRequired
};

export default EventLogs;
