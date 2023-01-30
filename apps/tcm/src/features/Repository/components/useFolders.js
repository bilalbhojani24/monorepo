import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  deleteFolder,
  getFolders,
  getSubFolders,
  moveFolder
} from 'api/folders.api';
import AppRoute from 'const/routes';
import { setSelectedProject } from 'globalSlice';
import {
  deleteFolderFromArray,
  findSelectedFolder,
  injectFolderToParent
} from 'utils/folderHelpers';
import { routeFormatter } from 'utils/helperFunctions';

import { addFolderModalKey, folderDropOptions } from '../const/folderConst';
import {
  setAddTestCaseVisibility,
  setAllFolders,
  setFolderModalConf,
  setSelectedFolder
} from '../slices/repositorySlice';

import useTestCases from './useTestCases';

export default function useFolders() {
  const { showTestCaseAdditionPage, hideTestCaseAdditionPage } = useTestCases();
  const navigate = useNavigate();
  const { projectId, folderId } = useParams();
  const dispatch = useDispatch();

  const allFolders = useSelector((state) => state.repository?.allFolders);
  const openedFolderModal = useSelector(
    (state) => state.repository.openedFolderModal
  );
  const setAllFoldersHelper = (data) => {
    dispatch(setAllFolders(data));
  };
  const showAddFolderModal = () => {
    dispatch(setFolderModalConf({ modal: addFolderModalKey }));
  };

  const mapFolderAncestorHelper = (ancestorsArray) => {
    let newContentObject = null;
    ancestorsArray?.forEach((item, iDx) => {
      if (iDx === 0) {
        newContentObject = item;
        newContentObject.isOpened = true;
        newContentObject.contents = newContentObject.contents.map((thisItem) =>
          thisItem.id === parseInt(folderId, 10)
            ? { ...thisItem, isSelected: true }
            : thisItem
        );
      } else {
        const newItem = item;
        newItem.contents = item.contents
          ? item.contents.map((intItem) =>
              intItem.id === newContentObject?.id ? newContentObject : intItem
            )
          : newContentObject;
        newItem.isOpened = true;
        newContentObject = newItem;
      }
    });
    return newContentObject;
  };

  const fetchFolderSelectedFromParam = (loadedFolders) => {
    if (folderId)
      getSubFolders({ projectId, folderId, fetchAncestors: true }).then(
        (res) => {
          const newContentObject = mapFolderAncestorHelper(res?.ancestors);
          if (newContentObject) {
            setAllFoldersHelper(
              loadedFolders.map((item) =>
                item.id === newContentObject.id ? newContentObject : item
              )
            );
          } else setAllFoldersHelper(loadedFolders);
        }
      );
  };

  const selectFolderPerDefault = (foldersArray) => {
    if (
      !folderId &&
      foldersArray &&
      window.location.pathname.includes(
        routeFormatter(AppRoute.TEST_CASES, {
          projectId
        })
      )
    ) {
      // select first folder by default, only if the test cases page is still open
      const firstFolderId = foldersArray[0]?.id;
      if (firstFolderId)
        navigate(
          routeFormatter(AppRoute.TEST_CASES, {
            projectId,
            folderId: firstFolderId
          })
        );
    }
  };

  const fetchAllFolders = () => {
    dispatch(setSelectedProject(projectId));
    dispatch(setAddTestCaseVisibility(false));
    if (projectId) {
      getFolders({ projectId }).then((data) => {
        const isParentFolderDefault = data?.folders?.find(
          (item) => `${item.id}` === folderId
        );
        if (folderId && !isParentFolderDefault) {
          // if the folderId in URL is not a parent level folder
          fetchFolderSelectedFromParam(data?.folders || []);
        } else setAllFoldersHelper(data?.folders || []);

        selectFolderPerDefault(data?.folders);
      });
    } else setAllFoldersHelper([]);
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
    setAllFoldersHelper(newFolders);
  };

  const updateFolders = (folderItem, parentId) => {
    if (!parentId) setAllFoldersHelper([...allFolders, folderItem]);
    else {
      setAllFoldersHelper(
        injectFolderToParent(allFolders, folderItem, parentId)
      );
    }
  };

  const deleteFolderHandler = () => {
    if (openedFolderModal && openedFolderModal?.folder?.id) {
      deleteFolder({ projectId, folderId: openedFolderModal.folder.id }).then(
        (item) => {
          if (item?.data?.folder?.id)
            setAllFoldersHelper(
              deleteFolderFromArray(allFolders, item.data.folder.id)
            );

          hideFolderModal();
        }
      );
    }
  };

  const moveFolderHelper = (thisFolderID, baseFolderID, internalAllFolders) => {
    const movedFolder = findSelectedFolder(
      internalAllFolders,
      parseInt(thisFolderID, 10)
    );
    let updatedFolders = deleteFolderFromArray(
      [...internalAllFolders],
      parseInt(thisFolderID, 10)
    );
    updatedFolders = injectFolderToParent(
      updatedFolders,
      movedFolder,
      baseFolderID
    );
    setAllFoldersHelper(updatedFolders);
  };

  const moveFolderOnOkHandler = (selectedFolder, internalAllFolders) => {
    if (selectedFolder?.id) {
      moveFolder({
        projectId,
        folderId,
        newParentFolderId: selectedFolder.id
      })
        .then((data) => {
          if (data?.data?.success) {
            moveFolderHelper(folderId, selectedFolder.id, internalAllFolders);
            hideFolderModal();
          }
        })
        .catch((error) => {
          // TODO: give proper info
          // eslint-dsable no-console
          console.log(error.response.data.errors[0].title);
        });
    }
  };

  useEffect(() => {
    const selectedFolder = findSelectedFolder(
      allFolders,
      parseInt(folderId, 10)
    );
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
    deleteFolderHandler,
    moveFolderHelper,
    moveFolderOnOkHandler
  };
}
