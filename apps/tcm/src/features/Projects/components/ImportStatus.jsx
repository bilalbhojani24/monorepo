import React, { useEffect, useState } from 'react';
import { getQuickImportId, getQuickImportStatus } from 'api/import.api';
import { TMButton, TMNotifications } from 'common/bifrostProxy';

const ImportStatus = () => {
  const [currentImportId, setCurrentImportId] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({});

  const checkImportStatusHandler = () => {
    setShowNotification(true);
    getQuickImportStatus(currentImportId).then((data) => {
      if (data.status === 'ongoing') {
        setNotificationData({
          title:
            'Import activity still in progress. We will notify you once it completes',
          isCondensed: false,
        });
      } else if (data.status === 'success') {
        setNotificationData({
          title: 'Project Imported Successfully',
          description:
            'Congratulations, all your selected projects have been successfully imported.',
          isCondensed: false,
        });
      }
    });
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  useEffect(() => {
    getQuickImportId().then(({ import_id: importId }) => {
      setCurrentImportId(importId);
    });
  }, []);

  return (
    currentImportId && (
      <>
        <TMButton onClick={checkImportStatusHandler}>
          Check Import Status
        </TMButton>
        {showNotification && (
          <TMNotifications
            show={showNotification}
            title={notificationData.title}
            handleClose={handleNotificationClose}
          />
        )}
      </>
    )
  );
};

export default ImportStatus;
