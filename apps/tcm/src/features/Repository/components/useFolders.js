import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteFolder, getFolders, getSubFolders } from 'api/folders.api';
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

  const updateFolders = (folderItem, parentId) => {
    if (!parentId) setAllFolders([...allFolders, folderItem]);
    else {
      setAllFolders(injectFolderToParent(allFolders, folderItem, parentId));
    }
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
    setAllFolders(updatedFolders);
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
    moveFolderHelper
  };
}
