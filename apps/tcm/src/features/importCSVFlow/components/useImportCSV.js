import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { postCSV } from '../../../api/importCSV.api';
import {
  setCSVFormData,
  setCSVUploadError,
  setFileConfig
} from '../slices/importCSVSlice';

const useImportCSV = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const importCSVSteps = useSelector((state) => state.importCSV.importCSVSteps);
  const currentCSVScreen = useSelector(
    (state) => state.importCSV.currentCSVScreen
  );
  const csvFormData = useSelector((state) => state.importCSV.csvFormData);
  const fileConfig = useSelector((state) => state.importCSV.fileConfig);
  const csvUploadError = useSelector((state) => state.importCSV.csvUplaodError);

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

  const handleFileRemove = () => {
    dispatch(setFileConfig({ file: '', fileName: '' }));
  };

  const handleProceedClick = () => {
    // now create the payload and make the api call
    const filesData = new FormData();
    // add formData
    Object.keys(csvFormData).forEach((key) => {
      if (key === 'row') filesData.append('row_starts_at', csvFormData[key]);
      else if (key === 'firstRowIsHeader')
        filesData.append('first_row_is_header', csvFormData[key]);
      else if (key === 'separators')
        filesData.append('csv_separator', csvFormData[key]);
    });
    // add projectId and folderId
    filesData.append('project_id', queryParams.get('project'));
    filesData.append('folder_id', queryParams.get('folder'));
    // add file from fileConfig
    filesData.append('file', fileConfig.file);

    // make the api call
    postCSV(filesData)
      .then()
      .catch((err) => dispatch(setCSVUploadError(err)));
  };

  return {
    currentCSVScreen,
    importCSVSteps,
    csvFormData,
    csvUploadError,
    fileConfig,
    handleFileUpload,
    handleFileRemove,
    handleCSVFieldChange,
    handleProceedClick
  };
};

export default useImportCSV;
