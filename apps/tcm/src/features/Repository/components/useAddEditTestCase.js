import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadFilesAPI } from 'api/attachments.api';
import { getUsersOfProjectAPI } from 'api/projects.api';
import {
  addTestCaseAPI,
  editTestCaseAPI,
  getTestCaseDetailsAPI,
} from 'api/testcases.api';

import { stepTemplate, templateOptions } from '../const/addTestCaseConst';
import {
  addSingleTestCase,
  setAddTagModal,
  setAddTestCaseVisibility,
  setEditTestCasePageVisibility,
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
  const [usersArray, setUsersArray] = useState([]);
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

  const selectedTestCase = useSelector(
    (state) => state.repository.selectedTestCase,
  );
  const tagsArray = useSelector((state) => state.repository.tagsArray);
  const issuesArray = useSelector((state) => state.repository.issuesArray);

  const usersDetails = useSelector((state) => state.repository.usersDetails);

  const hideTestCaseAdditionPage = () => {
    dispatch(setAddTestCaseVisibility(false));
    dispatch(setEditTestCasePageVisibility(false));
  };
  const showAddTagsModal = () => {
    dispatch(setAddTagModal(true));
  };
  const hideAddTagsModal = () => {
    dispatch(setAddTagModal(false));
  };

  const addTagsHelper = (data) => {
    dispatch(setTagsArray([...tagsArray, { value: data, label: data }]));
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
    if (!usersDetails?.projectId || usersDetails.projectId !== projectId) {
      getUsersOfProjectAPI(projectId).then((data) => {
        dispatch(
          setUsers({
            projectId,
            users: [{ full_name: 'Myself', id: data.myself.id }, ...data.users],
          }),
        );

        // if (data?.myself?.id)
        //   dispatch(
        //     updateTestCaseFormData({ key: 'owner', value: data.myself.id }),
        //   );
      });
    }
  };

  const formDataStandardiser = (formData) => ({
    test_case: {
      ...formData,
      steps: JSON.stringify(formData.steps),
      tags: formData?.tags.map((item) => item.label),
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
      const filesData = new FormData();
      for (let idx = 0; idx < e.currentTarget.files.length; idx += 1) {
        filesData.append('attachments[]', e.currentTarget.files[idx]);
      }
      uploadFilesAPI({ projectId, payload: filesData });
    }
  };

  const addMoreClickHandler = () => {
    uploadElementRef?.current.click();
  };

  useEffect(() => {
    if (isTestCaseEditing) fetchTestCaseDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTestCaseEditing]);

  useEffect(() => {
    if (projectId === usersDetails?.projectId)
      setUsersArray(
        usersDetails.users.map((item) => ({
          label: item.full_name,
          value: item.id,
        })),
      );
    else setUsersArray([]);
  }, [projectId, usersDetails]);

  return {
    uploadElementRef,
    isAddTagModalShown,
    tagsArray,
    issuesArray,
    usersArray,
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
    addTagsHelper,
    fileUploaderHelper,
    addMoreClickHandler,
  };
}
