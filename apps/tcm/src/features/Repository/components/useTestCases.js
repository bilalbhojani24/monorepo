import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addTestCase, getTestCases } from 'api/testcases.api';

import {
  addSingleTestCase,
  setAddTestCaseVisibility,
  updateAllTestCases,
} from '../slices/repositorySlice';

export default function useTestCases() {
  const [showNotification, setShowNotification] = useState(false);
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

  const saveTestCase = (pId, fId, payload) => () => {
    addTestCase({ pId, fId, payload }).then((data) => {
      dispatch(addSingleTestCase(data));
      setShowNotification(true);
      dispatch(setAddTestCaseVisibility(false));
    });
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
    saveTestCase,
    showNotification,
  };
}
