import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdErrorOutline,
  MdOutlineWatchLater,
  Notifications,
  notify
} from '@browserstack/bifrost';
import initAPI from 'api/initAPI';
import { activateFreeTrial, checkProgress } from 'api/reverseTrial';
import confetti from 'canvas-confetti';
import { TRIAL_EXPIRED, TRIAL_IN_PROGRESS } from 'constants';
import {
  setBannerName,
  setModalShow,
  setShowBanner,
  setUser
} from 'features/Dashboard/slices/appSlice';
import {
  getModalName,
  getModalShow,
  getModalTrigger,
  getTrialState,
  getUser
} from 'features/Dashboard/slices/selectors';
import { buyAcceesibilityPlan } from 'utils/helper';
import { logEvent } from 'utils/logEvent';

export default function useReverseTrialModal() {
  const showModal = useSelector(getModalShow);
  const modalName = useSelector(getModalName);
  const trialState = useSelector(getTrialState);
  const modalTrigger = useSelector(getModalTrigger);
  const timerId = useRef(null);
  const dispatch = useDispatch();
  const isEligible = useSelector(getUser);
  const [showLoader, setShowLoader] = useState(false);

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

  const handleModalClose = async () => {
    try {
      if (showLoader) {
        const response = await initAPI();
        dispatch(setUser(response.data));
        if (response.data.trial_status === TRIAL_IN_PROGRESS) {
          trailInProcessNotification();
        }
      }
    } catch (e) {
      console.error(e);
    }
    dispatch(setModalShow(false));
    logEvent('InteractedWithRTFeaturesUI', {
      platform: 'Dashboard',
      type: modalTrigger,
      state: trialState === TRIAL_EXPIRED ? 'RT expired' : 'RT pending',
      action: 'Cancel'
    });
  };

  const showConfetti = () => {
    confetti({
      particleCount: 1080,
      spread: 900,
      startVelocity: 70,
      origin: {
        x: 0.5,
        y: -0.5
      }
    });
  };

  const handleError = () => {
    freeTrialRequestFailureNotification();
    dispatch(setModalShow(false));
  };

  const refreshUserData = async () => {
    clearInterval(timerId.current);
    try {
      const response = await initAPI();
      dispatch(setUser(response.data));
    } catch (e) {
      console.error(e);
    }
  };

  const pollReverseTrialStatus = () => {
    timerId.current = setInterval(async () => {
      try {
        const response = await checkProgress();
        if (response.success) {
          await refreshUserData();
          dispatch(setBannerName('enabled'));
          dispatch(setShowBanner(true));
          dispatch(setModalShow(false));
          showConfetti();
          setShowLoader(false);
          logEvent('OnRTActivationSuccessState');
        }
      } catch (e) {
        await refreshUserData();
        handleError();
        setShowLoader(false);
      }
    }, 2000);
  };

  const handleButtonClick = async () => {
    let action = 'Buy plan';
    if (modalName !== 'buyPlan' && isEligible) {
      setShowLoader(true);
      try {
        const response = await activateFreeTrial();
        if (response.success) {
          pollReverseTrialStatus();
        } else {
          handleError();
          setShowLoader(false);
        }
      } catch (e) {
        handleError();
        setShowLoader(false);
      }
      action = 'Activate 14-day free trial';
    } else {
      buyAcceesibilityPlan();
    }

    logEvent('InteractedWithRTFeaturesUI', {
      platform: 'Dashboard',
      type: modalTrigger,
      state: trialState === TRIAL_EXPIRED ? 'RT expired' : 'RT pending',
      action
    });
  };

  useEffect(
    () => () => {
      clearInterval(timerId.current);
    },
    []
  );

  return {
    showModal,
    handleModalClose,
    modalName,
    trialState,
    handleButtonClick,
    showLoader
  };
}
