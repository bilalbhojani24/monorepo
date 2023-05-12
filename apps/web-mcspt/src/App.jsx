import React from 'react';

import env from './constants/envConstants';
import Home from './features/Home';

const App = () => {
  // kept for usasge reference
  // eslint-disable-next-line no-console
  console.log(env.BSTACK_DEMO);
  // eslint-disable-next-line no-console
  console.log(env);

  return (
    <>
      <Home />
    </>
  );
};

export default App;
