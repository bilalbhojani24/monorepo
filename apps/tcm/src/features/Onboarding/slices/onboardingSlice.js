import { createSlice } from '@reduxjs/toolkit';

import {
  SETUP_FORMATS,
  TC_ASSIGNED_NOTIFICATION_ID
} from '../const/immutableConst';

const initialState = {
  jobRolesArray: [],
  orgStrengthArray: [],
  hasProjects: false,
  isProcessing: false,
  formData: {
    role: '',
    organisation_strength: '',
    start_method: SETUP_FORMATS[0].title
  },
  timerFinished: false,
  isOnboardingCompleted: false,
  autoAssignedProjectId: null,
  tcAssignedNotificationConfig: { show: null, id: TC_ASSIGNED_NOTIFICATION_ID }
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
    },
    setTCAssignedNotificationConfig: (state, { payload }) => {
      state.tcAssignedNotificationConfig.show = payload.show;
    },
    setIsOnboardingCompleted: (state, { payload }) => {
      state.isOnboardingCompleted = payload;
    },
    setTimerFinished: (state, { payload }) => {
      state.timerFinished = payload;
    },
    autoAssignmentStatusFulfilled: (state, { payload }) => {
      state.tcAssignedNotificationConfig.show = payload.show_notification;
      state.autoAssignedProjectId = payload.project_id;
    }
  }
});

export const {
  setHasProjects,
  setJobRolesArray,
  setOrgStrengthArray,
  updateFormData,
  setIsProcessing,
  setTimerFinished,
  setIsOnboardingCompleted,
  autoAssignmentStatusFulfilled,
  setTCAssignedNotificationConfig
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
