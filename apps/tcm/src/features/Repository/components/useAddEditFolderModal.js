import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteFolder } from 'api/folders.api';
import AppRoute from 'const/routes';
import {
  deleteFolderFromArray,
  injectFolderToParent,
  replaceFolderHelper
} from 'utils/folderHelpers';
import { routeFormatter } from 'utils/helperFunctions';

import {
  setAllFolders,
  setFolderModalConf,
  updateAllTestCases
} from '../slices/repositorySlice';

export default function useAddEditFolderModal() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const dispatch = useDispatch();

  const allFolders = useSelector((state) => state.repository?.allFolders);
  const openedFolderModal = useSelector(
    (state) => state.repository.openedFolderModal
  );

  const setAllFoldersHelper = (data) => {
    dispatch(setAllFolders(data));
  };

  const updateRouteHelper = (selectedFolder) => {
    navigate(
      routeFormatter(AppRoute.TEST_CASES, {
        projectId,
        folderId: selectedFolder.id
      })
    );
  };

  const hideFolderModal = () => {
    dispatch(setFolderModalConf(false));
  };

  const updateFolders = (folderItem, parentId) => {
    if (!parentId)
      setAllFoldersHelper([...allFolders, folderItem]); // root folder
    else {
      // sub folder
      const updatedFolders = injectFolderToParent(
        allFolders,
        folderItem,
        parentId
      );
      setAllFoldersHelper(updatedFolders);
    }
    updateRouteHelper(folderItem);
  };

  const renameFolderHelper = (folderItem) => {
    setAllFoldersHelper(replaceFolderHelper(allFolders, folderItem));
  };

  const deleteFolderHandler = () => {
    if (openedFolderModal && openedFolderModal?.folder?.id) {
      deleteFolder({ projectId, folderId: openedFolderModal.folder.id }).then(
        (item) => {
          if (item?.data?.folder?.id) {
            const newFoldersArray = deleteFolderFromArray(
              allFolders,
              item.data.folder.id
            );
            setAllFoldersHelper(newFoldersArray);
            if (newFoldersArray.length) {
              updateRouteHelper(newFoldersArray[0]);
            } else {
              // no folder, remove all test cases
              dispatch(updateAllTestCases([]));
            }
          }

          hideFolderModal();
        }
      );
    }
  };

  return {
    hideFolderModal,
    updateFolders,
    renameFolderHelper,
    deleteFolderHandler
  };
}
