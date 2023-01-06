import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0
};

export const repositorySlice = createSlice({
  name: 'repository',
  initialState,
  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    }
  }
});

export const { incrementByAmount } = repositorySlice.actions;

export default repositorySlice.reducer;
