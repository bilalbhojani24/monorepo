import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useTestCaseMultiData = (prop) => {
  const testResultUniqueIssue = useSelector(
    (state) => state.testRunsDetails.uniqueIssueTestResults
  );
  const [testCaseIssues, setTestCaseIssues] = useState([]);

  useEffect(() => {
    setTestCaseIssues(
      prop?.isFromTestRun ? testResultUniqueIssue : prop?.testCaseTestRunIssues
    );
  }, [prop?.isFromTestRun, prop?.testCaseTestRunIssues, testResultUniqueIssue]);

  return { testCaseIssues };
};

export default useTestCaseMultiData;
