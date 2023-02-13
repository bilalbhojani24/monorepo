import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // previousUserSessions: [],
  previousUserSessions: [
    {
      testSessionName: 'Wikipedia_v2.1.0-Google_Pixel_7-12_01_2023-15:59:23',
      application: 'Wikipedia',
      device: 'Google Pixel 7 Pro',
      time: '10:54pm',
      packageDetails: 'com.wikipedia.app ∙ v2.03',
      osDetails: 'Android 13'
    },
    {
      testSessionName: 'Wikipedia_v2.1.0-Google_Pixel_7-12_01_2023-15:59:24',
      application: 'Zomato',
      device: 'iPhone 14 Pro Max',
      time: '10:55pm',
      packageDetails: 'org.zomato.app ∙ v1.46',
      osDetails: 'iOS 16'
    },
    {
      testSessionName: 'Wikipedia_v2.1.0-Google_Pixel_7-12_01_2023-15:59:25',
      application: 'Swigyy',
      device: 'Samsung Galaxy S22 Ultra',
      time: '10:56pm',
      packageDetails: 'com.swiggy.app ∙ v7.98',
      osDetails: 'Android 13'
    }
  ]
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {}
});

// reducers
export const getPreviousUserSessions = (state) =>
  state.home.previousUserSessions;

// Action creators are generated for each case reducer function
// export const {} = homeSlice.actions;

export default homeSlice.reducer;
