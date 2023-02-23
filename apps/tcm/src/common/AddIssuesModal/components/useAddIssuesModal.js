import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJIRAConfigAPI } from 'api/common.api';
import { setUserConfig } from 'globalSlice';
import { splitStringToArray } from 'utils/helperFunctions';

import { CONFIGURE_JIRA_URL, CREATE_ISSUE_URL } from '../const/addIssueConst';

const useAddIssuesModal = ({ isVisible, onClose, onSave }) => {
  const [isLoading, setIsLoading] = useState(true);
  const JIRA_REGEX = /^[A-Z]+-\d+?$/;
  const dispatch = useDispatch();
  const modalFocusRef = useRef();
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

  const configureJIRAInit = () => {
    window.open(CONFIGURE_JIRA_URL);
    onCloseHandler();
  };

  useEffect(() => {
    if (isVisible && !jiraConfig) {
      getJIRAConfigAPI().then((e) => {
        setJiraConfig(e?.success ? e : null);
        setIsLoading(false);
      });
    }

    if (isVisible) setIssueIds('');

    if (jiraConfig) setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return {
    modalFocusRef,
    isLoading,
    errorText,
    enterdIssueIDs,
    jiraConfig,
    onCloseHandler,
    onLinkIssueClick,
    setIssueIds,
    createNewIssueModalHandler,
    configureJIRAInit
  };
};
export default useAddIssuesModal;
