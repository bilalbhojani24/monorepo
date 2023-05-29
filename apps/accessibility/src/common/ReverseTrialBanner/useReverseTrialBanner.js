import { useSelector } from 'react-redux';
import { getBannerDetails } from 'constants';
import { getTrialState } from 'features/Dashboard/slices/selectors';

export default function useReverseTrialBanner() {
  const trialState = useSelector(getTrialState);
  const bannerDetails = getBannerDetails[trialState];

  return {
    bannerDetails
  };
}
