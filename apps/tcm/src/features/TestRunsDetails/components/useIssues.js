import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJIRAConfigAPI } from 'api/common.api';
import { setUserConfig } from 'globalSlice';

import { ISSUES_TABS_ARRAY } from '../const/immutableConst';

const useIssues = () => {
  const dispatch = useDispatch();
  const [issueType, setIssueType] = useState(ISSUES_TABS_ARRAY[0].id);
  const testRunDetails = useSelector(
    (state) => state.testRunsDetails.fullDetails
  );
  const jiraConfig = useSelector((state) => state.global.userConfig?.jira);
  const fullDetails = useSelector(
    (state) => state.testRunsDetails.fullDetails || []
  );
  const isIssuesLoading = useSelector(
    (state) => state.testRunsDetails.isLoading.testRunDetails
  );

  const handleTabChange = (data) => {
    setIssueType(data?.id || null);
  };

  const setJiraConfig = useCallback(
    (value) => {
      dispatch(setUserConfig({ key: 'jira', value }));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!jiraConfig) {
      getJIRAConfigAPI().then((e) => {
        setJiraConfig(e?.success ? e : null);
      });
    }
  }, [jiraConfig, setJiraConfig]);

  return {
    jiraHost: jiraConfig?.data?.host || null,
    issuesArray: fullDetails[issueType] || [],
    isIssuesLoading,
    testRunDetails,
    handleTabChange
  };
};

export default useIssues;
