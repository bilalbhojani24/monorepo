import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteFolder, getFolders } from 'api/folders.api';
import AppRoute from 'const/routes';
import { setSelectedProject } from 'globalSlice';
import { routeFormatter } from 'utils/helperFunctions';

import { addFolderModalKey } from '../const/folderConst';
import {
  setAddTestCaseVisibility,
  setFolderModalConf,
  setSelectedFolder,
  updateAllFolders
} from '../slices/repositorySlice';

export default function useFolders() {
  const navigate = useNavigate();
  const { projectId, folderId } = useParams();
  const dispatch = useDispatch();

  const allFolders = useSelector((state) => state.repository.allFolders);
  const openedFolderModal = useSelector(
    (state) => state.repository.openedFolderModal
  );
  const setAllFolders = (data) => {
    dispatch(updateAllFolders(data));
  };
  const showAddFolderModal = () => {
    dispatch(setFolderModalConf({ modal: addFolderModalKey }));
  };

  const fetchAllFolders = () => {
    dispatch(setSelectedProject(projectId));
    dispatch(setAddTestCaseVisibility(false));
    if (projectId)
      getFolders({ projectId }).then((data) => {
        setAllFolders(data?.folders || []);
        if (
          !folderId &&
          data?.folders &&
          window.location.pathname.includes(
            routeFormatter(AppRoute.TEST_CASES, {
              projectId
            })
          )
        ) {
          // select first folder by default, only if the test cases page is still open
          const firstFolderId = data.folders[0]?.id;
          if (firstFolderId)
            navigate(
              routeFormatter(AppRoute.TEST_CASES, {
                projectId,
                folderId: firstFolderId
              })
            );
        }
      });
    else setAllFolders([]);
  };

  const folderClickHandler = (selectedFolder) => {
    navigate(
      routeFormatter(AppRoute.TEST_CASES, {
        projectId,
        folderId: selectedFolder.id
      })
    );
  };

  const folderActionsHandler = ({ e, folder }) => {
    debugger;
    if (e?.currentTarget?.textContent) {
      dispatch(
        setFolderModalConf({ modal: e.currentTarget.textContent, folder })
      );
    }
  };

  const hideFolderModal = () => {
    dispatch(setFolderModalConf(false));
  };

  const folderUpdateHandler = (newFolders, newTestCases) => {
    setAllFolders(newFolders);
  };

  const findSelectedFolder = (foldersArray, findFolderId) => {
    let selectedItem = null;
    foldersArray.every((item) => {
      if (`${item.id}` === findFolderId) {
        selectedItem = item;
        return false;
      }
      if (item.contents) {
        const matched = findSelectedFolder(item.contents, findFolderId);
        if (matched) {
          selectedItem = matched;
          return false;
        }
      }
      return true;
    });
    return selectedItem;
  };

  const injectFolderToParent = (array, toBeInjectedFolder, parentID) =>
    array.map((item) => {
      if (item.id === parentID) {
        if (item?.contents)
          return { ...item, contents: [...item.contents, toBeInjectedFolder] };
        return { ...item, contents: [toBeInjectedFolder] };
      }
      if (item?.contents) {
        return {
          ...item,
          contents: injectFolderToParent(
            item.contents,
            toBeInjectedFolder,
            parentID
          )
        };
      }
      return item;
    });

  const updateFolders = (folderItem, parentId) => {
    if (!parentId) setAllFolders([...allFolders, folderItem]);
    else {
      setAllFolders(injectFolderToParent(allFolders, folderItem, parentId));
    }
  };

  const deleteFolderFromArray = (foldersArray, thisFolderID) => {
    let removedArray = foldersArray.filter(
      (thisFolder) => thisFolder.id !== thisFolderID
    );
    if (removedArray.length < foldersArray.length) return removedArray;

    removedArray = foldersArray.map((item) => {
      if (item?.contents)
        return {
          ...item,
          contents: deleteFolderFromArray(item.contents, thisFolderID)
        };
      return item;
    });

    return removedArray;
  };

  const deleteFolderHandler = () => {
    if (openedFolderModal && openedFolderModal?.folder?.id) {
      deleteFolder({ projectId, folderId: openedFolderModal.folder.id }).then(
        (item) => {
          debugger;
          if (item?.data?.folder?.id)
            setAllFolders(
              deleteFolderFromArray(allFolders, item.data.folder.id)
            );

          hideFolderModal();
        }
      );
    }
    // deleteFolder()
  };

  useEffect(() => {
    const selectedFolder = findSelectedFolder(allFolders, folderId);
    if (selectedFolder) {
      dispatch(setSelectedFolder(selectedFolder));
    } else {
      dispatch(setSelectedFolder(null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderId, allFolders]);

  return {
    openedFolderModal,
    projectId,
    folderId,
    allFolders,
    showAddFolderModal,
    updateFolders,
    fetchAllFolders,
    folderClickHandler,
    folderUpdateHandler,
    folderActionsHandler,
    hideFolderModal,
    deleteFolderHandler
  };
}
