import { createSlice } from '@reduxjs/toolkit';

const SLICE_NAME = 'gridDetails';

const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState: {
    currentOnboardingTooltipCount: null,
    showOnboardingTooltips: false
  },
  reducers: {
    setCurrentOnboardingTooltipCount: (state, { payload }) => {
      state.currentOnboardingTooltipCount = payload;
    },
    setShowOnboardingTooltips: (state, { payload }) => {
      state.showOnboardingTooltips = payload;
      state.currentOnboardingTooltipCount = payload ? 1 : null;
    }
  }
});

export const { setCurrentOnboardingTooltipCount, setShowOnboardingTooltips } =
  actions;
export default reducer;
