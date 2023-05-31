import { DEFAULT_CONFIG } from '../features/CreateIssue/constants';

export const addConfigParams = (config = {}) => ({
  ...config,
  baseURL: config.baseURL || DEFAULT_CONFIG.baseURL
});
