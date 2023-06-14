import React from 'react';
import {
  Button,
  DescriptionList,
  DescriptionListBody,
  DescriptionListHeader,
  KeyValue,
  MdOutlineAnalytics,
  MdTipsAndUpdates
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import REPORT_LOADING_STATES from 'constants/reportLoadingStates';
import PropTypes from 'prop-types';

import useReportLoadingContent from './useReportLoadingContent';

const ReportLoadingContent = ({ setShowGenerateReportPrompt }) => {
  const {
    sessionState,
    sessionDetails,
    testDataDescriptionList,
    selectedTipMsg,
    isSessionStopInProgress
  } = useReportLoadingContent();

  return (
    <div className="flex-1 px-4 py-2">
      {testDataDescriptionList?.length > 0 && (
        <DescriptionList isCard>
          <DescriptionListHeader
            heading={sessionDetails?.sessionName}
            subHeading={sessionDetails?.package?.bundleId}
          />
          <DescriptionListBody>
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              {testDataDescriptionList?.map((item) => (
                <div
                  className={twClassNames({
                    'sm:col-span-2': item.id > 4,
                    'sm:col-span-1': item.id <= 4
                  })}
                  key={item.id}
                >
                  <KeyValue
                    label={item.label}
                    value={item.value}
                    valueClassNames="mt-1"
                  />
                </div>
              ))}
            </div>
          </DescriptionListBody>
        </DescriptionList>
      )}

      {sessionState !== REPORT_LOADING_STATES.STOPPING &&
        sessionState !== REPORT_LOADING_STATES.COMPLETE && (
          <div className="mt-6">
            <Button
              loading={isSessionStopInProgress}
              icon={<MdOutlineAnalytics />}
              variant="primary"
              colors="brand"
              size="extra-large"
              onClick={() => {
                setShowGenerateReportPrompt(true);
              }}
              disabled={sessionState !== REPORT_LOADING_STATES.RECORDING}
            >
              Generate Performance Report
            </Button>
          </div>
        )}

      {(sessionState === REPORT_LOADING_STATES.STOPPING ||
        sessionState === REPORT_LOADING_STATES.COMPLETE) && (
        <div className="bg-info-50 mt-2 flex rounded-md p-4">
          <div className="text-info-400 mr-3 text-xl">
            <MdTipsAndUpdates />
          </div>

          <div className="">
            <div className="text-info-800 mb-2 text-sm font-medium leading-5">
              Did you know?
            </div>
            <div className="text-info-700 text-sm font-normal leading-5">
              {selectedTipMsg}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ReportLoadingContent.propTypes = {
  setShowGenerateReportPrompt: PropTypes.func
};

ReportLoadingContent.defaultProps = {
  setShowGenerateReportPrompt: () => {}
};

export default ReportLoadingContent;
