import { useDispatch, useSelector } from 'react-redux';
import {
  getBannerDetails,
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
  };

  const handleBannerButtonClick = () => {
    if ([TRIAL_NOT_STARTED, TRIAL_FAILED].includes(trialState)) {
      dispatch(setModalName('accessibility'));
      dispatch(setModalShow(true));
      return;
    }
    buyAcceesibilityPlan();
  };

  const displayBannerOnceADay = (storageKey, nameOfBanner) => {
    // TO-DO confirm the plan type from BE
    if (planType) return;

    const dateValue = new Date(localStorage.getItem(storageKey));
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
      localStorage.setItem(storageKey, currentDate);
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
      const shownTrialEndBanner = localStorage.getItem('trialEndBanner');
      if (!planType && !shownTrialEndBanner) {
        dispatch(setBannerName('expired'));
        dispatch(setShowBanner(true));
        localStorage.setItem('trialEndBanner', true);
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
