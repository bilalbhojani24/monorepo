import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  generatePath,
  matchRoutes,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { O11yComboBox } from 'common/bifrostProxy';
import { ROUTES } from 'constants/routes';
import { setIsUEDetailsVisible } from 'features/SHErrorDetails/slices/dataSlice';
import { setIsSHTestsDetailsVisible } from 'features/SHTestDetails/slices/dataSlice';
import { hideTestDetailsDrawer } from 'features/TestDetails/utils';
import { setActiveProject } from 'globalSlice';
import { getProjects } from 'globalSlice/selectors';
import { getProjectBuildsPath, isBuildsPage } from 'utils/routeUtils';

const ROUTES_ARRAY = Object.values(ROUTES).map((route) => ({ path: route }));

export default function ProjectSelector() {
  const projects = useSelector(getProjects);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [
    {
      route: { path }
    }
  ] = matchRoutes(ROUTES_ARRAY, location);

  const menuOptions = useMemo(
    () =>
      projects?.list?.map((item) => ({
        label: item.name,
        value: item.id,
        normalisedName: item.normalisedName
      })),
    [projects.list]
  );

  const handleProjectChange = (item) => {
    dispatch(
      setActiveProject({
        id: item.value,
        name: item.label,
        normalisedName: item.normalisedName
      })
    );
    dispatch(setIsSHTestsDetailsVisible(false));
    dispatch(hideTestDetailsDrawer());
    dispatch(setIsUEDetailsVisible(false));
    if (isBuildsPage()) {
      navigate(getProjectBuildsPath(encodeURI(item.normalisedName)), {
        replace: true
      });
    } else {
      const generatedPath = generatePath(path, {
        projectNormalisedName: item.normalisedName
      });
      navigate({
        pathname: generatedPath,
        search: location.search
      });
    }
  };

  return (
    <O11yComboBox
      checkPosition="right"
      label=""
      placeholder="Select a project"
      value={{
        label: projects.active?.name,
        value: projects.active?.id
      }}
      options={menuOptions}
      onChange={handleProjectChange}
    />
  );
}
