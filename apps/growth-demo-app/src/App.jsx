import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { initLogger } from '@browserstack/utils';

import Layout from './components/Layout';
import ChatWidget from './features/chatWidget';

const App = () => {
  const Routes = useRoutes([
    {
      element: <Layout />,
      path: '/'
    },
    {
      element: <ChatWidget />,
      path: 'freshchat'
    }
  ]);

  useEffect(() => {
    initLogger({
      amplitudeConfig: {
        key: '',
        userData: {},
        groupData: {}
      },
      analyticsKey: 'UA-x-x',
      EDSDetails: {
        config: {
          server: 'eds.browserstack.com',
          port: '443',
          apiKey: ''
        },
        userDetails: {
          user_id: '1828'
        }
      }
    });
  }, []);

  return <div>{Routes}</div>;
};

export default App;
