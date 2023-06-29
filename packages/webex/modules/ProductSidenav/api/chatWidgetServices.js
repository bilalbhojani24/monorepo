import axiosInstance from './axiosInstance';

const chatWidgetService = {
  getChatWidgetInitialisation: async () => {
    const response = await axiosInstance.get('user/fresh-chat-config');

    return response.data;
  }
};

export default chatWidgetService;
