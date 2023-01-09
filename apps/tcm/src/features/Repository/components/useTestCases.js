import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getFolders } from 'api/folders.api.js';
import { setSelectedProject } from 'globalSlice/globalSlice';

import {
  setAddFolderModalVisibility,
  updateAllFolders,
} from '../slices/repositorySlice';

export default function useFolders() {
  const { projectId, folderId } = useParams();
  const dispatch = useDispatch();

  const selectedFolder = useSelector(
    (state) => state.repository.selectedFolder,
  );

  // const setAllFolders = (data) => {
  //   dispatch(updateAllFolders(data));
  // };
  // const showAddFolderModal = () => {
  //   dispatch(setAddFolderModalVisibility(true));
  // };
  // const hideAddFolderModal = () => {
  //   dispatch(setAddFolderModalVisibility(false));
  // };
  // const fetchAllTestCases = () => {
  //   if (folderId)
  //     getFolders({ projectId }).then((data) => {
  //       setAllFolders(data?.folders || []);
  //     });
  //   else setAllFolders([]);
  // };

  // useEffect(() => {
  //   fetchAllFolders();
  //   dispatch(setSelectedProject(projectId));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [projectId]);

  return {
    selectedFolder,
  };
}
