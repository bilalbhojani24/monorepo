import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { uploadFilesAPI } from 'api/attachments.api';
import { addFolder } from 'api/folders.api';
import { getUsersOfProjectAPI } from 'api/projects.api';
import {
  addTestCaseAPI,
  editTestCaseAPI,
  editTestCasesBulkAPI,
  getTagsAPI,
  getTestCaseDetailsAPI,
  verifyTagAPI
} from 'api/testcases.api';
import AppRoute from 'const/routes';
import { routeFormatter, selectMenuValueMapper } from 'utils/helperFunctions';

import {
  emptyFolderName,
  stepTemplate,
  templateOptions
} from '../const/addTestCaseConst';
import {
  addSingleTestCase,
  resetBulkSelection,
  setAddIssuesModal,
  setAddTagModal,
  setAddTestCaseVisibility,
  setBulkUpdateProgress,
  setEditTestCasePageVisibility,
  setIssuesArray,
  setLoadedDataProjectId,
  setTagsArray,
  setTestCaseFormData,
  setUsers,
  updateAllTestCases,
  updateBulkTestCaseFormData,
  updateTestCase,
  updateTestCaseFormData
} from '../slices/repositorySlice';

import useFolders from './useFolders';

export default function useAddEditTestCase() {
  const { projectId, folderId } = useParams();
  const navigate = useNavigate();
  const { updateFolders } = useFolders();
  const [inputError, setInputError] = useState(false);
  const [isUploadInProgress, setUploadProgress] = useState(false);
  const [usersArrayMapped, setUsersArray] = useState([]);
  const [showMoreFields, setShowMoreFields] = useState(false);
  const dispatch = useDispatch();

  const selectedFolder = useSelector(
    (state) => state.repository.selectedFolder
  );
  const isTestCaseEditing = useSelector(
    (state) => state.repository.showEditTestCaseForm
  );
  const isAddTagModalShown = useSelector(
    (state) => state.repository.showAddTagModal
  );
  const isAddIssuesModalShown = useSelector(
    (state) => state.repository.showAddIssuesModal
  );
  const testCaseFormData = useSelector(
    (state) => state.repository.testCaseFormData
  );
  const testCaseBulkFormData = useSelector(
    (state) => state.repository.testCaseBulkFormData
  );
  const loadedDataProjectId = useSelector(
    (state) => state.repository.loadedDataProjectId
  );
  const isBulkUpdateInit = useSelector(
    (state) => state.repository.isBulkUpdateInit
  );
  const bulkSelection = useSelector((state) => state.repository.bulkSelection);
  const allTestCases = useSelector((state) => state.repository.allTestCases);

  const allFolders = useSelector((state) => state.repository?.allFolders);

  const selectedTestCase = useSelector(
    (state) => state.repository.selectedTestCase
  );
  const tagsArray = useSelector((state) => state.repository.tagsArray);
  const issuesArray = useSelector((state) => state.repository.issuesArray);

  const usersArray = useSelector((state) => state.repository.usersArray);

  const hideTestCaseAddEditPage = () => {
    dispatch(setAddTestCaseVisibility(false));
    dispatch(setEditTestCasePageVisibility(false));
    dispatch(setBulkUpdateProgress(false));
  };
  const showAddTagsModal = () => {
    dispatch(setAddTagModal(true));
  };
  const showAddIssueModal = () => {
    dispatch(setAddIssuesModal(true));
  };

  const updateLoadedDataProjectId = () => {
    dispatch(setLoadedDataProjectId(projectId));
  };

  const handleTestCaseFieldChange = (key, value) => {
    if (isBulkUpdateInit) {
      dispatch(updateBulkTestCaseFormData({ key, value }));
    } else {
      if (key === 'name' && value) setInputError(false);

      if (key === 'template') {
        dispatch(
          updateTestCaseFormData({
            key: 'steps',
            value: value === templateOptions[1].value ? [stepTemplate] : ['']
          })
        );
      }
      dispatch(updateTestCaseFormData({ key, value }));
    }
  };

  const formDataFormatter = (formData) => {
    const testCase = {
      ...formData
    };

    if (formData.steps) testCase.steps = JSON.stringify(formData.steps);
    if (formData.tags)
      testCase.tags = formData?.tags?.map((item) => item.value);
    if (formData.issues)
      testCase.issues = formData?.issues?.map((item) => item.value);
    if (formData.attachments)
      testCase.attachments = formData?.attachments?.map((item) => item.id);

    return { test_case: testCase };
  };

  const formDataRetriever = (formData) => ({
    ...formData,
    tags: tagsArray.filter((item) => formData?.tags.includes(item.value)),
    issues: selectMenuValueMapper(formData?.issues?.map((item) => item.jira_id))
  });

  const fetchTestCaseDetails = () => {
    if (folderId && selectedTestCase?.id) {
      getTestCaseDetailsAPI({
        projectId,
        folderId,
        testCaseId: selectedTestCase.id
      }).then((data) => {
        const formattedData = formDataRetriever(data?.data?.test_case);
        dispatch(setTestCaseFormData(formattedData));
        if (formattedData.issues)
          dispatch(setIssuesArray(formattedData.issues));
      });
    }
  };

  const fetchUsers = () => {
    getUsersOfProjectAPI(projectId).then((data) => {
      dispatch(
        setUsers([{ full_name: 'Myself', id: data.myself.id }, ...data.users])
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
      const mappedTags = selectMenuValueMapper(data?.tags);
      dispatch(setTagsArray(mappedTags));
      // handleTestCaseFieldChange('tags', mappedTags);
    });
  };

  const initFormValues = () => {
    if (loadedDataProjectId !== projectId) {
      fetchUsers();
      fetchTags();
    }
  };

  const tagVerifierFunction = async (tags) => verifyTagAPI({ projectId, tags });

  const addTestCaseAPIHelper = (formData, thisFolderID) => {
    addTestCaseAPI({
      projectId,
      folderId: thisFolderID,
      payload: formDataFormatter(formData)
    }).then((data) => {
      dispatch(addSingleTestCase(data));
      hideTestCaseAddEditPage();
    });
  };

  const saveTestCase = (formData) => {
    if (!formData.name) setInputError(true);
    else if (!allFolders.length) {
      // if no folders, create a folder and then move forward
      addFolder({
        projectId,
        payload: { name: emptyFolderName }
      }).then((item) => {
        if (item.data?.folder) {
          updateFolders(item.data.folder);
          addTestCaseAPIHelper(formData, item.data.folder.id);
          navigate(
            routeFormatter(AppRoute.TEST_CASES, {
              projectId,
              folderId: item.data.folder.id
            })
          );
        }
      });
    } else addTestCaseAPIHelper(formData, folderId);
  };

  const saveBulkEditHelper = () => {
    editTestCasesBulkAPI({
      projectId,
      folderId,
      bulkSelection,
      data: formDataFormatter(testCaseBulkFormData).test_case
    }).then((res) => {
      // hideTestCaseAddEditPage()
      dispatch(
        updateAllTestCases(
          allTestCases.map(
            (item) => res.testcases.find((inc) => inc.id === item.id) || item
          )
        )
      );
      hideTestCaseAddEditPage();
      dispatch(resetBulkSelection());
    });
  };

  const editTestCase = (formData) => {
    if (!formData.name) setInputError(true);
    else {
      editTestCaseAPI({
        projectId,
        folderId,
        testCaseId: selectedTestCase.id,
        payload: formDataFormatter(formData)
      }).then((data) => {
        dispatch(updateTestCase(data));

        dispatch(addSingleTestCase(data));
        hideTestCaseAddEditPage();
      });
    }
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
          id: null
        });
      }
      handleTestCaseFieldChange('attachments', files);

      const filesData = new FormData();
      for (let idx = 0; idx < selectedFiles.length; idx += 1) {
        filesData.append('attachments[]', selectedFiles[idx]);
      }

      setUploadProgress(true);
      uploadFilesAPI({ projectId, payload: filesData }).then((item) => {
        const uploadedFiles = files.filter((thisItem) => thisItem.id);
        for (let idx = 0; idx < selectedFiles.length; idx += 1) {
          uploadedFiles.push({
            name: selectedFiles[idx].name,
            id: item.generic_attachment[idx]
          });
        }
        // update with id
        handleTestCaseFieldChange('attachments', uploadedFiles);
        setUploadProgress(false);
      });
    }
  };

  const fileRemoveHandler = (data) => {
    handleTestCaseFieldChange(
      'attachments',
      testCaseFormData?.attachments.filter((item) => item.id !== data.id)
    );
  };

  const hideAddTagsModal = (allTags, newTags) => {
    const mappedNewTags = selectMenuValueMapper(newTags);
    const updatedAllTags = [...tagsArray, ...mappedNewTags];
    const currentSelectedTags = testCaseFormData?.tags
      ? [...testCaseFormData?.tags.map((item) => item.value), ...newTags]
      : newTags;

    dispatch(setTagsArray(updatedAllTags));
    handleTestCaseFieldChange(
      'tags',
      updatedAllTags.filter((element) =>
        currentSelectedTags.includes(element.value)
      )
    );
    dispatch(setAddTagModal(false));
  };

  const hideAddIssueModal = () => {
    dispatch(setAddIssuesModal(false));
  };

  const addIssuesSaveHelper = (newIssuesArray) => {
    hideAddIssueModal();
    const updatedAllIssues = selectMenuValueMapper([
      ...new Set([...issuesArray.map((item) => item.value), ...newIssuesArray])
    ]);
    const selectedIssues = testCaseFormData?.issues
      ? [
          ...new Set([
            ...newIssuesArray,
            ...testCaseFormData?.issues?.map((item) => item.value)
          ])
        ]
      : newIssuesArray;
    const combinedIssues = updatedAllIssues.filter((item) =>
      selectedIssues.includes(item.value)
    );

    dispatch(setIssuesArray(updatedAllIssues));
    handleTestCaseFieldChange('issues', combinedIssues);
  };

  useEffect(() => {
    if (isTestCaseEditing) fetchTestCaseDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTestCaseEditing]);

  useEffect(() => {
    if (projectId === loadedDataProjectId) {
      setUsersArray(
        usersArray.map((item) => ({ label: item.full_name, value: item.id }))
      );
    } else {
      setUsersArray([]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, usersArray]);

  return {
    testCaseBulkFormData,
    isUploadInProgress,
    isAddIssuesModalShown,
    isAddTagModalShown,
    tagsArray,
    issuesArray,
    usersArrayMapped,
    fetchUsers,
    handleTestCaseFieldChange,
    testCaseFormData,
    inputError,
    selectedFolder,
    hideTestCaseAddEditPage,
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
    fileRemoveHandler,
    initFormValues,
    tagVerifierFunction,
    showAddIssueModal,
    hideAddIssueModal,
    addIssuesSaveHelper,
    saveBulkEditHelper
  };
}
