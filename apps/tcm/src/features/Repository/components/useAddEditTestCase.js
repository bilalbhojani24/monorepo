import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadFilesAPI } from 'api/attachments.api';
import { getUsersOfProjectAPI } from 'api/projects.api';
import {
  addTestCaseAPI,
  editTestCaseAPI,
  getTagsAPI,
  getTestCaseDetailsAPI,
  verifyTagAPI,
} from 'api/testcases.api';

import { stepTemplate, templateOptions } from '../const/addTestCaseConst';
import {
  addSingleTestCase,
  setAddTagModal,
  setAddTestCaseVisibility,
  setEditTestCasePageVisibility,
  setLoadedDataProjectId,
  setTagsArray,
  setTestCaseFormData,
  setUsers,
  updateTestCase,
  updateTestCaseFormData,
} from '../slices/repositorySlice';

export default function useAddEditTestCase() {
  const { projectId, folderId } = useParams();
  const uploadElementRef = useRef();
  const [inputError, setInputError] = useState(false);
  const [usersArrayMapped, setUsersArray] = useState([]);
  const [showMoreFields, setShowMoreFields] = useState(true);
  const dispatch = useDispatch();

  const selectedFolder = useSelector(
    (state) => state.repository.selectedFolder,
  );
  const isTestCaseEditing = useSelector(
    (state) => state.repository.showEditTestCaseForm,
  );
  const isAddTagModalShown = useSelector(
    (state) => state.repository.showAddTagModal,
  );
  const testCaseFormData = useSelector(
    (state) => state.repository.testCaseFormData,
  );
  const loadedDataProjectId = useSelector(
    (state) => state.repository.loadedDataProjectId,
  );

  const selectedTestCase = useSelector(
    (state) => state.repository.selectedTestCase,
  );
  const tagsArray = useSelector((state) => state.repository.tagsArray);
  const issuesArray = useSelector((state) => state.repository.issuesArray);

  const usersArray = useSelector((state) => state.repository.usersArray);

  const hideTestCaseAdditionPage = () => {
    dispatch(setAddTestCaseVisibility(false));
    dispatch(setEditTestCasePageVisibility(false));
  };
  const showAddTagsModal = () => {
    dispatch(setAddTagModal(true));
  };

  const updateLoadedDataProjectId = () => {
    dispatch(setLoadedDataProjectId(projectId));
  };

  const fetchTestCaseDetails = () => {
    if (folderId && selectedTestCase?.id) {
      getTestCaseDetailsAPI({
        projectId,
        folderId,
        testCaseId: selectedTestCase.id,
      }).then((data) => {
        dispatch(setTestCaseFormData(data?.data?.test_case || null));
      });
    }
  };

  const fetchUsers = () => {
    getUsersOfProjectAPI(projectId).then((data) => {
      dispatch(
        setUsers([{ full_name: 'Myself', id: data.myself.id }, ...data.users]),
      );

      updateLoadedDataProjectId();

      // if (data?.myself?.id)
      //   dispatch(
      //     updateTestCaseFormData({ key: 'owner', value: data.myself.id }),
      //   );
    });
  };
  const fetchTags = () => {
    getTagsAPI({ projectId }).then((data) => {
      dispatch(setTagsArray(data.tags));
    });
  };

  const fetchFormData = () => {
    if (loadedDataProjectId !== projectId) {
      fetchUsers();
      fetchTags();
    }
  };

  const tagVerifierFunction = async (tag) => verifyTagAPI({ projectId, tag });

  const formDataStandardiser = (formData) => ({
    test_case: {
      ...formData,
      steps: JSON.stringify(formData.steps),
    },
  });

  const saveTestCase = (formData) => {
    if (!formData.name) setInputError(true);
    else {
      addTestCaseAPI({
        projectId,
        folderId,
        payload: formDataStandardiser(formData),
      }).then((data) => {
        dispatch(addSingleTestCase(data));
        dispatch(setAddTestCaseVisibility(false));
      });
    }
  };

  const editTestCase = (formData) => {
    if (!formData.name) setInputError(true);
    else {
      editTestCaseAPI({
        projectId,
        folderId,
        testCaseId: selectedTestCase.id,
        payload: formDataStandardiser(formData),
      }).then((data) => {
        dispatch(updateTestCase(data));
        dispatch(setAddTestCaseVisibility(false));
        dispatch(setEditTestCasePageVisibility(false));
      });
    }
  };

  const handleTestCaseFieldChange = (key, value) => {
    if (key === 'name' && value) setInputError(false);

    if (key === 'template') {
      dispatch(
        updateTestCaseFormData({
          key: 'steps',
          value: value === templateOptions[1].value ? [stepTemplate] : [''],
        }),
      );
    }
    dispatch(updateTestCaseFormData({ key, value }));
  };

  const fileUploaderHelper = (e) => {
    if (e?.currentTarget?.files?.length) {
      const selectedFiles = e?.currentTarget?.files;
      const files = testCaseFormData?.attachments
        ? [...testCaseFormData?.attachments]
        : [];
      for (let idx = 0; idx < selectedFiles.length; idx += 1) {
        files.push({
          name: selectedFiles[idx].name,
          id: null,
        });
      }
      handleTestCaseFieldChange('attachments', files);

      const filesData = new FormData();
      for (let idx = 0; idx < selectedFiles.length; idx += 1) {
        filesData.append('attachments[]', selectedFiles[idx]);
      }

      uploadFilesAPI({ projectId, payload: filesData }).then((item) => {
        const uploadedFiles = files.filter((thisItem) => thisItem.id);
        for (let idx = 0; idx < selectedFiles.length; idx += 1) {
          uploadedFiles.push({
            name: selectedFiles[idx].name,
            id: item.generic_attachment[idx],
          });
        }
        // update with id
        handleTestCaseFieldChange('attachments', uploadedFiles);
      });
    }
  };

  const addMoreClickHandler = () => {
    uploadElementRef?.current?.click();
  };

  const fileRemoveHandler = (data) => {
    handleTestCaseFieldChange(
      'attachments',
      testCaseFormData?.attachments.filter((item) => item.id !== data.id),
    );
  };

  const hideAddTagsModal = (newTags) => {
    dispatch(setTagsArray([...tagsArray, ...newTags]));
    handleTestCaseFieldChange(
      'tags',
      testCaseFormData?.tags
        ? [...testCaseFormData?.tags, ...newTags]
        : newTags,
    );
    dispatch(setAddTagModal(false));
  };

  useEffect(() => {
    if (isTestCaseEditing) fetchTestCaseDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTestCaseEditing]);

  useEffect(() => {
    if (projectId === loadedDataProjectId)
      setUsersArray(
        usersArray.map((item) => ({
          label: item.full_name,
          value: item.id,
        })),
      );
    else setUsersArray([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, usersArray]);

  return {
    uploadElementRef,
    isAddTagModalShown,
    tagsArray,
    issuesArray,
    usersArrayMapped,
    fetchUsers,
    handleTestCaseFieldChange,
    testCaseFormData,
    inputError,
    selectedFolder,
    hideTestCaseAdditionPage,
    saveTestCase,
    editTestCase,
    folderId,
    projectId,
    selectedTestCase,
    isTestCaseEditing,
    showMoreFields,
    setShowMoreFields,
    showAddTagsModal,
    hideAddTagsModal,
    fileUploaderHelper,
    addMoreClickHandler,
    fileRemoveHandler,
    fetchFormData,
    tagVerifierFunction,
  };
}
