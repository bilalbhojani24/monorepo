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
    buyAcceesibilityPlan();
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
      console.log('days remaining', remainingDays);
      if (remainingDays <= 5 && remainingDays > 0) {
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
