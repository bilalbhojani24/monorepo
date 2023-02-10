import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getFolders, getSubFolders, moveFolder } from 'api/folders.api';
import AppRoute from 'const/routes';
import {
  deleteFolderFromArray,
  findFolder,
  injectFolderToParent
} from 'utils/folderHelpers';
import { routeFormatter } from 'utils/helperFunctions';

import { addFolderModalKey, folderDropOptions } from '../const/folderConst';
import {
  setAllFolders,
  setFolderModalConf,
  setSelectedFolder,
  updateFoldersLoading,
  updateTestCasesListLoading
} from '../slices/repositorySlice';

import useTestCases from './useTestCases';

export default function useFolders() {
  const [searchParams] = useSearchParams();
  const { showTestCaseAdditionPage, hideTestCaseAddEditPage } = useTestCases();
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
  const isFoldersLoading = useSelector(
    (state) => state.repository.isLoading.folder
  );
  const isTestCasesLoading = useSelector(
    (state) => state.repository.isLoading.testCases
  );
  const testCasesCount =
    useSelector((state) => state.repository.allTestCases)?.length || 0;
  const setAllFoldersHelper = (data) => {
    dispatch(setAllFolders(data));
  };
  const showAddFolderModal = () => {
    dispatch(setFolderModalConf({ modal: addFolderModalKey }));
  };

  const mapFolderAncestorHelper = (ancestorsArray) => {
    let newContentObject = null;
    ancestorsArray?.forEach((item, iDx) => {
      const newItem = item;
      newItem.isOpened = true;
      if (iDx === 0) {
        // root folder
        newItem.contents = newItem.contents.map((thisItem) =>
          thisItem.id === parseInt(folderId, 10)
            ? { ...thisItem, isSelected: true }
            : thisItem
        );
      } else {
        newItem.contents = item.contents
          ? item.contents.map((internalItem) =>
              internalItem.id === newContentObject?.id
                ? newContentObject
                : internalItem
            )
          : newContentObject;
      }
      newItem.sub_folders_count = newItem?.contents?.length;
      newContentObject = newItem;
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

  const fetchAllFolders = () => {
    // dispatch(setAddTestCaseVisibility(false));
    if (projectId) {
      dispatch(updateFoldersLoading(true));
      getFolders({ projectId }).then((data) => {
        if (!data?.folders?.length) {
          // if no folders
          setAllFoldersHelper([]);
          navigate(
            routeFormatter(AppRoute.TEST_CASES, {
              projectId
            })
          );
        } else {
          const isParentFolderDefault = data?.folders?.find(
            (item) => `${item.id}` === folderId
          );
          if (folderId && !isParentFolderDefault && data?.folders?.length) {
            // if the folderId in URL is not a parent level folder
            fetchFolderSelectedFromParam(data?.folders || []);
          } else setAllFoldersHelper(data?.folders || []);

          selectFolderPerDefault(data?.folders);
        }
        dispatch(updateFoldersLoading(false));
      });
    } else setAllFoldersHelper([]);
  };

  const updateRouteHelper = (selectedFolder) => {
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
      } else hideTestCaseAddEditPage();
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
        .catch(() => {
          // TODO: give proper info
          // eslint-dsable no-console
          // console.log(error.response.data.errors[0].title);
        });
    }
  };

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
    isTestCasesLoading,
    searchKey: searchParams.get('q'),
    isFoldersLoading,
    testCasesCount,
    isSearchFilterView,
    openedFolderModal,
    projectId,
    folderId,
    allFolders,
    showAddFolderModal,
    fetchAllFolders,
    updateRouteHelper,
    folderUpdateHandler,
    folderActionsHandler,
    moveFolderHelper,
    moveFolderOnOkHandler,
    hideFolderModal
  };
}
