import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthWallChecked: false,
  authWallActivated: false
};

export const authWallSlice = createSlice({
  name: 'authWall',
  initialState,
  reducers: {
    setAuthWall: (state, action) => {
      state.authWallActivated = action.payload;
    },
    setIsAuthWallChecked: (state, action) => {
      state.isAuthWallChecked = action.payload;
    }
  }
});

// reducers
export const getAuthWallState = (state) => state.authWall.authWallActivated;

export const getIsAuthWallChecked = (state) => state.authWall.isAuthWallChecked;

// Action creators are generated for each case reducer function
export const { setAuthWall, setIsAuthWallChecked } = authWallSlice.actions;

export default authWallSlice.reducer;
