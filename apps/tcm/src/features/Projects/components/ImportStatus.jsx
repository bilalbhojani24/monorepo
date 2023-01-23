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
      }
    });
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
        <TMNotifications
          show={showNotification}
          title={notificationData.title}
        />
      </>
    )
  );
};

export default ImportStatus;
