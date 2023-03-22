import { cookieUtils as Cookie } from '@browserstack/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import {
  setHasToken,
  uatConfigSelector
} from '../features/slices/userAuthSlice';

import { REQUEST_TIMOUT, UAT_COOKIE_NAME } from './constants';

export const fetchToken = (_, { getState, dispatch }) => {
  const { url, headers } = uatConfigSelector(getState());
  const cookie = new Cookie();
  const integrationsToken = cookie.read(UAT_COOKIE_NAME);
  const hasToken = Boolean(integrationsToken);
  if (hasToken) {
    // cookie with token exists, update state
    dispatch(setHasToken(true));
    // return token from cookie
    return Promise.resolve(integrationsToken);
  }

  return axios
    .get(url, {
      timeout: REQUEST_TIMOUT,
      timeoutErrorMessage: 'Request timed out',
      headers
    })
    .then((response) => {
      cookie.create(UAT_COOKIE_NAME, response.data.access_token);
      dispatch(setHasToken(true));
      return response;
    });
};

export const fetchTokenThunk = createAsyncThunk('fetchUATToken', fetchToken);
