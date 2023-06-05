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
        detailsNode ? (
          <p className="w-40">
            {detailsNode}{' '}
            <span aria-hidden="true" className="ml-1">
              →
            </span>
          </p>
        ) : (
          false
        )
      }
      modifier="warn"
      title={title}
      handleLinkClick={handleAlertLinkClick}
    />
  );
}
