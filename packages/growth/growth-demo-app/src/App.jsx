import React from 'react';
import { useRoutes } from 'react-router-dom';

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
  return <div>{Routes}</div>;
};

export default App;
