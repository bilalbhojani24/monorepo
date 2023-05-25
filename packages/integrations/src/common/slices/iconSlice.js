import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const iconSlice = createSlice({
  name: 'icons',
  initialState,
  reducers: {
    setIconForUrl: (state, action) => {
      state[action.payload.url] = action.payload.image;
    }
  }
});

export const { setIconForUrl } = iconSlice.actions;

export default iconSlice.reducer;

export const getIconForUrl = (state, url) => state.icons[url];
