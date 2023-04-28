import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getNotificationDetails,
  getValidEmails,
  toggleProjectNotification,
  updateUsersToNotify
} from 'api/settings';

const SLICE_NAME = 'notificationsSettings';

export const getNotificationDetailsData = createAsyncThunk(
  `${SLICE_NAME}/getNotificationDetailsData`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await getNotificationDetails({ ...data });
      return {
        data: response.data,
        project: data?.projectNormalisedName
      };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const getValidEmailsData = createAsyncThunk(
  `${SLICE_NAME}/getValidEmailsData`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await getValidEmails({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const updateUsersToNotificationList = createAsyncThunk(
  `${SLICE_NAME}/updateUsersToNotificationList`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateUsersToNotify({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const toggleProjectNotificationStatus = createAsyncThunk(
  `${SLICE_NAME}/toggleProjectNotificationStatus`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await toggleProjectNotification({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const { reducer, actions } = createSlice({
  name: SLICE_NAME,
  initialState: {
    status: {
      isLoading: false,
      project: ''
    },
    notifiedUsers: []
  },
  reducers: {
    setNotifiedUsers: (state, { payload }) => {
      state.notifiedUsers = payload;
    },
    updateNotifiedUsers: (state, { payload }) => {
      payload.forEach((user) => {
        const foundIdx = state.notifiedUsers.findIndex(
          (notifiedUser) => notifiedUser.email === user.email
        );
        if (foundIdx !== -1) {
          state.notifiedUsers[foundIdx] = user;
        } else {
          state.notifiedUsers.push(user);
        }
      });
    },
    findAndUpdateUserNotificationTypePref: (state, { payload }) => {
      const foundIdx = state.notifiedUsers.findIndex(
        (user) => user.email === payload.email
      );
      if (foundIdx !== -1) {
        state.notifiedUsers[foundIdx] = payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotificationDetailsData.pending, (state) => {
        state.status.isLoading = true;
        state.notifiedUsers = [];
      })
      .addCase(getNotificationDetailsData.fulfilled, (state, { payload }) => {
        state.status = {
          project: payload.project,
          isLoading: false
        };
        state.notifiedUsers = payload.data?.users || [];
      })
      .addCase(getNotificationDetailsData.rejected, (state) => {
        state.status = {
          isLoading: false,
          project: ''
        };
        state.notifiedUsers = [];
      });
  }
});

export const {
  setNotifiedUsers,
  updateNotifiedUsers,
  findAndUpdateUserNotificationTypePref
} = actions;

export default reducer;
