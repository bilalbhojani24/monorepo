import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { setOnboardingDataAPI } from 'api/onboarding.api';
import { AUTH_TOKEN_KEY } from 'const/immutables';
import AppRoute from 'const/routes';
import { setUser } from 'globalSlice';
import { routeFormatter, selectMenuValueMapper } from 'utils/helperFunctions';

import { JOB_ROLES, SETUP_FORMATS, STRENGTH } from '../const/immutableConst';
import {
  setIsProcessing,
  setJobRolesArray,
  setOrgStrengthArray,
  updateFormData
} from '../slices/onboardingSlice';

const useOnboarding = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.global.user);
  const isProcessing = useSelector((state) => state.onboarding.isProcessing);
  const formData = useSelector((state) => state.onboarding.formData);
  const jobRolesArray = useSelector((state) => state.onboarding.jobRolesArray);
  const orgStrengthArray = useSelector(
    (state) => state.onboarding.orgStrengthArray
  );

  const initFormData = () => {
    dispatch(setJobRolesArray(selectMenuValueMapper(JOB_ROLES)));
    dispatch(setOrgStrengthArray(selectMenuValueMapper(STRENGTH)));
  };

  const onFormChange = (key, value) => {
    dispatch(updateFormData({ key, value }));
  };

  const updateUserValue = () => {
    const updatedUserData = { ...userData };
    delete updatedUserData.is_first_time;
    localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(updatedUserData));
    dispatch(setUser(updatedUserData));
  };

  const continueClickHandler = () => {
    if (!formData?.format) return;

    dispatch(setIsProcessing(true));
    // setOnboardingDataAPI({}).then((data)=>{
    updateUserValue();
    switch (formData.format) {
      case SETUP_FORMATS[0].id: // quick_import
        navigate(AppRoute.IMPORT);
        break;
      case SETUP_FORMATS[1].id: // example_project
        break;
      case SETUP_FORMATS[2].id: // scratch
        navigate(routeFormatter(AppRoute.TEST_CASES, { projectId: 'new' }));
        break;
      default:
        break;
    }
    // })
  };

  useEffect(() => {
    initFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
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
