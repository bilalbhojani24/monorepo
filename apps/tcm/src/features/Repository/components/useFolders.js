import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getFolders } from 'api/folders.api';
import { setSelectedProject } from 'globalSlice/globalSlice';

import {
  setAddFolderModalVisibility,
  setSelectedFolder,
  updateAllFolders,
} from '../slices/repositorySlice';

export default function useFolders() {
  const { projectId, folderId } = useParams();
  const dispatch = useDispatch();

  const allFolders = useSelector((state) => state.repository.allFolders);
  const isAddFolderModalVisible = useSelector(
    (state) => state.repository.showAddFolderModal,
  );

  const showAddFolderModal = () => {
    dispatch(setAddFolderModalVisibility(true));
  };
  const hideAddFolderModal = () => {
    dispatch(setAddFolderModalVisibility(false));
  };

  const fetchAllFolders = () => {
    if (projectId)
      getFolders({ projectId }).then((data) => {
        dispatch(updateAllFolders(data?.folders || []));
      });
    else dispatch(updateAllFolders([]));
  };

  useEffect(() => {
    fetchAllFolders();
    dispatch(setSelectedProject(projectId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  useEffect(() => {
    const selectedFolder = allFolders.find((item) => `${item.id}` === folderId);

    if (selectedFolder) {
      dispatch(setSelectedFolder(selectedFolder));
    } else {
      dispatch(setSelectedFolder(null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderId, allFolders]);

  return {
    allFolders,
    hideAddFolderModal,
    showAddFolderModal,
    isAddFolderModalVisible,
  };
}
