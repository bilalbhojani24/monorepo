import { useDispatch, useSelector } from 'react-redux';
import {
  getBannerDetails,
  TRIAL_EXPIRED,
  TRIAL_NOT_STARTED,
  TRIAL_STARTED
} from 'constants';
import { format, isValid, subDays } from 'date-fns';
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
  getTrialState,
  getUser
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
  const { enterprise_plan: enterprisePlan } = useSelector(getUser);

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

  const displayBannerOnceADay = (storageKey, nameOfBanner) => {
    const value = new Date(localStorage.getItem(storageKey));
    const bannerLastDate = isValid(value) ? value : subDays(new Date(), 1);
    const currentDate = new Date();

    if (
      format(currentDate, 'yyyy-MM-dd') !==
      format(new Date(bannerLastDate), 'yyyy-MM-dd')
    ) {
      dispatch(setBannerName(nameOfBanner));
      dispatch(setShowBanner(true));
      localStorage.setItem(storageKey, currentDate);
    }
  };

  switch (trialState) {
    case TRIAL_NOT_STARTED: {
      displayBannerOnceADay('teamPlanBannerDate', 'not_started');
      break;
    }
    case TRIAL_STARTED: {
      if (countRemainingDays(new Date(), new Date(trialEndDate)) <= 5) {
        displayBannerOnceADay('daysLeftBannerDate', 'last_five_days');
      }
      break;
    }
    case TRIAL_EXPIRED: {
      if (!enterprisePlan) {
        const shownTrialEndBannerToday = localStorage.getItem('trialEndBanner');
        if (!shownTrialEndBannerToday) {
          dispatch(setBannerName('expired'));
          dispatch(setShowBanner(true));
          localStorage.setItem('trialEndBanner', true);
        }
      } else {
        dispatch(setShowBanner(false));
      }
      break;
    }
    default:
      break;
  }

  return {
    bannerDetails,
    showBanner,
    handleBannerDismissClick,
    handleBannerButtonClick,
    trialState
  };
}
