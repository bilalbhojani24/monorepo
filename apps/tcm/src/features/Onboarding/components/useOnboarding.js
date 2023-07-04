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
  setExistingToolsArray,
  setHasProjects,
  setIsProcessing,
  setJobRolesArray,
  setNotificationDeciderValue,
  // setOrgStrengthArray,
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
  // const orgStrengthArray = useSelector(
  //   (state) => state.onboarding.orgStrengthArray
  // );
  const existingToolsArray = useSelector(
    (state) => state.onboarding.existingToolsArray
  );

  const initFormData = () => {
    getOnboardingInitDataAPI().then((res) => {
      if (res?.role)
        dispatch(setJobRolesArray(selectMenuValueMapper(res?.role)));
      // if (res?.organisation_strength)
      //   dispatch(
      //     setOrgStrengthArray(selectMenuValueMapper(res?.organisation_strength))
      //   );
      if (res?.project_count) dispatch(setHasProjects(!!res.project_count));
      if (res?.existing_tools)
        dispatch(
          setExistingToolsArray(selectMenuValueMapper(res?.existing_tools))
        );
    });
  };

  const onFormChange = (key, value) => {
    setInvalidFields({
      ...invalidFields,
      [key]: false
    });
    dispatch(
      updateFormData(
        key === 'existing_tools'
          ? { key, value: value.map((val) => val.value).join(',') }
          : { key, value }
      )
    );
  };

  const updateUserValue = () => {
    const updatedUserData = { ...userData };
    updatedUserData.onboarded = 1;
    dispatch(setUser(updatedUserData));
  };

  const continueClickHandler = () => {
    dispatch(
      logEventHelper('TM_OnboardingProceedBtnClicked', {
        setup: formData?.start_method
      })
    );
    if (
      !formData?.role ||
      // !formData?.organisation_strength ||
      !formData?.existing_tools
    ) {
      setInvalidFields({
        role: !formData?.role,
        // organisation_strength: !formData?.organisation_strength,
        existing_tools: !formData?.existing_tools
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
    // orgStrengthArray,
    jobRolesArray,
    existingToolsArray,
    onFormChange,
    continueClickHandler
  };
};

export default useOnboarding;
