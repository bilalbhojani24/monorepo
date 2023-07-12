import React from "react";
import { useAuthRoutes } from "@bilal/utilities";

export const APP_ROUTES = [
  {
    path: "/home",
    isProtected: true,
    component: <div>Home page</div>,
  },
];

const App = () => {
  const Routes = useAuthRoutes(APP_ROUTES);

  return (
    <div>
      {Routes}
      Demo APP
    </div>
  );
};

export default App;
