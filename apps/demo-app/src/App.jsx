import React from 'react';
// import Button from '@bilal/utilities/lib/button';
import Card from '@bilal/utilities/dist/Card';

export const APP_ROUTES = [
  {
    path: '/home',
    isProtected: true,
    component: <div>Home page</div>,
  },
];

const App = () => {
  // const Routes = useAuthRoutes(APP_ROUTES);

  return (
    <div>
      {/* {Routes} */}
      {/* <Button /> */}
      <Card />
      Demo APP
    </div>
  );
};

export default App;
