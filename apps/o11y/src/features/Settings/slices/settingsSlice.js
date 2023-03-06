import { createSlice } from '@reduxjs/toolkit';

const { reducer } = createSlice({
  name: 'settings',
  initialState: {
    timeoutForBuilds: 0
  },
  reducers: {},
  extraReducers: {}
});

// export const {} = actions;

export default reducer;
