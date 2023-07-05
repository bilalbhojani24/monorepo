import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  ExclamationTriangleIcon,
  Modal,
  ModalBody
} from '@browserstack/bifrost';
import { useMountEffect } from '@browserstack/hooks';
import { AGTrialGridExpiredModalPresented } from 'constants/event-names';
import PropTypes from 'prop-types';
import { logHSTEvent } from 'utils/logger';

import { setShowOnboardingTooltips } from '../slices';

const ModalTrialGridExpired = ({ setupYourOwnGrid }) => {
  const dispatch = useDispatch();
  useMountEffect(() => {
    dispatch(setShowOnboardingTooltips(false));
    logHSTEvent(['amplitude'], 'web_events', AGTrialGridExpiredModalPresented);
  });

  return (
    <Modal show size="lg">
      <ModalBody className="py-5">
        <div>
          <div className="bg-success-100 mx-auto flex h-12 w-12 items-center justify-center rounded-full">
            <ExclamationTriangleIcon
              className="text-danger-600 h-6 w-6"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <h3 as="h3" className="text-base-900 text-lg font-medium leading-6">
              Trial grid expired
            </h3>
            <div className="mt-2">
              <p className="text-base-500 text-sm">
                Thank you for trying out our trial grid. If you still want to
                use the trial grid, contact our support team. To continue with
                unlimited browser testing, setup your own grid
              </p>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button
                onClick={() =>
                  window.open(
                    `${window.origin}/contact#other?ref=ATS-trial-grid-expired-modal`,
                    '_blank'
                  )
                }
                size="default"
                colors="white"
              >
                Contact Support
              </Button>
              <Button size="default" onClick={setupYourOwnGrid}>
                Setup your own grid
              </Button>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

ModalTrialGridExpired.propTypes = {
  setupYourOwnGrid: PropTypes.func.isRequired
};

export { ModalTrialGridExpired };
