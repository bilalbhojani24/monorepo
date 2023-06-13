import axios from 'axios';

export const checkProgress = async () => {
  const response = await axios.get('/v1/group/free-trial-status');
  return response.data;
};

export const activateFreeTrial = async () => {
  const response = await axios.get('/v1/group/free-trial');
  return response.data;
};
