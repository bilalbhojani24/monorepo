import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { INIT_URL } from 'api/constants/apiURLs';
import axios from 'axios';
import { initialiseApplication } from 'globalSlice';
import { getUserDetails } from 'globalSlice/selector';
import { getEnvConfig } from 'utils/common';

const useApp = () => {
  const dispatch = useDispatch();
  const envConfig = getEnvConfig();

  const { enableSentry } = envConfig;

  const userDetails = useSelector(getUserDetails);

  const initAPI = async () => {
    const response = await axios.get(INIT_URL);

    dispatch(initialiseApplication(response.data));

    return response;
  };

  useEffect(() => {}, [userDetails]);
  return {
    initAPI
  };
};

export default useApp;
