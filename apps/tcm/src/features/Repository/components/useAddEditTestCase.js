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
import { addGlobalProject, addNotificaton } from 'globalSlice';
import { findFolderRouted } from 'utils/folderHelpers';
import { routeFormatter, selectMenuValueMapper } from 'utils/helperFunctions';
import { logEventHelper } from 'utils/logEvent';

import { BDD, stepTemplate, templateOptions } from '../const/addTestCaseConst';
import {
  addSingleTestCase,
  // resetBulkFormData,
  resetBulkSelection,
  setAddIssuesModal,
  setAddTagModal,
  setAddTestCaseFromSearch,
  setAddTestCaseVisibility,
  setAllFolders,
  setEditTestCasePageVisibility,
  setIssuesArray,
  setTagsArray,
  setTestCaseFormData,
  setUnsavedDataExists,
  updateBulkTestCaseFormData,
  updateCtaLoading,
  updateFoldersLoading,
  updateTestCase,
  updateTestCaseFormData,
  updateTestCasesListLoading
} from '../slices/repositorySlice';
import { formDataRetriever } from '../utils/sharedFunctions';

import useTestCases from './useTestCases';
import useUnsavedChanges from './useUnsavedChanges';

export default function useAddEditTestCase(prop) {
  const { projectId, folderId } = useParams();
  const { fetchAllTestCases } = useTestCases();
  const navigate = useNavigate();
  const { unsavedFormConfirmation, isOkToExitForm } = useUnsavedChanges();
  const [inputError, setInputError] = useState({
    name: false
  });
  const [isUploadInProgress, setUploadProgress] = useState(false);
  const [scheduledFolder, setScheduledFolder] = useState([]);
  const [usersArrayMapped, setUsersArrayMapped] = useState([]);
  const [showMoreFields, setShowMoreFields] = useState(false);
  const [showBulkEditConfirmModal, setBulkEditConfirm] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.global.user);

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
  const isTagsLoading = useSelector(
    (state) => state.repository.isLoading?.tags
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
  const createTestCaseCtaLoading = useSelector(
    (state) => state.repository.isLoading.createTestCaseCta
  );
  const editTestCaseCtaLoading = useSelector(
    (state) => state.repository.isLoading.editTestCaseCta
  );
  const bulkEditTestCaseCtaLoading = useSelector(
    (state) => state.repository.isLoading.bulkEditTestCaseCta
  );

  const hideTestCaseAddEditPage = (e, isForced, action) => {
    if (action === 'Cancel')
      dispatch(
        logEventHelper('TM_CreateCaseCancelCtaClicked', {
          project_id: projectId
        })
      );
    isOkToExitForm(isForced);
  };

  const showAddTagsModal = () => {
    dispatch(setAddTagModal(true));
  };
  const showAddIssueModal = () => {
    dispatch(setAddIssuesModal(true));
  };

  const htmlEquator = (sourceTxt, dstTxt) =>
    new DOMParser().parseFromString(sourceTxt, 'text/html').documentElement
      .textContent !==
    new DOMParser().parseFromString(dstTxt, 'text/html').documentElement
      .textContent;

  const isThereAChange = (key, value, checkRTE) => {
    if (checkRTE) {
      // check html parse value only
      if (Array.isArray(value)) {
        if (
          templateOptions[0].value === testCaseFormData.template ||
          testCaseFormData.template === BDD
        ) {
          return htmlEquator(value?.[0], testCaseFormData[key]?.[0]);
        }
        // if array of values
        const extngValue = testCaseFormData[key];
        if (!extngValue) return true;
        const misMatchedStep = value.find((item, iDx) => {
          const values = Object.values(item);
          const existingValues = Object.values(extngValue[iDx]);
          return values.find((thisItem, index) =>
            htmlEquator(thisItem, existingValues[index])
          );
        });

        return !!misMatchedStep;
      }
      return htmlEquator(value, testCaseFormData[key]);
    }
    return true;
  };

  const handleTestCaseFieldChange = (key, value, checkRTE) => {
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
      if (!isUnsavedDataExists && isThereAChange(key, value, checkRTE))
        dispatch(setUnsavedDataExists(true));
    }
  };

  const formatBulkFormData = (formData) =>
    Object.entries(formData).reduce((obj, [key, value]) => {
      if (key === 'preconditions' && value === '')
        return { ...obj, [key]: null };
      if (key === 'issues' && value.length === 0)
        return { ...obj, [key]: null };
      return { ...obj, [key]: value };
    }, {});

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
    if (!formData.owner && !isBulkUpdate) {
      testCase.owner = userData?.id;
    }
    return { test_case: testCase, create_at_root: isNoFolderTCCreation };
  };

  const fetchTestCaseDetails = () => {
    if (folderId && selectedTestCase?.id) {
      getTestCaseDetailsAPI({
        projectId,
        folderId,
        testCaseId: selectedTestCase.id
      }).then((data) => {
        const formattedData = formDataRetriever(
          tagsArray,
          data?.data?.test_case
        );
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
    if (!formData.name.trim()) {
      dispatch(updateTestCaseFormData({ key: 'name', value: '' }));
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

  const onSaveTestSuccessHelper = (data) => {
    const testCaseData = data.data.test_case;
    const folderData = data.data.folder;
    const projectData = data.data.project;

    dispatch(updateCtaLoading({ key: 'createTestCaseCta', value: false }));
    if (projectId === 'new' || !allFolders.length) {
      // no project/folder

      // if no folders append the data rightaway
      if (!allFolders.length && folderData) {
        dispatch(setAllFolders([folderData]));
        dispatch(updateFoldersLoading(false));
      }

      if (projectId === 'new') {
        dispatch(
          addNotificaton({
            id: `project_created${testCaseData?.id}`,
            title: `'New Project': Project created`,
            variant: 'success'
          })
        );

        dispatch(addGlobalProject(projectData));
      }

      navigate(
        routeFormatter(AppRoute.TEST_CASES, {
          projectId: testCaseData.project_id,
          folderId: testCaseData.test_case_folder_id
        })
      );
    } else if (parseInt(folderId, 10) === testCaseData.test_case_folder_id) {
      // only if the added test case belong to the opened folder
      dispatch(addSingleTestCase(testCaseData));
    }
    dispatch(
      logEventHelper('TM_TcCreatedNotification', {
        project_id: projectId,
        testcase_id: testCaseData?.id
      })
    );
    setTimeout(() => {
      // time out to wait for the project notification
      dispatch(
        addNotificaton({
          id: `test_case_added${testCaseData?.id}`,
          title: `${testCaseData?.identifier} : Test case created`,
          variant: 'success'
        })
      );
    }, 5);
    hideTestCaseAddEditPage(null, true);
  };

  const saveTestCase = (formData, isInlineAddition) => {
    if (isFormValidated(formData)) {
      dispatch(
        logEventHelper(
          isInlineAddition
            ? 'TM_CreateTcBtnClickedQuickAdd'
            : 'TM_CreateCaseCtaClicked',
          {
            project_id: projectId
          }
        )
      );
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

      dispatch(updateCtaLoading({ key: 'createTestCaseCta', value: true }));
      apiSaveFunction({
        projectId,
        folderId: formData.test_case_folder_id,
        payload: formDataFormatter(formData, !allFolders.length)
      })
        .then(onSaveTestSuccessHelper)
        .catch(() => {
          dispatch(
            updateCtaLoading({ key: 'createTestCaseCta', value: false })
          );
        });
    }
  };

  const saveBulkEditHelper = () => {
    dispatch(
      logEventHelper('TM_UpdateAllCtaClicked', {
        project_id: projectId,
        testcase_id: bulkSelection?.ids
      })
    );
    setBulkEditConfirm(false);
    dispatch(updateCtaLoading({ key: 'bulkEditTestCaseCta', value: true }));

    editTestCasesBulkAPI({
      projectId,
      folderId,
      bulkSelection,
      data: formatBulkFormData(
        formDataFormatter(testCaseBulkFormData).test_case
      )
    })
      .then(() => {
        dispatch(
          updateCtaLoading({ key: 'bulkEditTestCaseCta', value: false })
        );

        dispatch(
          logEventHelper('TM_TcBulkUpdatedNotification', {
            project_id: projectId,
            testcase_id: bulkSelection?.ids
          })
        );
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
            title: `${bulkSelection?.ids?.length} Test cases updated`,
            variant: 'success'
          })
        );
        hideTestCaseAddEditPage(null, true);
        dispatch(resetBulkSelection());
        // dispatch(resetBulkFormData());
      })
      .catch(() => {
        dispatch(
          updateCtaLoading({ key: 'bulkEditTestCaseCta', value: false })
        );
      });
  };

  const editTestCase = (formData) => {
    if (isFormValidated(formData)) {
      dispatch(
        logEventHelper('TM_UpdateCaseBtnClicked', {
          project_id: projectId,
          testcase_id: selectedTestCase.id
        })
      );
      dispatch(updateCtaLoading({ key: 'editTestCaseCta', value: true }));

      editTestCaseAPI({
        projectId,
        folderId: selectedTestCase?.test_case_folder_id || folderId,
        testCaseId: selectedTestCase.id,
        payload: formDataFormatter(formData)
      })
        .then((data) => {
          dispatch(updateCtaLoading({ key: 'editTestCaseCta', value: false }));

          const newData = data;
          dispatch(updateTestCase(newData?.data?.test_case));
          dispatch(
            logEventHelper('TM_TcUpdatedNotification', {
              project_id: projectId,
              testcase_id: newData?.data?.test_case?.id
            })
          );
          dispatch(
            addNotificaton({
              id: `test_case_edited${newData?.data?.test_case?.id}`,
              title: `${newData.data?.test_case?.identifier} : Test case updated`,
              variant: 'success'
            })
          );
          hideTestCaseAddEditPage(null, true);
        })
        .catch(() => {
          dispatch(updateCtaLoading({ key: 'editTestCaseCta', value: false }));
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
      uploadFilesAPI({ projectId, payload: filesData })
        .then((item) => {
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
        })
        .catch((err) => {
          handleTestCaseFieldChange(
            'attachments',
            files.filter((item) => item.id)
          );
          setUploadProgress(false);
          dispatch(
            addNotificaton({
              id: `error-upload${Math.random()}`,
              title: err.response.statusText || 'File upload',
              variant: 'error',
              description: null
            })
          );
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

  const showTestCaseAdditionPage = (thisFolder, isFromListTree) => {
    unsavedFormConfirmation(false, () => {
      if (isFromListTree) {
        dispatch(
          logEventHelper('TM_CreateTcLinkClickedFolderMenu', {
            project_id: projectId,
            folder_id: thisFolder?.id
          })
        );
      } else {
        dispatch(
          logEventHelper('TM_CreateTcBtnClickedTopHeader', {
            project_id: projectId
          })
        );
      }
      const thisSelectedFolder = thisFolder?.id
        ? thisFolder?.id
        : selectedFolder?.id;

      dispatch(setEditTestCasePageVisibility(!(thisSelectedFolder || true))); // [NOTE: we were not able to move from Add to Edit when clicked from folders]
      dispatch(setAddTestCaseVisibility(thisSelectedFolder || true));
      if (isSearchFilterView) dispatch(setAddTestCaseFromSearch(true));
      if (!folderId)
        // then in search view, go to repository view
        navigate(
          `${routeFormatter(AppRoute.TEST_CASES, {
            projectId
          })}`
        );
    });
  };

  const goToThisURL = (url, dontFormat) => {
    unsavedFormConfirmation(false, () => {
      navigate(dontFormat ? url : routeFormatter(url, { projectId }));
    });
  };

  const setShowMoreFieldHelper = (value) => {
    dispatch(
      logEventHelper('TM_CreateTcShowMoreBtnClicked', {
        project_id: projectId
      })
    );
    setShowMoreFields(value);
  };

  const testCaseEditingInit = () => {
    if (isTestCaseEditing) fetchTestCaseDetails();
    else {
      dispatch(updateTestCaseFormData({ key: 'owner', value: userData?.id }));
    }
  };

  const handleMenuOpen = (key, isMenuOpened) => {
    if (key === 'tags' && !tagsArray.length && isMenuOpened)
      dispatch(setAddTagModal(true));
    else if (key === 'issues' && !issuesArray.length && isMenuOpened) {
      dispatch(setAddIssuesModal(true));
    }
  };
  // const handleUpdateAllClicked = () => {
  //   console.log(selectedTestCase);
  //   dispatch(
  //     logEventHelper('TM_UpdateAllCtaClicked', {
  //       project_id: projectId
  //     })
  //   );
  //   setBulkEditConfirm(true);
  // };

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
    if (projectId === loadedDataProjectId) {
      setUsersArrayMapped(
        usersArray.map((item) => {
          if (item.full_name === 'Myself') {
            return {
              label: `Myself (${userData?.full_name})`,
              value: item.id
            };
          }
          return { label: item.full_name, value: item.id };
        })
      );
    } else {
      setUsersArrayMapped([]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, usersArray]);

  return {
    isTagsLoading,
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
    createTestCaseCtaLoading,
    editTestCaseCtaLoading,
    bulkEditTestCaseCtaLoading,
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
    handleMenuOpen,
    setShowMoreFieldHelper,
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
    goToThisURL,
    testCaseEditingInit
  };
}
