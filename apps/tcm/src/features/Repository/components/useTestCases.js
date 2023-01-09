import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTestCases } from 'api/testcases.api';

import { updateAllTestCases } from '../slices/repositorySlice';

export default function useFolders() {
  const { projectId, folderId } = useParams();
  const dispatch = useDispatch();

  const selectedFolder = useSelector(
    (state) => state.repository.selectedFolder,
  );
  const allTestCases = useSelector((state) => state.repository.allTestCases);

  // const setAllFolders = (data) => {
  //   dispatch(updateAllTestCases(data));
  // };
  // const showAddFolderModal = () => {
  //   dispatch(setAddFolderModalVisibility(true));
  // };
  // const hideAddFolderModal = () => {
  //   dispatch(setAddFolderModalVisibility(false));
  // };

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
    allTestCases,
  };
}
