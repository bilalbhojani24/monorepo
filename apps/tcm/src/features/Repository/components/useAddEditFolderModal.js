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
  folderPropertyUpdater,
  injectFolderToParent,
  replaceFolderHelper
} from 'utils/folderHelpers';
import { routeFormatter } from 'utils/helperFunctions';
import { logEventHelper } from 'utils/logEvent';

import {
  setAllFolders,
  setFolderModalConf,
  updateAllTestCases,
  updateCtaLoading
} from '../slices/repositorySlice';

import useUnsavedChanges from './useUnsavedChanges';

export default function useAddEditFolderModal(prop) {
  const navigate = useNavigate();
  const { unsavedFormConfirmation } = useUnsavedChanges();
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
  const addFolderCtaLoading = useSelector(
    (state) => state.repository.isLoading.addFolderCta
  );
  const editFolderCtaLoading = useSelector(
    (state) => state.repository.isLoading.editFolderCta
  );
  const addSubFolderCtaLoading = useSelector(
    (state) => state.repository.isLoading.addSubFolderCta
  );
  const deleteFolderCtaLoading = useSelector(
    (state) => state.repository.isLoading.deleteFolderCta
  );

  const setAllFoldersHelper = (data) => {
    dispatch(setAllFolders(data));
  };

  const updateRouteHelper = (selectedFolder) => {
    unsavedFormConfirmation(false, () => {
      const route = routeFormatter(AppRoute.TEST_CASES, {
        projectId,
        folderId: selectedFolder.id
      });

      navigate(route);
    });
  };

  const hideFolderModal = (action) => {
    if (action === 'Cancel' && !prop?.isEditFolder && !prop?.isSubFolder)
      dispatch(
        logEventHelper('TM_CreateFolderCancelCtaClicked', {
          project_id: projectId
        })
      );
    dispatch(setFolderModalConf(false));
    setFormError({ ...formError, nameError: '' });
  };

  const updateFolders = (folderItem, parentId) => {
    if (!parentId)
      setAllFoldersHelper([...allFolders, folderItem]); // root folder
    else {
      // sub folder
      let updatedFolders = injectFolderToParent(
        allFolders,
        folderItem,
        parentId
      );
      updatedFolders = folderPropertyUpdater(
        updatedFolders, // all folders
        parentId, // folder to which the changes is to be applied
        'isOpened', // name of the property to be updated
        true // value of the property
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
      dispatch(updateCtaLoading({ key: 'deleteFolderCta', value: true }));
      deleteFolder({ projectId, folderId: openedFolderModal.folder.id })
        .then((item) => {
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
              navigate(`/projects/${projectId}/folder`);
            }
          }

          hideFolderModal();
          dispatch(updateCtaLoading({ key: 'deleteFolderCta', value: false }));
        })
        .catch(() => {
          dispatch(updateCtaLoading({ key: 'deleteFolderCta', value: false }));
        });
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
    if (editFolderCtaLoading || !prop?.folderId) return;
    dispatch(
      logEventHelper('TM_EditFolderCtaClicked', {
        project_id: projectId,
        folder_id: prop?.folderId
      })
    );
    dispatch(updateCtaLoading({ key: 'editFolderCta', value: true }));
    renameFolder({
      projectId,
      folderId: prop?.folderId,
      payload: filledFormData
    })
      .then((item) => {
        dispatch(
          logEventHelper('TM_FolderUpdatedNotification', {
            project_id: projectId,
            folder_id: prop?.folderId
          })
        );
        if (item.data?.folder) renameFolderHelper(item.data.folder);
        hideFolderModal();
        setTimeout(() => {
          dispatch(updateCtaLoading({ key: 'editFolderCta', value: false }));
        }, 500);
      })
      .catch(() => {
        dispatch(updateCtaLoading({ key: 'editFolderCta', value: false }));
      });
  };

  const addSubFolderHandler = () => {
    if (addSubFolderCtaLoading || !prop?.folderId) return;
    dispatch(updateCtaLoading({ key: 'addSubFolderCta', value: true }));
    addSubFolder({
      projectId,
      folderId: prop?.folderId,
      payload: filledFormData
    })
      .then((item) => {
        if (item.data?.folder) updateFolders(item.data.folder, prop?.folderId);
        hideFolderModal();
        setTimeout(() => {
          dispatch(updateCtaLoading({ key: 'addSubFolderCta', value: false }));
        }, 500);
      })
      .catch(() => {
        dispatch(updateCtaLoading({ key: 'addSubFolderCta', value: false }));
      });
  };

  const addFolderHelper = () => {
    if (addFolderCtaLoading) return;
    const addFolderAPIFunction =
      projectId === 'new' ? addFolderWithoutProjectAPI : addFolder;
    dispatch(
      logEventHelper('TM_CreateFolderCtaClicked', {
        project_id: projectId
      })
    );
    dispatch(updateCtaLoading({ key: 'addFolderCta', value: true }));

    addFolderAPIFunction({
      projectId,
      payload: filledFormData
    })
      .then((item) => {
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
        setTimeout(() => {
          dispatch(updateCtaLoading({ key: 'addFolderCta', value: false }));
        }, 500);
      })
      .catch(() => {
        dispatch(updateCtaLoading({ key: 'addFolderCta', value: false }));
      });
  };

  const createFolderHandler = () => {
    if (filledFormData.name.trim().length === 0) {
      setFormError({ ...formError, nameError: 'This is a required field' });
      setFormData({ ...filledFormData, name: '' });
    } else if (prop?.isSubFolder) {
      addSubFolderHandler();
    } else if (prop?.isEditFolder) {
      renameFolderHandler();
    } else {
      addFolderHelper();
    }
  };

  const getLoader = () => {
    if (prop.isEditFolder) return editFolderCtaLoading;
    if (prop.isSubFolder) return addSubFolderCtaLoading;
    return addFolderCtaLoading;
  };

  return {
    modalFocusRef,
    filledFormData,
    formError,
    deleteFolderCtaLoading,
    getLoader,
    setFormError,
    setFormData,
    hideFolderModal,
    updateFolders,
    renameFolderHelper,
    deleteFolderHandler,
    noProjectFolderCreationRouteUpdate,
    createFolderHandler
    // throttledCreateFolderHandler
  };
}
