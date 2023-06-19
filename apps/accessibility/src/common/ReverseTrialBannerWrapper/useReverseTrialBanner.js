import { useDispatch, useSelector } from 'react-redux';
import { getStorage, setStorage } from '@browserstack/utils';
import {
  getBannerDetails,
  PAID_PLAN,
  TRIAL_EXPIRED,
  TRIAL_FAILED,
  TRIAL_NOT_STARTED,
  TRIAL_STARTED
} from 'constants';
import { format, isValid, subDays } from 'date-fns';
import {
  setBannerName,
  setModalName,
  setModalShow,
  setModalTrigger,
  setShowBanner
} from 'features/Dashboard/slices/appSlice';
import {
  getBannerName,
  getShowBanner,
  getTrialEndDate,
  getTrialState,
  getUser
} from 'features/Dashboard/slices/selectors';
import { buyAcceesibilityPlan, countRemainingDays } from 'utils/helper';
import { logEvent } from 'utils/logEvent';

export default function useReverseTrialBanner() {
  const dispatch = useDispatch();
  const showBanner = useSelector(getShowBanner);
  const trialState = useSelector(getTrialState);
  const bannerName = useSelector(getBannerName);
  const trialEndDate = useSelector(getTrialEndDate);
  const remainingDays = countRemainingDays(new Date(), new Date(trialEndDate));

  const bannerDetails = bannerName
    ? getBannerDetails(remainingDays)[bannerName]
    : {};
  const { plan_type: planType } = useSelector(getUser);

  const handleBannerDismissClick = () => {
    dispatch(setShowBanner(false));

    const getEventName = {
      not_started: 'InteractedWithRTPendingBanner',
      failed: 'InteractedWithRTPendingBanner',
      enabled: 'InteractedWithRTExpiryWarningBanner',
      expired: 'InteractedWithRTExpiredBanner'
    };

    logEvent(getEventName[trialState], {
      platform: 'Dashboard',
      action: 'Cancel'
    });
  };

  const handleBannerButtonClick = () => {
    if ([TRIAL_NOT_STARTED, TRIAL_FAILED].includes(trialState)) {
      dispatch(setModalName('accessibility'));
      dispatch(setModalShow(true));
      logEvent('InteractedWithRTPendingBanner', {
        platform: 'Dashboard',
        action: 'Get 14-day free trial'
      });
      logEvent('OnRTFeaturesUI', {
        platform: 'Dashboard',
        type: 'General',
        state: trialState === TRIAL_EXPIRED ? 'RT expired' : 'RT pending'
      });
      return;
    }

    if (trialState === TRIAL_EXPIRED) {
      logEvent('InteractedWithRTExpiredBanner', {
        platform: 'Dashboard',
        action: 'Buy a plan'
      });
    }

    if (trialState === TRIAL_STARTED) {
      logEvent('InteractedWithRTExpiryWarningBanner', {
        platform: 'Dashboard',
        action: 'Buy a plan'
      });
    }
    buyAcceesibilityPlan();
    dispatch(setModalTrigger('General'));
  };

  const displayBannerOnceADay = (storageKey, nameOfBanner) => {
    if (planType === PAID_PLAN) return;

    const dateValue = new Date(getStorage(storageKey));
    const bannerLastDate = isValid(dateValue)
      ? dateValue
      : subDays(new Date(), 1);
    const currentDate = new Date();

    if (
      format(currentDate, 'yyyy-MM-dd') !==
      format(new Date(bannerLastDate), 'yyyy-MM-dd')
    ) {
      dispatch(setBannerName(nameOfBanner));
      dispatch(setShowBanner(true));
      setStorage(storageKey, currentDate);
    }

    switch (trialState) {
      case TRIAL_NOT_STARTED:
      case TRIAL_FAILED: {
        logEvent('OnRTPendingBanner', {
          platform: 'Dashboard'
        });
        break;
      }
      case TRIAL_STARTED: {
        logEvent('OnRTExpiryWarningBanner', {
          platform: 'Dashboard'
        });
        break;
      }
      default:
        break;
    }
  };

  switch (trialState) {
    case TRIAL_NOT_STARTED:
    case TRIAL_FAILED: {
      displayBannerOnceADay('teamPlanBannerDate', 'not_started');

      break;
    }
    case TRIAL_STARTED: {
      if (remainingDays <= 5 && remainingDays > 0) {
        displayBannerOnceADay('daysLeftBannerDate', 'last_five_days');
      }
      break;
    }
    case TRIAL_EXPIRED: {
      const shownTrialEndBanner = getStorage('trialEndBanner');
      if (planType !== PAID_PLAN && !shownTrialEndBanner) {
        dispatch(setBannerName('expired'));
        dispatch(setShowBanner(true));
        setStorage('trialEndBanner', true);
        logEvent('OnRTExpiredBanner', {
          platform: 'Dashboard'
        });
      }
      break;
    }
    default:
      setShowBanner(false);
  }

  return {
    bannerDetails,
    showBanner,
    handleBannerDismissClick,
    handleBannerButtonClick,
    trialState
  };
}
