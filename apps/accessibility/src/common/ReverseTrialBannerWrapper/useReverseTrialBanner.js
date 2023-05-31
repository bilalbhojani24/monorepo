import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBannerDetails, TRIAL_NOT_STARTED, TRIAL_STARTED } from 'constants';
import {
  setBannerName,
  setModalName,
  setModalShow,
  setShowBanner
} from 'features/Dashboard/slices/appSlice';
import {
  getBannerName,
  getShowBanner,
  getTrialEndDate,
  getTrialState
} from 'features/Dashboard/slices/selectors';
import { getBrowserStackBase } from 'utils';
import { countRemainingDays } from 'utils/helper';
import { logEvent } from 'utils/logEvent';

export default function useReverseTrialBanner() {
  const dispatch = useDispatch();
  const showBanner = useSelector(getShowBanner);
  const trialState = useSelector(getTrialState);
  const bannerName = useSelector(getBannerName);
  const bannerDetails = bannerName ? getBannerDetails[bannerName] : {};
  const trialEndDate = useSelector(getTrialEndDate);

  const handleBannerDismissClick = () => {
    dispatch(setShowBanner(false));
  };

  const handleBannerButtonClick = () => {
    if (trialState === TRIAL_NOT_STARTED) {
      dispatch(setModalName('accessibility'));
      dispatch(setModalShow(true));
      return;
    }

    logEvent('ClickedBuyaPlan', {
      signed_in: true,
      Product: 'Accessibility Testing',
      Section: 'dashboard-left-panel',
      URL: window.location.href
    });
    window.open(
      `${getBrowserStackBase()}/pricing?product=accessibility-testing`,
      '_blank'
    );
  };

  useEffect(() => {
    if (trialState === TRIAL_NOT_STARTED) {
      const showntrialBannerToday = localStorage.getItem('teamPlanBanner');
      if (!showntrialBannerToday) {
        dispatch(setBannerName('notStarted'));
        dispatch(setShowBanner(true));
        localStorage.setItem('teamPlanBanner', true);
      }
    }

    if (
      trialState === TRIAL_STARTED &&
      countRemainingDays(new Date(), new Date(trialEndDate)) <= 5
    ) {
      const shownDaysLeftBannerToday = localStorage.getItem('daysLeftBanner');
      if (!shownDaysLeftBannerToday) {
        dispatch(setBannerName('lastFiveDays'));
        dispatch(setShowBanner(true));
        localStorage.setItem('daysLeftBanner', true);
      }
    }
  }, []);

  return {
    bannerDetails,
    showBanner,
    handleBannerDismissClick,
    handleBannerButtonClick,
    trialState
  };
}
