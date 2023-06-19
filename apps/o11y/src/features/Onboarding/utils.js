import { o11yHistory } from 'constants/common';
import { ROUTES } from 'constants/routes';
import { getActiveProject } from 'globalSlice/selectors';
import { getProjectBuildsPath } from 'utils/routeUtils';

export const skipToDashboard =
  (projectNormalisedName) => (dispatch, getState) => {
    if (projectNormalisedName) {
      o11yHistory.navigate(getProjectBuildsPath(projectNormalisedName));
    } else {
      const activeProject = getActiveProject(getState());
      if (activeProject?.normalisedName) {
        o11yHistory.navigate(
          getProjectBuildsPath(activeProject?.normalisedName)
        );
      } else {
        o11yHistory.navigate(ROUTES.projects);
      }
    }
  };
