import { useEffect, useState } from 'react';

const useTestCaseMultiData = (prop) => {
  const [testCaseIssues, setTestCaseIssues] = useState([]);

  const checkIsDuplicate = (issuesArray, issue) =>
    issuesArray.some((singleIssue) => singleIssue?.jira_id === issue?.jira_id);

  useEffect(() => {
    let testCaseIssuesTemp = [];
    if (prop?.isFromTestRun) {
      prop?.testResultsArray.forEach((item) => {
        for (let i = item?.issues.length - 1; i >= 0; i -= 1) {
          if (!checkIsDuplicate(testCaseIssuesTemp, item?.issues[i]))
            testCaseIssuesTemp.push(item?.issues[i]);
        }
      });
    } else testCaseIssuesTemp = prop?.testResultsArray;

    setTestCaseIssues(testCaseIssuesTemp);
  }, [prop?.isFromTestRun, prop?.testResultsArray]);

  return { testCaseIssues };
};

export default useTestCaseMultiData;
