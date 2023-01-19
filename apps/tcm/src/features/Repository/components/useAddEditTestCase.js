import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUsersOfProjectAPI } from 'api/projects.api';
import {
  addTestCaseAPI,
  editTestCaseAPI,
  getTestCaseDetailsAPI,
} from 'api/testcases.api';

import { stepTemplate, templateOptions } from '../const/addTestCaseConst';
import {
  addSingleTestCase,
  setAddTestCaseVisibility,
  setEditTestCasePageVisibility,
  setTestCaseFormData,
  setUsers,
  updateTestCase,
  updateTestCaseFormData,
} from '../slices/repositorySlice';

export default function useAddEditTestCase() {
  const { projectId, folderId } = useParams();
  const [inputError, setInputError] = useState(false);
  const [usersArray, setUsersArray] = useState([]);
  const [showMoreFields, setShowMoreFields] = useState(false);
  const dispatch = useDispatch();

  const selectedFolder = useSelector(
    (state) => state.repository.selectedFolder,
  );
  const isTestCaseEditing = useSelector(
    (state) => state.repository.showEditTestCaseForm,
  );
  const testCaseFormData = useSelector(
    (state) => state.repository.testCaseFormData,
  );

  const selectedTestCase = useSelector(
    (state) => state.repository.selectedTestCase,
  );

  const usersDetails = useSelector((state) => state.repository.usersDetails);

  const hideTestCaseAdditionPage = () => {
    dispatch(setAddTestCaseVisibility(false));
    dispatch(setEditTestCasePageVisibility(false));
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

        if (data?.myself?.id)
          dispatch(
            updateTestCaseFormData({ key: 'owner', value: data.myself.id }),
          );
      });
    }
  };

  const saveTestCase = (formData) => {
    if (!formData.name) setInputError(true);
    else {
      addTestCaseAPI({
        projectId,
        folderId,
        payload: {
          test_case: {
            ...formData,
            steps: JSON.stringify(formData.steps),
          },
        },
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
        payload: {
          test_case: {
            ...formData,
            steps: JSON.stringify(formData.steps),
          },
        },
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
  };
}
