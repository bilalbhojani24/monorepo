import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formPayload: {
    name: '',
    description: '',
    estimate: '',
    type: '',
    priority: '',
    owner: '',
    state: '',
    precondition: '',
  },
};

export const testCaseFormSlice = createSlice({
  name: 'testCaseForm',
  initialState,
  reducers: {
    addFormPayload: (state, { payload }) => {
      state.formPayload[payload.key] = payload.value;
    },
  },
});

export const { addFormPayload, addSingleTestCase } = testCaseFormSlice.actions;

export default testCaseFormSlice.reducer;
