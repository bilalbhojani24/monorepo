import { useDispatch, useSelector } from 'react-redux';

import { updateFormData } from '../slices/onboardingSlice';

const useOnboarding = () => {
  const dispatch = useDispatch();

  const userName = useSelector((state) => state.global.user?.full_name || '');
  const formData = useSelector((state) => state.onboarding.formData);
  const jobRolesArray = useSelector((state) => state.onboarding.jobRolesArray);
  const orgStrengthArray = useSelector(
    (state) => state.onboarding.orgStrengthArray
  );

  const onFormChange = (key, value) => {
    dispatch(updateFormData({ key, value }));
  };

  return { formData, userName, orgStrengthArray, jobRolesArray, onFormChange };
};

export default useOnboarding;
