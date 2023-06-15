import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TooltipBody, TooltipHeader } from '@browserstack/bifrost';
import { O11yBadge, O11yButton, O11yTooltip } from 'common/bifrostProxy';
import PropagationBlocker from 'common/PropagationBlocker';
import { DOC_KEY_MAPPING } from 'constants/common';
import { ROUTES } from 'constants/routes';
import { ADV_FILTER_TYPES } from 'features/FilterSkeleton/constants';
import PropTypes from 'prop-types';
import { getDocUrl } from 'utils/common';

const SmartTagsToolTip = ({
  flakyReason,
  isRounded,
  modifier,
  onClick,
  smartTagSettings,
  text,
  tooltipHeader
}) => {
  const navigate = useNavigate();

  const handleClickConfigureSmartTags = () => {
    navigate(ROUTES.smart_tags);
  };
  if (!text) return null;
  let filterCategory = '';
  let filterValue = '';
  let description = '';
  if (!smartTagSettings) {
    return (
      <O11yBadge
        isRounded={isRounded}
        text={text}
        modifier={modifier}
        onClick={() => {
          onClick(filterCategory, filterValue);
        }}
      />
    );
  }
  switch (text) {
    case 'Flaky':
      filterCategory = ADV_FILTER_TYPES.isFlaky.key;
      filterValue = true;
      description =
        flakyReason === 1
          ? `Test status has flipped more than ${smartTagSettings?.flaky?.flakeInHistory.flippingCount}
                      times in the last ${smartTagSettings?.flaky?.flakeInHistory.consecutiveRuns} consecutive runs.`
          : `Test passes on a retry within the last ${smartTagSettings?.flaky?.flakeInRerun.consecutiveRuns} runs.`;
      break;
    case 'Always Failing':
      filterCategory = ADV_FILTER_TYPES.isAlwaysFailing.key;
      filterValue = true;
      description = `The test has been failing with the ${
        smartTagSettings.alwaysFailing?.failureType === 'SAME'
          ? 'same error'
          : 'any error'
      } for the last ${
        smartTagSettings.alwaysFailing?.consecutiveRuns
      } consecutive runs.`;
      break;
    case 'New Failures':
      filterCategory = ADV_FILTER_TYPES.isNewFailure.key;
      filterValue = true;
      description = `The test has failed with a ${
        smartTagSettings.newFailure?.failureType === 'NEW' ? 'new' : 'any'
      } error for the first time among the last ${
        smartTagSettings.newFailure?.consecutiveRuns
      } runs.`;
      break;
    case 'Performance Anomaly':
      filterCategory = ADV_FILTER_TYPES.hasPerformanceAnomaly.key;
      filterValue = true;
      description = `Test execution duration exceeding the 
                      ${smartTagSettings.performanceAnomalies?.durationPercentile}
                      percentile duration among the last ${smartTagSettings.performanceAnomalies?.consecutiveRuns} runs of the same test.`;
      break;
    default:
  }

  return (
    <PropagationBlocker className="ml-1 inline">
      <O11yTooltip
        placementSide="top"
        placementAlign="center"
        wrapperClassName="px-1"
        theme="dark"
        size="sm"
        content={
          <>
            <TooltipHeader>{tooltipHeader}</TooltipHeader>
            <TooltipBody>
              <div className="w-60 break-normal">
                {description}
                <div className="mt-3 flex gap-3">
                  <O11yButton onClick={handleClickConfigureSmartTags}>
                    Configure
                  </O11yButton>
                  <O11yButton
                    wrapperClassName="bg-base-600 hover:bg-base-700 rounded py-1.5 px-3 text-white"
                    onClick={() =>
                      window.open(
                        `${getDocUrl({
                          path: DOC_KEY_MAPPING.smart_tags
                        })}#${text.toLowerCase()}`,
                        '_blank',
                        'noopener,noreferrer'
                      )
                    }
                  >
                    Learn More
                  </O11yButton>
                </div>
              </div>
            </TooltipBody>
          </>
        }
      >
        <O11yBadge text={text} modifier={modifier} isRounded={isRounded} />
      </O11yTooltip>
    </PropagationBlocker>
  );
};

export default SmartTagsToolTip;

SmartTagsToolTip.propTypes = {
  flakyReason: PropTypes.number,
  isRounded: PropTypes.bool,
  modifier: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  smartTagSettings: PropTypes.objectOf(PropTypes.any).isRequired,
  text: PropTypes.string.isRequired,
  tooltipHeader: PropTypes.string.isRequired
};
SmartTagsToolTip.defaultProps = {
  flakyReason: null,
  isRounded: true
};
