import NetworkViewer from './index';

export default {
  title: 'Services/NetworkViewer',
  component: NetworkViewer,
  tags: ['autodocs'],
  argTypes: {}
};
export const Primary = {
  args: {
    logsURL: 'https://apimocha.com/o11y/logs-staging'
  }
};
