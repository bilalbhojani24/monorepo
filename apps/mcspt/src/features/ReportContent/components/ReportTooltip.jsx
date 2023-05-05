import React from 'react';
import { useSelector } from 'react-redux';
import {
  MdInfoOutline,
  Tooltip,
  TooltipBody,
  TooltipFooter
} from '@browserstack/bifrost';
import { HyperlinkWithAnalytics } from 'features/Abstractions';
import { getSessionMetrics } from 'features/Report';
import PropTypes from 'prop-types';
import {
  calculateTestDurationForAnalytics,
  formatDeviceAndAppAnalyticsData
} from 'utils/analyticsDataUtils';
import { mcpAnalyticsEvent } from 'utils/analyticsUtils';

const ReportTooltip = ({ cardToolTipData }) => {
  const sessionData = useSelector(getSessionMetrics);

  const [showReportTooltip, setShowReportTooltip] = React.useState(false);

  return (
    <Tooltip
      show={showReportTooltip}
      theme="dark"
      placementSide="right"
      content={
        <>
          <TooltipBody wrapperClassName="text-white text-sm font-light">
            <div className="mb-4">{cardToolTipData.description}</div>

            <div className="">{cardToolTipData.recommend}</div>
          </TooltipBody>

          <TooltipFooter>
            <HyperlinkWithAnalytics
              linkToBeSentToAnalytics={cardToolTipData?.link?.(
                sessionData?.device?.os
              )}
              onClick={() => {
                if (cardToolTipData?.link) {
                  window.remoteThreadFunctions?.openUrlInSystemBrowser(
                    cardToolTipData.link(sessionData?.device?.os)
                  );
                }
              }}
              wrapperClassName="text-white underline cursor-pointer font-normal mt-2"
              rel="noreferrer noopener"
            >
              Learn More
            </HyperlinkWithAnalytics>
          </TooltipFooter>
        </>
      }
      onPointerDownOutside={() => {
        setShowReportTooltip(false);
      }}
    >
      <MdInfoOutline
        className="cursor-pointer"
        onClick={() => {
          setShowReportTooltip((prevVal) => !prevVal);

          mcpAnalyticsEvent('csptReportMetricInfoBtnClick', {
            metric_name: cardToolTipData.analyticsTitle,
            duration: calculateTestDurationForAnalytics(sessionData),
            ...formatDeviceAndAppAnalyticsData(
              sessionData?.device,
              sessionData?.package
            )
          });
        }}
      />
    </Tooltip>
  );
};

ReportTooltip.propTypes = {
  cardToolTipData: PropTypes.shape(PropTypes.any).isRequired
};

export default ReportTooltip;
