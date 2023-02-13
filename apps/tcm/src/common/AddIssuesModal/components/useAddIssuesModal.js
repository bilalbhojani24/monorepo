import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJIRAConfigAPI } from 'api/common.api';
import { setUserConfig } from 'globalSlice';
import { splitStringToArray } from 'utils/helperFunctions';

import { CREATE_ISSUE_URL } from '../const/addIssueConst';

const useAddIssuesModal = ({ isVisible, onClose, onSave }) => {
  const JIRA_REGEX = /^[A-Z]+-\d+?$/;
  const dispatch = useDispatch();
  const [enterdIssueIDs, setIssueIds] = useState('');
  const [errorText, setErrorText] = useState('');

  const jiraConfig = useSelector((state) => state.global.userConfig?.jira);

  const setJiraConfig = (value) => {
    dispatch(setUserConfig({ key: 'jira', value }));
  };

  const retrieveJIRAEntries = () => {
    if (!enterdIssueIDs) return false;

    const splittedIssues = splitStringToArray(enterdIssueIDs, ',');
    const unmatchingEntries = splittedIssues.find(
      (item) => !JIRA_REGEX.test(item)
    );
    return unmatchingEntries ? false : splittedIssues;
  };

  const onCloseHandler = () => {
    onClose();
  };

  const onLinkIssueClick = () => {
    setErrorText('');
    const entries = retrieveJIRAEntries();
    if (entries) onSave(entries);
    else setErrorText('Please enter valid Issue IDs');
  };

  const createNewIssueModalHandler = () => {
    if (jiraConfig)
      window.open(`${jiraConfig?.host}${CREATE_ISSUE_URL}`, 'popup');
  };

  useEffect(() => {
    if (isVisible && !jiraConfig) {
      setIssueIds('');
      getJIRAConfigAPI().then((e) => {
        setJiraConfig(e);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return {
    errorText,
    enterdIssueIDs,
    jiraConfig,
    onCloseHandler,
    onLinkIssueClick,
    setIssueIds,
    createNewIssueModalHandler
  };
};
export default useAddIssuesModal;
