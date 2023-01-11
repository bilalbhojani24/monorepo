import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getFolders } from 'api/folders.api';
import AppRoute from 'const/routes';
import { setSelectedProject } from 'globalSlice/globalSlice';

import {
  setAddFolderModalVisibility,
  setAddTestCaseVisibility,
  setSelectedFolder,
  updateAllFolders,
} from '../slices/repositorySlice';

export default function useFolders() {
  const navigate = useNavigate();
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
    dispatch(setAddTestCaseVisibility(false));
    if (projectId)
      getFolders({ projectId }).then((data) => {
        dispatch(updateAllFolders(data?.folders || []));
        if (
          data?.folders &&
          window.location.pathname.includes(AppRoute.TEST_CASES)
        ) {
          // select first folder by default, only if the test cases page is still open
          const firstFolderId = data.folders[0]?.id;
          if (firstFolderId)
            navigate(
              `${AppRoute.PROJECTS}/${projectId}${AppRoute.TEST_CASES}/folder/${firstFolderId}`,
            );
        }
      });
    else dispatch(updateAllFolders([]));
  };

  const updateFolders = (folderItem) => {
    dispatch(updateAllFolders([...allFolders, folderItem]));
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
    updateFolders,
  };
}
