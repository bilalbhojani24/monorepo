import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addFolder,
  addFolderWithoutProjectAPI,
  addSubFolder
} from 'api/folders.api';
import { injectFolderToParent } from 'utils/folderHelpers';

import { setFoldersForCSV } from '../../../features/importCSVFlow/slices/importCSVSlice';

export default function useAddFolderModal(prop) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalFocusRef = useRef();
  const [filledFormData, setFormData] = useState({
    name: '',
    notes: ''
  });

  const [formError, setFormError] = useState({
    nameError: ''
  });

  const [loaders, setLoaders] = useState({ createFolderCta: false });

  const allFoldersForCSV = useSelector(
    (state) => state.importCSV.foldersForCSV
  );

  const setAllFoldersHelper = (data) => {
    dispatch(setFoldersForCSV(data));
  };

  const hideFolderModal = (newProjectId) => {
    prop.hideModal();
    setFormError({ ...formError, nameError: '' });
    if (prop.projectId === 'new')
      navigate(`/import/csv?project=${newProjectId}`);
  };

  const updateFolders = (folderItem, parentId) => {
    if (!parentId)
      setAllFoldersHelper([...allFoldersForCSV, folderItem]); // root folder
    else {
      // sub folder
      const updatedFolders = injectFolderToParent(
        allFoldersForCSV,
        folderItem,
        parentId
      );
      setAllFoldersHelper(updatedFolders);
    }
  };

  const addSubFolderHandler = () => {
    setLoaders({ createFolderCta: true });
    addSubFolder({
      projectId: prop.projectId,
      folderId: prop?.folderId,
      payload: filledFormData
    })
      .then((item) => {
        if (item.data?.folder) updateFolders(item.data.folder, prop?.folderId);
        hideFolderModal();
        setTimeout(() => {
          setLoaders({ createFolderCta: false });
        }, 500);
      })
      .catch(() => {
        setLoaders({ createFolderCta: false });
      });
  };

  const addFolderHelper = () => {
    const addFolderAPIFunction =
      prop.projectId === 'new' ? addFolderWithoutProjectAPI : addFolder;

    setLoaders({ createFolderCta: true });
    addFolderAPIFunction({
      projectId: prop.projectId,
      payload: filledFormData
    })
      .then((item) => {
        if (item.data?.folder) updateFolders(item.data.folder);
        hideFolderModal(item.data?.project?.id);

        setTimeout(() => {
          setLoaders({ createFolderCta: false });
        }, 500);
      })
      .catch(() => {
        setLoaders({ createFolderCta: false });
      });
  };

  const createFolderHandler = () => {
    if (filledFormData.name.trim().length === 0) {
      setFormError({ ...formError, nameError: 'This is a required field' });
      setFormData({ ...filledFormData, name: '' });
    } else if (prop?.isSubFolder) {
      addSubFolderHandler();
    } else {
      addFolderHelper();
    }
  };

  return {
    createFolderHandler,
    filledFormData,
    formError,
    hideFolderModal,
    loaders,
    modalFocusRef,
    setFormData,
    setFormError,
    updateFolders
  };
}
