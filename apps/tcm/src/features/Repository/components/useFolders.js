import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteFolder, getFolders, getSubFolders } from 'api/folders.api';
import AppRoute from 'const/routes';
import { setSelectedProject } from 'globalSlice';
import { routeFormatter } from 'utils/helperFunctions';

import { addFolderModalKey, folderDropOptions } from '../const/folderConst';
import {
  setAddTestCaseVisibility,
  setFolderModalConf,
  setSelectedFolder,
  updateAllFolders
} from '../slices/repositorySlice';

import useTestCases from './useTestCases';

export default function useFolders() {
  const { showTestCaseAdditionPage, hideTestCaseAdditionPage } = useTestCases();
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

  const fetchFolderSelectedFromParam = (loadedFolders) => {
    if (folderId)
      getSubFolders({ projectId, folderId }).then((res) => {
        res?.ancestors?.reverse().forEach((item) => {
          const mapped = loadedFolders.map((folder) =>
            folder.id === item.id
              ? {
                  ...item,
                  contents: [],
                  isOpened: true
                }
              : item
          );
          setAllFolders(mapped);
        });
      });
  };

  const fetchAllFolders = () => {
    dispatch(setSelectedProject(projectId));
    dispatch(setAddTestCaseVisibility(false));
    if (projectId) {
      getFolders({ projectId }).then((data) => {
        setAllFolders(data?.folders || []);
        if (folderId) {
          const match = data?.folders?.find(
            (item) => `${item.id}` === folderId
          );
          // if (!match)
          //   // if the folderId in URL is not a parent level folder
          //   fetchFolderSelectedFromParam(data?.folders || []);
        }
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
    } else setAllFolders([]);
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
    if (e?.currentTarget?.textContent) {
      dispatch(
        setFolderModalConf({ modal: e.currentTarget.textContent, folder })
      );

      if (e.currentTarget.textContent === folderDropOptions[0].body) {
        // create test case
        showTestCaseAdditionPage();
      } else hideTestCaseAdditionPage();
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
