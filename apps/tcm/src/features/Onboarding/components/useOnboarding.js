import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getOnboardingInitDataAPI,
  setOnboardingDataAPI
} from 'api/onboarding.api';
import AppRoute from 'const/routes';
import { setUser } from 'globalSlice';
import { routeFormatter, selectMenuValueMapper } from 'utils/helperFunctions';
import { logEventHelper } from 'utils/logEvent';

import { SETUP_FORMATS } from '../const/immutableConst';
import {
  setHasProjects,
  setIsProcessing,
  setJobRolesArray,
  setNotificationDeciderValue,
  setOrgStrengthArray,
  updateFormData
} from '../slices/onboardingSlice';

const useOnboarding = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [invalidFields, setInvalidFields] = useState({});
  const userData = useSelector((state) => state.global.user);
  const isProcessing = useSelector((state) => state.onboarding.isProcessing);
  const hasProjects = useSelector((state) => state.onboarding.hasProjects);
  const formData = useSelector((state) => state.onboarding.formData);
  const jobRolesArray = useSelector((state) => state.onboarding.jobRolesArray);
  const orgStrengthArray = useSelector(
    (state) => state.onboarding.orgStrengthArray
  );

  const initFormData = () => {
    getOnboardingInitDataAPI().then((res) => {
      if (res?.role)
        dispatch(setJobRolesArray(selectMenuValueMapper(res?.role)));
      if (res?.organisation_strength)
        dispatch(
          setOrgStrengthArray(selectMenuValueMapper(res?.organisation_strength))
        );
      if (res?.project_count) dispatch(setHasProjects(!!res.project_count));
    });
  };

  const onFormChange = (key, value) => {
    setInvalidFields({
      ...invalidFields,
      [key]: false
    });
    dispatch(updateFormData({ key, value }));
  };

  const updateUserValue = () => {
    const updatedUserData = { ...userData };
    updatedUserData.onboarded = 1;
    dispatch(setUser(updatedUserData));
  };

  const continueClickHandler = () => {
    if (!formData?.role || !formData?.organisation_strength) {
      setInvalidFields({
        role: !formData?.role,
        organisation_strength: !formData?.organisation_strength
      });
      return;
    }
    if (!formData?.start_method) return;

    dispatch(setIsProcessing(true));
    setOnboardingDataAPI({ payload: formData }).then(() => {
      updateUserValue();
      dispatch(setNotificationDeciderValue(true));
      dispatch(setIsProcessing(false));
      switch (formData.start_method) {
        case SETUP_FORMATS[0].title: // quick_import
          dispatch(logEventHelper('TM_QiOptionSelectedOnboarding', {}));
          navigate(AppRoute.IMPORT, {
            state: {
              isFromOnboarding: true
            },
            replace: true
          });
          break;
        // case SETUP_FORMATS[1].title: // example_project
        // dispatch(logEventHelper('TM_ExampleProjectSelectedOnboarding', {}));
        //   // create new project API TODO
        //   navigate(AppRoute.ROOT);
        //   break;
        case SETUP_FORMATS[1].title: // scratch
          dispatch(logEventHelper('TM_ScratchProjectSelectedOnboarding', {}));
          navigate(
            hasProjects
              ? AppRoute.ROOT
              : routeFormatter(AppRoute.TEST_CASES, { projectId: 'new' }),
            { state: { isFromOnboarding: true }, replace: true }
          );
          break;
        default:
          break;
      }
    });
  };

  useEffect(() => {
    dispatch(logEventHelper('TM_OnboardingPageLoaded', {}));
    initFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    invalidFields,
    isProcessing,
    formData,
    userData,
    orgStrengthArray,
    jobRolesArray,
    onFormChange,
    continueClickHandler
  };
};

export default useOnboarding;
