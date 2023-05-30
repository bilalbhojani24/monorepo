import { useDispatch, useSelector } from 'react-redux';
import { getBannerDetails, TRIAL_NOT_STARTED } from 'constants';
import {
  setModalName,
  setModalShow,
  setShowBanner
} from 'features/Dashboard/slices/appSlice';
import {
  getShowBanner,
  getTrialState
} from 'features/Dashboard/slices/selectors';

export default function useReverseTrialBanner() {
  const dispatch = useDispatch();
  const showBanner = useSelector(getShowBanner);
  const trialState = useSelector(getTrialState);
  const bannerDetails = getBannerDetails[trialState];

  const handleBannerDismissClick = () => {
    dispatch(setShowBanner(false));
  };

  const handleBannerButtonClick = () => {
    if (trialState === TRIAL_NOT_STARTED) {
      dispatch(setModalName('accessibility'));
      dispatch(setModalShow(true));
      dispatch(setShowBanner(true));
    }
  };

  return {
    bannerDetails,
    showBanner,
    handleBannerDismissClick,
    handleBannerButtonClick
  };
}
