import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addTestCase, getTestCases } from 'api/testcases.api';

import { setTestCaseViewVisibility } from '../slices/repositorySlice';

export default function useTestCases() {
  // const [inputError, setInputError] = useState(false);
  const { projectId, folderId } = useParams();
  const dispatch = useDispatch();

  const isTestCaseViewVisible = useSelector(
    (state) => state.repository.isTestCaseViewVisible,
  );

  // const fetchAllTestCases = () => {
  //   if (folderId)
  //     getTestCases({ projectId, folderId }).then((data) => {
  //       dispatch(updateAllTestCases(data?.testcases || []));
  //     });
  //   else dispatch(updateAllTestCases([]));
  // };

  const hideTestCaseViewDrawer = () => () => {
    dispatch(setTestCaseViewVisibility(false));
  };

  return {
    hideTestCaseViewDrawer,
    isTestCaseViewVisible,
  };
}
