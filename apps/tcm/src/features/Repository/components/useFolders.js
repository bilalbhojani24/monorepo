import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getFolders } from 'api/folders.api.js';

import {
  setAddFolderModalVisibility,
  updateAllFolders,
} from '../slices/repositorySlice';

export default function useFolders() {
  const { projectId, folderId } = useParams();
  const dispatch = useDispatch();
  const allFolders = useSelector((state) => state.repository.allFolders);
  const isAddFolderModalVisible = useSelector(
    (state) => state.repository.showAddFolderModal,
  );

  const setAllFolders = (data) => {
    dispatch(updateAllFolders(data));
  };
  const showAddFolderModal = () => {
    dispatch(setAddFolderModalVisibility(true));
  };
  const hideAddFolderModal = () => {
    dispatch(setAddFolderModalVisibility(false));
  };
  const fetchAllFolders = () => {
    if (projectId)
      getFolders({ projectId }).then((data) => {
        setAllFolders(data?.folders || []);
      });
    else setAllFolders([]);
  };

  useEffect(() => {
    fetchAllFolders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return {
    allFolders,
    setAllFolders,
    hideAddFolderModal,
    showAddFolderModal,
    isAddFolderModalVisible,
    fetchAllFolders,
  };
}
