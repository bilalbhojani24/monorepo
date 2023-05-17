import { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { WS_URL } from 'const/routes';

const useWebSocketQI = () => {
  const { sendMessage, lastMessage } = useWebSocket(WS_URL);

  const connectWSQI = ({ importId }) => {
    console.log('inside connect ws QI', importId);
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

  const interpretWSQIMessage = (thisMessage) => {
    // console.log('message', thisMessage);
    if (thisMessage?.data) {
      const message = JSON.parse(thisMessage.data)?.message;
      console.log('message', message);
      // if (message?.error) {
      //   // if upload ends in error
      //   // handleWSErrorMessage(message);
      // } else {
      //   // handleWSProgressUpdate(message);
      // }
    }
  };

  useEffect(() => {
    interpretWSQIMessage(lastMessage);
  }, [lastMessage]);

  return { connectWSQI };
};

export default useWebSocketQI;
