import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getFolders } from 'api/folders.api';
import AppRoute from 'const/routes';
import { setSelectedProject } from 'globalSlice';
import { routeFormatter } from 'utils/helperFunctions';
import { logEventHelper } from 'utils/logEvent';

import { moveFolderOptions } from '../../../const/immutables';
import { setCSVConfigurations, uploadFile } from '../slices/csvThunk';
import {
  setCSVFormData,
  setCSVUploadError,
  setFileConfig,
  setFoldersForCSV,
  setShowChangeFolderModal,
  setShowMoreFields
} from '../slices/importCSVSlice';

const useImportCSV = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const { projectId } = useParams();
  const queryParams = new URLSearchParams(search);
  const folderId = queryParams.get('folder');
  const importCSVSteps = useSelector((state) => state.importCSV.importCSVSteps);
  const currentCSVScreen = useSelector(
    (state) => state.importCSV.currentCSVScreen
  );
  const csvFormData = useSelector((state) => state.importCSV.csvFormData);
  const fileConfig = useSelector((state) => state.importCSV.fileConfig);
  const csvUploadError = useSelector((state) => state.importCSV.csvUploadError);
  const mappingFieldsData = useSelector(
    (state) => state.importCSV.fieldsMappingData
  );
  const showMoreFields = useSelector((state) => state.importCSV.showCSVFields);
  const mapFieldModalConfig = useSelector(
    (state) => state.importCSV.mapFieldModalConfig
  );
  const allEncodings = useSelector((state) => state.importCSV.allEncodings);
  const allSeparators = useSelector((state) => state.importCSV.allSeparators);
  const uploadFileProceedLoading = useSelector(
    (state) => state.importCSV.uploadFileProceedLoading
  );
  const topInfoSteps = useSelector((state) => state.importCSV.topInfoSteps);

  const selectedFolderLocation = useSelector(
    (state) => state.importCSV.selectedFolderLocation
  );
  const showChangeFolderModal = useSelector(
    (state) => state.importCSV.showChangeFolderModal
  );
  const allCSVFolders = useSelector((state) => state.importCSV.foldersForCSV);
  const showMappings = useSelector((state) => state.importCSV.showMappings);

  const fetchCSVConfigurations = () => {
    dispatch(setCSVConfigurations({ projectId, folderId }));
    dispatch(
      logEventHelper('TM_ImportCsvPageLoaded', {
        project_id: projectId
      })
    );
  };

  const fetchFolders = (id) => {
    if (id !== 'new')
      getFolders({ projectId: id }).then((res) => {
        dispatch(setFoldersForCSV(res?.folders));
      });
  };

  const handleCSVFieldChange = (key) => (value) => {
    let dispatchValue = value;
    if (key === 'row') dispatchValue = value.target.value;
    if (key === 'firstRowIsHeader') dispatchValue = value.target.checked;
    dispatch(setCSVFormData({ key, value: dispatchValue }));
  };

  const handleFileUpload = (e) => {
    dispatch(
      setFileConfig({
        file: e.currentTarget.files[0],
        fileName: e.currentTarget.files[0].name
      })
    );
  };

  const handleShowMoreFields = () =>
    dispatch(setShowMoreFields(!showMoreFields));

  const handleFileRemove = () => {
    dispatch(setFileConfig({ file: '', fileName: '' }));
  };

  const handleChangeFolderClick = () => {
    dispatch(setShowChangeFolderModal(true));
  };

  const handleUploadToRootClick = () => {
    if (projectId) {
      navigate(
        routeFormatter(AppRoute.IMPORT_CSV, {
          projectId
        })
      );
    }
  };

  const hideFolderExplorerModal = () => {
    dispatch(setShowChangeFolderModal(false));
  };

  const handleUpdateFolderLocationClick = ({
    folderExplorerProjectId,
    primaryMoveLocation,
    selectedFolder
  }) => {
    if (primaryMoveLocation === moveFolderOptions[0]?.id) {
      navigate(
        `${routeFormatter(AppRoute.IMPORT_CSV, {
          projectId: folderExplorerProjectId
        })}?${new URLSearchParams({ folder: selectedFolder.id }).toString()}`
      );
    } else if (primaryMoveLocation === moveFolderOptions[1]?.id) {
      navigate(
        routeFormatter(AppRoute.IMPORT_CSV, {
          projectId: folderExplorerProjectId
        })
      );
    }
    dispatch(setShowChangeFolderModal(false));
  };

  const handleProceedClick = () => {
    dispatch(
      logEventHelper('TM_ImportCsvStep1ProceedBtnClicked', {
        project_id: projectId,
        csv_separator: csvFormData.separators.value,
        first_row: csvFormData.row,
        file_encoding: csvFormData.encodings.value,
        first_column: csvFormData.firstRowIsHeader
      })
    );
    // now create the payload and make the api call
    if (!fileConfig.file) {
      dispatch(setCSVUploadError('Please select a CSV file.'));
      return;
    }
    const filesData = new FormData();
    // add formData
    Object.keys(csvFormData).forEach((key) => {
      if (key === 'row') filesData.append('row_starts_at', csvFormData[key]);
      else if (key === 'firstRowIsHeader')
        filesData.append('first_row_is_header', csvFormData[key]);
      else if (key === 'separators')
        filesData.append('csv_separator', csvFormData[key].label);
      else if (key === 'encodings')
        filesData.append('encoding', csvFormData[key].label);
    });
    // add projectId and folderId
    if (projectId !== 'new') filesData.append('project_id', projectId);
    if (queryParams.get('folder'))
      filesData.append('folder_id', queryParams.get('folder'));
    // add file from fileConfig
    filesData.append('file', fileConfig.file);

    // make the api call
    dispatch(uploadFile(filesData));
  };

  useEffect(() => {
    dispatch(setSelectedProject(projectId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return {
    dispatch,
    navigate,
    allEncodings,
    allSeparators,
    currentCSVScreen,
    importCSVSteps,
    csvFormData,
    csvUploadError,
    fileConfig,
    projectId,
    folderId,
    allCSVFolders,
    showMappings,
    showMoreFields,
    showChangeFolderModal,
    selectedFolderLocation,
    fetchFolders,
    handleFileUpload,
    handleFileRemove,
    handleCSVFieldChange,
    handleProceedClick,
    handleShowMoreFields,
    fetchCSVConfigurations,
    topInfoSteps,
    handleChangeFolderClick,
    handleUploadToRootClick,
    hideFolderExplorerModal,
    handleUpdateFolderLocationClick,
    mappingFieldsData,
    mapFieldModalConfig,
    uploadFileProceedLoading
  };
};

export default useImportCSV;
