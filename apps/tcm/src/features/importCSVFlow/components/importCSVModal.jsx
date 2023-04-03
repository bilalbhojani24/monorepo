import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@browserstack/bifrost';
import {
  TMButton,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader
} from 'common/bifrostProxy';
import { bool, shape, string } from 'prop-types';
import { logEventHelper } from 'utils/logEvent';

import { cancelImport, downloadReport } from '../../../api/importCSV.api';
import { AccessTimeIcon } from '../../../assets/icons';
// import { IMPORT_CSV_STEPS } from '../const/importCSVConstants';
import {
  setCSVCurrentScreen,
  // setCSVImportSteps,
  setNotificationConfigForConfirmCSVImport,
  setRetryImport
} from '../slices/importCSVSlice';

const ImportCSVModal = ({ data, show, status }) => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const mapFieldsConfig = useSelector(
    (state) => state.importCSV.mapFieldsConfig
  );

  const handleDownloadReport = () => {
    downloadReport(mapFieldsConfig.importId).then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report.txt`);

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();
    });
  };

  const detoxNotification = () => {
    dispatch(
      setNotificationConfigForConfirmCSVImport({
        show: false,
        status: '',
        modalData: null
      })
    );
  };

  const firstButtonCb = () => {
    if (data.firstButtonText === 'Cancel Import') {
      dispatch(
        logEventHelper('TM_ImportCsvCancelBtnClicked', {
          project_id: queryParams.get('project')
        })
      );
      detoxNotification();
      cancelImport(mapFieldsConfig.importId);
    }
    // download report
    else handleDownloadReport();
  };

  const secondButtonCb = () => {
    // retry import
    // dispatch(
    //   setCSVImportSteps(
    //     IMPORT_CSV_STEPS.map((step, idx) => {
    //       if (idx === 0) return { ...step, status: 'complete' };
    //       if (idx === 1) return { ...step, status: 'current' };
    //       return step;
    //     })
    //   )
    // );
    dispatch(setCSVCurrentScreen('mapFields'));
    dispatch(setRetryImport(true));
    detoxNotification();
  };

  const onModalCloseHandler = () => {
    detoxNotification();
  };

  return (
    <TMModal show={show}>
      <TMModalHeader
        heading={data?.label}
        handleDismissClick={onModalCloseHandler}
        icon={
          status === 'ongoing' ? (
            <AccessTimeIcon
              className="text-brand-600 h-6 w-6"
              aria-hidden="true"
            />
          ) : (
            <ExclamationTriangleIcon
              className="text-danger-600 h-6 w-6"
              aria-hidden="true"
            />
          )
        }
        iconWrapperClassname={
          status === 'ongoing' ? 'bg-brand-100' : 'bg-danger-100'
        }
        dismissButton={data.secondButtonText}
      />
      <TMModalBody>
        <div>{data?.text}</div>
      </TMModalBody>
      <TMModalFooter position="right">
        {data?.firstButtonText && (
          <TMButton variant="primary" colors="white" onClick={firstButtonCb}>
            {data?.firstButtonText}
          </TMButton>
        )}
        {data?.secondButtonText && (
          <TMButton variant="primary" colors="brand" onClick={secondButtonCb}>
            {data?.secondButtonText}
          </TMButton>
        )}
      </TMModalFooter>
    </TMModal>
  );
};

ImportCSVModal.propTypes = {
  data: shape({
    label: string,
    text: string,
    firstButtonText: string,
    secondButtonText: string
  }),
  show: bool,
  status: string
};

ImportCSVModal.defaultProps = {
  data: {
    label: '',
    text: '',
    firstButtonText: '',
    secondButtonText: ''
  },
  show: false,
  status: ''
};

export default ImportCSVModal;
