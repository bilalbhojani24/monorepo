import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  matchPath,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';
import { useMountEffect } from '@browserstack/hooks';
import { fetchGridDataById } from 'api/index';
import {
  AGGridDetailsInteracted,
  AGGridSettingsVisited,
  AGStartedSetupGuide,
  AGUpgradedFromTrial
} from 'constants/event-names';
import ROUTES from 'constants/routes';
import {
  resetSelectedGridData,
  setSelectedGridData
} from 'features/GridConsole/slices';
import { setShowOnboardingTooltips } from 'features/GridDetail/slices';
import { getShowOnboardingTooltips } from 'features/GridDetail/slices/selector';
import { setFetchedGridData } from 'globalSlice/index';
import {
  getFetchedGridData,
  getLastKnownSetupType,
  getUserDetails
} from 'globalSlice/selector';
import { logHSTEvent } from 'utils/logger';

import {
  getGridsData,
  getSelectedGridData
} from '../../GridConsole/slices/selector';

const useLayoutGridDetail = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const paramId = params.id; // grid id

  const fetchedGridData = useSelector(getFetchedGridData);
  const userDetails = useSelector(getUserDetails);

  // All Store variables
  const gridList = useSelector(getGridsData);
  const selectedGridData = useSelector(getSelectedGridData);
  const showOnboardingTooltips = useSelector(getShowOnboardingTooltips);
  const lastKnownSetupType = useSelector(getLastKnownSetupType);

  // All State variables
  const [currentTab, setCurrentTab] = useState({
    index: 0,
    name: 'Overview'
  });
  const [showNewGridCreatedModal, setShowNewGridCreatedModal] = useState(false);
  const [showTrialGridExpiredModal, setShowTrialgridModalExpired] =
    useState(false);

  const onTabChangeHandler = (e) => {
    logHSTEvent(['amplitude'], 'web_events', AGGridDetailsInteracted, {
      action: 'tab_switched',
      option: e.name.toLowerCase()
    });
    setCurrentTab(e);
  };

  const setupYourOwnGrid = () => {
    logHSTEvent([], 'web_events', AGStartedSetupGuide, {
      url: window.location.href,
      location: 'expire_modal'
    });
    navigate(`${ROUTES.SETUP}?type=${lastKnownSetupType}`);
  };

  const switchToOwnGridHandler = () => {
    logHSTEvent([], 'web_events', AGUpgradedFromTrial);
    navigate(ROUTES.AUTOMATION_CONSOLE);
  };

  useEffect(() => {
    setShowTrialgridModalExpired(
      (selectedGridData.status?.toLowerCase() === 'expired' ||
        selectedGridData.trialGridDetail?.totalTime -
          selectedGridData.trialGridDetail?.timeUsed <=
          0) &&
        !showNewGridCreatedModal
    );

    if (showNewGridCreatedModal || showTrialGridExpiredModal) {
      dispatch(setShowOnboardingTooltips(false));
    }
  }, [
    dispatch,
    selectedGridData,
    showNewGridCreatedModal,
    showOnboardingTooltips,
    showTrialGridExpiredModal
  ]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setShowOnboardingTooltips(selectedGridData.isTrialGrid));
    }, 1000);

    if (selectedGridData.isTrialGrid) {
      setShowNewGridCreatedModal(
        selectedGridData.trialGridDetail.userGridCreated
      );
    }
  }, [dispatch, selectedGridData]);

  useEffect(() => {
    if (currentTab.name === 'Settings') {
      logHSTEvent([], 'web_events', AGGridSettingsVisited, {
        action: 'general'
      });
      navigate(
        `${
          ROUTES.AUTOMATION_CONSOLE
        }/grid/${paramId}/${currentTab.name.toLowerCase()}/general`
      );
    } else
      navigate(
        `${
          ROUTES.AUTOMATION_CONSOLE
        }/grid/${paramId}/${currentTab.name.toLowerCase()}`
      );
  }, [paramId, currentTab]);

  useEffect(() => {
    const fetchGridDataByIdFromAPI = async (gridId) => {
      const res = await fetchGridDataById(gridId, userDetails.id);
      dispatch(setSelectedGridData(res.data));
      dispatch(setFetchedGridData(true));
    };

    if (paramId && !fetchedGridData) fetchGridDataByIdFromAPI(paramId);
  }, [dispatch, fetchedGridData, paramId, userDetails]);

  useMountEffect(
    () => {
      let tabToOpen = {
        index: 0,
        name: 'Overview'
      };

      const isOverviewPath = matchPath(
        { path: ROUTES.GRID_OVERVIEW },
        location.pathname
      );

      const isUtilizationPath = matchPath(
        { path: ROUTES.GRID_UTILIZATION },
        location.pathname
      );

      if (isOverviewPath !== null) {
        tabToOpen = {
          index: 0,
          name: 'Overview'
        };
      } else if (isUtilizationPath !== null) {
        tabToOpen = {
          index: 1,
          name: 'Utilization'
        };
      } else {
        tabToOpen = {
          index: 2,
          name: 'Settings'
        };
      }

      if (fetchedGridData) {
        const currentSelectedGridData = gridList.filter(
          (item) => item.id == paramId
        )[0];

        dispatch(setSelectedGridData(currentSelectedGridData));
      }

      setCurrentTab(tabToOpen);

      if (tabToOpen.name === 'Settings') navigate(location.pathname);
      else
        navigate(
          `${
            ROUTES.AUTOMATION_CONSOLE
          }/grid/${paramId}/${tabToOpen.name.toLowerCase()}`
        );
    },
    () => {
      dispatch(resetSelectedGridData());
      dispatch(setShowOnboardingTooltips(false));
    }
  );

  return {
    currentTab,
    fetchedGridData,
    selectedGridData,
    onTabChangeHandler,
    setupYourOwnGrid,
    showNewGridCreatedModal,
    showTrialGridExpiredModal,
    switchToOwnGridHandler
  };
};

export default useLayoutGridDetail;
