import useWebSocket from 'react-use-websocket';
import { WS_URL } from 'const/routes';

const useWebSocketQI = () => {
  const { sendMessage, lastMessage } = useWebSocket(WS_URL);

  const connectWSQI = (importId) => {
    const identifier = {
      channel: 'ImportChannel',
      import_id: importId
    };
    sendMessage(
      JSON.stringify({
        command: 'subscribe',
        identifier: JSON.stringify(identifier)
      })
    );
  };
  return { connectWSQI };
};

export default useWebSocketQI;
