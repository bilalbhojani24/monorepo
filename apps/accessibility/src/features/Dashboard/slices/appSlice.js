import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'dashboardAppSlice',
  initialState: {
    user: null
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    }
  }
});

export const { setUser } = actions;

export default reducer;
