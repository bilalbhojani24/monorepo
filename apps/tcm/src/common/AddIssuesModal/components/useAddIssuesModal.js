import { useEffect, useState } from 'react';
import { getJIRAConfigAPI } from 'api/common.api';
import { splitStringToArray } from 'utils/helperFunctions';

const useAddIssuesModal = ({ isVisible, onClose, onSave }) => {
  const JIRA_REGEX = /^[A-Z]+-\d+?$/;
  const [jiraConfig, setJiraConfig] = useState(null);
  const [enterdIssueIDs, setIssueIds] = useState('');
  const [errorText, setErrorText] = useState('');

  const retrieveJIRAEntries = () => {
    if (!enterdIssueIDs) return false;

    const splittedIssues = splitStringToArray(enterdIssueIDs, ',');
    const unmatchingEntries = splittedIssues.find(
      (item) => !JIRA_REGEX.test(item),
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

  useEffect(() => {
    if (isVisible) getJIRAConfigAPI().then(() => {});
  }, [isVisible]);

  return {
    errorText,
    enterdIssueIDs,
    jiraConfig,
    onCloseHandler,
    onLinkIssueClick,
    setIssueIds,
  };
};
export default useAddIssuesModal;
