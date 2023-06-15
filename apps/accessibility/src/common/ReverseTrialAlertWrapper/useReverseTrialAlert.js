import { useDispatch, useSelector } from 'react-redux';
import {
  SCREEN_READER,
  TRIAL_EXPIRED,
  TRIAL_FAILED,
  TRIAL_IN_PROGRESS,
  TRIAL_NOT_STARTED
} from 'constants';
import {
  setAlertName,
  setAlertShow,
  setModalName,
  setModalShow,
  setModalTrigger
} from 'features/Dashboard/slices/appSlice';
import {
  getAlertName,
  getAlertShow,
  getTrialState,
  getUser
} from 'features/Dashboard/slices/selectors';
import { logEvent } from 'utils/logEvent';

export default function useReverseTrialAlert() {
  const trialState = useSelector(getTrialState);
  const alertName = useSelector(getAlertName);
  const showAlert = useSelector(getAlertShow);
  const { plan_type: planType } = useSelector(getUser);
  const dispatch = useDispatch();

  const handleAlertLinkClick = () => {
    let action = 'Activate 14-day free trial';
    if ([TRIAL_NOT_STARTED, TRIAL_FAILED].includes(trialState)) {
      dispatch(setModalName('screenReader'));
      dispatch(setModalShow(true));
      dispatch(setModalTrigger(SCREEN_READER));
    }

    if (trialState === TRIAL_EXPIRED) {
      dispatch(setModalName('buyPlan'));
      dispatch(setModalShow(true));
      action = 'Buy a plan';
    }

    logEvent('OnRTFeaturesUI', {
      platform: 'Dashboard',
      type: SCREEN_READER,
      state: trialState === TRIAL_EXPIRED ? 'RT expired' : 'RT pending'
    });
    logEvent('InteractedWithRTFeatureSpecificBanner', {
      platform: 'Dashboard',
      feature: SCREEN_READER,
      state: trialState === TRIAL_EXPIRED ? 'RT expired' : 'RT pending',
      action
    });
  };

  const displayAlert = (name) => {
    dispatch(setAlertName(name));
    dispatch(setAlertShow(true));
    logEvent('OnRTFeatureSpecificBanner', {
      platform: 'Dashboard',
      feature: SCREEN_READER,
      state: trialState === TRIAL_EXPIRED ? 'RT expired' : 'RT pending'
    });
  };

  switch (trialState) {
    case TRIAL_NOT_STARTED:
    case TRIAL_FAILED: {
      displayAlert('getTrial');
      break;
    }
    case TRIAL_IN_PROGRESS: {
      displayAlert('trialInProcess');
      break;
    }
    case TRIAL_EXPIRED: {
      if (planType !== 'paid') {
        displayAlert('buyPlan');
      }
      break;
    }
    default: {
      dispatch(setAlertShow(false));
      break;
    }
  }

  return {
    alertName,
    showAlert,
    handleAlertLinkClick
  };
}
