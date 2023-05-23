import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { cancelImport } from 'api/importCSV.api';
import AppRoute from 'const/routes';

import { setCancelModal, setDetailsModal } from '../slices/importProgressSlice';
import { parseImportDetails } from '../slices/importProgressThunk';

const useCancelModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const testTool = useSelector(
    (state) => state.import.currentTestManagementTool
  );
  const importId = useSelector((state) => state.import.importId);
  const importDetails = useSelector(
    (state) => state.importProgress.importDetails
  );

  const closeCancelModal = () => {
    dispatch(setCancelModal(false));
    dispatch(setDetailsModal(true));
  };

  const handleCancelQuickImport = () => {
    dispatch(setCancelModal(false));
    cancelImport(importId).then(() => {
      console.log('inside then of cancel import');
      dispatch(
        parseImportDetails(
          {
            percent: importDetails?.percent,
            projects: importDetails?.totalProjects,
            current_project: importDetails?.currentProjectName,
            current_project_number: importDetails?.currentProjectNumber,
            projects_failed: importDetails?.failedProjects,
            projects_done: importDetails?.successfullyImportedProjects
          },
          location
        )
      );
      navigate(AppRoute.ROOT);
    });
  };

  return { closeCancelModal, handleCancelQuickImport, testTool };
};

export default useCancelModal;
