import { MCP_CONSTANTS, updateSessionMetrics } from '@browserstack/mcp-shared';

import { fetchReportDataById } from '../../../api/reportContainer';

import { setIsReportErrored, setIsReportLoading } from './reportContainerSlice';

export const getReportData =
  (reportId, sharedReportAuthToken) => async (dispatch) => {
    try {
      dispatch(setIsReportLoading(true));

      const response = await fetchReportDataById(
        reportId,
        sharedReportAuthToken
      );

      dispatch(updateSessionMetrics(response));
    } catch (error) {
      // handle error when PM defines Scenario

      dispatch(setIsReportErrored(true));

      if (error?.response?.status === 401) {
        window.location.href = MCP_CONSTANTS.WEB_SSO_AUTH_URL;
      } else {
        throw error;
      }
    } finally {
      dispatch(setIsReportLoading(false));
    }
  };
