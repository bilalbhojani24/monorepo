import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  addFolder,
  addFolderWithoutProjectAPI,
  addSubFolder
} from 'api/folders.api';
import AppRoute from 'const/routes';
import { routeFormatter } from 'utils/helperFunctions';

export default function useAddFolderModal(prop) {
  const navigate = useNavigate();
  const modalFocusRef = useRef();
  const [filledFormData, setFormData] = useState({
    name: '',
    notes: ''
  });

  const [formError, setFormError] = useState({
    nameError: ''
  });

  const [loaders, setLoaders] = useState({ createFolderCta: false });

  const hideFolderModal = (newProjectId) => {
    prop.hideModal();
    setFormError({ ...formError, nameError: '' });
    if (prop.projectId === 'new')
      navigate(
        routeFormatter(AppRoute.IMPORT_CSV, {
          projectId: newProjectId
        })
      );
  };

  const addSubFolderHandler = () => {
    setLoaders({ createFolderCta: true });
    addSubFolder({
      projectId: prop.projectId,
      folderId: prop?.folderId,
      payload: filledFormData
    })
      .then((item) => {
        prop.onNewFolderCreated(item.data.folder, prop?.folderId);
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
        prop.onNewFolderCreated(item.data.folder);
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
    setFormError
  };
}
