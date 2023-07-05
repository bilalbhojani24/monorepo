import { o11yPlanUpgrade } from 'globalSlice/index';
import { logOllyEvent } from 'utils/common';

export const handleUpgrade =
  ({ successCb, errorCb, finalCb }) =>
  (dispatch) => {
    logOllyEvent({
      event: 'O11yUpgradeModalInteracted',
      data: {
        interaction: 'rft_cta_clicked'
      }
    });
    dispatch(o11yPlanUpgrade())
      .unwrap()
      .then(() => {
        if (successCb && typeof successCb === 'function') {
          successCb();
        }
      })
      .catch(() => {
        if (errorCb && typeof errorCb === 'function') {
          errorCb();
        }
      })
      .finally(() => {
        if (finalCb && typeof finalCb === 'function') {
          finalCb();
        }
      });
  };
