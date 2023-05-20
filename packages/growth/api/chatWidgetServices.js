import axiosInstance from './axiosInstance';

const chatWidgetService = {
  getChatWidgetInitialisation: async () => {
    const response = await axiosInstance.get(
      'https://k8s-devos.bsstag.com/user/fresh-chat-config'
    );
    return response.data;
  }
};

export default chatWidgetService;
