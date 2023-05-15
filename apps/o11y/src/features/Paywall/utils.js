import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import { MODAL_TYPES } from 'constants/modalTypes';
import { o11yPlanUpgrade } from 'globalSlice/index';
import { o11yNotify } from 'utils/notification';

export const handleStartFreeTrial = (featureKey) => (dispatch) => {
  dispatch(
    toggleModal({
      version: MODAL_TYPES.upgrade_modal,
      data: {
        featureKey
      }
    })
  );
};

export const handleUpgrade =
  ({ successCb, errorCb, finalCb }) =>
  (dispatch) => {
    dispatch(o11yPlanUpgrade())
      .unwrap()
      .then(() => {
        if (successCb && typeof successCb === 'function') {
          successCb();
        } else {
          o11yNotify({
            title: 'Request for upgrade received',
            description:
              "We'll reach out to you soon with upgrade related details",
            type: 'success'
          });
        }
      })
      .catch(() => {
        if (errorCb && typeof errorCb === 'function') {
          errorCb();
        } else {
          o11yNotify({
            title: 'Something went wrong!',
            description: 'Please try again later.',
            type: 'error'
          });
        }
      })
      .finally(() => {
        if (finalCb && typeof finalCb === 'function') {
          finalCb();
        }
      });
  };
