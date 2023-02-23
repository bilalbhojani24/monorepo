import { createSlice } from '@reduxjs/toolkit';

import { SETUP_FORMATS } from '../const/immutableConst';

const initialState = {
  jobRolesArray: [],
  orgStrengthArray: [],
  hasProjects: false,
  isProcessing: false,
  formData: {
    role: '',
    organisation_strength: '',
    start_method: SETUP_FORMATS[0].title
  }
};

export const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setIsProcessing: (state, { payload }) => {
      state.isProcessing = payload;
    },
    setHasProjects: (state, { payload }) => {
      state.hasProjects = payload;
    },
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

export const {
  setHasProjects,
  setJobRolesArray,
  setOrgStrengthArray,
  updateFormData,
  setIsProcessing
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
