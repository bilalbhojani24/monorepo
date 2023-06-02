import { useDispatch, useSelector } from 'react-redux';
import { TRIAL_EXPIRED, TRIAL_IN_PROGRESS, TRIAL_NOT_STARTED } from 'constants';
import {
  setAlertName,
  setAlertShow,
  setModalName,
  setModalShow
} from 'features/Dashboard/slices/appSlice';
import {
  getAlertName,
  getAlertShow,
  getTrialState,
  getUser
} from 'features/Dashboard/slices/selectors';
import { buyAcceesibilityPlan } from 'utils/helper';

export default function useReverseTrialAlert() {
  const trialState = useSelector(getTrialState);
  const alertName = useSelector(getAlertName);
  const showAlert = useSelector(getAlertShow);
  const { enterprise_plan: enterprisePlan } = useSelector(getUser);
  const dispatch = useDispatch();

  const handleAlertLinkClick = () => {
    if (trialState === TRIAL_NOT_STARTED) {
      dispatch(setModalName('screenReader'));
      dispatch(setModalShow(true));
      return;
    }

    if (trialState === TRIAL_EXPIRED) {
      buyAcceesibilityPlan();
    }
  };

  const displayAlert = (name) => {
    dispatch(setAlertName(name));
    dispatch(setAlertShow(true));
  };

  switch (trialState) {
    case TRIAL_NOT_STARTED: {
      displayAlert('getTrial');
      break;
    }
    case TRIAL_IN_PROGRESS: {
      displayAlert('trialInProcess');
      break;
    }
    case TRIAL_EXPIRED: {
      if (!enterprisePlan) {
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
