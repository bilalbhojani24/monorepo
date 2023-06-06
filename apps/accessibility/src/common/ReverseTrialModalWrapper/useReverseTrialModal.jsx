import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdErrorOutline,
  MdOutlineWatchLater,
  Notifications,
  notify
} from '@browserstack/bifrost';
import { activateFreeTrial, checkProgress } from 'api/reverseTrial';
import confetti from 'canvas-confetti';
import { TRIAL_IN_PROGRESS } from 'constants';
import {
  setBannerName,
  setModalShow,
  setShowBanner,
  setTrialState
} from 'features/Dashboard/slices/appSlice';
import {
  getModalName,
  getModalShow,
  getTrialEligibility,
  getTrialState
} from 'features/Dashboard/slices/selectors';
import { buyAcceesibilityPlan } from 'utils/helper';

export default function useReverseTrialModal() {
  const showModal = useSelector(getModalShow);
  const modalName = useSelector(getModalName);
  const trialState = useSelector(getTrialState);
  const timerId = useRef(null);
  const dispatch = useDispatch();
  const isEligible = useSelector(getTrialEligibility);

  const freeTrialRequestFailureNotification = () => {
    notify(
      <Notifications
        title="Oops! Something went wrong."
        description="We were unable to process your free trial. Please try again later."
        actionButtons={null}
        headerIcon={<MdErrorOutline className="text-danger-400 h-6 w-6" />}
        handleClose={(toastData) => {
          notify.remove(toastData.id);
        }}
      />,
      {
        position: 'top-right',
        autoClose: true,
        id: 'one'
      }
    );
  };

  const trailInProcessNotification = () => {
    notify(
      <Notifications
        title="Your free trial is being processed"
        actionButtons={null}
        headerIcon={
          <MdOutlineWatchLater className="text-attention-500 h-6 w-6" />
        }
        handleClose={(toastData) => {
          notify.remove(toastData.id);
        }}
      />,
      {
        position: 'top-right',
        autoClose: true,
        id: 'one'
      }
    );
  };

  const handleModalClose = () => {
    dispatch(setModalShow(false));
    if (trialState === TRIAL_IN_PROGRESS) {
      trailInProcessNotification();
    }
  };

  const showConfetti = () => {
    confetti({
      particleCount: 400,
      spread: 120,
      startVelocity: 40,
      origin: {
        x: 0,
        y: 0.5
      }
    });
    confetti({
      particleCount: 400,
      spread: 120,
      startVelocity: 40,
      origin: {
        x: 1,
        y: 0.5
      }
    });
  };

  const pollReverseTrialStatus = () => {
    const poll = checkProgress();
    timerId.current = setInterval(async () => {
      try {
        const response = await poll();
        if (response.success) {
          clearInterval(timerId.current);
          dispatch(setTrialState('started'));
          dispatch(setBannerName('started'));
          dispatch(setShowBanner(true));
          dispatch(setModalShow(false));
          showConfetti();
        }
        console.log(response);
      } catch (e) {
        clearInterval(timerId.current);
        freeTrialRequestFailureNotification();
        console.error(e);
      }
    }, 2000);
  };

  const handleButtonClick = async () => {
    if (modalName !== 'buyPlan' && isEligible) {
      try {
        const response = await activateFreeTrial();
        if (response.message === 'success') {
          // TO-DO: remove dispatch and make a call to get_user_profile api with actual api integration
          dispatch(setTrialState('in_progress'));
          pollReverseTrialStatus();
        }
      } catch (e) {
        freeTrialRequestFailureNotification();
        console.error(e);
      }
    } else {
      buyAcceesibilityPlan();
    }
  };

  useEffect(() => () => clearInterval(timerId.current), []);

  return {
    showModal,
    handleModalClose,
    modalName,
    trialState,
    handleButtonClick
  };
}
