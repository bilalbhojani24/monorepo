import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProjectsMinifiedAPI } from 'api/projects.api';
import AppRoute from 'const/routes';
import { setAllProjects } from 'globalSlice';
import { routeFormatter } from 'utils/helperFunctions';

import {
  basePrimaryNavLinks,
  internalPrimaryNavLinks,
  secondaryNavLinks
} from '../const/navsConst';

export default function useSideNav() {
  const allProjectOptionValue = 'all_projects';
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [primaryNavs, setPrimaryNavs] = useState([]);
  const [secondaryNavs] = useState(secondaryNavLinks);
  const [allProjectsDrop, setAllProjectsDrop] = useState([]);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showProjects, setShowProjects] = useState(true);
  const [activeRoute, setActiveRoute] = useState(null);
  const baseViewRoutes = [AppRoute.ROOT, AppRoute.SETTINGS, AppRoute.RESOURCES];
  const allProjects = useSelector((state) => state.global.allProjects);
  const selectedProjectId = useSelector(
    (state) => state.global.selectedProjectId
  );
  const userData = useSelector((state) => state.global.user);

  const onLinkChange = (linkItem) => {
    navigate(linkItem.path);
  };

  const loadProjectsList = () => {
    getProjectsMinifiedAPI().then((res) => {
      dispatch(setAllProjects(res.projects));
    });
  };

  const dynamicLinkReplaceHelper = (array) => {
    const replaceProjectId =
      !selectedProjectId || `${selectedProjectId}` === 'null'
        ? allProjectsDrop?.[0]?.value || null
        : selectedProjectId;
    return array.map((item) => ({
      ...item,
      path: routeFormatter(item.path, {
        projectId: replaceProjectId
      })
    }));
  };

  const onProjectChange = (project) => {
    if (project.id === allProjectOptionValue) {
      navigate(AppRoute.ROOT);
    } else
      navigate(
        routeFormatter(activeRoute.id, {
          projectId: project?.id
        })
      );
  };

  const setAddProjectModal = (value) => {
    setShowAddProject(value);
  };

  useEffect(() => {
    if (userData && !allProjects.length) loadProjectsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  useEffect(() => {
    // set view
    if (baseViewRoutes.includes(location.pathname)) {
      // basic view page without secondary navs
      setShowProjects(false);
      setPrimaryNavs(dynamicLinkReplaceHelper(basePrimaryNavLinks));
      // setSecondaryNavs([]);
    } else {
      // with secondary navs
      setShowProjects(true);
      setPrimaryNavs(dynamicLinkReplaceHelper(internalPrimaryNavLinks));
      // setSecondaryNavs(dynamicLinkReplaceHelper(secondaryNavLinks));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, selectedProjectId, allProjectsDrop]);

  useEffect(() => {
    const allNavs = [...primaryNavs, ...secondaryNavs];
    let exactMatchRoute = allNavs.find(
      (item) => location.pathname === routeFormatter(item.path, {})
    );
    if (!exactMatchRoute)
      // only if no exact match found then check for partial match
      exactMatchRoute = allNavs
        .reverse()
        .find((item) => location.pathname.includes(item.path));
    // set current view
    setActiveRoute(exactMatchRoute);
  }, [location.pathname, primaryNavs, secondaryNavs]);

  useEffect(() => {
    setAllProjectsDrop([
      ...allProjects.map((item) => ({
        ...item,
        label: item.name,
        value: item.id
      })),
      {
        label: 'All Projects',
        value: allProjectOptionValue,
        id: allProjectOptionValue,
        divider: true
      }
    ]);
  }, [allProjects]);

  return {
    showAddProject,
    primaryNavs,
    secondaryNavs,
    allProjectsDrop,
    showProjects,
    activeRoute,
    selectedProjectId,
    onLinkChange,
    onProjectChange,
    setAddProjectModal
  };
}
