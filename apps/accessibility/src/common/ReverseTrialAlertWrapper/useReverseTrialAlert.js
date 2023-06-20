import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  EFT_PLAN,
  PAID_PLAN,
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
  const {
    plan_type: planType,
    rft_eligible: isEligible,
    eft_type: eftType
  } = useSelector(getUser);
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

    logEvent('InteractedWithRTFeatureSpecificBanner', {
      platform: 'Dashboard',
      feature: SCREEN_READER,
      state: trialState === TRIAL_EXPIRED ? 'RT expired' : 'RT pending',
      action
    });
  };

  const displayAlert = (name) => {
    if (planType === PAID_PLAN || eftType === EFT_PLAN) return;
    dispatch(setAlertName(name));
    dispatch(setAlertShow(true));
    logEvent('OnRTFeatureSpecificBanner', {
      platform: 'Dashboard',
      feature: SCREEN_READER,
      state: trialState === TRIAL_EXPIRED ? 'RT expired' : 'RT pending'
    });
  };

  useEffect(() => {
    switch (trialState) {
      case TRIAL_NOT_STARTED:
      case TRIAL_FAILED: {
        if (isEligible) {
          displayAlert('getTrial');
        }
        break;
      }
      case TRIAL_IN_PROGRESS: {
        displayAlert('trialInProcess');
        break;
      }
      case TRIAL_EXPIRED: {
        if (planType !== PAID_PLAN || eftType === EFT_PLAN) {
          displayAlert('buyPlan');
        }
        break;
      }
      default: {
        dispatch(setAlertShow(false));
        break;
      }
    }
  }, [trialState, planType, eftType]);

  return {
    alertName,
    showAlert,
    handleAlertLinkClick
  };
}
