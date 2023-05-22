import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProjectsMinifiedAPI } from 'api/projects.api';
import AppRoute from 'const/routes';
import { setAllProjects, setIsLoadingProps } from 'globalSlice';
import { routeFormatter } from 'utils/helperFunctions';
import { logEventHelper } from 'utils/logEvent';

import { setDetailsModal } from '../../ImportProgress/slices/importProgressSlice';
import {
  basePrimaryNavLinks,
  IMPORT_IN_PROGRESS,
  internalPrimaryNavLinks,
  secondaryNavLinks
} from '../const/navsConst';

export default function useSideNav() {
  const selectMenuRef = useRef();
  const allProjectOptionValue = 'all_projects';
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [primaryNavs, setPrimaryNavs] = useState([]);
  const [secondaryNavs, setSecondaryNavs] = useState(secondaryNavLinks);
  const [allProjectsDrop, setAllProjectsDrop] = useState([]);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showProjects, setShowProjects] = useState(true);
  const [activeRoute, setActiveRoute] = useState(null);
  const [showImportInProgTooltip, setShowInProgTooltip] = useState(true);
  const baseViewRoutes = [AppRoute.ROOT, AppRoute.SETTINGS, AppRoute.RESOURCES];
  const hasProjects = useSelector((state) => state.onboarding.hasProjects);
  const allProjects = useSelector((state) => state.global.allProjects);
  const isAllProjectsLoading = useSelector(
    (state) => state.global.isLoading.allProjects
  );
  const selectedProjectId = useSelector(
    (state) => state.global.selectedProjectId
  );
  const allFolders = useSelector((state) => state.repository?.allFolders);
  const overallImportProgress = useSelector(
    (state) => state.importProgress.importDetails.percent
  );
  const isDetailsModalVisible = useSelector(
    (state) => state.importProgress.isDetailsModalVisible
  );
  const isCancelModalVisible = useSelector(
    (state) => state.importProgress.isCancelModalVisible
  );

  const fetchAllProjects = () => {
    getProjectsMinifiedAPI().then((res) => {
      dispatch(setAllProjects(res.projects));
      dispatch(setIsLoadingProps({ key: 'allProjects', value: false }));
    });
  };

  const onPageChangeLogger = (linkItem) => {
    if (linkItem?.instrumentKey) {
      dispatch(
        logEventHelper(linkItem?.instrumentKey, {
          project_id: selectedProjectId
        })
      );
    }
  };

  const onLinkChange = (linkItem) => {
    if (linkItem?.id === 'import_in_progress') {
      dispatch(setDetailsModal(true));
    }
    if (linkItem?.isExternalLink) {
      window.open(linkItem.path);
    } else {
      onPageChangeLogger(linkItem);
      if (linkItem?.label === 'Test Cases' && allFolders?.[0]?.id) {
        navigate(`${linkItem.path}/${allFolders?.[0]?.id}/test-cases`);
      } else navigate(linkItem.path);
    }
  };

  const dynamicLinkReplaceHelper = (array) => {
    const emptyProjectId = allProjects.length
      ? allProjectsDrop?.[0]?.value
      : 'new'; // show new as id if no projects exists
    const replaceProjectId =
      !selectedProjectId || `${selectedProjectId}` === 'null'
        ? emptyProjectId || null
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
      dispatch(logEventHelper('TM_AllProjectClickedProjectDropDown', {}));
      navigate(AppRoute.ROOT);
    } else
      navigate(
        routeFormatter(
          project?.hasTestCases ? AppRoute.DASHBOARD : AppRoute.TEST_CASES,
          {
            projectId: project?.id
          }
        )
      );
  };

  const setAddProjectModal = (value) => {
    setShowAddProject(value);
  };

  const closeTooltipHandler = () => {};

  useEffect(() => {
    if (location?.state?.isFromOnboarding && selectedProjectId === 'new') {
      setAddProjectModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProjectId]);

  useEffect(() => {
    // set view
    const isImportWithProjects =
      location.pathname === AppRoute.IMPORT && hasProjects;

    if (baseViewRoutes.includes(location.pathname) || isImportWithProjects) {
      // basic view page without secondary navs
      setShowProjects(false);
      setPrimaryNavs(dynamicLinkReplaceHelper(basePrimaryNavLinks));
      // setSecondaryNavs([]);
    } else {
      // with secondary navs
      setShowProjects(!isAllProjectsLoading);
      setPrimaryNavs(dynamicLinkReplaceHelper(internalPrimaryNavLinks));
      // setSecondaryNavs(dynamicLinkReplaceHelper(secondaryNavLinks));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    location.pathname,
    selectedProjectId,
    allProjectsDrop,
    isAllProjectsLoading
  ]);

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
        value: item.id,
        hasTestCases: true
      })),
      {
        label: 'View All Projects',
        value: allProjectOptionValue,
        id: allProjectOptionValue,
        divider: true
      }
    ]);
  }, [allProjects]);

  useEffect(() => {
    const addProgress = (allNavs) => {
      setSecondaryNavs(
        allNavs.map((item) => {
          if (item.id === 'import_in_progress')
            return {
              ...item,
              label: `Import in Progress (${overallImportProgress}%)`
            };
          return item;
        })
      );
    };
    if (
      location.pathname !== AppRoute.ROOT &&
      secondaryNavs[0].id !== 'import_in_progress'
    ) {
      const toBeSecondaryNavs = [...IMPORT_IN_PROGRESS, ...secondaryNavs];

      addProgress(toBeSecondaryNavs);
    } else if (
      location.pathname !== AppRoute.ROOT &&
      secondaryNavs[0].id === 'import_in_progress'
    ) {
      addProgress(secondaryNavs);
    } else setSecondaryNavs(secondaryNavLinks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, overallImportProgress]);

  useEffect(() => {
    fetchAllProjects();
    setTimeout(() => {
      closeTooltipHandler();
      setShowInProgTooltip(false);
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    hasProjects,
    selectMenuRef,
    isAllProjectsLoading,
    isDetailsModalVisible,
    isCancelModalVisible,
    showAddProject,
    primaryNavs,
    secondaryNavs,
    allProjectsDrop,
    showProjects,
    activeRoute,
    selectedProjectId,
    showImportInProgTooltip,
    onLinkChange,
    onProjectChange,
    setAddProjectModal
  };
}
