import React from 'react';
import { Alerts } from '@browserstack/bifrost';
import Warning from 'assets/warning.svg';
import { getAlertDetails } from 'constants';

import useReverseTrialAlert from './useReverseTrialAlert';

export default function ReverseTrialAlertWrapper() {
  const { alertName, showAlert, handleAlertLinkClick } = useReverseTrialAlert();

  if (!alertName) return null;

  const { title, detailsNode } = getAlertDetails[alertName];
  return (
    <Alerts
      show={showAlert}
      accentBorder
      alertIcon={<img src={Warning} alt="alert icon" />}
      alphaActionTitle="View Status"
      detailsNode={
        detailsNode && (
          <>
            <p>Details</p>
            <span aria-hidden="true"> →</span>
          </>
        )
      }
      modifier="warn"
      title={title}
      handleLinkClick={handleAlertLinkClick}
    />
  );
}
