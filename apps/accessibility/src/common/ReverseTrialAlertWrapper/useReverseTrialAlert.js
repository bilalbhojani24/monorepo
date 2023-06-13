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

export default function useReverseTrialAlert() {
  const trialState = useSelector(getTrialState);
  const alertName = useSelector(getAlertName);
  const showAlert = useSelector(getAlertShow);
  const { plan_type: planType } = useSelector(getUser);
  const dispatch = useDispatch();

  const handleAlertLinkClick = () => {
    if (trialState === TRIAL_NOT_STARTED) {
      dispatch(setModalName('screenReader'));
      dispatch(setModalShow(true));
    }

    if (trialState === TRIAL_EXPIRED) {
      dispatch(setModalName('buyPlan'));
      dispatch(setModalShow(true));
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
      if (!planType) {
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
