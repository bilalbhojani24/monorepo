import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getFolders } from 'api/folders.api';
import AppRoute from 'const/routes';
import { setSelectedProject } from 'globalSlice';
import { routeFormatter } from 'utils/helperFunctions';

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
    dispatch(setSelectedProject(projectId));
    dispatch(setAddTestCaseVisibility(false));
    if (projectId)
      getFolders({ projectId }).then((data) => {
        dispatch(updateAllFolders(data?.folders || []));
        if (
          !folderId &&
          data?.folders &&
          window.location.pathname.includes(
            routeFormatter(AppRoute.TEST_CASES, {
              projectId,
            }),
          )
        ) {
          // select first folder by default, only if the test cases page is still open
          const firstFolderId = data.folders[0]?.id;
          if (firstFolderId)
            navigate(
              routeFormatter(AppRoute.TEST_CASES, {
                projectId,
                folderId: firstFolderId,
              }),
            );
        }
      });
    else dispatch(updateAllFolders([]));
  };

  const updateFolders = (folderItem) => {
    dispatch(updateAllFolders([...allFolders, folderItem]));
  };

  const folderClickHandler = (selectedFolder) => {
    navigate(
      routeFormatter(AppRoute.TEST_CASES, {
        projectId,
        folderId: selectedFolder.id,
      }),
    );
  };

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
    fetchAllFolders,
    folderClickHandler,
  };
}
