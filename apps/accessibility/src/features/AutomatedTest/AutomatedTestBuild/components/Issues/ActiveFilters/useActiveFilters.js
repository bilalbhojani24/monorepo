import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { activeInitFilters, events } from 'constants';
import SectionsDataContext from 'features/AutomatedTest/AutomatedTestBuild/context/SectionsDataContext';
import {
  resetFilters,
  setResetFilterKey,
  setShowHiddenIssues
} from 'features/AutomatedTest/AutomatedTestBuild/slices/appSlice';
import {
  getBuildFilters,
  getShowHiddenIssuesState
} from 'features/AutomatedTest/AutomatedTestBuild/slices/selector';
import { deleteUrlQueryParam, updateUrlWithQueryParam } from 'utils/helper';
import { logEvent } from 'utils/logEvent';

export default function useActiveFilters() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    activeSwitch,
    hasFilters,
    onUpdateSwitch,
    onFilterButtonClick,
    onUpdateImpact
  } = useContext(SectionsDataContext);
  const showHiddenIssues = useSelector(getShowHiddenIssuesState);
  const buildFilters = useSelector(getBuildFilters);

  const onTabSelect = (tabValue) => {
    onUpdateSwitch(tabValue);
    logEvent('OnADReportView', {
      actionType: events.allIssuesTab,
      tab: tabValue
    });
    const path = updateUrlWithQueryParam({
      activeSwitch: tabValue,
      activeViolationId: '',
      activeComponentId: '',
      activeIssueIndex: 0,
      isShowingIssue: false
    });
    navigate(`?${path}`);
  };

  const onHiddenIssueClick = (val) => {
    const path = updateUrlWithQueryParam({ hideIssues: val });
    navigate(`?${path}`);
    // dispatch(resetIssueItem());
    dispatch(setShowHiddenIssues({ hideIssues: val }));
  };

  const onTagClose = (key) => {
    if (key === 'all') {
      dispatch(resetFilters());
      // dispatch(resetIntermediateFilters());
      const path = deleteUrlQueryParam(Object.keys(activeInitFilters));
      navigate(`?${path}`);
    } else if (key === 'showNeedsReviewIssues') {
      const path = deleteUrlQueryParam(['showNeedsReviewIssues']);
      navigate(`?${path}`);
      // dispatch(resetIntermediateResetFilterKey({ key, value: false }));
      dispatch(setResetFilterKey({ key, value: false }));
    } else {
      // dispatch(resetIntermediateResetFilterKey({ key, value: [] }));
      const path = deleteUrlQueryParam([key]);
      navigate(`?${path}`);
      dispatch(setResetFilterKey({ key, value: [] }));
    }
  };

  return {
    showHiddenIssues,
    activeSwitch,
    hasFilters,
    buildFilters,
    onFilterButtonClick,
    onTabSelect,
    onHiddenIssueClick,
    onTagClose,
    onUpdateImpact
  };
}
