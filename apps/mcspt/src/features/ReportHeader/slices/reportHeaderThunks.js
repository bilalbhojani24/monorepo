import { getSessionMetrics } from '@browserstack/mcp-shared';
import { fetchSharableLink } from 'api/reportHeader';

import {
  setIsSharableLinkGenerating,
  setShareableLinkForReport
} from './reportHeaderSlice';

export const generateSharableLinkForReport =
  (openPopoverCallback) => async (dispatch, getState) => {
    try {
      dispatch(setIsSharableLinkGenerating(true));

      const sessionId = getSessionMetrics(getState())?.uuid;

      const response = await fetchSharableLink(sessionId);

      dispatch(setShareableLinkForReport(response?.URL));

      openPopoverCallback(true);
    } catch (error) {
      // handle error when PM defines Scenario
    } finally {
      dispatch(setIsSharableLinkGenerating(false));
    }
  };
