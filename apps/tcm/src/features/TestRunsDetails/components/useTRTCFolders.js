import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTestRunsTestCasesAPI } from 'api/testruns.api';

import {
  setAllFolders,
  setAllTestCases,
  setIsLoadingProps,
  setSelectedFolder,
  setTestCaseDetails
} from '../slices/testRunDetailsSlice';

export default function useTRTCFolders() {
  const { projectId, testRunId } = useParams();
  const dispatch = useDispatch();

  const isFoldersLoading = useSelector(
    (state) => state.testRunsDetails.isLoading.isFoldersLoading
  );
  const isTestCasesLoading = useSelector(
    (state) => state.testRunsDetails.isLoading.isTestCasesLoading
  );
  const selectedFolder = useSelector(
    (state) => state.testRunsDetails.selectedFolder
  );
  const allFolders = useSelector((state) => state.testRunsDetails.allFolders);
  const metaPage = useSelector((state) => state.testRunsDetails.metaPage);

  const allTestCases = useSelector(
    (state) => state.testRunsDetails.allTestCases
  );

  const handleTestCaseViewClick = (testCaseItem) => () => {
    dispatch(
      setTestCaseDetails({
        folderId: testCaseItem.test_case_folder_id,
        testCaseId: testCaseItem?.id
      })
    );

    // navigate(
    //   routeFormatter(
    //     AppRoute.TEST_RUN_DETAILS,
    //     {
    //       projectId,
    //       testRunId,
    //       folderId: testCaseItem.test_case_folder_id,
    //       testCaseId: testCaseItem?.id
    //     },
    //     true
    //   ),
    //   {
    //     replace: true
    //   }
    // );
  };

  const fetchTestCases = () => {
    getTestRunsTestCasesAPI({ projectId, testRunId }).then((data) => {
      dispatch(setAllTestCases(data?.test_cases || []));
      dispatch(setIsLoadingProps({ key: 'isTestCasesLoading', value: false }));
    });
  };

  const onFolderClick = (thisFolder) => {
    dispatch(setSelectedFolder(thisFolder));
  };

  const onFoldersUpdate = (data) => {
    dispatch(setIsLoadingProps({ key: 'isFoldersLoading', value: false }));
    if (data?.length) {
      onFolderClick(data[0]);
      dispatch(setAllFolders(data));
    }
  };

  const onResultChange = (selectedOption, data) => {
    console.log(selectedOption);
  };

  return {
    allTestCases,
    metaPage,
    isTestCasesLoading,
    allFolders,
    selectedFolder,
    isFoldersLoading,
    projectId,
    testRunId,
    onFoldersUpdate,
    fetchTestCases,
    handleTestCaseViewClick,
    onFolderClick,
    onResultChange
  };
}
