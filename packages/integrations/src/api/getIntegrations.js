import axios from 'axios';

import { URLS } from './constants';

export const getIntegrations = (projectId, componentKey) =>
  axios.get(URLS.LIST_INTEGRATIONS, {
    params: {
      project_id: projectId,
      ui_component_key: componentKey
    }
  });
