import { useDispatch, useSelector } from 'react-redux';
import { useMountEffect } from '@browserstack/hooks';
import {
  AGGridDetailsInteracted,
  AGGridDetailsVisited
} from 'constants/event-names';
import { getUserDetails } from 'globalSlice/selector';
import { logHSTEvent } from 'utils/logger';
import { calculateRelativeTime } from 'utils/time';

import { getSelectedGridData } from '../slices/selector';
import {
  getCurrentOnboardingTooltipcount,
  getShowOnboardingTooltips
} from 'features/GridDetail/slices/selector';
import { setCurrentOnboardingTooltipCount } from 'features/GridDetail/slices';

const useGridOverview = () => {
  const dispatch = useDispatch();

  // All Store variables
  const currentOnboardingTooltipCount = useSelector(
    getCurrentOnboardingTooltipcount
  );
  const selectedGridData = useSelector(getSelectedGridData);
  const showOnboardingTooltips = useSelector(getShowOnboardingTooltips);
  const userDetails = useSelector(getUserDetails);

  const containerClassName =
    'border-base-200 rounded-lg border bg-white p-6 shadow';
  const fontColor900ClassName = 'text-base-900 text-base font-normal mt-0.5';

  const copyBtnCbFn = (framework) => {
    logHSTEvent(['amplitude'], 'web_events', AGGridDetailsInteracted, {
      action: 'url_copied',
      framework
    });
  };

  const onboardingTooltipNextBtnHandler = (type) => {
    switch (type) {
      case 'frameworks': {
        dispatch(setCurrentOnboardingTooltipCount(2));
        break;
      }
      case 'userCreds': {
        dispatch(setCurrentOnboardingTooltipCount(3));
        break;
      }
      default:
        break;
    }
  };

  const hasBrowsersUsed = selectedGridData?.stats?.browsersUsed.length > 0;
  const relativeTime = calculateRelativeTime(selectedGridData?.connected);

  useMountEffect(() => {
    logHSTEvent([], 'web_events', AGGridDetailsVisited, {
      grid_name: selectedGridData.name
    });
  });

  return {
    containerClassName,
    copyBtnCbFn,
    currentOnboardingTooltipCount,
    fontColor900ClassName,
    onboardingTooltipNextBtnHandler,
    selectedGridData,
    showOnboardingTooltips,
    hasBrowsersUsed,
    relativeTime,
    userDetails
  };
};

export { useGridOverview };
