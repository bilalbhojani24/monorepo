import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { dismissTooltipAPI } from 'api/import.api';
import { getProjectsMinifiedAPI } from 'api/projects.api';
import Clock from 'assets/icons/customIcons/Clock';
import { TEAM_NAME_EVENTS } from 'const/immutables';
import AppRoute from 'const/routes';
import { setAllProjects, setIsLoadingProps } from 'globalSlice';
import { routeFormatter } from 'utils/helperFunctions';
import { logEventHelper } from 'utils/logEvent';

import {
  setDetailsModal,
  setHoverActive
} from '../../ImportProgress/slices/importProgressSlice';
import {
  basePrimaryNavLinks,
  IMPORT_IN_PROGRESS,
  internalPrimaryNavLinks,
  secondaryNavLinks
} from '../const/navsConst';

export default function useSideNav() {
  const TOOLTIP_TIMER = 5000;
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
  const importProgress = useSelector(
    (state) => state.importProgress.importDetails.percent
  );
  const isDetailsModalVisible = useSelector(
    (state) => state.importProgress.isDetailsModalVisible
  );
  const isCancelModalVisible = useSelector(
    (state) => state.importProgress.isCancelModalVisible
  );
  const isTooltipDismissed = useSelector(
    (state) => state.importProgress.isTooltipDismissed
  );
  const isProgressDismissed = useSelector(
    (state) => state.importProgress.isProgressDismissed
  );
  const importStatus = useSelector(
    (state) => state.importProgress.importStatus
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
    if (linkItem?.identifier === 'import_in_progress') {
      dispatch(logEventHelper('TM_QiImportProgressMenuClicked', {}));
      if (importProgress === 100) navigate(linkItem.path);
      else dispatch(setDetailsModal(true));
      return;
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

  const closeTooltipHandler = () => {
    setShowInProgTooltip(false);
    dismissTooltipAPI();
  };

  const onGetADemoCTAClick = () => {
    window.open(
      'https://www.browserstack.com/contact?ref=test-management-dashboard-demo-lead',
      '_blank'
    );
    dispatch(
      logEventHelper('LoadContactForm', {
        source: `${TEAM_NAME_EVENTS}-dashboard-demo-lead`,
        url: window.location.href
      })
    );
  };

  const handleHover = (state, item) => {
    if (item?.identifier === 'import_in_progress') {
      if (state === 'enter') dispatch(setHoverActive(true));
      if (state === 'leave') dispatch(setHoverActive(false));
    }
  };

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
    let exactMatchRoute = allNavs[0]; // For All Projects
    if (location.pathname !== AppRoute.ROOT) {
      exactMatchRoute = allNavs.find((item) =>
        location.pathname?.split('/')?.includes(item.keyword)
      );
    }

    if (!exactMatchRoute && location.pathname !== AppRoute.ROOT)
      // For Dashboard
      // eslint-disable-next-line prefer-destructuring
      exactMatchRoute = allNavs[0];

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
          if (item?.identifier === 'import_in_progress') {
            if (importProgress === 100) {
              return {
                ...item,
                activeIcon: Clock,
                inActiveIcon: Clock,
                label: `Import Completed (${importProgress}%)`
              };
            }
            return {
              ...item,
              label: `Import in Progress (${importProgress}%)`
            };
          }
          return item;
        })
      );
    };

    if (
      (importProgress === 100 && isProgressDismissed) ||
      importStatus === null
    )
      setSecondaryNavs(secondaryNavs);
    else if (
      location.pathname !== AppRoute.ROOT &&
      secondaryNavs[0]?.identifier !== 'import_in_progress'
    ) {
      const toBeSecondaryNavs = [...IMPORT_IN_PROGRESS, ...secondaryNavs];

      addProgress(toBeSecondaryNavs);
    } else if (
      location.pathname !== AppRoute.ROOT &&
      secondaryNavs[0]?.identifier === 'import_in_progress'
    ) {
      addProgress(secondaryNavs);
    } else setSecondaryNavs(secondaryNavLinks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, importProgress, isProgressDismissed]);

  useEffect(() => {
    if (location.pathname !== AppRoute.ROOT && !isTooltipDismissed) {
      setTimeout(() => {
        closeTooltipHandler();
      }, TOOLTIP_TIMER);
    }
  }, [location.pathname, isTooltipDismissed]);

  useEffect(() => {
    fetchAllProjects();
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
    isTooltipDismissed,
    handleHover,
    onLinkChange,
    onProjectChange,
    setAddProjectModal,
    onGetADemoCTAClick
  };
}
