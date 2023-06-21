import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getFolders, getSubFolders, moveFolder } from 'api/folders.api';
import AppRoute from 'const/routes';
import { addNotificaton, setShowFreshChatButton } from 'globalSlice';
import {
  deleteFolderFromArray,
  findFolder,
  injectFolderToParent
} from 'utils/folderHelpers';
import { routeFormatter } from 'utils/helperFunctions';
import { logEventHelper } from 'utils/logEvent';

import { addFolderModalKey, folderDropOptions } from '../const/folderConst';
import {
  setAllFolders,
  setFolderModalConf,
  setSelectedFolder,
  setTestCaseDetails,
  updateCtaLoading,
  updateFoldersLoading,
  updateTestCasesListLoading
} from '../slices/repositorySlice';
import { mapFolderAncestorHelper } from '../utils/sharedFunctions';

import useAddEditTestCase from './AddEditTestCase/useAddEditTestCase';
import useUnsavedChanges from './useUnsavedChanges';

export default function useFolders() {
  const { unsavedFormConfirmation } = useUnsavedChanges();
  const [isMoveToRootAvailable, setMoveToRoot] = useState(false);
  const [searchParams] = useSearchParams();
  const { showTestCaseAdditionPage, hideTestCaseAddEditPage } =
    useAddEditTestCase();
  const navigate = useNavigate();
  const { projectId, folderId } = useParams();
  const dispatch = useDispatch();

  const allFolders = useSelector((state) => state.repository?.allFolders);
  const openedFolderModal = useSelector(
    (state) => state.repository.openedFolderModal
  );
  const isSearchFilterView = useSelector(
    (state) => state.repository.isSearchFilterView
  );
  const bulkSelectionIds = useSelector(
    (state) => state.repository.bulkSelection?.ids
  );
  const isFoldersLoading = useSelector(
    (state) => state.repository.isLoading.folder
  );
  const isTestCasesLoading = useSelector(
    (state) => state.repository.isLoading.testCases
  );
  const noResultsText = useSelector(
    (state) => state.repository.searchEmptyText
  );
  const testCasesCount =
    useSelector((state) => state.repository.metaPage?.count) || 0;
  const moveFolderCtaLoading = useSelector(
    (state) => state.repository.isLoading.moveFolderCta
  );

  const setAllFoldersHelper = (data) => {
    dispatch(setAllFolders(data));
  };

  const closeTCDetailsSlide = () => {
    dispatch(
      setTestCaseDetails({
        folderId: null,
        testCaseId: null
      })
    );
  };

  const logHelper = (eventName, payload) => {
    dispatch(logEventHelper(eventName, payload));
  };

  const showAddFolderModal = (isEmptyClick) => {
    unsavedFormConfirmation(false, () => {
      logHelper(
        isEmptyClick
          ? 'TM_CreateFolderBtnClickedEmptyPrj'
          : 'TM_CreateFolderIconClicked',
        {
          project_id: projectId
        }
      );
      closeTCDetailsSlide();
      dispatch(setFolderModalConf({ modal: addFolderModalKey }));
    });
  };

  const fetchFolderSelectedFromParam = (loadedFolders) => {
    if (folderId)
      getSubFolders({ projectId, folderId, fetchAncestors: true }).then(
        (res) => {
          const newContentObject = mapFolderAncestorHelper(
            res?.ancestors,
            folderId
          );
          if (newContentObject) {
            setAllFoldersHelper(
              loadedFolders.map((item) =>
                item.id === newContentObject.id ? newContentObject : item
              )
            );
          } else setAllFoldersHelper(loadedFolders);
          dispatch(updateFoldersLoading(false));
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
      if (firstFolderId) {
        dispatch(updateTestCasesListLoading(true));

        navigate(
          routeFormatter(AppRoute.TEST_CASES, {
            projectId,
            folderId: firstFolderId
          }),
          {
            replace: true
          }
        );
      }
    }
  };

  const onFolderFetchWithNoFolders = () => {
    // if no folders
    setAllFoldersHelper([]);
    navigate(
      routeFormatter(AppRoute.TEST_CASES, {
        projectId
      })
    );
    dispatch(updateFoldersLoading(false));
  };

  const onFolderFetchWithFolders = (data) => {
    const isParentFolderDefault = data?.folders?.find(
      (item) => `${item.id}` === folderId
    );
    if (folderId && !isParentFolderDefault && data?.folders?.length) {
      // if the folderId in URL is not a parent level folder
      fetchFolderSelectedFromParam(data?.folders || []);
      // if sub folder to be selectd, thats done in a different function, hence the loader should be maintained
    } else {
      setAllFoldersHelper(data?.folders || []);
      dispatch(updateFoldersLoading(false));
    }

    selectFolderPerDefault(data?.folders);
  };

  const fetchAllFolders = () => {
    if (projectId === 'new') {
      // dont load anything start from scratch
      dispatch(updateFoldersLoading(false));
    } else if (projectId) {
      dispatch(updateFoldersLoading(true));
      getFolders({ projectId })
        .then((data) => {
          if (!data?.folders?.length) {
            onFolderFetchWithNoFolders();
          } else {
            onFolderFetchWithFolders(data);
          }
        })
        .catch((err) => {
          if (err.rejectAll) return;
          dispatch(updateFoldersLoading(false));
        });
    } else setAllFoldersHelper([]);
  };

  const updateRouteHelper = (selectedFolder) => {
    unsavedFormConfirmation(false, () => {
      const route = routeFormatter(AppRoute.TEST_CASES, {
        projectId,
        folderId: selectedFolder.id
      });

      closeTCDetailsSlide();
      logHelper('TM_FolderClicked', {
        project_id: projectId,
        folder_id: selectedFolder.id
      });

      navigate(route);
    });
  };

  const folderActionsHandler = ({ folder, selectedOption }) => {
    if (selectedOption?.id) {
      unsavedFormConfirmation(false, () => {
        const isCreateTestCase = selectedOption.id === folderDropOptions[0].id;

        closeTCDetailsSlide();
        dispatch(setFolderModalConf({ modal: selectedOption.id, folder }));
        switch (selectedOption.id) {
          case folderDropOptions[1].id: // sub folder
            logHelper('TM_CreateFolderMenuLinkClicked', {
              project_id: projectId,
              folder_id: folder?.id
            });
            break;
          case folderDropOptions[2].id: // move folder
            logHelper('TM_MoveFolderMenuLinkClicked', {
              project_id: projectId,
              folder_id: folder?.id
            });
            break;
          case folderDropOptions[3].id: // edit folder
            logHelper('TM_EditFolderMenuLinkClicked', {
              project_id: projectId,
              folder_id: folder?.id
            });
            break;
          case folderDropOptions[4].id: // delete folder
            logHelper('TM_DeleteFolderMenuLinkClicked', {
              project_id: projectId,
              folder_id: folder?.id
            });
            break;

          default:
            break;
        }

        if (isCreateTestCase) {
          // create test case
          showTestCaseAdditionPage(folder, true);
        } else hideTestCaseAddEditPage();
      });
    }
  };

  const hideFolderModal = () => {
    dispatch(setFolderModalConf(false));
  };

  const folderUpdateHandler = (newFolders) => {
    setAllFoldersHelper(newFolders);
  };

  const moveFolderHelper = (thisFolderID, baseFolderID, internalAllFolders) => {
    const movedFolder = findFolder(
      internalAllFolders,
      parseInt(thisFolderID, 10)
    );
    let updatedFolders = deleteFolderFromArray(
      [...internalAllFolders],
      parseInt(thisFolderID, 10)
    );
    updatedFolders =
      baseFolderID === null
        ? [...updatedFolders, movedFolder]
        : injectFolderToParent(updatedFolders, movedFolder, baseFolderID);
    setAllFoldersHelper(updatedFolders);
  };

  const moveFolderOnOkHandler = (selectedFolder, internalAllFolders) => {
    logHelper('TM_MoveFolderCtaClicked', {
      project_id: projectId,
      folder_id_src: openedFolderModal?.folder?.id,
      folder_id_dest: selectedFolder?.id || 'root'
    });

    dispatch(updateCtaLoading({ key: 'moveFolderCta', value: true }));
    moveFolder({
      projectId,
      folderId: openedFolderModal?.folder?.id,
      newParentFolderId: selectedFolder?.id || null // move to root
    })
      .then((data) => {
        dispatch(updateCtaLoading({ key: 'moveFolderCta', value: false }));
        if (data?.data?.success) {
          moveFolderHelper(
            data.data.folder?.id,
            selectedFolder?.id || null,
            internalAllFolders
          );
          logHelper('TM_FolderMovedNotification', {
            project_id: projectId,
            folder_id: openedFolderModal?.folder?.id
          });
          dispatch(
            addNotificaton({
              id: `folder_moved${data.data.folder?.id}`,
              title: `'${data.data.folder?.name}' moved to new location`,
              variant: 'success'
            })
          );
          hideFolderModal();
        }
      })
      .catch(() => {
        dispatch(updateCtaLoading({ key: 'moveFolderCta', value: false }));
        // TODO: give proper info
        // eslint-dsable no-console
        // console.log(error.response.data.errors[0].title);
      });
  };

  useEffect(() => {
    if (openedFolderModal?.modal === folderDropOptions?.[2]?.id) {
      setMoveToRoot(
        !allFolders.find((item) => item.id === openedFolderModal?.folder?.id)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedFolderModal]);

  useEffect(() => {
    const selectedFolder = findFolder(allFolders, parseInt(folderId, 10));
    if (selectedFolder) {
      dispatch(setSelectedFolder(selectedFolder));
    } else {
      dispatch(setSelectedFolder(null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderId, allFolders]);

  return {
    bulkSelectionIds,
    noResultsText,
    isMoveToRootAvailable,
    isTestCasesLoading,
    searchKey: searchParams.get('q'),
    isFoldersLoading,
    testCasesCount,
    isSearchFilterView,
    openedFolderModal,
    projectId,
    folderId,
    allFolders,
    moveFolderCtaLoading,
    showAddFolderModal,
    fetchAllFolders,
    updateRouteHelper,
    folderUpdateHandler,
    folderActionsHandler,
    moveFolderHelper,
    moveFolderOnOkHandler,
    hideFolderModal,
    setShowFreshChatButton
  };
}
