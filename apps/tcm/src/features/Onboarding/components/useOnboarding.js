import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMenuValueMapper } from 'utils/helperFunctions';

import { JOB_ROLES, STRENGTH } from '../const/immutableConst';
import {
  setJobRolesArray,
  setOrgStrengthArray,
  updateFormData
} from '../slices/onboardingSlice';

const useOnboarding = () => {
  const dispatch = useDispatch();

  const userName = useSelector((state) => state.global.user?.full_name || '');
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

  useEffect(() => {
    initFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { formData, userName, orgStrengthArray, jobRolesArray, onFormChange };
};

export default useOnboarding;
