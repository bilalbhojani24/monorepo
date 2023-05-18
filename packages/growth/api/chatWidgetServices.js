import axiosInstance from './axiosInstance';

const mockResponse = {
  show_fresh_chat_widget: true,
  fresh_chat_tags: ['free_users_visiting_speedboat'],
  reopen_time: 0,
  external_id: 'ga_based_id',
  triggers: null,
  custom_widget: true,
  token: '624243d8-8006-4cae-a3f5-54cdaa3c156a',
  host: 'https://wchat.freshchat.com',
  config: {
    header_property: {
      hide_chat_button: true,
      backgroundColor: '#0070f0'
    }
  }
};
const chatWidgetService = {
  getChatWidgetInitialisation: async () => {
    const response = await axiosInstance.get('todos/1');
    return mockResponse;
  }
};

export default chatWidgetService;
