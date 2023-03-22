import axios from 'axios';

import { URLS } from './constants';

export const addAttachment = (file, integrationKey, ticketId) => {
  // const url = 'http://example.com/file-upload';
  const formData = new FormData();
  formData.append('file', file);
  axios
    .post(URLS.ATTACHMENT, formData, {
      params: {
        integration_key: integrationKey,
        ticket_id: ticketId
      }
    })
    .then((response) => response.data);
};
