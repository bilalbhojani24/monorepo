import React from 'react';
import { Alerts } from '@browserstack/bifrost';
import Warning from 'assets/warning.svg';
import { getAlertDetails } from 'constants';

import useReverseTrialAlert from './useReverseTrialAlert';

export default function ReverseTrialAlertWrapper() {
  const { alertName, showAlert } = useReverseTrialAlert();

  if (!alertName) return null;

  const { title, detailsNode } = getAlertDetails[alertName];
  return (
    <Alerts
      show={showAlert}
      accentBorder
      alertIcon={<img src={Warning} alt="alert icon" />}
      alphaActionFn={() => {}}
      alphaActionTitle="View Status"
      // betaActionFn={function noRefCheck() {}}
      betaActionTitle="Dismiss"
      detailsNode={
        detailsNode ? (
          <>
            <p className="w-40">
              {detailsNode}{' '}
              <span aria-hidden="true" className="ml-1">
                →
              </span>
            </p>
          </>
        ) : (
          false
        )
      }
      modifier="warn"
      // dismissButtonFn={function noRefCheck() {}}
      // handleLinkClick={function noRefCheck() {}}
      title={title}
    />
  );
}
