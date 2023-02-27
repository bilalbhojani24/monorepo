import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { uploadFilesAPI } from 'api/attachments.api';
// import { verifyTagAPI } from 'api/common.api';
import {
  addTestCaseAPI,
  addTestCaseWithoutFolderAPI,
  addTestCaseWithoutProjectAPI,
  editTestCaseAPI,
  editTestCasesBulkAPI,
  getTestCaseDetailsAPI
  // verifyTagAPI
} from 'api/testcases.api';
import AppRoute from 'const/routes';
import { addNotificaton } from 'globalSlice';
import { findFolderRouted } from 'utils/folderHelpers';
import { routeFormatter, selectMenuValueMapper } from 'utils/helperFunctions';

import { stepTemplate, templateOptions } from '../const/addTestCaseConst';
import { requestedSteps } from '../const/unsavedConst';
import {
  addSingleTestCase,
  resetBulkSelection,
  setAddIssuesModal,
  setAddTagModal,
  setAddTestCaseFromSearch,
  setAddTestCaseVisibility,
  setAllFolders,
  setIssuesArray,
  setTagsArray,
  setTestCaseFormData,
  setUnsavedDataExists,
  updateBulkTestCaseFormData,
  updateFoldersLoading,
  updateTestCase,
  updateTestCaseFormData,
  updateTestCasesListLoading
} from '../slices/repositorySlice';

import useTestCases from './useTestCases';
import useUnsavedChanges from './useUnsavedChanges';

export default function useAddEditTestCase(prop) {
  const { projectId, folderId } = useParams();
  const { fetchAllTestCases } = useTestCases();
  const navigate = useNavigate();
  const { isOkToExitForm } = useUnsavedChanges();
  const [inputError, setInputError] = useState({
    name: false
  });
  const [isUploadInProgress, setUploadProgress] = useState(false);
  const [scheduledFolder, setScheduledFolder] = useState([]);
  const [usersArrayMapped, setUsersArray] = useState([]);
  const [showMoreFields, setShowMoreFields] = useState(false);
  const [showBulkEditConfirmModal, setBulkEditConfirm] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.global.user);
  const updatedMySelfLabelName = `Myself (${userData?.full_name})`;

  const isAddTestCasePageVisible = useSelector(
    (state) => state.repository.isAddTestCasePageVisible
  );

  const isSearchFilterView = useSelector(
    (state) => state.repository.isSearchFilterView
  );
  const bulkSelection = useSelector((state) => state.repository.bulkSelection);
  const selectedFolder = useSelector(
    (state) => state.repository.selectedFolder
  );
  const isBulkUpdate = useSelector(
    (state) => state.repository.isBulkUpdateInit
  );
  const isTestCaseEditing = useSelector(
    (state) => state.repository.showEditTestCaseForm
  );
  const isUnsavedDataExists = useSelector(
    (state) => state.repository.isUnsavedDataExists
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

  const allFolders = useSelector((state) => state.repository?.allFolders);

  const selectedTestCase = useSelector(
    (state) => state.repository.selectedTestCase
  );
  const tagsArray = useSelector((state) => state.repository.tagsArray);
  const issuesArray = useSelector((state) => state.repository.issuesArray);

  const usersArray = useSelector((state) => state.repository.usersArray);

  const hideTestCaseAddEditPage = (e, isForced) => {
    isOkToExitForm(isForced);
  };
  const showAddTagsModal = () => {
    dispatch(setAddTagModal(true));
  };
  const showAddIssueModal = () => {
    dispatch(setAddIssuesModal(true));
  };

  const handleTestCaseFieldChange = (key, value) => {
    if (!isUnsavedDataExists) dispatch(setUnsavedDataExists(true));
    if (isBulkUpdateInit) {
      dispatch(updateBulkTestCaseFormData({ key, value }));
    } else {
      if (key === 'name' && value)
        setInputError({ ...inputError, name: false });

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

  const formDataFormatter = (formData, isNoFolderTCCreation) => {
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

    return { test_case: testCase, create_at_root: isNoFolderTCCreation };
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

  // const tagVerifierFunction = async (tags) => verifyTagAPI({ projectId, tags });

  const isFormValidated = (formData) => {
    const inputErrorsFound = {};
    // name validation
    if (!formData.name) {
      inputErrorsFound.name = true;
    }

    // steps validation
    // if (
    //   formData.template === templateOptions[1].value &&
    //   formData.steps.find(
    //     (item) => item.step === '' || item.expected_result === ''
    //   )
    // ) {
    //   inputErrorsFound.steps = true;
    // }

    if (Object.keys(inputErrorsFound).length) {
      setInputError(inputErrorsFound);
      return false;
    }
    return true;
  };

  const saveTestCase = (formData) => {
    if (isFormValidated(formData)) {
      let apiSaveFunction = addTestCaseAPI;
      if (projectId === 'new') {
        // no project
        dispatch(updateFoldersLoading(true));
        dispatch(updateTestCasesListLoading(true));
        apiSaveFunction = addTestCaseWithoutProjectAPI;
      } else if (!allFolders.length) {
        // no folder
        dispatch(updateFoldersLoading(true));
        dispatch(updateTestCasesListLoading(true));
        apiSaveFunction = addTestCaseWithoutFolderAPI;
      }

      apiSaveFunction({
        projectId,
        folderId: formData.test_case_folder_id,
        payload: formDataFormatter(formData, !allFolders.length)
      }).then((data) => {
        const testCaseData = data.data.test_case;
        const folderData = data.data.folder;

        if (projectId === 'new' || !allFolders.length) {
          // no project/folder

          // if no folders append the data rightaway
          if (!allFolders.length && folderData) {
            dispatch(setAllFolders([folderData]));
            dispatch(updateFoldersLoading(false));
          }

          dispatch(
            addNotificaton({
              id: `project_created${testCaseData?.id}`,
              title: `'New Project': Project created`,
              variant: 'success'
            })
          );

          navigate(
            routeFormatter(AppRoute.TEST_CASES, {
              projectId: testCaseData.project_id,
              folderId: testCaseData.test_case_folder_id
            })
          );
        } else if (
          parseInt(folderId, 10) === testCaseData.test_case_folder_id
        ) {
          // only if the added test case belong to the opened folder
          dispatch(addSingleTestCase(testCaseData));
        }

        setTimeout(() => {
          // time out to wait for the project notification
          dispatch(
            addNotificaton({
              id: `test_case_added${testCaseData?.id}`,
              title: `'${testCaseData?.name}': Test case created`,
              variant: 'success'
            })
          );
        }, 5);
        hideTestCaseAddEditPage(null, true);
      });
    }
  };

  const saveBulkEditHelper = () => {
    setBulkEditConfirm(false);
    editTestCasesBulkAPI({
      projectId,
      folderId,
      bulkSelection,
      data: formDataFormatter(testCaseBulkFormData).test_case
    }).then(() => {
      // dispatch(
      //   updateAllTestCases(
      //     allTestCases.map(
      //       (item) => res.test_cases.find((inc) => inc.id === item.id) || item
      //     )
      //   )
      // );
      fetchAllTestCases();
      dispatch(
        addNotificaton({
          id: `bulk_updated${projectId}${folderId}`,
          title: `Test Cases updated`,
          variant: 'success'
        })
      );
      hideTestCaseAddEditPage(null, true);
      dispatch(resetBulkSelection());
    });
  };

  const editTestCase = (formData) => {
    if (isFormValidated(formData)) {
      editTestCaseAPI({
        projectId,
        folderId,
        testCaseId: selectedTestCase.id,
        payload: formDataFormatter(formData)
      }).then((data) => {
        const newData = data?.test_case ? data?.test_case : data;
        dispatch(updateTestCase(newData));
        dispatch(
          addNotificaton({
            id: `test_case_edited${newData?.id}`,
            title: `'${newData.data?.test_case?.name}': Test case updated`,
            variant: 'success'
          })
        );
        hideTestCaseAddEditPage(null, true);
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

  const hideAddTagsModal = (newTags, selectedTags) => {
    const updatedAllTags = selectMenuValueMapper([
      ...new Set([...newTags, ...tagsArray.map((item) => item.value)])
    ]);
    const currentSelectedTags = selectedTags;

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

  const showTestCaseAdditionPage = (thisFolder) => {
    if (!isOkToExitForm(false, { key: requestedSteps.CREATE_TEST_CASE }))
      return;

    const thisSelectedFolder = thisFolder?.id
      ? thisFolder?.id
      : selectedFolder?.id;

    dispatch(setAddTestCaseVisibility(thisSelectedFolder || true));
    if (isSearchFilterView) dispatch(setAddTestCaseFromSearch(true));
    if (!folderId)
      // then in search view, go to repository view
      navigate(
        `${routeFormatter(AppRoute.TEST_CASES, {
          projectId
        })}`
      );
  };

  const goToThisURL = (url, dontFormat) => {
    if (!isOkToExitForm(false, { key: requestedSteps.ROUTE, value: url }))
      return;

    navigate(dontFormat ? url : routeFormatter(url, { projectId }));
  };

  useEffect(() => {
    if (
      testCaseFormData?.test_case_folder_id &&
      isAddTestCasePageVisible &&
      prop?.isAddEditOnly // to reduce recalculation for other components
    ) {
      setScheduledFolder(
        findFolderRouted(allFolders, testCaseFormData?.test_case_folder_id)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testCaseFormData?.test_case_folder_id, prop?.isAddEditOnly]);

  useEffect(() => {
    if (isTestCaseEditing) fetchTestCaseDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTestCaseEditing]);

  useEffect(() => {
    if (projectId === loadedDataProjectId) {
      setUsersArray(
        usersArray.map((item) => {
          if (item.full_name === 'Myself') {
            return {
              label: updatedMySelfLabelName,
              value: item.id
            };
          }
          return { label: item.full_name, value: item.id };
        })
      );
    } else {
      setUsersArray([]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, usersArray]);

  return {
    scheduledFolder,
    isAddTestCasePageVisible,
    showBulkEditConfirmModal,
    isBulkUpdate,
    testCaseBulkFormData,
    isUploadInProgress,
    isAddIssuesModalShown,
    isAddTagModalShown,
    tagsArray,
    issuesArray,
    usersArrayMapped,
    updatedMySelfLabelName,
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
    // tagVerifierFunction,
    showAddIssueModal,
    hideAddIssueModal,
    addIssuesSaveHelper,
    saveBulkEditHelper,
    setBulkEditConfirm,
    showTestCaseAdditionPage,
    goToThisURL
  };
}
