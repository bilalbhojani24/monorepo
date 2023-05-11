import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ExclamationTriangleIcon } from '@browserstack/bifrost';
import {
  TMButton,
  TMModal,
  TMModalFooter,
  TMModalHeader,
  TMProgressBar
} from 'common/bifrostProxy';
import { bool, number, shape, string } from 'prop-types';

// import { logEventHelper } from 'utils/logEvent';
import { cancelImport, downloadReport } from '../../../api/importCSV.api';
import { AccessTimeIcon } from '../../../assets/icons';
import { SECOND_SCREEN } from '../const/importCSVConstants';
import {
  setCSVCurrentScreen,
  setFirstButtonLoading,
  setNotificationConfigForConfirmCSVImport,
  setRetryImport
} from '../slices/importCSVSlice';

const ImportCSVModal = ({ data, show, status, progress }) => {
  const dispatch = useDispatch();
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

  const resetNotification = () => {
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
      dispatch(setFirstButtonLoading(true));
      // dispatch(
      //   logEventHelper('TM_ImportCsvCancelBtnClicked', {
      //     project_id: queryParams.get('project')
      //   })
      // );
      cancelImport(mapFieldsConfig.importId);
    }
    // download report
    else handleDownloadReport();
  };

  const secondButtonCb = () => {
    dispatch(setCSVCurrentScreen(SECOND_SCREEN));
    dispatch(setRetryImport(true));
    resetNotification();
  };

  const onModalCloseHandler = () => {
    resetNotification();
  };

  return (
    <TMModal show={show}>
      <TMModalHeader
        heading={`${data?.label} ${
          status === 'ongoing' ? `${progress || 0}%` : ''
        }`}
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
        subHeading={
          status === 'ongoing' ? (
            <>
              <TMProgressBar title={null} percentage={progress} />
              {data?.text}
            </>
          ) : (
            data?.text
          )
        }
        iconWrapperClassname={
          status === 'ongoing' ? 'bg-brand-100' : 'bg-danger-100'
        }
        dismissButton={data.secondButtonText}
      />
      <TMModalFooter position="right">
        {data?.firstButtonText && (
          <TMButton
            variant="primary"
            colors="white"
            isIconOnlyButton={data?.isButtonLoading}
            onClick={firstButtonCb}
            loading={data?.isButtonLoading}
          >
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
  progress: number,
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
  progress: 0,
  status: ''
};

export default ImportCSVModal;
