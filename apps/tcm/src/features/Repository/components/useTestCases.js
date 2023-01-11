import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addTestCase, getTestCases } from 'api/testcases.api';

import {
  addSingleTestCase,
  setAddTestCaseVisibility,
  updateAllTestCases,
} from '../slices/repositorySlice';
import { addFormPayload } from '../slices/testCaseFormSlice';

export default function useTestCases() {
  // const [inputError, setInputError] = useState(false);
  const { projectId, folderId } = useParams();
  const dispatch = useDispatch();

  const selectedFolder = useSelector(
    (state) => state.repository.selectedFolder,
  );
  const allTestCases = useSelector((state) => state.repository.allTestCases);
  const isAddTestCasePageVisible = useSelector(
    (state) => state.repository.isAddTestCasePageVisible,
  );
  const testCaseFormPayload = useSelector(
    (state) => state.testCaseForm.formPayload,
  );

  const showTestCaseAdditionPage = () => {
    dispatch(setAddTestCaseVisibility(true));
  };
  const hideTestCaseAdditionPage = () => {
    dispatch(setAddTestCaseVisibility(false));
  };

  const fetchAllTestCases = () => {
    if (folderId)
      getTestCases({ projectId, folderId }).then((data) => {
        dispatch(updateAllTestCases(data?.testcases || []));
      });
    else dispatch(updateAllTestCases([]));
  };

  const saveTestCase = (pId, fId, payload) => () => {
    // if (!payload.testCaseFormPayload.name) {
    //   setInputError(true);
    // } else {
    addTestCase({ pId, fId, payload }).then((data) => {
      dispatch(addSingleTestCase(data));
      dispatch(setAddTestCaseVisibility(false));
    });
    // }
  };

  const handleTestCaseFieldChange = (field) => (e) => {
    const { value: val } = e.target;
    dispatch(addFormPayload({ field, val }));
    // if (val) setInputError(false);
  };

  useEffect(() => {
    fetchAllTestCases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, folderId]);

  return {
    handleTestCaseFieldChange,
    testCaseFormPayload,
    // inputError,
    selectedFolder,
    showTestCaseAdditionPage,
    hideTestCaseAdditionPage,
    allTestCases,
    isAddTestCasePageVisible,
    saveTestCase,
  };
}
