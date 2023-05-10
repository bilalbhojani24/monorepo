import { getTestReportDetails } from 'features/TestList/slices/testListSlice';

import {
  setWidgetConfiguration,
  toggleWidget
} from './slices/integrationsWidgetSlice';

export const showIntegrationsWidget =
  ({ testRunId, widgetPosition }) =>
  (dispatch) => {
    dispatch(toggleWidget(false));
    return dispatch(
      getTestReportDetails({
        buildId: 'DUMMY',
        testRunId
      })
    )
      .unwrap()
      .then(() => {
        dispatch(
          setWidgetConfiguration({
            position: widgetPosition || 'right'
          })
        );
        dispatch(toggleWidget(true));
        return true;
      });
  };

export const hideIntegrationsWidget = () => (dispatch) => {
  dispatch(toggleWidget(false));
  dispatch(
    setWidgetConfiguration({
      position: 'right'
    })
  );
};
