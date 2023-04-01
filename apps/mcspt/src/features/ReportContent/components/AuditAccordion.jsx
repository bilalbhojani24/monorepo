import React from 'react';
import { useSelector } from 'react-redux';
import { Accordion, Badge, Button } from '@browserstack/bifrost';
import { getSessionMetrics } from 'features/Report';
import PropTypes from 'prop-types';
import {
  calculateTestDurationForAnalytics,
  formatDeviceAndAppAnalyticsData
} from 'utils/analyticsDataUtils';
import { mcpAnalyticsEvent } from 'utils/analyticsUtils';

const AuditAccordion = ({ auditDetails }) => {
  const sessionData = useSelector(getSessionMetrics);

  return (
    <Accordion
      triggerClassName="pt-0 items-center"
      triggerContentNode={
        <div className="flex flex-1 items-center justify-between py-3 pl-2">
          <div className="flex flex-col">
            <div className="text-sm font-normal leading-5">
              {auditDetails.title}
            </div>

            <div className="text-base-500 flex items-center">
              <div className="text-sm font-normal leading-5">
                {`Current: ${auditDetails.current} ${auditDetails?.unit}`}
              </div>

              <span className="px-2">•</span>

              <div className="text-sm font-normal leading-5">
                {`Recommended: ${auditDetails.recommended} ${auditDetails?.unit}`}
              </div>
            </div>
          </div>

          <div className="flex min-w-[150px] justify-end">
            <Badge
              hasDot={false}
              hasRemoveButton={false}
              modifier={auditDetails.type}
              isRounded
              size="large"
              text={`${
                auditDetails.type === 'error' ? 'High' : 'Medium'
              } Impact`}
              wrapperClassName=""
            />
          </div>
        </div>
      }
      panelContentNode={
        <div className="flex flex-col pb-4 pl-7">
          <div className="mb-2 text-sm font-normal leading-5">
            {auditDetails.subtitle}
          </div>

          <div className="">
            <Button
              size="default"
              fullWidth={false}
              colors="brand"
              variant="minimal"
              onClick={() => {
                mcpAnalyticsEvent('csptReportSummaryRecClick', {
                  issues_detected_title: auditDetails.title,
                  test_duration: calculateTestDurationForAnalytics(sessionData),
                  ...formatDeviceAndAppAnalyticsData(
                    sessionData?.device,
                    sessionData?.package
                  )
                });
              }}
            >
              Learn How to fix it
            </Button>
          </div>
        </div>
      }
      onTriggerClick={() => {
        mcpAnalyticsEvent('csptReportSummaryAccordionClick', {
          issues_detected_title: auditDetails.title,
          test_duration: calculateTestDurationForAnalytics(sessionData),
          ...formatDeviceAndAppAnalyticsData(
            sessionData?.device,
            sessionData?.package
          )
        });
      }}
    />
  );
};

AuditAccordion.propTypes = {
  auditDetails: PropTypes.shape(PropTypes.any)
};

AuditAccordion.defaultProps = {
  auditDetails: {}
};

export default AuditAccordion;
