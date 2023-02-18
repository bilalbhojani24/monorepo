import { createSlice } from '@reduxjs/toolkit';

import { SETUP_FORMATS } from '../const/immutableConst';

const initialState = {
  jobRolesArray: [
    {
      label: 'Test',
      value: 'test'
    }
  ],
  orgStrengthArray: [
    {
      label: 'Test',
      value: 'test'
    }
  ],
  formData: {
    job: '',
    strength: '',
    format: SETUP_FORMATS[0].id
  }
};

export const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setJobRolesArray: (state, { payload }) => {
      state.jobRolesArray = payload;
    },
    setOrgStrengthArray: (state, { payload }) => {
      state.orgStrengthArray = payload;
    },
    updateFormData: (state, { payload }) => {
      state.formData[payload.key] = payload.value;
    }
  }
});

export const { setJobRolesArray, setOrgStrengthArray, updateFormData } =
  onboardingSlice.actions;

export default onboardingSlice.reducer;
