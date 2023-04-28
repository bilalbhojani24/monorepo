import { useEffect, useState } from 'react';

const useTestCaseMultiData = (prop) => {
  const [testCaseIssues, setTestCaseIssues] = useState([]);

  useEffect(() => {
    let testCaseIssuesTemp = [];
    if (prop?.isFromTestRun) {
      prop?.testResultsArray.forEach((item) => {
        for (let i = item?.issues.length - 1; i >= 0; i -= 1) {
          testCaseIssuesTemp.push(item?.issues[i]);
        }
      });
    } else testCaseIssuesTemp = prop?.testResultsArray;

    setTestCaseIssues(testCaseIssuesTemp);
  }, [prop?.isFromTestRun, prop?.testResultsArray]);

  return { testCaseIssues };
};

export default useTestCaseMultiData;
