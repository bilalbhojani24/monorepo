import { useSelector } from 'react-redux';

const useIssues = () => {
  const testRunDetails = useSelector(
    (state) => state.testRunsDetails.fullDetails
  );
  const issuesArray = useSelector(
    (state) => state.testRunsDetails.fullDetails?.test_result_issues || []
  );
  const isIssuesLoading = useSelector(
    (state) => state.testRunsDetails.isLoading.testRunDetails
  );

  return {
    issuesArray,
    isIssuesLoading,
    testRunDetails
  };
};

export default useIssues;
