import axios from 'axios';

import { ONBOARDING_DATA } from './constants/apiURLs';

const getOnboardingData = (userId) =>
  axios.get(ONBOARDING_DATA, {
    params: {
      userId
    }
  });

export { getOnboardingData };
