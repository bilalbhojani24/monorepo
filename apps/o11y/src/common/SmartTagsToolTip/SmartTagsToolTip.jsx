import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TooltipBody, TooltipHeader } from '@browserstack/bifrost';
import { O11yBadge, O11yButton, O11yTooltip } from 'common/bifrostProxy';
import PropagationBlocker from 'common/PropagationBlocker';
import { DOC_KEY_MAPPING } from 'constants/common';
import { SMART_TAGS_CONSTANTS } from 'features/Settings/constants';
import { getActiveProject } from 'globalSlice/selectors';
import PropTypes from 'prop-types';
import { getDocUrl } from 'utils/common';
import { getSettingsPath } from 'utils/routeUtils';

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
  const activeProject = useSelector(getActiveProject);

  const handleClickConfigureSmartTags = () => {
    const searchParams = new URLSearchParams();

    if (text === 'New Failures') {
      searchParams.set('scrollTo', 'newFailure');
    } else if (text === 'Performance Anomaly') {
      searchParams.set('scrollTo', 'performanceAnomalies');
    }

    navigate(
      `${getSettingsPath(
        activeProject?.normalisedName,
        'smart_tags'
      )}?${searchParams.toString()}`
    );
  };
  if (!text) return null;
  let description = '';
  if (!smartTagSettings) {
    return (
      <PropagationBlocker className="ml-1 inline">
        <O11yBadge
          isRounded={isRounded}
          text={text}
          modifier={modifier}
          onClick={onClick}
        />
      </PropagationBlocker>
    );
  }
  switch (text) {
    case 'Flaky':
      description =
        flakyReason === 1
          ? `Test status has flipped more than ${smartTagSettings?.flaky?.flakeInHistory.flippingCount}
                      times in the last ${smartTagSettings?.flaky?.flakeInHistory.consecutiveRuns} consecutive runs.`
          : `Test passes on a retry within the last ${smartTagSettings?.flaky?.flakeInRerun.consecutiveRuns} runs.`;
      break;
    case 'Always Failing':
      description = `The test has consistently failed with ${
        smartTagSettings.alwaysFailing?.failureType ===
        SMART_TAGS_CONSTANTS.SAME
          ? 'the same error'
          : 'any error'
      } in the past ${smartTagSettings.alwaysFailing?.consecutiveRuns} runs`;
      break;
    case 'New Failures':
      description =
        smartTagSettings.newFailure?.failureType === SMART_TAGS_CONSTANTS.NEW
          ? `The test has encountered a new error for the first time in the last ${smartTagSettings.newFailure?.consecutiveRuns} runs`
          : `The test has failed for the first time in the last ${smartTagSettings.newFailure?.consecutiveRuns} runs`;
      break;
    case 'Performance Anomaly':
      description = `Duration is longer than the 
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
                        })}#${text.split(' ').join('-').toLowerCase()}`,
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
        <O11yBadge
          text={text}
          modifier={modifier}
          isRounded={isRounded}
          onClick={onClick}
        />
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
