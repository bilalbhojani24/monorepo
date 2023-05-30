import { updateAndInitiateAnalytics } from '@browserstack/mcp-shared';

import { fetchGeneralAnalyticsForWeb } from '../../../api/dashboard';

import { setGeneralAnalytics } from './dashboardSlice';

export const initiateWebAnalytics = () => async (dispatch) => {
  try {
    const response = await fetchGeneralAnalyticsForWeb();

    if (response.status === 200) {
      updateAndInitiateAnalytics(response.data);

      dispatch(setGeneralAnalytics(response.data));
    }
  } catch (error) {
    // handle error when PM defines Scenario
  }
};
