import React from 'react';
import {
  CodeSnippet,
  Hyperlink,
  MdOutlineOpenInNew,
  Modal,
  ProgressBar
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

const EventLogs = ({ eventLogsCode }) => (
  // eslint-disable-next-line react/jsx-boolean-value
  <Modal size="3xl" show={true}>
    <div className="mx-6 my-4">
      <p className="text-lg font-medium">Event Logs</p>
      <div className="border-base-300 mt-4 rounded-lg border">
        <CodeSnippet code={eventLogsCode} maxHeight="260px" singleLine />
        <div className="border-base-300 border-y p-4">
          <ProgressBar
            currentStep="0"
            label="label"
            percentage="25"
            steps={[]}
            title={
              <span className="flex justify-between">
                Current Progress: 1/5{' '}
                <Hyperlink wrapperClassName=" gap-x-2 text-sm font-medium">
                  View Documentation <MdOutlineOpenInNew />
                </Hyperlink>
              </span>
            }
          />
        </div>
        <div className="border-base-300 text-base-600 flex gap-2 border-y p-4 text-sm">
          Icon{' '}
          <p>
            Hang tight! We are completing the setup of your grid. It could take
            as long as 15-20m. You will also receive an email notification once
            the grid is ready.
          </p>
        </div>
      </div>
    </div>
  </Modal>
);

EventLogs.defaultProps = {
  eventLogsCode: ''
};

EventLogs.propTypes = {
  eventLogsCode: PropTypes.string
};

export default EventLogs;
