import React from 'react';
import { Notifications } from '@browserstack/bifrost';

const ShowNotification = (props) => {
  const { testCaseName, show } = props;

  <Notifications
    title="Test Case has been created"
    description={`'${testCaseName}' has been successfully created`}
    show={show}
  />;
};

export default ShowNotification;
