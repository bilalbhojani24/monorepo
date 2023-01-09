import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTestCases } from 'api/testcases.api';

import {
  setAddTestCaseVisibility,
  updateAllTestCases,
} from '../slices/repositorySlice';

export default function useTestCases() {
  const { projectId, folderId } = useParams();
  const dispatch = useDispatch();

  const selectedFolder = useSelector(
    (state) => state.repository.selectedFolder,
  );
  const allTestCases = useSelector((state) => state.repository.allTestCases);
  const isAddTestCasePageVisible = useSelector(
    (state) => state.repository.isAddTestCasePageVisible,
  );

  const showTestCaseAdditionPage = () => {
    dispatch(setAddTestCaseVisibility(true));
  };
  const hideTestCaseAdditionPage = () => {
    dispatch(setAddTestCaseVisibility(false));
  };

  const fetchAllTestCases = () => {
    if (folderId)
      getTestCases({ projectId, folderId }).then((data) => {
        dispatch(updateAllTestCases(data?.testcases || []));
      });
    else dispatch(updateAllTestCases([]));
  };

  useEffect(() => {
    fetchAllTestCases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, folderId]);

  return {
    selectedFolder,
    showTestCaseAdditionPage,
    hideTestCaseAdditionPage,
    allTestCases,
    isAddTestCasePageVisible,
  };
}
