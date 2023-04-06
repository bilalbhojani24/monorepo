import axios from './axiosInstance';
import { URLS } from './constants';

export const addAttachment = (
  file,
  integrationKey,
  ticketId,
  ticketUrl,
  ticketKey
) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios
    .post(URLS.ATTACHMENT, formData, {
      params: {
        integration_key: integrationKey,
        ticket_id: ticketId
      }
    })
    .then((response) => ({
      success: response?.data?.success,
      data: {
        ticket_id: ticketId,
        ticket_url: ticketUrl,
        ticket_key: ticketKey,
        attachment: response?.data?.data
      }
    }))
    .catch((errorResponse) => {
      throw Error(errorResponse.response.data?.error?.message, {
        cause: {
          ticket_id: ticketId,
          ticket_url: ticketUrl,
          ticket_key: ticketKey,
          attachment: errorResponse.response.data?.error
        }
      });
    });
};
