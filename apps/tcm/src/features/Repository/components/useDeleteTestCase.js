import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { deleteTestCaseAPI, deleteTestCasesBulkAPI } from 'api/testcases.api';

import {
  deleteTestCase,
  resetBulkSelection,
  setBulkUpdateProgress,
  setDeleteTestCaseModalVisibility,
  setMetaPage,
  updateAllTestCases
} from '../slices/repositorySlice';

export default function useDeleteTestCase() {
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const { projectId, folderId } = useParams();
  const dispatch = useDispatch();

  const bulkSelection = useSelector((state) => state.repository.bulkSelection);
  const metaPage = useSelector((state) => state.repository.metaPage);
  const isBulkUpdate = useSelector(
    (state) => state.repository.isBulkUpdateInit
  );
  const allTestCases = useSelector((state) => state.repository.allTestCases);

  const selectedTestCase = useSelector(
    (state) => state.repository.selectedTestCase
  );

  const selectedBulkTCCount = bulkSelection.select_all
    ? metaPage.count - bulkSelection.de_selected_ids.length
    : bulkSelection.ids.length;

  const setMetaCount = (newCount) => {
    dispatch(
      setMetaPage({
        ...metaPage,
        count: newCount
      })
    );
  };

  const hideDeleteTestCaseModal = () => {
    dispatch(setDeleteTestCaseModalVisibility(false));
    setTimeout(() => {
      // animation wait
      dispatch(setBulkUpdateProgress(false));
    }, 500);
  };

  const bulkDeleteHandler = () => {
    deleteTestCasesBulkAPI({ projectId, folderId, bulkSelection }).then(() => {
      let updatedTestCases = [];
      const updatedCount = metaPage.count - selectedBulkTCCount;

      if (bulkSelection.select_all) {
        updatedTestCases = allTestCases.filter((item) =>
          bulkSelection.de_selected_ids.includes(item.id)
        );
      } else {
        updatedTestCases = allTestCases.filter(
          (item) => !bulkSelection.ids.includes(item.id)
        );
      }

      setMetaCount(updatedCount);
      if (updatedTestCases.length === 0 && updatedCount > 0) {
        // TC exists but need to fetch, set page to 1
        setSearchParams({});
      } else dispatch(updateAllTestCases(updatedTestCases));
      dispatch(resetBulkSelection());
      hideDeleteTestCaseModal();
    });
  };

  const singleItemDeleteHelper = () => {
    deleteTestCaseAPI({
      projectId,
      folderId,
      testCaseId: selectedTestCase.id
    }).then(() => {
      dispatch(deleteTestCase([selectedTestCase.id]));
      setMetaCount(metaPage.count - 1);
      hideDeleteTestCaseModal();
    });
  };

  const deleteTestCaseHandler = () => {
    if (isBulkUpdate) {
      bulkDeleteHandler();
    } else if (selectedTestCase) {
      singleItemDeleteHelper();
    }
  };

  return {
    deleteTestCaseHandler,
    hideDeleteTestCaseModal,
    isBulkUpdate,
    selectedBulkTCCount
  };
}
