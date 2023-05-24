import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import { WS_URL } from 'const/routes';

import { parseImportDetails } from './features/ImportProgress/slices/importProgressThunk';

const useWebSocketQI = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { sendMessage, lastMessage } = useWebSocket(WS_URL);

  const connectWSQI = ({ importId }) => {
    // console.log('inside connect ws QI', importId);
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

  const interpretWSQIMessage = useCallback(
    (thisMessage) => {
      // console.log('message', thisMessage);
      if (thisMessage?.data) {
        const message = JSON.parse(thisMessage.data)?.message;
        console.log('message', message);
        if (message?.error) {
          // if upload ends in error
          // handleWSErrorMessage(message);
        } else if (typeof message === 'object' && !message?.cancelled)
          dispatch(parseImportDetails(message, location));
      }
    },
    [dispatch, location]
  );

  useEffect(() => {
    interpretWSQIMessage(lastMessage);
  }, [lastMessage, interpretWSQIMessage]);

  return { connectWSQI };
};

export default useWebSocketQI;
