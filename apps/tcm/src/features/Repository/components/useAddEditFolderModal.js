import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  addFolder,
  addFolderWithoutProjectAPI,
  addSubFolder,
  deleteFolder,
  renameFolder
} from 'api/folders.api';
import AppRoute from 'const/routes';
import { addGlobalProject, addNotificaton } from 'globalSlice';
import {
  deleteFolderFromArray,
  injectFolderToParent,
  replaceFolderHelper
} from 'utils/folderHelpers';
import { routeFormatter } from 'utils/helperFunctions';
import { logEventHelper } from 'utils/logEvent';

import { requestedSteps } from '../const/unsavedConst';
import {
  setAllFolders,
  setFolderModalConf,
  updateAllTestCases
} from '../slices/repositorySlice';

import useUnsavedChanges from './useUnsavedChanges';

export default function useAddEditFolderModal(prop) {
  const navigate = useNavigate();
  const { isOkToExitForm } = useUnsavedChanges();
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const modalFocusRef = useRef();
  const [filledFormData, setFormData] = useState({
    name: '',
    notes: ''
  });

  const [formError, setFormError] = useState({
    nameError: ''
  });

  const allFolders = useSelector((state) => state.repository?.allFolders);
  const openedFolderModal = useSelector(
    (state) => state.repository.openedFolderModal
  );

  const setAllFoldersHelper = (data) => {
    dispatch(setAllFolders(data));
  };

  const updateRouteHelper = (selectedFolder) => {
    const route = routeFormatter(AppRoute.TEST_CASES, {
      projectId,
      folderId: selectedFolder.id
    });
    if (
      !isOkToExitForm(false, {
        key: requestedSteps.ROUTE,
        value: route
      })
    )
      return;

    navigate(route);
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
      dispatch(
        logEventHelper('TM_DeleteFolderCtaClicked', {
          project_id: projectId,
          folder_id: openedFolderModal?.folder?.id
        })
      );
      deleteFolder({ projectId, folderId: openedFolderModal.folder.id }).then(
        (item) => {
          dispatch(
            logEventHelper('TM_FolderDeletedNotification', {
              project_id: projectId,
              folder_id: openedFolderModal?.folder?.id
            })
          );
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

  const noProjectFolderCreationRouteUpdate = (data) => {
    if (projectId === 'new' && data?.data?.folder?.project_id)
      navigate(
        routeFormatter(AppRoute.TEST_CASES, {
          projectId: data.data.folder.project_id
        })
      );
  };

  const renameFolderHandler = () => {
    dispatch(
      logEventHelper('TM_EditFolderCtaClicked', {
        project_id: projectId,
        folder_id: prop?.folderId
      })
    );
    renameFolder({
      projectId,
      folderId: prop?.folderId,
      payload: filledFormData
    }).then((item) => {
      dispatch(
        logEventHelper('TM_FolderUpdatedNotification', {
          project_id: projectId,
          folder_id: prop?.folderId
        })
      );
      if (item.data?.folder) renameFolderHelper(item.data.folder);
      hideFolderModal();
    });
  };

  const addSubFolderHandler = () => {
    addSubFolder({
      projectId,
      folderId: prop?.folderId,
      payload: filledFormData
    }).then((item) => {
      if (item.data?.folder) updateFolders(item.data.folder, prop?.folderId);
      hideFolderModal();
    });
  };

  const addFolderHelper = () => {
    const addFolderAPIFunction =
      projectId === 'new' ? addFolderWithoutProjectAPI : addFolder;
    dispatch(
      logEventHelper('TM_CreateFolderCtaClicked', {
        project_id: projectId
      })
    );
    addFolderAPIFunction({
      projectId,
      payload: filledFormData
    }).then((item) => {
      if (item.data?.folder) updateFolders(item.data.folder);
      noProjectFolderCreationRouteUpdate(item);
      dispatch(
        logEventHelper('TM_FolderCreatedNotification', {
          project_id: projectId,
          folder_id: item.data.folder?.id
        })
      );
      dispatch(
        addNotificaton({
          id: `folder_created${item.data.folder?.id}`,
          title: `'${item.data.folder?.name}': Folder created`,
          variant: 'success'
        })
      );

      if (projectId === 'new') {
        dispatch(addGlobalProject(item.data.project));
      }
      hideFolderModal();
    });
  };

  const createFolderHandler = () => {
    if (filledFormData.name.length === 0) {
      setFormError({ ...formError, nameError: 'This is a required field' });
    } else if (prop?.isSubFolder && prop?.folderId) {
      addSubFolderHandler();
    } else if (prop?.isEditFolder && prop?.folderId) {
      renameFolderHandler();
    } else {
      addFolderHelper();
    }
  };

  return {
    modalFocusRef,
    filledFormData,
    formError,
    setFormError,
    setFormData,
    hideFolderModal,
    updateFolders,
    renameFolderHelper,
    deleteFolderHandler,
    noProjectFolderCreationRouteUpdate,
    createFolderHandler
  };
}
